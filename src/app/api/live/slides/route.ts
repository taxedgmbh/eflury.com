import { NextResponse } from 'next/server';
import { FieldValue } from '@google-cloud/firestore';
import { db } from '@/lib/newsletter';
import { LINK_TYPE, MAX_BYTES, MAX_SLIDES, SLIDES, STATE, TYPES, changeState, embedUrl, inspectLink, newId, passwordOk } from '@/lib/live';

export const dynamic = 'force-dynamic';

const noStore = { 'Cache-Control': 'no-store, max-age=0', 'X-Robots-Tag': 'noindex' };
const bad = (error: string, status = 400) => NextResponse.json({ error }, { status, headers: noStore });

/** Slide names for the remote's list and the TV, in screen order; web pages also carry their url. */
export async function GET() {
  try {
    const st = await STATE.get();
    const ids: string[] = st.exists && Array.isArray(st.data()?.ids) ? st.data()!.ids : [];
    if (!ids.length) return NextResponse.json({ slides: [] }, { headers: noStore });
    // field mask: the image bytes stay on the server
    const docs = await db.getAll(...ids.map((id) => SLIDES.doc(id)), { fieldMask: ['name', 'type', 'url', 'frame'] });
    const slides = docs
      .filter((d) => d.exists)
      .map((d) => {
        const name = String(d.get('name') || '');
        return d.get('type') === LINK_TYPE ? { id: d.id, name, url: String(d.get('url')), frame: d.get('frame') !== false } : { id: d.id, name };
      });
    return NextResponse.json({ slides }, { headers: noStore });
  } catch (e) {
    console.error('live slides list failed', e instanceof Error ? e.message : e);
    return bad('unavailable', 503);
  }
}

/**
 * The remote:
 *   { password, action: 'add', name, type, data (base64) }   adds a slide at the end
 *   { password, action: 'link', url, name? }                 adds a web page at the end
 *   { password, action: 'delete', id }
 *   { password, action: 'move', id, dir: -1 | 1 }
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return bad('invalid');
  }
  if (!passwordOk(body.password)) {
    await new Promise((r) => setTimeout(r, 800));
    return bad('password', 401);
  }
  try {
    if (body.action === 'add' || body.action === 'link') {
      const id = newId();
      let doc: Record<string, unknown>;
      let extra = {};
      if (body.action === 'link') {
        const url = typeof body.url === 'string' ? embedUrl(body.url) : null;
        if (!url) return bad('url');
        const info = await inspectLink(url);
        if (!info.ok) return bad('url');
        const host = new URL(url).hostname.replace(/^www\./, '');
        const name = (String(body.name || '').trim() || info.title || host).slice(0, 80);
        doc = { type: LINK_TYPE, url, frame: info.frame, name };
        extra = { frame: info.frame, name, url };
      } else {
        const type = String(body.type || '');
        if (!TYPES.includes(type)) return bad('type');
        if (typeof body.data !== 'string') return bad('invalid');
        const bytes = Buffer.from(body.data, 'base64');
        if (!bytes.length) return bad('invalid');
        if (bytes.length > MAX_BYTES) return bad('too-big');
        doc = { data: bytes, type, name: String(body.name || 'Slide').slice(0, 80) };
      }
      await SLIDES.doc(id).set({ ...doc, createdAt: FieldValue.serverTimestamp() });
      const s = await changeState((s) => {
        if (s.ids.length < MAX_SLIDES) s.ids.push(id);
        return s;
      });
      if (!s.ids.includes(id)) {
        await SLIDES.doc(id).delete();
        return bad('full');
      }
      return NextResponse.json({ id, ...extra, state: s }, { headers: noStore });
    }
    if (body.action === 'delete' && typeof body.id === 'string') {
      const id = body.id;
      const s = await changeState((s) => {
        const i = s.ids.indexOf(id);
        if (i >= 0) {
          s.ids.splice(i, 1);
          if (s.index > i || s.index >= s.ids.length) s.index -= 1;
          if (s.last > i || s.last >= s.ids.length) s.last -= 1;
        }
        return s;
      });
      await SLIDES.doc(id).delete();
      return NextResponse.json({ state: s }, { headers: noStore });
    }
    if (body.action === 'move' && typeof body.id === 'string' && (body.dir === 1 || body.dir === -1)) {
      const id = body.id;
      const dir = body.dir;
      const s = await changeState((s) => {
        const i = s.ids.indexOf(id);
        const j = i + dir;
        if (i >= 0 && j >= 0 && j < s.ids.length) {
          [s.ids[i], s.ids[j]] = [s.ids[j], s.ids[i]];
          if (s.index === i) s.index = j;
          else if (s.index === j) s.index = i;
          if (s.last === i) s.last = j;
          else if (s.last === j) s.last = i;
        }
        return s;
      });
      return NextResponse.json({ state: s }, { headers: noStore });
    }
    return bad('invalid');
  } catch (e) {
    console.error('live slides change failed', e instanceof Error ? e.message : e);
    return bad('unavailable', 503);
  }
}
