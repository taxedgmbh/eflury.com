import { NextResponse } from 'next/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { timingSafeEqual } from 'node:crypto';
import { z } from 'zod';
import { FieldValue } from 'firebase-admin/firestore';
import { firestore, COLLECTIONS } from '@/lib/server/firestore';
import { sendNotification } from '@/lib/server/mail';
import { serverEnv } from '@/lib/server/env';
import {
  signOffer,
  verifyOffer,
  offerDocId,
  LINK_TTL_MS,
  AGB,
  AGB_VERSION,
  type Offer,
} from '@/lib/server/offer';
import { SITE_URL, PERSON, ADDRESS } from '@/lib/site';

/**
 * Offer acceptance, ported from accept.php.
 *
 * This is a legally meaningful flow rather than a marketing form, so the port is
 * conservative: the signing scheme is byte-compatible (links already in a
 * client's inbox keep working), the evidence record captures the same fields,
 * and acceptance stays idempotent so a double submit cannot produce a second
 * record.
 *
 * The evidence record deliberately retains the IP address and User-Agent in
 * full. Elsewhere — the rate limiter — IPs are salted and hashed for privacy;
 * here the whole point is to be able to show who accepted what and when, so
 * retention is the purpose rather than a side effect.
 *
 * It also stays bilingual. The marketing site is German-only, but English-
 * speaking clients sign contracts too, and the accepted AGB/GTC version is
 * pinned per language.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const offerFields = z.object({
  nr: z.string().trim().min(1).max(300),
  titel: z.string().trim().min(1).max(300),
  betrag: z.string().trim().min(1).max(300),
  email: z.email().max(300),
  firma: z.string().trim().min(1).max(300),
  lang: z.enum(['de', 'en']).default('de'),
  exp: z.coerce.number().int().positive(),
});

function json(body: unknown, status: number) {
  return NextResponse.json(body, { status });
}

/** "|" would make the signed canonical string ambiguous. */
function hasSeparator(o: Offer): boolean {
  return [o.nr, o.titel, o.betrag, o.email, o.firma].some((v) => v.includes('|'));
}

function parseOffer(source: Record<string, unknown>) {
  const parsed = offerFields.safeParse(source);
  if (!parsed.success) return null;
  const offer = parsed.data as Offer;
  return hasSeparator(offer) ? null : offer;
}

