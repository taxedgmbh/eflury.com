import { NextResponse } from 'next/server';
import { asLang, unsubscribe } from '@/lib/newsletter';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-dynamic';

const tokenOf = (req: Request) => new URL(req.url).searchParams.get('t') ?? '';
const langOf = (req: Request) => asLang(new URL(req.url).searchParams.get('l'));
const TEXT = {
  en: { html: 'en', title: 'Unsubscribe', text: 'Stop receiving new notes from Emanuel Flury by email? Your address is deleted straight away.', back: 'Back to eflury.com' },
  de: { html: 'de-CH', title: 'Abmelden', text: 'Keine neuen Notizen von Emanuel Flury mehr per E-Mail erhalten? Ihre Adresse wird sofort gelöscht.', back: 'Zurück zu eflury.com' },
  fr: { html: 'fr-CH', title: 'Se désabonner', text: 'Ne plus recevoir par e-mail les nouvelles notes d’Emanuel Flury ? Votre adresse est supprimée immédiatement.', back: 'Retour à eflury.com' },
};
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);

/*
 * GET only shows a confirm button: mail security scanners open every link in
 * an email, and a GET that deleted the subscription would unsubscribe people
 * who never clicked. The button POSTs back here.
 */
export function GET(req: Request) {
  const t = tokenOf(req);
  const lang = langOf(req);
  const x = TEXT[lang];
  const html = `<!doctype html>
<html lang="${x.html}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>${x.title} · Emanuel Flury</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#022554;color:#fefefe;font:17px/1.6 system-ui,-apple-system,sans-serif}
main{max-width:30rem;padding:24px}h1{font-size:1.75rem;margin:0 0 8px}p{opacity:.85}
button{min-height:52px;padding:0 32px;border:0;border-radius:999px;background:#096b62;color:#fefefe;font:600 17px system-ui,-apple-system,sans-serif;cursor:pointer}
a{color:#2dd4bf}</style></head>
<body><main><h1>${x.title}</h1><p>${x.text}</p>
<form method="post" action="/api/newsletter/unsubscribe/?t=${esc(encodeURIComponent(t))}${lang === 'en' ? '' : `&amp;l=${lang}`}"><input type="hidden" name="confirm" value="1"><button type="submit">${x.title}</button></form>
<p><a href="${SITE_URL}/${lang}/">${x.back}</a></p></main></body></html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
}

/**
 * The button above (form field confirm=1, answered with a redirect), or the
 * mail client's one-click unsubscribe (RFC 8058, answered with 200).
 */
export async function POST(req: Request) {
  let fromPage = false;
  try {
    fromPage = (await req.formData()).get('confirm') === '1';
  } catch {
    /* one-click bodies may be empty */
  }
  try {
    const t = tokenOf(req);
    if (t.length > 10) await unsubscribe(t);
  } catch (e) {
    console.error('newsletter unsubscribe failed', e instanceof Error ? e.message : e);
    return fromPage
      ? NextResponse.redirect(`${SITE_URL}/${langOf(req)}/newsletter/error/`, 303)
      : new Response(null, { status: 500 });
  }
  return fromPage
    ? NextResponse.redirect(`${SITE_URL}/${langOf(req)}/newsletter/unsubscribed/`, 303)
    : new Response(null, { status: 200 });
}
