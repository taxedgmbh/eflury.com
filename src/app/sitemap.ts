import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { STATIC_ROUTES, SITEMAP_EXCLUDE } from '@/lib/routes';
import { getAllPosts, getAllTags, tagSlug } from '@/lib/content';
import { SERVICES } from '@/data/services';

/*
 * Generated, not hand-written. The Astro sitemap was a literal array that rotted
 * to 18 of 72 live URLs before anyone noticed; scripts/check-redirects.mjs now
 * fails the build if a page on disk is missing from STATIC_ROUTES.
 *
 * No hreflang alternates: the site is German-only.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const staticEntries = STATIC_ROUTES.filter((r) => !SITEMAP_EXCLUDE.has(r.path)).map((r) => ({
    url: `${SITE_URL}${r.path}`,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const postEntries = posts.map((p) => ({
    url: `${SITE_URL}/de/blog/${p.slug}/`,
    lastModified: p.updatedDate ?? p.pubDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const serviceEntries = SERVICES.map((s) => ({
    url: `${SITE_URL}/de/services/${s.slug}/`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Tag archives are real, indexable pages; they were missing from the sitemap
  // because they are generated from content rather than from a page.tsx.
  const tagEntries = (await getAllTags()).map((tag) => ({
    url: `${SITE_URL}/de/blog/tag/${tagSlug(tag)}/`,
    changeFrequency: 'monthly' as const,
    priority: 0.4,
  }));

  return [...staticEntries, ...serviceEntries, ...postEntries, ...tagEntries];
}
