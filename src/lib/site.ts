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

export const ADDRESS = {
  streetAddress: 'Keltenweg 4',
  postalCode: '2540',
  addressLocality: 'Grenchen',
  addressCountry: 'Switzerland',
} as const;
