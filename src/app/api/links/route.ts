import { NextResponse } from 'next/server';
import { countClick, readOnAir, readStats, setOnAir } from '@/lib/links';
import { passwordOk } from '@/lib/live';

export const dynamic = 'force-dynamic';

const noStore = { 'Cache-Control': 'no-store, max-age=0', 'X-Robots-Tag': 'noindex' };

/** The link page polls this: is Emanuel LIVE on TikTok right now? */
export async function GET() {
  try {
    return NextResponse.json({ onAir: await readOnAir() }, { headers: noStore });
  } catch {
    return NextResponse.json({ onAir: false }, { headers: noStore });
  }
}

/**
 *   { k, s }                                  anonymous click or view from the link page (sendBeacon)
 *   { password, action: 'onair', on }         the LIVE remote switches "LIVE now" on or off
 *   { password, action: 'stats' }             the LIVE remote reads the counts
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(await req.text());
  } catch {
    return NextResponse.json({ error: 'invalid' }, { status: 400, headers: noStore });
  }
  try {
    if (typeof body.k === 'string' && !('password' in body)) {
      await countClick(String(body.s || 'direct').slice(0, 20), body.k.slice(0, 40));
      return new NextResponse(null, { status: 204, headers: noStore });
    }
    if (!passwordOk(body.password)) {
      await new Promise((r) => setTimeout(r, 800));
      return NextResponse.json({ error: 'password' }, { status: 401, headers: noStore });
    }
    if (body.action === 'onair' && typeof body.on === 'boolean') {
      await setOnAir(body.on);
      return NextResponse.json({ onAir: body.on }, { headers: noStore });
    }
    if (body.action === 'stats') {
      return NextResponse.json({ onAir: await readOnAir(), months: await readStats() }, { headers: noStore });
    }
    return NextResponse.json({ error: 'invalid' }, { status: 400, headers: noStore });
  } catch (e) {
    console.error('links api failed', e instanceof Error ? e.message : e);
    return NextResponse.json({ error: 'unavailable' }, { status: 503, headers: noStore });
  }
}
