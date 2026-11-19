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
  // Search engines and AI answer engines are welcome to read and cite the site
  // (named explicitly so no one reads silence as a no). The API and the
  // private TikTok LIVE pages stay out of every index.
  const disallow = ['/api/', '/live/'];
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'Applebot',
          'DuckDuckBot',
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-SearchBot',
          'Claude-User',
          'PerplexityBot',
          'Perplexity-User',
          'Google-Extended',
          'Applebot-Extended',
          'Meta-ExternalAgent',
          'MistralAI-User',
          'CCBot',
        ],
        allow: '/',
        disallow,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
