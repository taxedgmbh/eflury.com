#!/usr/bin/env node
/*
 * Sends a published note to the newsletter subscribers.
 *
 *   node scripts/newsletter-send.mjs <note>           dry run: shows subject and recipient count
 *   node scripts/newsletter-send.mjs de/<note> ...    a German note, sent to German subscribers
 *   node scripts/newsletter-send.mjs fr/<note> ...    a French note, sent to French subscribers
 *   node scripts/newsletter-send.mjs <note> --test    sends only to me@eflury.com
 *   node scripts/newsletter-send.mjs <note> --send    sends to every confirmed subscriber
 *
 * <note> is the file name in content/notes/ (or content/notes/de/, content/notes/fr/) without ".md".
 * Each subscriber only gets notes in the language they signed up in. The note must be
 * published (no draft: true) and live on eflury.com. A note is only sent once;
 * the send is recorded in Firestore (newsletter_sends/<note>).
 *
 * Access goes through gcloud with the private account only
 * (eaflury@gmail.com): Firestore over REST and the SMTP login from Secret
 * Manager. Nothing is stored on this machine.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import nodemailer from 'nodemailer';

const ACCOUNT = 'eaflury@gmail.com';
const PROJECT = 'eflury-com-prod';
const SITE = 'https://eflury.com';
const FROM = 'Emanuel Flury <me@eflury.com>';
const TEST_TO = 'me@eflury.com';
const FS = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;

const [slug, mode = '--dry-run'] = process.argv.slice(2);
if (!slug || !['--dry-run', '--test', '--send'].includes(mode)) {
  console.error('Usage: node scripts/newsletter-send.mjs <note> [--test | --send]');
  process.exit(1);
}

const gcloud = (...args) =>
  execFileSync('gcloud', [...args, `--account=${ACCOUNT}`, `--project=${PROJECT}`], { encoding: 'utf8' }).trim();
const token = gcloud('auth', 'print-access-token');
async function api(url, init = {}) {
  const res = await fetch(url, { ...init, headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });
  if (!res.ok && res.status !== 404) throw new Error(`${res.status} ${await res.text()}`);
  return res.status === 404 ? null : res.json();
}

// The note
const lang = slug.startsWith('de/') ? 'de' : slug.startsWith('fr/') ? 'fr' : 'en';
const name = slug.replace(/^(de|fr)\//, '');
const T = {
  en: { html: 'en', read: 'Read the note', kicker: 'New note', why: 'You receive this because you subscribed to new notes on eflury.com.', unsub: 'Unsubscribe' },
  de: { html: 'de-CH', read: 'Notiz lesen', kicker: 'Neue Notiz', why: 'Sie erhalten dieses E-Mail, weil Sie neue Notizen auf eflury.com abonniert haben.', unsub: 'Abmelden' },
  fr: { html: 'fr-CH', read: 'Lire la note', kicker: 'Nouvelle note', why: 'Vous recevez cet e-mail parce que vous êtes abonné aux nouvelles notes sur eflury.com.', unsub: 'Se désabonner' },
}[lang];
const file = path.join(process.cwd(), 'content', 'notes', ...(lang === 'en' ? [] : [lang]), `${name}.md`);
const { data } = matter(fs.readFileSync(file, 'utf8'));
if (data.draft) throw new Error(`${slug} is still a draft`);
const url = `${SITE}${{ en: '/en/notes/', de: '/de/notizen/', fr: '/fr/notes/' }[lang]}${name}/`;
const live = await fetch(url, { method: 'HEAD', redirect: 'manual' });
if (live.status !== 200) throw new Error(`${url} answers ${live.status}; push and wait for the deploy first`);

// Sent before?
const sendId = `${lang}-${name}`;
const sendRef = `${FS}/newsletter_sends/${encodeURIComponent(sendId)}`;
if (mode === '--send' && (await api(sendRef))) throw new Error(`${slug} was already sent`);

// Recipients
let recipients;
if (mode === '--test') {
  recipients = [{ email: TEST_TO, unsubToken: 'test-link-does-nothing' }];
} else {
  const rows = await api(`${FS}:runQuery`, {
    method: 'POST',
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: 'subscribers' }],
        where: { fieldFilter: { field: { fieldPath: 'status' }, op: 'EQUAL', value: { stringValue: 'confirmed' } } },
      },
    }),
  });
  recipients = rows
    .filter((r) => r.document)
    // Sign-ups from before the German site have no lang field: English.
    .filter((r) => (r.document.fields.lang?.stringValue ?? 'en') === lang)
    .map((r) => ({ email: r.document.fields.email.stringValue, unsubToken: r.document.fields.unsubToken.stringValue }));
}

const subject = data.title;
console.log(`Note:       ${data.title}\nURL:        ${url}\nRecipients: ${recipients.length} (${mode})`);
if (mode === '--dry-run') process.exit(0);

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
function render(unsubUrl) {
  const text = [
    data.title,
    '',
    data.description,
    '',
    `${T.read}: ${url}`,
    '',
    '—',
    'Emanuel Flury',
    `${SITE}/${lang}/`,
    '',
    T.why,
    `${T.unsub}: ${unsubUrl}`,
  ].join('\n');
  const html = `<!doctype html><html lang="${T.html}"><body style="margin:0;padding:24px;background:#f4f6f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#022554">
<table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px"><tr><td style="padding:32px">
<p style="margin:0 0 8px;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#1477b0;font-weight:700">${T.kicker}</p>
<h1 style="margin:0 0 12px;font-size:24px;line-height:1.25">${esc(data.title)}</h1>
<p style="margin:0 0 24px;font-size:17px;line-height:1.6;color:#33475b">${esc(data.description)}</p>
<a href="${url}" style="display:inline-block;padding:14px 28px;border-radius:999px;background:#096b62;color:#fff;text-decoration:none;font-weight:600">${T.read}</a>
<p style="margin:32px 0 0;font-size:15px;line-height:1.6">Emanuel Flury<br><a href="${SITE}/${lang}/" style="color:#1477b0">eflury.com</a></p>
</td></tr></table>
<p style="max-width:560px;margin:16px auto 0;font-size:12px;line-height:1.6;color:#5b6b7b;text-align:center">${T.why}<br><a href="${unsubUrl}" style="color:#5b6b7b">${T.unsub}</a></p>
</body></html>`;
  return { text, html };
}

const user = gcloud('secrets', 'versions', 'access', 'latest', '--secret=newsletter-smtp-user');
const pass = gcloud('secrets', 'versions', 'access', 'latest', '--secret=newsletter-smtp-pass');
const mail = nodemailer.createTransport({ host: 'smtp.mail.me.com', port: 587, secure: false, requireTLS: true, auth: { user, pass } });

let sent = 0;
for (const r of recipients) {
  const unsubUrl = `${SITE}/api/newsletter/unsubscribe/?t=${encodeURIComponent(r.unsubToken)}${lang === 'en' ? '' : `&l=${lang}`}`;
  try {
    await mail.sendMail({
      from: FROM,
      to: r.email,
      subject,
      ...render(unsubUrl),
      list: { unsubscribe: { url: unsubUrl, comment: 'Unsubscribe' } },
      headers: { 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' },
    });
    sent++;
    console.log(`sent ${sent}/${recipients.length}`);
  } catch (e) {
    console.error(`failed: ${r.email.replace(/^(.).*@/, '$1…@')} ${e.message}`);
  }
  // iCloud Mail allows roughly 1,000 recipients a day; stay slow and steady.
  await new Promise((ok) => setTimeout(ok, 1500));
}

if (mode === '--send') {
  await api(`${FS}/newsletter_sends?documentId=${encodeURIComponent(sendId)}`, {
    method: 'POST',
    body: JSON.stringify({
      fields: { sentAt: { timestampValue: new Date().toISOString() }, recipients: { integerValue: String(sent) } },
    }),
  });
}
console.log(`Done: ${sent} of ${recipients.length} sent.`);
