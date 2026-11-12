import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/en/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/en/imprint/`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/en/privacy/`, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
