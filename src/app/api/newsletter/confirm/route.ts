import { NextResponse } from 'next/server';
import { confirm } from '@/lib/newsletter';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-dynamic';

/** The link in the confirmation email. */
export async function GET(req: Request) {
  const t = new URL(req.url).searchParams.get('t') ?? '';
  let ok = false;
  try {
    ok = t.length > 10 && (await confirm(t));
  } catch (e) {
    console.error('newsletter confirm failed', e instanceof Error ? e.message : e);
  }
  return NextResponse.redirect(`${SITE_URL}/en/newsletter/${ok ? 'confirmed' : 'expired'}/`, 303);
}
