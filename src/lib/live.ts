import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { FieldValue } from '@google-cloud/firestore';
import { db } from './newsletter';

/*
 * TikTok LIVE slides for the TV backdrop (public/live/*.html) and its remote
 * (public/live/remote.html). Owner-only content, no visitor data.
 *
 *   live_slides/<id>  one slide: the image bytes (≤ 950 KB, the remote shrinks
 *                     bigger files first), content type and file name; a web page
 *                     (type LINK_TYPE) keeps its url and frame (may it be framed) instead
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

/*
 * Web-page slides: the remote adds a link instead of an image. The TV shows the page
 * full screen in a frame. Many sites (Google search, Instagram, X, banks) forbid being
 * shown inside another page; for those the TV shows a title card with the address.
 */
export const LINK_TYPE = 'text/uri-list';

/** Turns share links into their embeddable form (YouTube, Google Slides). */
export function embedUrl(raw: string): string | null {
  let u: URL;
  try {
    u = new URL(/^[a-z][a-z0-9+.-]*:/i.test(raw.trim()) ? raw.trim() : 'https://' + raw.trim());
  } catch {
    return null;
  }
  if (u.protocol !== 'https:' && u.protocol !== 'http:') return null;
  if (u.username || u.password || raw.length > 2000) return null;
  const host = u.hostname.replace(/^www\.|^m\./, '');
  let yt: string | null = null;
  if (host === 'youtu.be') yt = u.pathname.slice(1).split('/')[0];
  else if (host === 'youtube.com' || host === 'music.youtube.com') {
    yt = u.searchParams.get('v') || u.pathname.match(/^\/(?:shorts|live|embed)\/([\w-]{6,20})/)?.[1] || null;
  }
  if (yt && /^[\w-]{6,20}$/.test(yt)) {
    const t = parseInt(u.searchParams.get('t') || u.searchParams.get('start') || '0', 10);
    return `https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0&modestbranding=1${t > 0 ? `&start=${t}` : ''}`;
  }
  const gs = host === 'docs.google.com' && u.pathname.match(/^\/presentation\/d\/([\w-]{10,})/);
  if (gs) return `https://docs.google.com/presentation/d/${gs[1]}/embed?start=false&loop=false&delayms=60000`;
  return u.toString();
}

function privateIp(ip: string): boolean {
  if (ip.includes(':')) {
    const v = ip.toLowerCase();
    if (v.startsWith('::ffff:')) return privateIp(v.slice(7));
    return v === '::1' || v === '::' || /^f[cd]/.test(v) || /^fe[89ab]/.test(v);
  }
  const [a, b] = ip.split('.').map(Number);
  return a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127) || a >= 224;
}

async function publicHost(host: string): Promise<boolean> {
  const { lookup } = await import('node:dns/promises');
  try {
    const all = await lookup(host.replace(/^\[|\]$/g, ''), { all: true });
    return all.length > 0 && all.every((r) => !privateIp(r.address));
  } catch {
    return false;
  }
}

