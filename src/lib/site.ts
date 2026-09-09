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
    what: 'Treuhand und Buchhaltung für Schweizer KMU. Die Firma, an der ich zuerst ausprobiere, was ich anderen empfehle.',
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
