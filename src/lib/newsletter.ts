import { createHash, randomBytes } from 'node:crypto';
import { FieldValue, Firestore, Timestamp } from '@google-cloud/firestore';
import nodemailer from 'nodemailer';
import { SITE_URL } from './site';
import type { Lang } from './i18n';

/*
 * Newsletter, kept in-house:
 *   - subscribers live in Firestore, project eflury-com-prod, database (default),
 *     region europe-west6 (Zurich), collection "subscribers";
 *   - mail goes out from me@eflury.com through iCloud Mail (SMTP);
 *   - double opt-in: a sign-up is "pending" until the link in the confirmation
 *     email is clicked. Pending sign-ups carry expireAt, and a Firestore TTL
 *     policy deletes them after 7 days. Unsubscribing deletes the document.
 *
 * Document id = sha256(email), so one address can only exist once.
 * No IP address is stored; rate limiting uses a hash of IP and date that expires
 * after two days.
 */

export const db = new Firestore({ projectId: 'eflury-com-prod', ignoreUndefinedProperties: true });
export const SUBSCRIBERS = db.collection('subscribers');
const LIMITS = db.collection('ratelimits');

const DAY = 24 * 60 * 60 * 1000;
const PENDING_DAYS = 7;
const PER_IP_PER_DAY = 5;
const GLOBAL_PER_DAY = 200;
const RESEND_AFTER_MS = 10 * 60 * 1000;

export type Subscriber = {
  email: string;
  /** Language of the emails: the page the person signed up on. */
  lang: Lang;
  status: 'pending' | 'confirmed';
  createdAt: Timestamp;
  confirmedAt?: Timestamp;
  /** sha256 of the token in the confirmation link; removed on confirmation. */
  confirmHash?: string;
  /** Token in every unsubscribe link. Only good for unsubscribing. */
  unsubToken: string;
  lastMailAt?: Timestamp;
  /** TTL: set while pending, removed on confirmation. */
  expireAt?: Timestamp;
};

export const sha256 = (s: string) => createHash('sha256').update(s).digest('hex');
const token = () => randomBytes(24).toString('base64url');

export function normaliseEmail(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const email = raw.trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return null;
  return email;
}

/** Counts a request against the per-IP and global daily caps. false = over the limit. */
async function withinLimits(ip: string): Promise<boolean> {
  const day = new Date().toISOString().slice(0, 10);
  const expireAt = Timestamp.fromMillis(Date.now() + 2 * DAY);
  const ipRef = LIMITS.doc(`ip-${sha256(`${day}:${ip}`)}`);
  const allRef = LIMITS.doc(`all-${day}`);
  return db.runTransaction(async (tx) => {
    const [ipSnap, allSnap] = await Promise.all([tx.get(ipRef), tx.get(allRef)]);
    const ipCount = (ipSnap.get('count') as number | undefined) ?? 0;
    const allCount = (allSnap.get('count') as number | undefined) ?? 0;
    if (ipCount >= PER_IP_PER_DAY || allCount >= GLOBAL_PER_DAY) return false;
    tx.set(ipRef, { count: FieldValue.increment(1), expireAt }, { merge: true });
    tx.set(allRef, { count: FieldValue.increment(1), expireAt }, { merge: true });
    return true;
  });
}

let transport: nodemailer.Transporter | undefined;
export function mailer() {
  const user = process.env.NEWSLETTER_SMTP_USER?.trim();
  const pass = process.env.NEWSLETTER_SMTP_PASS?.trim();
  if (!user || !pass) throw new Error('NEWSLETTER_SMTP_USER / NEWSLETTER_SMTP_PASS not set');
  transport ??= nodemailer.createTransport({
    host: 'smtp.mail.me.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: { user, pass },
  });
  return transport;
}

export const FROM = 'Emanuel Flury <me@eflury.com>';
export const unsubscribeUrl = (t: string) => `${SITE_URL}/api/newsletter/unsubscribe/?t=${encodeURIComponent(t)}`;

/*
 * Confirmation email: branded HTML (navy header with the EF mark, one clear
 * button, who sends it and why) plus a plain-text part. The link is shown in
 * full only as a small fallback, so the mail reads like a personal note, not a
 * raw token.
 */
