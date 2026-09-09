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
  // Phase 2 adds: /de/ueber-mich|about/, /de/leistungen/*, /de/referenzen/*,
  // the legal pages, /de/kontakt/, /de/preise/. Each must be registered here.
];

/** Routes that exist but must never be advertised to crawlers. */
export const SITEMAP_EXCLUDE = new Set<string>(['/de/danke/']);
