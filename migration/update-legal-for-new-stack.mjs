#!/usr/bin/env node
/**
 * The privacy policy and the security page name the services eflury.com runs
 * on. Every one of them changes in this migration, so left alone they become
 * factually wrong legal disclosures the moment DNS flips.
 *
 * What actually changes:
 *
 *   Hosting        Hostinger (EU)            -> Firebase App Hosting (Google, europe-west6 / Zürich)
 *   Chat model     DeepSeek (China)          -> Google Vertex AI, Gemini (europe-west6 / Zürich)
 *   Forms / CRM    HubSpot (EU + US)         -> Firestore (Google Cloud) + Resend for notification mail
 *   Uploads        Hosting-Verzeichnis       -> Google Cloud Storage
 *
 * The DeepSeek removal is the substantive one: the policy currently discloses a
 * transfer to China, "einem Land ohne angemessenes Datenschutzniveau". After the
 * move the assistant runs in Zurich, so that transfer disappears entirely.
 *
 * HubSpot is removed as infrastructure per instruction. It stays where it is a
 * third-party product being discussed — a blog post, a client's system in a case
 * study, an integrable CRM in a service FAQ — because those are not statements
 * about what eflury.com uses.
 *
 * This is legal text. It is edited here so the disclosures match reality, but it
 * needs a human read before it goes live.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const EDITS = {
  'src/content/legal/datenschutz.html': [
    ['<dt>Empfänger &amp; Ort</dt><dd>Hostinger (Hosting, EU)</dd>',
     '<dt>Empfänger &amp; Ort</dt><dd>Google (Firebase App Hosting, Region europe-west6 / Zürich, Schweiz)</dd>'],

    ['<h3>Formulare &amp; CRM (HubSpot)</h3>',
     '<h3>Formulare</h3>'],

    [/<dt>Empfänger &amp; Ort<\/dt><dd>HubSpot \(CRM;[^<]*<\/dd>/,
     '<dt>Empfänger &amp; Ort</dt><dd>Google (Firestore, Region europe-west6 / Zürich) für die Speicherung; Resend (E-Mail-Zustellung der Benachrichtigung an den Inhaber). Annahme-Quittungen zusätzlich per E-Mail an beide Parteien</dd>'],

    [/<dd>Ihre Chat-Nachrichten und der Gesprächsverlauf der laufenden Sitzung; Kontaktdaten nur, wenn Sie sie ausdrücklich angeben und der Weiterleitung zustimmen \(dann an HubSpot, siehe oben\)<\/dd>/,
     '<dd>Ihre Chat-Nachrichten und der Gesprächsverlauf der laufenden Sitzung; Kontaktdaten nur, wenn Sie sie ausdrücklich angeben und der Weiterleitung zustimmen (dann wie bei Formularen, siehe oben)</dd>'],

    [/<dt>Empfänger &amp; Ort<\/dt><dd>DeepSeek \(KI-Anbieter\)[^<]*<\/dd>/,
     '<dt>Empfänger &amp; Ort</dt><dd>Google (Vertex AI, Modell Gemini, Region europe-west6 / Zürich, Schweiz). Die Verarbeitung bleibt in der Schweiz; es findet keine Bekanntgabe an einen Anbieter ausserhalb der Schweiz und der EU statt</dd>'],

    [/<dd>Speicherung in einem zugriffsgeschützten Verzeichnis (?:unseres|seines) Hostings \(EU\)[^<]*<\/dd>/,
     '<dd>Speicherung in Google Cloud Storage mit reinem IAM-Zugriff (keine öffentlichen Objekte); Eckdaten in Firestore; Zustellung der Benachrichtigung per E-Mail an den Inhaber</dd>'],

    // the plain-language chat warning named the old provider
    [/Was Sie in den Chat schreiben, wird zur Beantwortung an DeepSeek übermittelt\./,
     'Was Sie in den Chat schreiben, wird zur Beantwortung an Google Vertex AI in der Region Zürich übermittelt.'],

    [/<strong>EU<\/strong> \(Hosting, HubSpot-Rechenzentrum\), <strong>USA<\/strong> \(Google, Cloudflare, HubSpot-Servicedaten[^)]*\)[^<]*<strong>China<\/strong> \(DeepSeek[^)]*\)\./,
     '<strong>Schweiz</strong> (Hosting, KI-Verarbeitung und Datenspeicherung bei Google in der Region Zürich) und <strong>USA</strong> (Google-Servicedaten, Cloudflare, Resend — jeweils zertifiziert unter dem Swiss–U.S. Data Privacy Framework, das die Schweiz seit dem 15. September 2024 als angemessen anerkennt; ergänzend Standardvertragsklauseln). Eine Bekanntgabe nach China findet nicht mehr statt: der Chat-Assistent lief früher über einen Anbieter mit Verarbeitung in China und wird heute in Zürich betrieben.'],
  ],

  'src/content/pages/sicherheit.html': [
    ['<li><strong>Hostinger</strong> — Hosting dieser Website</li>',
     '<li><strong>Google</strong> — Hosting dieser Website (Firebase App Hosting, Region Zürich), Speicherung von Formulareingaben und Bewerbungsunterlagen, sowie die KI-Verarbeitung des Chat-Assistenten (Vertex AI, Region Zürich)</li>'],

    [/<li><strong>HubSpot<\/strong> — Verarbeitung von Kontakt- und Newsletter-Formularen[^<]*<\/li>/,
     '<li><strong>Resend</strong> — Zustellung der Benachrichtigungs- und Bestätigungs-E-Mails</li>\n<li><strong>Cloudflare Turnstile</strong> — Spam-Schutz der Formulare</li>'],

    ['<p>Auf eflury.com selbst werden keine Kundendaten aus Projekten verarbeitet. Die Website ist statisch und wird bei Hostinger gehostet.</p>',
     '<p>Auf eflury.com selbst werden keine Kundendaten aus Projekten verarbeitet. Die Website wird bei Google (Firebase App Hosting, Region Zürich) betrieben.</p>'],
  ],
};

let applied = 0;
const misses = [];

for (const [file, edits] of Object.entries(EDITS)) {
  let src = readFileSync(file, 'utf8');
  for (const [from, to] of edits) {
    const before = src;
    src = typeof from === 'string' ? src.split(from).join(to) : src.replace(from, to);
    if (src === before) misses.push(`${file}: ${String(from).slice(0, 80)}`);
    else applied++;
  }
  writeFileSync(file, src);
}

console.log(`${applied} edit(s) applied`);
if (misses.length) {
  console.log(`${misses.length} pattern(s) already applied or absent (safe on re-run)`);
}
