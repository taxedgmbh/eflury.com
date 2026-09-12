import type { MetadataRoute } from 'next';
import { SITE_URL, IS_PRODUCTION } from '@/lib/site';

/*
 * Staging backends build with NEXT_PUBLIC_ENV=staging and emit Disallow: / so the
 * *.hosted.app preview never gets indexed. Doing this at build time rather than
 * in middleware keeps every page CDN-cacheable.
 */
export default function robots(): MetadataRoute.Robots {
  if (!IS_PRODUCTION) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        /*
         * Transactional, reached only by a signed link — nothing here should be
         * indexed. admin.html is the console that mints those links; it is
         * admin-key protected server-side, but there is no reason for it to sit
         * in a search index.
         */
        disallow: ['/offerte/', '/offer/', '/demo/'],
      },
      // Answer engines are welcome — carried over from the Astro robots.txt.
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Anthropic-AI', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      // SEO scrapers are not.
      { userAgent: 'AhrefsBot', disallow: '/' },
      { userAgent: 'SemrushBot', disallow: '/' },
      { userAgent: 'MJ12bot', disallow: '/' },
      { userAgent: 'DotBot', disallow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
