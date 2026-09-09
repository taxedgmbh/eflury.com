import 'server-only';
import { createHash } from 'node:crypto';
import { FieldValue } from 'firebase-admin/firestore';
import { firestore, COLLECTIONS } from './firestore';
import { serverEnv } from './env';

/**
 * Replaces the PHP proxy's rate limiter, which kept a timestamp array in
 * $_SESSION. That was per session *cookie*, not per IP as its own comment
 * claimed — clearing cookies reset the budget, so it stopped nobody who cared.
 *
 * Three layers, because they fail differently:
 *
 *   1. Per-IP fixed window. Stops casual repeat traffic.
 *   2. A global daily cap. This is what actually protects the card against a
 *      botnet; per-IP limits do nothing against distributed traffic.
 *   3. Turnstile on the first message (in the route), so bots never reach the
 *      model at all — worth more than any counter.
 *
 * An in-memory Map is deliberately *not* the primary store: Cloud Run runs up to
 * maxInstances containers, so an in-process counter multiplies the limit by the
 * instance count. It is used only as a cheap pre-filter in front of Firestore.
 */

export interface RateLimitResult {
  allowed: boolean;
  reason?: 'per-ip' | 'global';
  retryAfterSeconds?: number;
}

const PER_IP_LIMIT = 10;
const PER_IP_WINDOW_MS = 60_000;
const GLOBAL_DAILY_LIMIT = 2_000;

/**
 * Hashed with a salt that rotates daily. The raw IP is personal data under
 * revDSG, and a rotating salt means no durable identifier is retained while
 * still allowing a one-minute window to be counted.
 */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for') ?? '';
  const ip = forwarded.split(',')[0]?.trim() || 'unknown';
  const day = new Date().toISOString().slice(0, 10);
  return createHash('sha256')
    .update(`${ip}:${day}:${serverEnv.ipHashSalt}`)
    .digest('hex')
    .slice(0, 32);
}

/** Cheap pre-filter. Correct only within one container; Firestore is the truth. */
const local = new Map<string, { count: number; resetAt: number }>();

function localExceeded(key: string): boolean {
  const now = Date.now();
  const entry = local.get(key);
  if (!entry || entry.resetAt < now) {
    local.set(key, { count: 1, resetAt: now + PER_IP_WINDOW_MS });
    if (local.size > 5_000) local.clear();
    return false;
  }
  entry.count += 1;
  return entry.count > PER_IP_LIMIT;
}

export async function checkRateLimit(request: Request): Promise<RateLimitResult> {
  const key = clientKey(request);

  if (localExceeded(key)) {
    return { allowed: false, reason: 'per-ip', retryAfterSeconds: 60 };
  }

  const db = firestore();
  const bucket = Math.floor(Date.now() / PER_IP_WINDOW_MS);
  const day = new Date().toISOString().slice(0, 10);

  const ipRef = db.collection(COLLECTIONS.rateLimit).doc(`ip_${key}_${bucket}`);
  const globalRef = db.collection(COLLECTIONS.rateLimit).doc(`global_${day}`);

  // expiresAt drives a Firestore TTL policy, so the collection self-cleans with
  // no scheduled job. Set the policy on the `expiresAt` field of `ratelimit`.
  const [ipSnap, globalSnap] = await Promise.all([
    ipRef
      .set(
        {
          n: FieldValue.increment(1),
          expiresAt: new Date(Date.now() + 2 * PER_IP_WINDOW_MS),
        },
        { merge: true }
      )
      .then(() => ipRef.get()),
    globalRef
      .set(
        {
          n: FieldValue.increment(1),
          expiresAt: new Date(Date.now() + 3 * 86_400_000),
        },
        { merge: true }
      )
      .then(() => globalRef.get()),
  ]);

  if ((globalSnap.data()?.n ?? 0) > GLOBAL_DAILY_LIMIT) {
    return { allowed: false, reason: 'global' };
  }
  if ((ipSnap.data()?.n ?? 0) > PER_IP_LIMIT) {
    return { allowed: false, reason: 'per-ip', retryAfterSeconds: 60 };
  }

  return { allowed: true };
}
