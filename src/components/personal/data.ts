/**
 * Facts the personal homepage repeats in several places — header, sections,
 * footer — kept in one spot so a role or a handle cannot drift between them.
 *
 * Owner rules (brand/PERSONAL-BRAND-HOMEPAGE.md): roles exactly as on LinkedIn;
 * EF Real Estate is private equity, not a company; real estate by type and
 * region only — never addresses, tenants, values or financing.
 */

export const EMAIL = 'me@eflury.com';
export const LINKEDIN = 'https://www.linkedin.com/in/emanuelflury';
/** Personal mobile, reachable on WhatsApp. wa.me takes the number without + or 00. */
export const PHONE = '+41 79 910 77 87';
export const WHATSAPP = 'https://wa.me/41799107787';

export const SOCIALS = [
  { name: 'LinkedIn', href: LINKEDIN, handle: 'in/emanuelflury' },
  { name: 'Instagram', href: 'https://www.instagram.com/emanuelaaronflury', handle: '@emanuelaaronflury' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@emanuelflury', handle: '@emanuelflury' },
  { name: 'YouTube', href: 'https://www.youtube.com/@emanuelflury', handle: '@emanuelflury' },
  { name: 'Facebook', href: 'https://www.facebook.com/emanuelflury', handle: 'emanuelflury' },
  { name: 'GitHub', href: 'https://github.com/emanuelflury', handle: 'emanuelflury' },
] as const;

export type SocialName = (typeof SOCIALS)[number]['name'];

export const ROLES = {
  skopa: 'Managing Director',
  taxed: 'Managing Director (Mandate)',
  estate: 'Owner',
} as const;

/** The same roles on the German pages. */
export const ROLES_DE = {
  skopa: 'Geschäftsführer',
  taxed: 'Geschäftsführer (Mandat)',
  estate: 'Eigentümer',
} as const;

/*
 * From the Swiss commercial register (Zefix / SHAB), checked 2026-11-12.
 * Founding = date of the articles of association; the entry follows days later.
 */
export const REGISTRY = {
  taxed: {
    founded: '2021-02-04',
    year: 2021,
    canton: 'Bern',
    uid: 'CHE-350.820.923',
    zefix: 'https://www.zefix.ch/en/search/entity/list/firm/1473144',
  },
  skopa: {
    founded: '2026-10-09',
    year: 2026,
    canton: 'Solothurn',
    uid: 'CHE-329.316.023',
    zefix: 'https://www.zefix.ch/en/search/entity/list/firm/1772830',
  },
} as const;

export const LEGAL = [
  { label: 'Imprint', href: '/en/imprint/' },
  { label: 'Privacy', href: '/en/privacy/' },
  { label: 'Terms', href: '/en/terms/' },
] as const;

export const LEGAL_DE = [
  { label: 'Impressum', href: '/de/impressum/' },
  { label: 'Datenschutz', href: '/de/datenschutz/' },
  { label: 'Nutzungsbedingungen', href: '/de/nutzungsbedingungen/' },
] as const;

export const fmtShort = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});
