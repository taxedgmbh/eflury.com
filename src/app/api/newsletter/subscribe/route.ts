import { NextResponse } from 'next/server';
import { clientIp, normaliseEmail, subscribe } from '@/lib/newsletter';
import { SITE_URL } from '@/lib/site';
import { PAGES, type Lang } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

const statusUrl = (lang: Lang, status: string) => `${SITE_URL}${PAGES.newsletter[lang]}${status}/`;

/** POST from the sign-up form (application/x-www-form-urlencoded). */
export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.redirect(statusUrl('en', 'invalid'), 303);
  }
  const lang: Lang = form.get('lang') === 'de' ? 'de' : 'en';
  const go = (status: string) => NextResponse.redirect(statusUrl(lang, status), 303);
  if (process.env.NEXT_PUBLIC_NEWSLETTER !== 'on') return go('error');
  // Honeypot: people never see this field. Pretend it worked.
  if (form.get('website')) return go('check-email');
  const email = normaliseEmail(form.get('email'));
  if (!email) return go('invalid');
  try {
    return go(await subscribe(email, clientIp(req.headers), lang));
  } catch (e) {
    console.error('newsletter subscribe failed', e instanceof Error ? e.message : e);
    return go('error');
  }
}
