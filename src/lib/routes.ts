/**
 * Static route table — the sitemap's source of truth.
 *
 * The Astro sitemap was hand-maintained and silently rotted to 18 of 72 URLs.
 * scripts/check-redirects.mjs walks src/app/de and fails the build if a page
 * exists here on disk but is missing from this table, so it cannot rot again.
 */

export interface StaticRoute {
  path: string;
  priority: number;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

export const STATIC_ROUTES: StaticRoute[] = [
  { path: '/de/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/de/blog/', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/de/services/', priority: 0.8, changeFrequency: 'monthly' },

  { path: '/de/impressum/', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/de/datenschutz/', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/de/nutzungsbedingungen/', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/de/cookies/', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/de/haftungsausschluss/', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/de/verhaltenskodex/', priority: 0.3, changeFrequency: 'yearly' },
];

/** Routes that exist but must never be advertised to crawlers. */
export const SITEMAP_EXCLUDE = new Set<string>(['/de/danke/']);

/**
 * Dynamic route families whose members come from data, not from a page.tsx.
 * Registered here so the sitemap covers them and the build gate knows they are
 * intentional rather than missing.
 */
export const DYNAMIC_FAMILIES = ['/de/blog/[slug]/', '/de/services/[slug]/'] as const;