type ConfirmCopy = {
  html: string;
  subject: string;
  preheader: string;
  hello: string;
  body: string;
  button: string;
  fallback: string;
  ignore: string;
  sign: string[];
  role: string;
  footer: string;
  imprint: string;
  privacy: string;
};
const CONFIRM_COPY: Record<Lang, ConfirmCopy> = {
  en: {
    html: 'en',
    subject: 'Confirm your subscription to Emanuel Flury’s notes',
    preheader: 'One click and you will get my new notes by email.',
    hello: 'Hello,',
    body: 'Thank you for signing up on eflury.com. Please confirm with one click that you want to receive my new notes on entrepreneurship, tax and technology by email.',
    button: 'Confirm subscription',
    fallback: 'If the button does not work, copy this link into your browser:',
    ignore: `Did not sign up? Then simply ignore this email: nothing will be sent and your address is deleted automatically after ${PENDING_DAYS} days.`,
    sign: ['Best regards', 'Emanuel Flury'],
    role: 'Entrepreneur · Skopa AG · Taxed GmbH · EF Real Estate',
    footer: 'You receive this one-off email because this address was entered in the newsletter form on eflury.com.',
    imprint: 'Imprint',
    privacy: 'Privacy',
  },
  de: {
    html: 'de-CH',
    subject: 'Bitte bestätigen Sie Ihr Abonnement der Notizen von Emanuel Flury',
    preheader: 'Ein Klick, und Sie erhalten meine neuen Notizen per E-Mail.',
    hello: 'Guten Tag',
    body: 'Vielen Dank für Ihre Anmeldung auf eflury.com. Bitte bestätigen Sie mit einem Klick, dass Sie meine neuen Notizen zu Unternehmertum, Steuern und Technologie per E-Mail erhalten möchten.',
    button: 'Abonnement bestätigen',
    fallback: 'Falls die Schaltfläche nicht funktioniert, kopieren Sie diesen Link in Ihren Browser:',
    ignore: `Sie haben sich nicht angemeldet? Dann ignorieren Sie dieses E-Mail einfach: Es wird nichts verschickt, und Ihre Adresse wird nach ${PENDING_DAYS} Tagen automatisch gelöscht.`,
    sign: ['Freundliche Grüsse', 'Emanuel Flury'],
    role: 'Unternehmer · Skopa AG · Taxed GmbH · EF Real Estate',
    footer: 'Sie erhalten dieses einmalige E-Mail, weil diese Adresse im Newsletter-Formular auf eflury.com eingegeben wurde.',
    imprint: 'Impressum',
    privacy: 'Datenschutz',
  },
  fr: {
    html: 'fr-CH',
    subject: 'Veuillez confirmer votre abonnement aux notes d’Emanuel Flury',
    preheader: 'Un clic et vous recevrez mes nouvelles notes par e-mail.',
    hello: 'Bonjour,',
    body: 'Merci pour votre inscription sur eflury.com. Veuillez confirmer d’un clic que vous souhaitez recevoir par e-mail mes nouvelles notes sur l’entrepreneuriat, la fiscalité et la technologie.',
    button: 'Confirmer l’abonnement',
    fallback: 'Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :',
    ignore: `Vous ne vous êtes pas inscrit·e ? Ignorez simplement cet e-mail : rien ne vous sera envoyé et votre adresse sera supprimée automatiquement après ${PENDING_DAYS} jours.`,
    sign: ['Meilleures salutations', 'Emanuel Flury'],
    role: 'Entrepreneur · Skopa AG · Taxed GmbH · EF Real Estate',
    footer: 'Vous recevez cet e-mail unique parce que cette adresse a été saisie dans le formulaire de la newsletter sur eflury.com.',
    imprint: 'Mentions légales',
    privacy: 'Confidentialité',
  },
};

const LEGAL: Record<Lang, [string, string]> = {
  en: ['/en/imprint/', '/en/privacy/'],
  de: ['/de/impressum/', '/de/datenschutz/'],
  fr: ['/fr/mentions-legales/', '/fr/confidentialite/'],
};

