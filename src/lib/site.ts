/**
 * Single source of truth for site-wide constants.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eflury.com';
export const IS_PRODUCTION = (process.env.NEXT_PUBLIC_ENV ?? 'production') === 'production';

export const PERSON = {
  name: 'Emanuel Aaron Flury',
  shortName: 'Emanuel Flury',
  email: 'me@eflury.com',
  telephone: '+41799107787',
  telephoneDisplay: '+41 79 910 77 87',
  sameAs: ['https://www.linkedin.com/in/emanuelflury'],
} as const;

/** The homepage title and description, shared by metadata, Open Graph and JSON-LD. */
export const HOME_TITLE = 'Emanuel Flury · Swiss Entrepreneur · Skopa AG, Taxed GmbH';
export const HOME_DESCRIPTION =
  'Emanuel Flury is a Swiss entrepreneur from Grenchen. He builds companies where finance, tax and technology meet: Skopa AG, Taxed GmbH and EF Real Estate.';
export const HOME_TITLE_DE = 'Emanuel Flury · Schweizer Unternehmer · Skopa AG, Taxed GmbH';
export const HOME_DESCRIPTION_DE =
  'Emanuel Flury ist ein Schweizer Unternehmer aus Grenchen. Er baut Unternehmen, in denen Finanzen, Steuern und Technologie zusammenkommen: Skopa AG, Taxed GmbH und EF Real Estate.';

export const HOME_TITLE_FR = 'Emanuel Flury · Entrepreneur suisse · Skopa AG, Taxed GmbH';
export const HOME_DESCRIPTION_FR =
  'Emanuel Flury est un entrepreneur suisse de Granges (Grenchen). Il crée des entreprises à la croisée de la finance, de la fiscalité et de la technologie : Skopa AG, Taxed GmbH et EF Real Estate.';

/** Homepage title and description per language. */
export const HOME_META = {
  en: { title: HOME_TITLE, description: HOME_DESCRIPTION },
  de: { title: HOME_TITLE_DE, description: HOME_DESCRIPTION_DE },
  fr: { title: HOME_TITLE_FR, description: HOME_DESCRIPTION_FR },
} as const;

export const PORTRAIT = {
  url: '/images/portraits/emanuel-aaron-flury-portrait.webp',
  width: 714,
  height: 1616,
} as const;

export const ADDRESS = {
  streetAddress: 'Keltenweg 4',
  postalCode: '2540',
  addressLocality: 'Grenchen',
  addressCountry: 'Switzerland',
} as const;
