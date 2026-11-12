import type { MetadataRoute } from 'next';
import { getNotes } from '@/lib/notes';
import { SITE_URL } from '@/lib/site';

/*
 * Indexable pages only: the imprint and privacy policy are noindex. The
 * homepage changes with every build (YouTube feed, copy), so lastModified is
 * the build time.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/en/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/en/notes/`, lastModified: getNotes()[0]?.date ?? new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...getNotes().map((n) => ({ url: `${SITE_URL}/en/notes/${n.slug}/`, lastModified: n.date, priority: 0.7 })),
  ];
}