function confirmMail(lang: Lang, link: string) {
  const c = CONFIRM_COPY[lang];
  const [imp, priv] = LEGAL[lang];
  const home = `${SITE_URL}/${lang}/`;
  const text = [
    c.hello,
    '',
    c.body,
    '',
    `${c.button}: ${link}`,
    '',
    c.ignore,
    '',
    ...c.sign,
    c.role,
    home,
    '',
    '—',
    c.footer,
    `${c.imprint}: ${SITE_URL}${imp}`,
  ].join('\n');
  const font = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
  const html = `<!doctype html>
<html lang="${c.html}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${c.subject}</title></head>
<body style="margin:0;padding:0;background:#eef2f7">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${c.preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f7"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:14px;overflow:hidden;font-family:${font}">
<tr><td style="background:#022554;padding:22px 32px">
<table role="presentation" cellpadding="0" cellspacing="0"><tr>
<td style="padding-right:12px"><img src="${SITE_URL}/images/email/ef-mark-white.png" width="40" height="32" alt="EF" style="display:block;border:0"></td>
<td style="font-family:${font};color:#ffffff;font-size:18px;font-weight:800;letter-spacing:.06em">EMANUEL FLURY</td>
</tr></table>
</td></tr>
<tr><td style="padding:32px 32px 8px;color:#022554;font-size:16px;line-height:1.6">
<p style="margin:0 0 16px">${c.hello}</p>
<p style="margin:0 0 28px;color:#33475b">${c.body}</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 28px"><tr><td style="border-radius:999px;background:#096b62">
<a href="${link}" style="display:inline-block;padding:14px 30px;font-family:${font};font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px">${c.button}</a>
</td></tr></table>
<p style="margin:0 0 24px;font-size:14px;color:#5b6b7b">${c.ignore}</p>
<p style="margin:0 0 4px">${c.sign[0]}</p>
<p style="margin:0;font-weight:700">${c.sign[1]}</p>
<p style="margin:0 0 24px;font-size:14px;color:#5b6b7b">${c.role}<br><a href="${home}" style="color:#1477b0;text-decoration:none">eflury.com</a></p>
</td></tr>
<tr><td style="padding:16px 32px 24px;border-top:1px solid #e3e9f0;font-size:12px;line-height:1.6;color:#7a8794">
${c.fallback}<br><a href="${link}" style="color:#1477b0;word-break:break-all">${link}</a>
</td></tr>
</table>
<p style="max-width:560px;margin:16px auto 0;font-family:${font};font-size:12px;line-height:1.6;color:#7a8794">${c.footer}<br>
<a href="${SITE_URL}${imp}" style="color:#7a8794">${c.imprint}</a> · <a href="${SITE_URL}${priv}" style="color:#7a8794">${c.privacy}</a></p>
</td></tr></table>
</body></html>`;
  return { subject: c.subject, text, html };
}

export const asLang = (v: unknown): Lang => (v === 'de' || v === 'fr' ? v : 'en');

/**
 * Handles a sign-up. Returns the status page to show. Never reveals whether an
 * address is already subscribed: every valid request ends on "check-email".
 */
export async function subscribe(email: string, ip: string, lang: Lang = 'en'): Promise<'check-email' | 'limit'> {
  const ref = SUBSCRIBERS.doc(sha256(email));
  const snap = await ref.get();
  const existing = snap.exists ? (snap.data() as Subscriber) : undefined;

  if (existing?.status === 'confirmed') return 'check-email';
  if (existing?.lastMailAt && Date.now() - existing.lastMailAt.toMillis() < RESEND_AFTER_MS) return 'check-email';
  if (!(await withinLimits(ip))) return 'limit';

  const confirm = token();
  const now = Timestamp.now();
  const doc: Subscriber = {
    email,
    lang,
    status: 'pending',
    createdAt: existing?.createdAt ?? now,
    confirmHash: sha256(confirm),
    unsubToken: existing?.unsubToken ?? token(),
    lastMailAt: now,
    expireAt: Timestamp.fromMillis(Date.now() + PENDING_DAYS * DAY),
  };
  await ref.set(doc);

  const link = `${SITE_URL}/api/newsletter/confirm/?t=${encodeURIComponent(confirm)}`;
  const mail = confirmMail(lang, link);
  try {
    await mailer().sendMail({ from: FROM, to: email, subject: mail.subject, text: mail.text, html: mail.html });
  } catch (e) {
    // the mail did not go out: clear the cooldown so the next try sends again
    await ref.update({ lastMailAt: FieldValue.delete() }).catch(() => {});
    throw e;
  }
  return 'check-email';
}

/** Confirms a sign-up. Returns its language, or null if the link is invalid or used. */
export async function confirm(t: string): Promise<Lang | null> {
  const q = await SUBSCRIBERS.where('confirmHash', '==', sha256(t)).limit(1).get();
  const snap = q.docs[0];
  if (!snap || snap.get('status') !== 'pending') return null;
  await snap.ref.update({
    status: 'confirmed',
    confirmedAt: Timestamp.now(),
    confirmHash: FieldValue.delete(),
    expireAt: FieldValue.delete(),
  });
  return asLang(snap.get('lang'));
}

/** Deletes the subscriber. true even if the token is unknown (already gone). */
export async function unsubscribe(t: string): Promise<void> {
  const q = await SUBSCRIBERS.where('unsubToken', '==', t).limit(1).get();
  await Promise.all(q.docs.map((d) => d.ref.delete()));
}

/** First address in X-Forwarded-For (set by Google's front end), for rate limiting only. */
export function clientIp(headers: Headers): string {
  return headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}
