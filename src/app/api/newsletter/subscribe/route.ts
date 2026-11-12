import { NextResponse } from 'next/server';
import { clientIp, normaliseEmail, subscribe } from '@/lib/newsletter';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-dynamic';

const go = (status: string) => NextResponse.redirect(`${SITE_URL}/en/newsletter/${status}/`, 303);

/** POST from the sign-up form (application/x-www-form-urlencoded). */
export async function POST(req: Request) {
  if (process.env.NEXT_PUBLIC_NEWSLETTER !== 'on') return go('error');
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return go('invalid');
  }
  // Honeypot: people never see this field. Pretend it worked.
  if (form.get('website')) return go('check-email');
  const email = normaliseEmail(form.get('email'));
  if (!email) return go('invalid');
  try {
    return go(await subscribe(email, clientIp(req.headers)));
  } catch (e) {
    console.error('newsletter subscribe failed', e instanceof Error ? e.message : e);
    return go('error');
  }
}
