import { NextResponse } from 'next/server';
import { z } from 'zod';
import { FieldValue } from 'firebase-admin/firestore';
import { firestore, COLLECTIONS } from '@/lib/server/firestore';
import { verifyTurnstile } from '@/lib/server/turnstile';
import { checkRateLimit } from '@/lib/server/ratelimit';
import { sendNotification } from '@/lib/server/mail';
import { storeFile, signedReadUrl, type StoredFile } from '@/lib/server/storage';
import { PERSON } from '@/lib/site';

/**
 * Careers intake, replacing apply.php.
 *
 * Two substantive changes. Documents go to Cloud Storage rather than a directory
 * on the web host guarded by a generated .htaccess — that guard is Apache-only
 * and does not survive the migration. And Turnstile is verified, where the PHP
 * version relied on a per-session counter that a bot resets by dropping cookies.
 *
 * apply.php also mirrored to a HubSpot Forms v3 endpoint. That is deliberately
 * not carried over yet: the account's portal and form IDs belong in
 * configuration rather than in source, and the CRM mirror can be added once the
 * HubSpot credentials are provisioned alongside the other secrets.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_FILE = 8 * 1024 * 1024;
const MAX_TOTAL = 15 * 1024 * 1024;
const ALLOWED = new Set(['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'zip']);

const fields = z.object({
  vorname: z.string().trim().min(1).max(300),
  nachname: z.string().trim().min(1).max(300),
  email: z.email().max(200),
  telefon: z.string().trim().max(300).optional(),
  adresse: z.string().trim().min(1).max(300),
  plz: z.string().trim().min(1).max(300),
  ort: z.string().trim().min(1).max(300),
  gehalt: z.string().trim().min(1).max(300),
  pensum: z.string().trim().min(1).max(300),
  empfohlen: z.string().trim().max(300).optional(),
  job: z.string().trim().max(300).default('Initiativbewerbung'),
  // Explicit consent, as apply.php required.
  datenschutz: z.literal('1'),
  turnstileToken: z.string().min(1).max(4000),
  website: z.string().max(400).optional(),
});

function json(body: unknown, status: number) {
  return NextResponse.json(body, { status });
}

function extensionOf(name: string): string {
  return name.split('.').pop()?.toLowerCase() ?? '';
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ error: 'Ungültige Anfrage.' }, 400);
  }

  const parsed = fields.safeParse(Object.fromEntries(form.entries()));
  if (!parsed.success) {
    return json({ error: 'Bitte prüfen Sie die Pflichtfelder.' }, 400);
  }
  const data = parsed.data;

  if (data.website) return json({ ok: true }, 200);

  try {
    const limit = await checkRateLimit(request);
    if (!limit.allowed) return json({ error: 'Zu viele Anfragen.' }, 429);
  } catch (error) {
    console.error('[apply] rate limiter unavailable', error);
  }

  const turnstile = await verifyTurnstile(data.turnstileToken, request);
  if (!turnstile.ok) {
    return json({ error: 'Die Sicherheitsprüfung ist fehlgeschlagen.' }, 403);
  }

  // cv and zeugnisse are required, anschreiben optional — same as apply.php.
  const uploads: File[] = [];
  for (const key of ['cv', 'zeugnisse', 'anschreiben']) {
    for (const entry of form.getAll(key)) {
      if (entry instanceof File && entry.size > 0) uploads.push(entry);
    }
  }
  if (!form.getAll('cv').some((f) => f instanceof File && f.size > 0)) {
    return json({ error: 'Lebenslauf und Zeugnisse sind erforderlich.' }, 400);
  }

  let total = 0;
  for (const file of uploads) {
    if (!ALLOWED.has(extensionOf(file.name))) {
      return json({ error: `Dateityp nicht erlaubt: ${file.name}` }, 400);
    }
    if (file.size > MAX_FILE) {
      return json({ error: `Datei zu gross: ${file.name}` }, 400);
    }
    total += file.size;
  }
  if (total > MAX_TOTAL) {
    return json({ error: 'Die Dateien sind zusammen zu gross (max. 15 MB).' }, 400);
  }

  try {
    const db = firestore();
    const ref = db.collection(COLLECTIONS.applications).doc();
    const prefix = `bewerbungen/${new Date().toISOString().slice(0, 10)}/${ref.id}`;

    const stored: StoredFile[] = [];
    for (const [i, file] of uploads.entries()) {
      stored.push(await storeFile(prefix, file, i + 1));
    }

    await ref.set({
      ...data,
      turnstileToken: FieldValue.delete(),
      website: FieldValue.delete(),
      files: stored,
      receivedAt: FieldValue.serverTimestamp(),
    });

    const links = await Promise.all(
      stored.map(async (f) => `  ${f.filename} — ${await signedReadUrl(f.path)}`)
    );

    await sendNotification({
      subject: `Bewerbung: ${data.vorname} ${data.nachname} (${data.job})`,
      replyTo: data.email,
      text: [
        `Stelle:   ${data.job}`,
        `Name:     ${data.vorname} ${data.nachname}`,
        `E-Mail:   ${data.email}`,
        data.telefon ? `Telefon:  ${data.telefon}` : null,
        `Adresse:  ${data.adresse}, ${data.plz} ${data.ort}`,
        `Pensum:   ${data.pensum}`,
        `Gehalt:   ${data.gehalt}`,
        data.empfohlen ? `Empfohlen von: ${data.empfohlen}` : null,
        '',
        'Dokumente (Links 7 Tage gültig):',
        ...links,
        '',
        `Firestore: ${COLLECTIONS.applications}/${ref.id}`,
      ]
        .filter(Boolean)
        .join('\n'),
    });

    return json({ ok: true }, 200);
  } catch (error) {
    console.error('[apply] submission failed', error);
    return json({ error: `Das hat nicht geklappt. Schreiben Sie an ${PERSON.email}.` }, 500);
  }
}

export async function GET() {
  return json({ error: 'Method not allowed' }, 405);
}
