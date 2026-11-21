import { LINK_TYPE, SLIDES, linkCard } from '@/lib/live';

export const dynamic = 'force-dynamic';

/** One slide image. Ids never change content, so the browser may keep it. */
export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!/^[A-Za-z0-9_-]{6,40}$/.test(id)) return new Response('Not found', { status: 404 });
  try {
    const d = await SLIDES.doc(id).get();
    if (!d.exists) return new Response('Not found', { status: 404 });
    const headers = { 'Cache-Control': 'public, max-age=31536000, immutable', 'X-Robots-Tag': 'noindex' };
    if (d.get('type') === LINK_TYPE) {
      return new Response(linkCard(String(d.get('name') || ''), String(d.get('url'))), {
        headers: { ...headers, 'Content-Type': 'image/svg+xml; charset=utf-8', 'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'" },
      });
    }
    const data = d.get('data') as Buffer;
    return new Response(new Uint8Array(data), { headers: { ...headers, 'Content-Type': String(d.get('type') || 'image/jpeg') } });
  } catch (e) {
    console.error('live slide read failed', e instanceof Error ? e.message : e);
    return new Response('Unavailable', { status: 503 });
  }
}
