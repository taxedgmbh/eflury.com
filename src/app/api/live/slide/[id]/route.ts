import { SLIDES } from '@/lib/live';

export const dynamic = 'force-dynamic';

/** One slide image. Ids never change content, so the browser may keep it. */
export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!/^[A-Za-z0-9_-]{6,40}$/.test(id)) return new Response('Not found', { status: 404 });
  try {
    const d = await SLIDES.doc(id).get();
    if (!d.exists) return new Response('Not found', { status: 404 });
    const data = d.get('data') as Buffer;
    return new Response(new Uint8Array(data), {
      headers: {
        'Content-Type': String(d.get('type') || 'image/jpeg'),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Robots-Tag': 'noindex',
      },
    });
  } catch (e) {
    console.error('live slide read failed', e instanceof Error ? e.message : e);
    return new Response('Unavailable', { status: 503 });
  }
}
