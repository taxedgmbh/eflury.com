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
      // TikTok LIVE backdrop for the TV: /en/live, /de/live, /fr/live (and /live = English).
      // The pages are static files in public/live/, so no login is needed. They follow the
      // slides set on the remote (/live/remote, password only; see src/lib/live.ts).
      // Temporary redirects on purpose. Private shortcut: noindex, not in sitemap or menus.
      ...Object.entries({ '': 'en', '/en': 'en', '/de': 'de', '/fr': 'fr' }).flatMap(([prefix, lang]) =>
        [`${prefix}/live`, `${prefix}/LIVE`, `${prefix.toUpperCase()}/LIVE`, `${prefix}/Live`]
          .filter((v, i, all) => all.indexOf(v) === i)
          .map((source) => ({ source, destination: `/live/${lang}.html`, permanent: false })),
      ),
      { source: '/live/remote', destination: '/live/remote.html', permanent: false },
      { source: '/remote', destination: '/live/remote.html', permanent: false },
      // Link-in-bio page. Each bio gets its own short address, so the anonymous
      // counts on the remote show which platform people came from.
      ...Object.entries({
        links: 'direct',
        link: 'direct',
        tiktok: 'tiktok',
        tt: 'tiktok',
        insta: 'instagram',
        instagram: 'instagram',
        ig: 'instagram',
        yt: 'youtube',
        youtube: 'youtube',
        x: 'x',
        fb: 'facebook',
        facebook: 'facebook',
        li: 'linkedin',
        linkedin: 'linkedin',
      }).flatMap(([path, src]) =>
        [path, path[0].toUpperCase() + path.slice(1), path.toUpperCase()]
          .filter((v, i, all) => all.indexOf(v) === i)
          .map((p) => ({
            source: `/${p}`,
            destination: src === 'direct' ? '/en/links/' : `/en/links/?s=${src}`,
            permanent: false,
          })),
      ),
      // EF Real Estate's own page (src/components/personal/RealEstateView.tsx).
      ...['real-estate', 'Real-Estate', 'realestate', 'RealEstate', 'ef-real-estate', 'efrealestate', 'EFRealEstate'].map((p) => ({
        source: `/${p}`,
        destination: '/en/real-estate/',
        permanent: false,
      })),
      { source: '/immobilien', destination: '/de/immobilien/', permanent: false },
      { source: '/immobilier', destination: '/fr/immobilier/', permanent: false },
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
        source: '/de/:path((?!impressum|datenschutz|nutzungsbedingungen|notizen|newsletter|immobilien|opengraph-image|rss\\.xml).+)',
        destination: '/de/',
        statusCode: 301,
      },
      { source: '/en/:path((?!imprint|privacy|terms|notes|newsletter|links|real-estate|opengraph-image).+)', destination: '/en/', statusCode: 301 },
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
        // Private TikTok LIVE backdrop and remote: never in a search index.
        source: '/live/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
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
