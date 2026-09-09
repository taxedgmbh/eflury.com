import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { cache } from 'react';

/**
 * Legal pages are stored as cleaned semantic HTML rather than markdown.
 *
 * They were extracted from the built Astro output, which already had the right
 * structure — including the Impressum's definition list of provider details,
 * which Swiss UWG Art. 3 requires be legible. Round-tripping that through
 * markdown risked changing legally-meaningful text for no benefit, so the
 * extraction strips attributes and keeps the semantics.
 *
 * The content is ours and is not user-supplied, so rendering it directly is safe.
 */
export const LEGAL_PAGES = {
  impressum: {
    title: 'Impressum',
    description: 'Anbieterkennzeichnung gemäss schweizerischem Recht (UWG Art. 3).',
  },
  datenschutz: {
    title: 'Datenschutzerklärung',
    description: 'Wie Personendaten bearbeitet werden — nach revDSG und, wo anwendbar, DSGVO.',
  },
  nutzungsbedingungen: {
    title: 'Nutzungsbedingungen',
    description: 'Bedingungen für die Nutzung dieser Website und der angebotenen Leistungen.',
  },
  cookies: {
    title: 'Cookie-Richtlinie',
    description: 'Welche Cookies diese Website setzt und wozu.',
  },
  haftungsausschluss: {
    title: 'Haftungsausschluss',
    description: 'Umfang der Haftung für Inhalte und verlinkte Websites.',
  },
  verhaltenskodex: {
    title: 'Verhaltenskodex',
    description: 'Wie Emanuel Flury arbeitet und was Kundinnen und Kunden von ihm erwarten können.',
  },
} as const;

export type LegalSlug = keyof typeof LEGAL_PAGES;

export const getLegalHtml = cache(async (slug: LegalSlug): Promise<string> => {
  return readFile(path.join(process.cwd(), 'src/content/legal', `${slug}.html`), 'utf8');
});
