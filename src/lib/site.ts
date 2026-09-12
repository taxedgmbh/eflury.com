/**
 * Single source of truth for site-wide constants.
 *
 * These were previously repeated across LocalBusinessSchema.astro,
 * PersonSchema.astro, MainLayout.astro, the PHP chat prompt and several page
 * files, which is how the bio drifted out of sync between llms.txt and en.json.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eflury.com';
export const DEFAULT_LOCALE = 'de-CH';
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';
export const IS_PRODUCTION = (process.env.NEXT_PUBLIC_ENV ?? 'production') === 'production';

export const PERSON = {
  name: 'Emanuel Aaron Flury',
  shortName: 'Emanuel Flury',
  email: 'me@eflury.com',
  telephone: '+41799107787',
  telephoneDisplay: '+41 79 910 77 87',
  sameAs: ['https://www.linkedin.com/in/emanuelflury'],
} as const;

/**
 * The legal entity behind eflury.com, in one place.
 *
 * Today this is a sole proprietorship with no Handelsregister entry and no UID —
 * which is lawful below the revenue threshold (Art. 931 OR) and is stated openly
 * in the Impressum rather than glossed over. The chat prompt carries a hard rule
 * never to invent a UID, because a model doing so would be a real problem.
 *
 * eflury.com is Emanuel's Unternehmer page rather than a company site, so these
 * facts are the true ones. If the business later moves into a GmbH, changing it
 * here changes the Impressum, the chatbot's legal section and the
 * offer-acceptance receipt together, instead of leaving three copies to drift.
 */
export const LEGAL_ENTITY = {
  name: 'eFlury Consulting',
  form: 'Einzelunternehmen',
  owner: 'Emanuel Aaron Flury',
  registered: false,
  /** Null while unregistered. Never invent one. */
  uid: null as string | null,
  /** One sentence, reused verbatim by the Impressum and the chat prompt. */
  registrationNote:
    'eFlury Consulting ist ein Einzelunternehmen und nicht im Handelsregister eingetragen; entsprechend besteht keine UID-Nummer. Als Einzelunternehmen unterhalb der gesetzlichen Umsatzschwelle ist ein Eintrag nicht erforderlich (Art. 931 OR).',
} as const;

export const ADDRESS = {
  streetAddress: 'Keltenweg 4',
  postalCode: '2540',
  addressLocality: 'Grenchen',
  addressRegion: 'SO',
  addressCountry: 'CH',
  latitude: 47.1925,
  longitude: 7.3958,
} as const;

/**
 * The repositioning, expressed as data.
 *
 * eflury.com is the hub; each venture is a first-class Organization that links
 * out to its own site rather than living here. Taxed used to appear only as a
 * case study and SkopaAI only as a service line — that framing is what changes.
 *
 * Consumed by both the ventures section and the JSON-LD @graph, so the page and
 * the structured data cannot disagree.
 */
export const VENTURES = [
  {
    id: 'taxed',
    name: 'Taxed GmbH',
    url: 'https://taxed.ch',
    external: true,
    role: 'Gründer',
    place: 'Biel/Bienne',
    what: 'Treuhand und Buchhaltung für Schweizer KMU. Die Firma, an der er zuerst ausprobiert, was er anderen empfiehlt.',
  },
  {
    id: 'skopa',
    name: 'SkopaAI',
    url: 'https://skopa.ai',
    external: true,
    role: 'Gründer',
    place: 'Grenchen',
    what: 'Vorkonfigurierte KI-Assistenz als Gerät. Auspacken, anschliessen, per Nachricht bedienen.',
  },
  {
    id: 'eflury',
    name: 'eFlury Consulting',
    url: SITE_URL,
    external: false,
    role: 'Inhaber',
    place: 'Grenchen',
    what: 'Beratung und Umsetzung: Prozesse, die ohne tägliches Zutun laufen.',
  },
] as const;

export type Venture = (typeof VENTURES)[number];
