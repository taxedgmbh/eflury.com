import { NextResponse } from 'next/server';
import { changeState, passwordOk, readState } from '@/lib/live';

export const dynamic = 'force-dynamic';

const noStore = { 'Cache-Control': 'no-store, max-age=0', 'X-Robots-Tag': 'noindex' };

/** The TV and the remote poll this: which slide is on screen. */
export async function GET() {
  try {
    return NextResponse.json(await readState(), { headers: noStore });
  } catch (e) {
    console.error('live state read failed', e instanceof Error ? e.message : e);
    return NextResponse.json({ error: 'unavailable' }, { status: 503, headers: noStore });
  }
}

/** The remote: { password, action: 'next' | 'prev' | 'go' | 'backdrop' | 'resume', index? }. */
export async function POST(req: Request) {
  let body: { password?: unknown; action?: unknown; index?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid' }, { status: 400, headers: noStore });
  }
  if (!passwordOk(body.password)) {
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.json({ error: 'password' }, { status: 401, headers: noStore });
  }
  const action = body.action;
  if (action === 'check') return NextResponse.json(await readState().catch(() => ({ ids: [], index: -1, last: -1, v: 0 })), { headers: noStore });
  try {
    const s = await changeState((s) => {
      // From the backdrop, Next (or resume) goes back to the slide that was hidden, not to slide 1.
      if (action === 'next' || action === 'resume') s.index = s.index < 0 && s.last >= 0 ? s.last : action === 'next' ? Math.min(s.index + 1, s.ids.length - 1) : s.index;
      else if (action === 'prev') s.index = s.index < 0 ? -1 : s.index - 1;
      else if (action === 'backdrop') {
        if (s.index >= 0) s.last = s.index;
        s.index = -1;
      }
      else if (action === 'go' && typeof body.index === 'number') s.index = Math.trunc(body.index);
      return s;
    });
    return NextResponse.json(s, { headers: noStore });
  } catch (e) {
    console.error('live state write failed', e instanceof Error ? e.message : e);
    return NextResponse.json({ error: 'unavailable' }, { status: 503, headers: noStore });
  }
}
