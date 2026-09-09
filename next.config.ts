import type { NextConfig } from 'next';
import { LEGACY_EN_TO_DE } from './src/lib/legacy-redirects';

/**
 * Ported from the Astro site's public/.htaccess, which does not come with us to
 * Firebase. Everything Apache was doing at the edge has to be reproduced here or
 * it silently disappears at cutover.
 */
const nextConfig: NextConfig = {
  // Every existing URL ends in a slash. Changing this would invalidate every
  // canonical, every sitemap entry and every inbound link at once.
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,

  async redirects() {
    return [
      // www -> apex. .htaccess did this with a RewriteCond; App Hosting terminates
      // TLS for both hosts, so the canonicalisation has to happen in the app.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.eflury.com' }],
        destination: 'https://eflury.com/:path*',
        statusCode: 301,
      },

      // Root -> default language. Was `RedirectMatch 301 ^/$ /en/`; the
      // destination changes with the move to German-only.
      //
      // statusCode: 301 rather than permanent: true throughout — `permanent`
      // emits 308, which preserves the request method. Google treats the two
      // alike, but .htaccess used R=301 and some tooling still reports 308 as a
      // distinct signal, so match what the site sent before.
      { source: '/', destination: '/de/', statusCode: 301 },

      // The frozen /en/* -> /de/* map, plus the two pages Apache had already
      // retired. Generated once while both trees existed; see migration/README.md.
      ...LEGACY_EN_TO_DE.map(([source, destination]) => ({
        source,
        destination,
        statusCode: 301 as const,
      })),

      // The old chatbot endpoint, in case a stale service worker cached a bundle
      // that still points at it.
      { source: '/api/chat.php', destination: '/api/chat/', statusCode: 301 },

      // Last-resort net. The enumerated list above is exhaustive against the built
      // route tree, so this should never fire.
      { source: '/en/:path*', destination: '/de/', statusCode: 301 },
    ];
  },

  async headers() {
    return [
      {
        // Must never be cached: the tombstone has to reach clients promptly.
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, max-age=0, must-revalidate' },
          { key: 'Service-Worker-Allowed', value: '/' },
        ],
      },
      {
        source: '/manifest.json',
        headers: [{ key: 'Cache-Control', value: 'max-age=0, must-revalidate' }],
      },
      {
        // .htaccess forced these to download rather than render inline.
        source: '/downloads/emanuel-flury-card.:ext(png|pdf)',
        headers: [
          {
            key: 'Content-Disposition',
            value: 'attachment; filename=emanuel-flury-card.:ext',
          },
        ],
      },
      {
        source: '/downloads/emanuel-flury.vcf',
        headers: [{ key: 'Content-Type', value: 'text/vcard; charset=utf-8' }],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
