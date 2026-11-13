import { NextResponse } from 'next/server';
import { confirm } from '@/lib/newsletter';
import { SITE_URL } from '@/lib/site';
import { PAGES, type Lang } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

/** The link in the confirmation email. */
export async function GET(req: Request) {
  const t = new URL(req.url).searchParams.get('t') ?? '';
  let lang: Lang | null = null;
  try {
    lang = t.length > 10 ? await confirm(t) : null;
  } catch (e) {
    console.error('newsletter confirm failed', e instanceof Error ? e.message : e);
  }
  return NextResponse.redirect(`${SITE_URL}${PAGES.newsletter[lang ?? 'en']}${lang ? 'confirmed' : 'expired'}/`, 303);
}
