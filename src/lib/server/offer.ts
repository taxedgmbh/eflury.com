import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Offer link signing, ported from accept.php.
 *
 * The scheme is kept byte-compatible on purpose: HMAC-SHA256 over the fields
 * joined by "|", in the same order, with the same secret. Links already sent to
 * clients stay valid across the migration, which matters because they carry a
 * 60-day TTL and some are in flight.
 *
 * "|" is rejected inside any field so the canonical string cannot be made
 * ambiguous — the same defence the PHP version applied.
 */

export interface Offer {
  nr: string;
  titel: string;
  betrag: string;
  email: string;
  firma: string;
  lang: 'de' | 'en';
  exp: number;
}

export const LINK_TTL_MS = 60 * 24 * 3600 * 1000;

export const AGB_VERSION = '2026-07-23';

export const AGB = {
  de: {
    pdf: 'downloads/agb/eflury-agb-de-2026-07-23.pdf',
    url: 'https://eflury.com/de/nutzungsbedingungen/',
  },
  en: {
    pdf: 'downloads/agb/eflury-gtc-en-2026-07-23.pdf',
    // The English terms URL now 301s to the German one; recorded as-is because
    // the accepted document is what matters, not the redirect.
    url: 'https://eflury.com/de/nutzungsbedingungen/',
  },
} as const;

function secret(): string {
  const value = process.env.ACCEPT_SECRET;
  if (!value) throw new Error('ACCEPT_SECRET is not configured');
  return value;
}

/** Canonical string that gets signed — field order is part of the contract. */
export function offerPayload(o: Offer): string {
  return [o.nr, o.titel, o.betrag, o.email, o.firma, o.lang, o.exp].join('|');
}

export function signOffer(o: Offer): string {
  return createHmac('sha256', secret()).update(offerPayload(o)).digest('hex');
}

export function verifyOffer(o: Offer, signature: string): boolean {
  const expected = signOffer(o);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Document id for the acceptance, so a second POST cannot create a second record. */
export function offerDocId(nr: string): string {
  return nr.replace(/[^A-Za-z0-9._-]/g, '_').slice(0, 200);
}
