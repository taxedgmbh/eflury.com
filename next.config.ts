import type { NextConfig } from 'next';

/**
 * Ported from the Astro site's public/.htaccess, which does not come with us to
 * Firebase. Everything Apache was doing at the edge has to be reproduced here or
 * it silently disappears at cutover.
 */
const nextConfig: NextConfig = {
  // Firestore's protobuf code breaks when bundled; load it from node_modules.
  serverExternalPackages: ['@google-cloud/firestore'],
  // The root layout lives in the (en) route group, so there is no
  // app/layout.tsx for an unmatched URL; global-not-found renders its own
  // document instead.
  experimental: { globalNotFound: true },

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

      // Root -> the English personal homepage.
      //
      // statusCode: 301 rather than permanent: true throughout — `permanent`
      // emits 308. Google treats the two alike; 301 matches what the site has
      // always sent.
      { source: '/', destination: '/en/', statusCode: 301 },

      /*
       * eFlury Consulting closed on 2026-11-12 and its pages went with it: the
       * old German pages under /de/, the old English URLs under /en/*, the offer
       * and download pages. Every one of them lands on the homepage instead
       * of a 404, so old links and search results still arrive somewhere.
       * The lookaheads keep the two pages that do live under /en/.
       */
      // The German site went live again on 2026-11-13 (personal brand). Old
      // consulting URLs under /de/ land on the German homepage.
      {
        source: '/de/:path((?!impressum|datenschutz|nutzungsbedingungen|notizen|newsletter|opengraph-image|rss\\.xml).+)',
        destination: '/de/',
        statusCode: 301,
      },
      { source: '/en/:path((?!imprint|privacy|terms|notes|newsletter|opengraph-image).+)', destination: '/en/', statusCode: 301 },
      { source: '/:dir(offerte|offer|demo|downloads)/:path*', destination: '/en/', statusCode: 301 },
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
        // A .vcf served as octet-stream downloads as an unknown file on iOS;
        // text/vcard opens the "add contact" sheet.
        source: '/press/:file.vcf',
        headers: [
          { key: 'Content-Type', value: 'text/vcard; charset=utf-8' },
          { key: 'Content-Disposition', value: 'inline; filename="emanuel-flury.vcf"' },
        ],
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
