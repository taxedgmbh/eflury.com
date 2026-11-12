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

/** The German consulting site, kept as an archive under /de/. */
export const ARCHIVE_HREF = '/de/';

/** Legal pages exist in German only. */
export const LEGAL = [
  { label: 'Imprint', href: '/de/impressum/' },
  { label: 'Privacy', href: '/de/datenschutz/' },
  { label: 'Terms', href: '/de/nutzungsbedingungen/' },
  { label: 'Cookies', href: '/de/cookies/' },
] as const;

export interface PostCard {
  slug: string;
  title: string;
  description: string;
  date: Date;
  minutes: number;
}

export const fmtLong = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});
export const fmtShort = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

export const postHref = (slug: string) => `/de/blog/${slug}/`;
