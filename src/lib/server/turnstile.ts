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

/**
 * Hostnames Cloudflare may legitimately report for our own widget.
 *
 * The App Hosting preview is served from a *.hosted.app domain. It cannot be
 * derived from SITE_URL, which stays https://eflury.com on staging so that
 * canonicals point at the real domain — so without this, a genuine token solved
 * on the preview is rejected as wrong-host and every form keeps failing even
 * after the secret is provisioned.
 *
 * Any *.hosted.app host is accepted, but only while NEXT_PUBLIC_ENV is not
 * "production": that backend is noindexed, transitional, and holds no data worth
 * a cross-site token replay. Production stays pinned to the real domain, which
 * is where the check actually has to hold.
 */
const PINNED_HOSTS = new Set(['eflury.com', 'www.eflury.com', 'localhost']);

function hostAllowed(hostname: string): boolean {
  if (PINNED_HOSTS.has(hostname)) return true;
  return !serverEnv.isProduction && hostname.endsWith('.hosted.app');
}

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
  if (data.hostname && !hostAllowed(data.hostname)) {
    return { ok: false, reason: 'wrong-host' };
  }

  return { ok: true };
}
