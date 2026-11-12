import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/*
 * Indexable pages only: the imprint and privacy policy are noindex. The
 * homepage changes with every build (YouTube feed, copy), so lastModified is
 * the build time.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITE_URL}/en/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 }];
}
