import 'server-only';
import { serverEnv } from './env';

/**
 * Server-side Turnstile verification.
 *
 * This did not exist on the Astro site. Contact.astro rendered the widget and
 * gated its submit button on a token, but nothing ever called siteverify — so
 * the widget stopped nobody who posted straight to the endpoint. The secret key
 * has never been created; it needs provisioning before this can pass.
 */

export type TurnstileResult =
  | { ok: true }
  | { ok: false; reason: 'missing-token' | 'rejected' | 'wrong-host' | 'unavailable' };

const ENDPOINT = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/** Hostnames Cloudflare may legitimately report for our own widget. */
const ALLOWED_HOSTS = new Set(['eflury.com', 'www.eflury.com', 'localhost']);

export async function verifyTurnstile(
  token: string | undefined | null,
  request: Request
): Promise<TurnstileResult> {
  if (!token) return { ok: false, reason: 'missing-token' };

  const remoteip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '';

  let data: { success?: boolean; hostname?: string; 'error-codes'?: string[] };
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: serverEnv.turnstileSecret,
        response: token,
        ...(remoteip ? { remoteip } : {}),
      }),
      // Never hold a form submission open on Cloudflare being slow.
      signal: AbortSignal.timeout(10_000),
    });
    data = await response.json();
  } catch {
    // Fail closed. An outage means submissions are refused rather than accepted
    // unverified — the whole point of adding this is to stop unverified posts.
    return { ok: false, reason: 'unavailable' };
  }

  if (!data.success) return { ok: false, reason: 'rejected' };

  // Cloudflare echoes the hostname the widget was solved on. Without this check
  // a token minted on an attacker's page using our sitekey would be accepted.
  if (data.hostname && !ALLOWED_HOSTS.has(data.hostname)) {
    return { ok: false, reason: 'wrong-host' };
  }

  return { ok: true };
}