/** Admin-key check for link minting, compared in constant time. */
function adminAuthorised(supplied: string | undefined): boolean {
  const expected = process.env.ACCEPT_ADMIN_KEY;
  if (!expected || !supplied) return false;
  const a = Buffer.from(supplied);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get('action') !== 'view') {
    return json({ error: 'action', message: 'Unknown action.' }, 400);
  }

  const offer = parseOffer(Object.fromEntries(url.searchParams.entries()));
  if (!offer) return json({ error: 'validation', message: 'Ungültige Offertdaten.' }, 400);

  const signature = url.searchParams.get('sig') ?? '';
  if (!verifyOffer(offer, signature)) {
    return json({ error: 'signature', message: 'Ungültiger oder veränderter Link.' }, 403);
  }
  if (offer.exp * 1000 < Date.now()) {
    return json({ error: 'expired', message: 'Dieser Link ist abgelaufen.' }, 410);
  }

  let already = false;
  try {
    already = (
      await firestore().collection(COLLECTIONS.acceptances).doc(offerDocId(offer.nr)).get()
    ).exists;
  } catch (error) {
    console.error('[accept] lookup failed', error);
  }

  return json(
    {
      ok: true,
      offer: {
        nr: offer.nr,
        titel: offer.titel,
        betrag: offer.betrag,
        email: offer.email,
        firma: offer.firma,
        lang: offer.lang,
        agb_version: AGB_VERSION,
        agb_url: AGB[offer.lang].url,
        already_accepted: already,
      },
    },
    200
  );
}

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  if (!form) return json({ error: 'validation', message: 'Ungültige Anfrage.' }, 400);
  const body = Object.fromEntries(form.entries()) as Record<string, string>;

  // ---- mint a signed link (owner only) ----------------------------------
  if (body.action === 'link') {
    if (!adminAuthorised(body.admin_key)) {
      return json({ error: 'auth', message: 'Invalid admin key.' }, 403);
    }
    const offer = parseOffer({ ...body, exp: Math.floor((Date.now() + LINK_TTL_MS) / 1000) });
    if (!offer) return json({ error: 'validation', message: 'Ungültige Offertdaten.' }, 400);

    const params = new URLSearchParams({
      nr: offer.nr,
      titel: offer.titel,
      betrag: offer.betrag,
      email: offer.email,
      firma: offer.firma,
      lang: offer.lang,
      exp: String(offer.exp),
      sig: signOffer(offer),
    });
    const page = offer.lang === 'en' ? '/offer/' : '/offerte/';
    return json(
      {
        ok: true,
        url: `${SITE_URL}${page}?${params}`,
        valid_until: new Date(offer.exp * 1000).toISOString().slice(0, 10),
      },
      200
    );
  }

  if (body.action !== 'accept') {
    return json({ error: 'action', message: 'Unknown action.' }, 400);
  }

  // Honeypot: report success and record nothing, as accept.php did.
  if (body.website) return json({ ok: true }, 200);

  const offer = parseOffer(body);
  if (!offer) return json({ error: 'validation', message: 'Ungültige Offertdaten.' }, 400);

  const signature = body.sig ?? '';
  if (!verifyOffer(offer, signature)) {
    return json({ error: 'signature', message: 'Ungültiger oder veränderter Link.' }, 403);
  }
  if (offer.exp * 1000 < Date.now()) {
    return json({ error: 'expired', message: 'Dieser Link ist abgelaufen.' }, 410);
  }

  const name = (body.name ?? '').trim();
  const funktion = (body.funktion ?? '').trim();
  if (!name || name.length > 200 || funktion.length > 200) {
    return json({ error: 'validation', message: 'Name ist erforderlich.' }, 400);
  }
  // Both confirmations are substantive: terms accepted, and authority to sign.
  if (body.agb !== '1' || body.vollmacht !== '1') {
    return json({ error: 'validation', message: 'Beide Bestätigungen sind erforderlich.' }, 400);
  }

  const acceptedAt = new Date().toISOString();
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unbekannt';
  const userAgent = (request.headers.get('user-agent') ?? 'unbekannt').slice(0, 300);

  const record = [
    'OFFERT-ANNAHME / OFFER ACCEPTANCE',
    `Zeitpunkt: ${acceptedAt}`,
    `Offerte: ${offer.nr} — ${offer.titel}`,
    `Betrag: ${offer.betrag}`,
    `Firma: ${offer.firma}`,
    `Akzeptiert durch: ${name}${funktion ? ` (${funktion})` : ''}`,
    `E-Mail (Offert-Empfänger): ${offer.email}`,
    `AGB-Version: ${AGB_VERSION} (${AGB[offer.lang].url})`,
    'Bestätigungen: AGB gelesen und akzeptiert; Handlungsberechtigung bestätigt',
    `IP: ${ip}`,
    `User-Agent: ${userAgent}`,
    `Link-Signatur: ${signature}`,
  ].join('\n');

  const docRef = firestore().collection(COLLECTIONS.acceptances).doc(offerDocId(offer.nr));

  try {
    // create() throws if the document exists, which is the idempotency guard —
    // accept.php used a marker file for the same purpose. A second submit must
    // not produce a second acceptance of the same offer.
    await docRef.create({
      offer,
      acceptedBy: { name, funktion: funktion || null },
      agbVersion: AGB_VERSION,
      agbUrl: AGB[offer.lang].url,
      confirmations: { agb: true, vollmacht: true },
      evidence: { ip, userAgent, signature, acceptedAt },
      record,
      createdAt: FieldValue.serverTimestamp(),
    });
  } catch (error) {
    const code = (error as { code?: number | string }).code;
    if (code === 6 || code === 'already-exists') {
      return json({ ok: true, already: true }, 200);
    }
    console.error('[accept] could not record acceptance', error);
    return json(
      { error: 'server', message: `Bitte melden Sie sich bei ${PERSON.email}.` },
      500
    );
  }

  // Receipt to both parties, with the accepted terms attached. Sending is
  // best-effort: the acceptance is already recorded, and a bounced receipt must
  // not invalidate it.
  let attachment: { filename: string; content: string } | undefined;
  try {
    const pdf = await readFile(path.join(process.cwd(), 'public', AGB[offer.lang].pdf));
    attachment = {
      filename: path.basename(AGB[offer.lang].pdf),
      content: pdf.toString('base64'),
    };
  } catch (error) {
    console.error('[accept] terms PDF unreadable; sending receipt without it', error);
  }

  const de = offer.lang === 'de';
  await sendNotification({
    to: offer.email,
    subject: de
      ? `Offert-Annahme bestätigt: ${offer.nr} — ${offer.titel}`
      : `Offer acceptance confirmed: ${offer.nr} — ${offer.titel}`,
    text: [
      de ? 'Guten Tag' : 'Hello',
      '',
      de
        ? 'Diese E-Mail bestätigt die Annahme der folgenden Offerte:'
        : 'This email confirms the acceptance of the following offer:',
      '',
      record,
      '',
      de
        ? `Die akzeptierte AGB-Version ist beigelegt und dauerhaft abrufbar unter ${AGB.de.url}.`
        : `The accepted GTC version is attached and permanently available at ${AGB.en.url}.`,
      '',
      de ? 'Freundliche Grüsse' : 'Kind regards',
      `eFlury Consulting, ${PERSON.name}`,
      `${ADDRESS.streetAddress}, ${ADDRESS.postalCode} ${ADDRESS.addressLocality} · ${PERSON.email} · ${PERSON.telephoneDisplay}`,
    ].join('\n'),
    attachments: attachment ? [attachment] : undefined,
  });

  await sendNotification({
    to: serverEnv.notifyEmail,
    subject: `Angenommen: ${offer.nr} — ${offer.firma}`,
    replyTo: offer.email,
    text: record,
  });

  return json({ ok: true }, 200);
}
