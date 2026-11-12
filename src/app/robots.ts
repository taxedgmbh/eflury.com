import type { MetadataRoute } from 'next';
import { SITE_URL, IS_PRODUCTION } from '@/lib/site';

/*
 * Staging backends build with NEXT_PUBLIC_ENV=staging and emit Disallow: / so the
 * *.hosted.app preview never gets indexed.
 */
export default function robots(): MetadataRoute.Robots {
  if (!IS_PRODUCTION) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
