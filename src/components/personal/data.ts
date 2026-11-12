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

export const LEGAL = [
  { label: 'Imprint', href: '/en/imprint/' },
  { label: 'Privacy', href: '/en/privacy/' },
] as const;

export const fmtShort = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});
