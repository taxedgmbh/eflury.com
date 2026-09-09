import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { serverEnv } from './env';

/**
 * Signed, expiring tokens — used for newsletter double opt-in confirmation
 * links, so a confirmation cannot be forged and an old link cannot be replayed
 * indefinitely.
 */

const SEPARATOR = '.';

export function signToken(payload: string, ttlMs: number): string {
  const expires = Date.now() + ttlMs;
  const body = `${Buffer.from(payload).toString('base64url')}${SEPARATOR}${expires}`;
  const mac = createHmac('sha256', serverEnv.ipHashSalt).update(body).digest('base64url');
  return `${body}${SEPARATOR}${mac}`;
}

export function verifyToken(token: string): { valid: boolean; payload?: string } {
  const parts = token.split(SEPARATOR);
  if (parts.length !== 3) return { valid: false };
  const [encoded, expires, mac] = parts;

  const expected = createHmac('sha256', serverEnv.ipHashSalt)
    .update(`${encoded}${SEPARATOR}${expires}`)
    .digest('base64url');

  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return { valid: false };
  if (Number(expires) < Date.now()) return { valid: false };

  return { valid: true, payload: Buffer.from(encoded, 'base64url').toString('utf8') };
}
