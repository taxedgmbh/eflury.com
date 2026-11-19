import { FieldValue } from '@google-cloud/firestore';
import { db } from './newsletter';

/*
 * The link-in-bio page (/en/links/, short: /tiktok, /insta, /yt, /x, /links).
 *
 *   live_state/onair      { on, since }  set from the LIVE remote; the page shows "LIVE now" while on
 *   link_clicks/<YYYY-MM> { "<source>__<link>": n }  anonymous counts: no cookies, no IP, no IDs
 *
 * Only keys from these lists are counted, so the endpoint cannot be used to
 * store anything else.
 */
export const SOURCES = ['tiktok', 'instagram', 'youtube', 'x', 'facebook', 'linkedin', 'direct'] as const;
export const LINK_KEYS = [
  'view',
  'live',
  'video',
  'newsletter',
  'youtube',
  'note',
  'taxed',
  'skopa',
  'whatsapp',
  'contact',
  'website',
  'social-linkedin',
  'social-instagram',
  'social-tiktok',
  'social-youtube',
  'social-x',
  'social-facebook',
  'social-github',
] as const;

export const ONAIR = db.collection('live_state').doc('onair');
const CLICKS = db.collection('link_clicks');
const month = (d = new Date()) => d.toISOString().slice(0, 7);

export async function readOnAir(): Promise<boolean> {
  const s = await ONAIR.get();
  if (!s.exists || s.get('on') !== true) return false;
  // A forgotten switch turns itself off after 6 hours.
  const since = s.get('since')?.toDate?.() as Date | undefined;
  return !since || Date.now() - since.getTime() < 6 * 3600 * 1000;
}

export async function setOnAir(on: boolean) {
  await ONAIR.set({ on, since: FieldValue.serverTimestamp() });
}

export async function countClick(source: string, key: string) {
  const s = (SOURCES as readonly string[]).includes(source) ? source : 'direct';
  if (!(LINK_KEYS as readonly string[]).includes(key)) return;
  await CLICKS.doc(month()).set({ [`${s}__${key}`]: FieldValue.increment(1) }, { merge: true });
}

/** The last three months, newest first: { month, counts }. */
export async function readStats() {
  const now = new Date();
  const months = [0, 1, 2].map((i) => month(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1))));
  const docs = await Promise.all(months.map((m) => CLICKS.doc(m).get()));
  return months.map((m, i) => ({ month: m, counts: (docs[i].exists ? docs[i].data() : {}) as Record<string, number> }));
}