/** The video's own title (YouTube's public oEmbed); the embed page itself is only called "YouTube". */
async function youtubeTitle(id: string): Promise<string> {
  try {
    const r = await fetch(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent('https://www.youtube.com/watch?v=' + id)}`, {
      signal: AbortSignal.timeout(4000),
    });
    return r.ok ? String((await r.json()).title || '') : '';
  } catch {
    return '';
  }
}

/**
 * Looks at the page once, when it is added: may it be framed, and what is its title?
 * Only public addresses are fetched, each redirect is checked again.
 */
export async function inspectLink(start: string): Promise<{ ok: boolean; frame: boolean; title: string }> {
  let url = start;
  for (let hop = 0; hop < 5; hop++) {
    const u = new URL(url);
    if (!(await publicHost(u.hostname))) return { ok: false, frame: false, title: '' };
    let r: Response;
    try {
      r = await fetch(url, {
        redirect: 'manual',
        signal: AbortSignal.timeout(6000),
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; eflury-live/1.0)', Accept: 'text/html,*/*' },
      });
    } catch {
      return { ok: true, frame: true, title: '' }; // not reachable from here: let the TV try
    }
    const loc = r.headers.get('location');
    if (r.status >= 300 && r.status < 400 && loc) {
      url = new URL(loc, url).toString();
      continue;
    }
    const xfo = (r.headers.get('x-frame-options') || '').toLowerCase();
    const fa = (r.headers.get('content-security-policy') || '').match(/frame-ancestors([^;]*)/i)?.[1].trim().toLowerCase();
    if (r.status === 404 || r.status === 410) return { ok: false, frame: false, title: '' };
    // the TV page is on eflury.com itself, so SAMEORIGIN still lets it show eflury.com pages
    const own = /(^|\.)eflury\.com$/.test(u.hostname);
    let frame = !xfo || (own && xfo === 'sameorigin');
    if (fa !== undefined && !(own && /'self'/.test(fa))) frame = /(^|\s)(\*|https:|https:\/\/(\*\.)?eflury\.com)(\s|$)/.test(fa);
    let title = '';
    if ((r.headers.get('content-type') || '').includes('html') && r.body) {
      const reader = r.body.getReader();
      let html = '';
      while (html.length < 200_000) {
        const { done, value } = await reader.read().catch(() => ({ done: true, value: undefined }));
        if (done || !value) break;
        html += new TextDecoder().decode(value);
        if (/<\/title>/i.test(html)) break;
      }
      reader.cancel().catch(() => {});
      title = (html.match(/<title[^>]*>([^<]{1,200})/i)?.[1] || '')
        .replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
        .replace(/\s+/g, ' ').trim();
    } else r.body?.cancel().catch(() => {});
    const yt = url.match(/^https:\/\/www\.youtube-nocookie\.com\/embed\/([\w-]+)/)?.[1];
    if (yt) title = (await youtubeTitle(yt)) || title;
    return { ok: true, frame, title };
  }
  return { ok: true, frame: true, title: '' };
}

const esc = (t: string) => t.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/** Splits a title into at most two lines of about `n` characters. */
function lines(t: string, n: number): string[] {
  const out: string[] = [];
  let cur = '';
  for (const w of t.split(' ')) {
    if ((cur + ' ' + w).trim().length > n && cur) {
      out.push(cur);
      cur = w;
    } else cur = (cur + ' ' + w).trim();
  }
  if (cur) out.push(cur);
  if (out.length > 2) out.splice(1, out.length, out.slice(1).join(' ').slice(0, n - 1) + '…');
  return out.map((l) => (l.length > n ? l.slice(0, n - 1) + '…' : l));
}

/**
 * A web-page slide as a picture: its title and address on the brand navy. The remote uses
 * it as the thumbnail; the TV shows it for sites that forbid being framed.
 */
export function linkCard(name: string, url: string): string {
  const host = new URL(url).hostname.replace(/^www\./, '');
  const tl = lines(name || host, 30);
  const y0 = tl.length > 1 ? 470 : 530;
  const title = tl.map((l, i) => `<tspan x="960" y="${y0 + i * 120}">${esc(l)}</tspan>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
<defs><radialGradient id="g" cx="50%" cy="38%" r="75%"><stop offset="0" stop-color="#063a7a"/><stop offset="1" stop-color="#011a3d"/></radialGradient></defs>
<rect width="1920" height="1080" fill="url(#g)"/>
<g fill="none" stroke="#5AB8E8" stroke-width="10" transform="translate(960 300)"><circle r="86"/><ellipse rx="38" ry="86"/><path d="M-86 0h172M-74-44h148M-74 44h148"/></g>
<text text-anchor="middle" font-family="Montserrat,-apple-system,'Segoe UI',system-ui,sans-serif" font-weight="800" font-size="100" fill="#ffffff">${title}</text>
<text x="960" y="${y0 + tl.length * 120 + 40}" text-anchor="middle" font-family="-apple-system,'Segoe UI',system-ui,sans-serif" font-weight="700" font-size="56" fill="#5AB8E8">${esc(host)}</text>
</svg>`;
}
