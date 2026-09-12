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

import { CONTENT_PAGES } from './pages';

export const STATIC_ROUTES: StaticRoute[] = [
  { path: '/de/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/de/blog/', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/de/services/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/de/branchen/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/de/case-studies/', priority: 0.8, changeFrequency: 'monthly' },

  // Long-form content pages, derived so a new page cannot be missing from here.
  ...Object.values(CONTENT_PAGES).map((p) => ({
    path: p.route,
    priority: p.priority,
    changeFrequency: 'monthly' as const,
  })),

  { path: '/de/impressum/', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/de/datenschutz/', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/de/nutzungsbedingungen/', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/de/cookies/', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/de/haftungsausschluss/', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/de/verhaltenskodex/', priority: 0.3, changeFrequency: 'yearly' },

  // Required by the CC BY licences on the photography, so it is a real page
  // rather than a footer line — see src/lib/photos.ts.
  { path: '/de/bildnachweis/', priority: 0.2, changeFrequency: 'yearly' },
];

/**
 * Routes that exist but must never be advertised to crawlers. Empty today —
 * it previously listed /de/danke/, a thank-you page that never came across from
 * the Astro site, so the exclusion was guarding nothing.
 */
export const SITEMAP_EXCLUDE = new Set<string>();

/**
 * Dynamic route families whose members come from data, not from a page.tsx.
 * Registered here so the sitemap covers them and the build gate knows they are
 * intentional rather than missing.
 */
export const DYNAMIC_FAMILIES = ['/de/blog/[slug]/', '/de/services/[slug]/'] as const;
