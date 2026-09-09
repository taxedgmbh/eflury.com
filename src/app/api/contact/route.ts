import { NextResponse } from 'next/server';
import { z } from 'zod';
import { FieldValue } from 'firebase-admin/firestore';
import { firestore, COLLECTIONS } from '@/lib/server/firestore';
import { verifyTurnstile } from '@/lib/server/turnstile';
import { checkRateLimit } from '@/lib/server/ratelimit';
import { sendNotification } from '@/lib/server/mail';
import { signToken } from '@/lib/server/tokens';
import { SITE_URL, PERSON } from '@/lib/site';

/**
 * One handler for the three client-side forms the Astro site ran through
 * EmailJS: contact, newsletter and lead magnet.
 *
 * Two things change materially.
 *
 * Turnstile is now verified server-side. On the old site the widget rendered and
 * gated the submit button, but nothing ever called siteverify — a bot posting
 * directly to EmailJS was unaffected.
 *
 * Submissions are written to Firestore before anything is emailed, so a lead
 * survives a mail failure. EmailJS was fire-and-forget: a failed send was a lost
 * lead with no record anywhere.
 *
 * The EmailJS credentials are public in git history and need rotating whether or
 * not that service is kept.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const base = {
  turnstileToken: z.string().min(1).max(4000),
  // Honeypot: a real person leaves this empty. Bots that parse the form fill it.
  // Deliberately permissive — rejecting it in the schema would return 400 and
  // tell the bot it was detected. It is checked in the handler instead, which
  // answers 200 as though the submission had been accepted.
  website: z.string().max(400).optional(),
};

const schema = z.discriminatedUnion('type', [
  z.object({
    ...base,
    type: z.literal('contact'),
    name: z.string().trim().min(1).max(120),
    email: z.email().max(200),
    company: z.string().trim().max(160).optional(),
    phone: z.string().trim().max(60).optional(),
    message: z.string().trim().min(1).max(5000),
  }),
  z.object({
    ...base,
    type: z.literal('newsletter'),
    email: z.email().max(200),
  }),
  z.object({
    ...base,
    type: z.literal('lead-magnet'),
    email: z.email().max(200),
    name: z.string().trim().max(120).optional(),
    guide: z.string().trim().min(1).max(80),
  }),
]);

/** Lead magnets, keyed by the identifier the form sends. */
const GUIDES: Record<string, { file: string; label: string }> = {
  'eu-ai-act': { file: '/downloads/eflury-guide-eu-ai-act-de.pdf', label: 'EU AI Act' },
  'revdsg-ai': { file: '/downloads/eflury-guide-revdsg-ai-de.pdf', label: 'revDSG & KI' },
  'data-quality': { file: '/downloads/eflury-guide-data-quality-de.pdf', label: 'Datenqualität' },
  'implementation': {
    file: '/downloads/eflury-ai-implementation-guide-de.pdf',
    label: 'KI-Einführung',
  },
  'sample-audit': { file: '/downloads/eflury-sample-audit-report-de.pdf', label: 'Musterbericht' },
};

function json(body: unknown, status: number) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  let parsed;
  try {
    parsed = schema.safeParse(await request.json());
  } catch {
    return json({ error: 'Ungültige Anfrage.' }, 400);
  }
  if (!parsed.success) {
    return json({ error: 'Bitte prüfen Sie die Eingaben.' }, 400);
  }
  const data = parsed.data;

  // A filled honeypot is silently accepted so the bot does not learn it failed.
  if (data.website) return json({ ok: true }, 200);

  try {
    const limit = await checkRateLimit(request);
    if (!limit.allowed) {
      return json({ error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' }, 429);
    }
  } catch (error) {
    console.error('[contact] rate limiter unavailable', error);
  }

  const turnstile = await verifyTurnstile(data.turnstileToken, request);
  if (!turnstile.ok) {
    console.warn('[contact] turnstile rejected:', turnstile.reason);
    return json(
      {
        error:
          turnstile.reason === 'unavailable'
            ? 'Die Sicherheitsprüfung ist gerade nicht erreichbar. Bitte versuchen Sie es in einer Minute erneut.'
            : 'Die Sicherheitsprüfung ist fehlgeschlagen. Bitte laden Sie die Seite neu.',
      },
      403
    );
  }

  const db = firestore();
  const received = FieldValue.serverTimestamp();

  try {
    if (data.type === 'contact') {
      const ref = await db.collection(COLLECTIONS.contact).add({
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        message: data.message,
        receivedAt: received,
        source: 'website',
      });

      await sendNotification({
        subject: `Kontaktanfrage von ${data.name}`,
        replyTo: data.email,
        text: [
          `Name:    ${data.name}`,
          `E-Mail:  ${data.email}`,
          data.company ? `Firma:   ${data.company}` : null,
          data.phone ? `Telefon: ${data.phone}` : null,
          '',
          data.message,
          '',
          `Firestore: ${COLLECTIONS.contact}/${ref.id}`,
        ]
          .filter(Boolean)
          .join('\n'),
      });

      return json({ ok: true }, 200);
    }

    if (data.type === 'newsletter') {
      // Double opt-in is required under revDSG and GDPR: store unconfirmed and
      // only treat the address as subscribed once the signed link is followed.
      const id = Buffer.from(data.email.toLowerCase()).toString('base64url');
      await db
        .collection(COLLECTIONS.newsletter)
        .doc(id)
        .set(
          { email: data.email.toLowerCase(), confirmed: false, requestedAt: received },
          { merge: true }
        );

      const token = signToken(data.email.toLowerCase(), 7 * 24 * 60 * 60 * 1000);
      const confirmUrl = `${SITE_URL}/api/newsletter/confirm/?token=${encodeURIComponent(token)}`;

      await sendNotification({
        to: data.email,
        subject: 'Bitte bestätigen Sie Ihre Anmeldung',
        text: [
          'Sie haben sich für Aktualisierungen von eflury.com angemeldet.',
          '',
          'Bestätigen Sie die Anmeldung mit einem Klick:',
          confirmUrl,
          '',
          'Haben Sie das nicht angefordert, ignorieren Sie diese E-Mail — ohne Bestätigung wird nichts versendet.',
        ].join('\n'),
      });

      return json({ ok: true, pending: true }, 200);
    }

    // lead-magnet
    const guide = GUIDES[data.guide];
    if (!guide) return json({ error: 'Unbekannter Leitfaden.' }, 400);

    const ref = await db.collection(COLLECTIONS.leadRequests).add({
      email: data.email,
      name: data.name,
      guide: data.guide,
      receivedAt: received,
    });

    await sendNotification({
      subject: `Leitfaden angefordert: ${guide.label}`,
      replyTo: data.email,
      text: [
        `E-Mail:    ${data.email}`,
        data.name ? `Name:      ${data.name}` : null,
        `Leitfaden: ${guide.label}`,
        '',
        `Firestore: ${COLLECTIONS.leadRequests}/${ref.id}`,
      ]
        .filter(Boolean)
        .join('\n'),
    });

    return json({ ok: true, download: guide.file }, 200);
  } catch (error) {
    console.error('[contact] submission failed', error);
    return json(
      { error: `Das hat nicht geklappt. Schreiben Sie direkt an ${PERSON.email}.` },
      500
    );
  }
}

export async function GET() {
  return json({ error: 'Method not allowed' }, 405);
}
