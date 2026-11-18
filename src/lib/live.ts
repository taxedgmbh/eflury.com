import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { FieldValue } from '@google-cloud/firestore';
import { db } from './newsletter';

/*
 * TikTok LIVE slides for the TV backdrop (public/live/*.html) and its remote
 * (public/live/remote.html). Owner-only content, no visitor data.
 *
 *   live_slides/<id>  one slide: the image bytes (≤ 950 KB, the remote shrinks
 *                     bigger files first), content type and file name
 *   live_state/tv     ids: the slide order; index: the slide on screen, or -1
 *                     for the backdrop; last: the slide that was on screen when
 *                     the backdrop was shown, so Next resumes there; v: bumps on every change
 *
 * Reading (the TV, the slide images) is public, like the backdrop itself.
 * Every change needs the password. Only its sha256 is kept here.
 */

const PASSWORD_SHA256 = '5beeafeac2e27eae5d4ba62590257718673461b2af52383ef7e3a53c7df14306';
export const SLIDES = db.collection('live_slides');
export const STATE = db.collection('live_state').doc('tv');
export const MAX_BYTES = 950 * 1024;
export const MAX_SLIDES = 200;
export const TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/apng'];

export type LiveState = { ids: string[]; index: number; last: number; v: number };

export function passwordOk(raw: unknown): boolean {
  if (typeof raw !== 'string' || raw.length > 200) return false;
  const a = Buffer.from(createHash('sha256').update(raw.trim()).digest('hex'));
  const b = Buffer.from(PASSWORD_SHA256);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function readState(): Promise<LiveState> {
  const s = await STATE.get();
  const d = s.exists ? (s.data() as Partial<LiveState>) : {};
  const ids = Array.isArray(d.ids) ? d.ids.filter((x): x is string => typeof x === 'string') : [];
  const index = typeof d.index === 'number' && d.index >= -1 && d.index < ids.length ? d.index : -1;
  const last = typeof d.last === 'number' && d.last >= 0 && d.last < ids.length ? d.last : -1;
  return { ids, index, last, v: typeof d.v === 'number' ? d.v : 0 };
}

/** Applies a change to the state in a transaction and returns the new state. */
export async function changeState(fn: (s: LiveState) => LiveState): Promise<LiveState> {
  return db.runTransaction(async (tx) => {
    const snap = await tx.get(STATE);
    const d = snap.exists ? (snap.data() as Partial<LiveState>) : {};
    const cur: LiveState = {
      ids: Array.isArray(d.ids) ? d.ids : [],
      index: typeof d.index === 'number' ? d.index : -1,
      last: typeof d.last === 'number' ? d.last : -1,
      v: typeof d.v === 'number' ? d.v : 0,
    };
    const next = fn({ ids: [...cur.ids], index: cur.index, last: cur.last, v: cur.v });
    next.index = Math.max(-1, Math.min(next.index, next.ids.length - 1));
    next.last = next.index >= 0 ? -1 : Math.max(-1, Math.min(next.last, next.ids.length - 1));
    next.v = cur.v + 1;
    tx.set(STATE, { ...next, updatedAt: FieldValue.serverTimestamp() });
    return next;
  });
}

export const newId = () => randomBytes(9).toString('base64url');
