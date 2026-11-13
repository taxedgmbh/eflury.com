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
  const user = process.env.NEWSLETTER_SMTP_USER;
  const pass = process.env.NEWSLETTER_SMTP_PASS;
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

const CONFIRM_MAIL: Record<Lang, (link: string) => { subject: string; lines: string[] }> = {
  en: (link) => ({
    subject: 'Please confirm your subscription',
    lines: [
      'Hello,',
      '',
      'Please confirm that you would like to receive new notes from Emanuel Flury by email:',
      '',
      link,
      '',
      `If you did not sign up, simply ignore this email. Your address will be deleted automatically after ${PENDING_DAYS} days.`,
      '',
      'Emanuel Flury',
      `${SITE_URL}/en/`,
    ],
  }),
  de: (link) => ({
    subject: 'Bitte bestätigen Sie Ihr Abonnement',
    lines: [
      'Guten Tag',
      '',
      'Bitte bestätigen Sie, dass Sie neue Notizen von Emanuel Flury per E-Mail erhalten möchten:',
      '',
      link,
      '',
      `Falls Sie sich nicht angemeldet haben, ignorieren Sie dieses E-Mail einfach. Ihre Adresse wird nach ${PENDING_DAYS} Tagen automatisch gelöscht.`,
      '',
      'Freundliche Grüsse',
      'Emanuel Flury',
      `${SITE_URL}/de/`,
    ],
  }),
  fr: (link) => ({
    subject: 'Veuillez confirmer votre abonnement',
    lines: [
      'Bonjour,',
      '',
      'Veuillez confirmer que vous souhaitez recevoir par e-mail les nouvelles notes d’Emanuel Flury :',
      '',
      link,
      '',
      `Si vous n’avez pas demandé cette inscription, ignorez simplement cet e-mail. Votre adresse sera supprimée automatiquement après ${PENDING_DAYS} jours.`,
      '',
      'Meilleures salutations',
      'Emanuel Flury',
      `${SITE_URL}/fr/`,
    ],
  }),
};

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
  const mail = CONFIRM_MAIL[lang](link);
  await mailer().sendMail({ from: FROM, to: email, subject: mail.subject, text: mail.lines.join('\n') });
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
