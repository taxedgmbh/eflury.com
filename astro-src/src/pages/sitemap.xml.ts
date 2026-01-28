/**
 * Sitemap XML Generator for eflury.com
 * Generates dynamic sitemap with hreflang, priority scores and change frequencies
 * Optimized for SEO and international visibility
 */

import type { APIRoute } from 'astro';

interface Page {
  en: string;
  de: string;
  priority: string;
  changefreq: string;
}

export const GET: APIRoute = async () => {
  const baseUrl = 'https://eflury.com';
  const lastmod = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  // Pages with their EN/DE equivalents for hreflang
  const pages: Page[] = [
    // Priority 1.0 - Homepage
    { en: '/en/', de: '/de/', priority: '1.0', changefreq: 'weekly' },

    // Priority 0.8 - Core content pages
    { en: '/en/about/', de: '/de/about/', priority: '0.8', changefreq: 'monthly' },
    { en: '/en/pricing/', de: '/de/pricing/', priority: '0.8', changefreq: 'monthly' },

    // Priority 0.7 - Case studies
    { en: '/en/case-studies/taxed-gmbh/', de: '/de/case-studies/taxed-gmbh/', priority: '0.7', changefreq: 'monthly' },

    // Priority 0.4 - Legal pages (low priority but required)
    { en: '/en/privacy/', de: '/de/datenschutz/', priority: '0.4', changefreq: 'yearly' },
    { en: '/en/terms/', de: '/de/nutzungsbedingungen/', priority: '0.4', changefreq: 'yearly' },
    { en: '/en/cookies/', de: '/de/cookies/', priority: '0.4', changefreq: 'yearly' },
    { en: '/en/disclaimer/', de: '/de/haftungsausschluss/', priority: '0.4', changefreq: 'yearly' },
    { en: '/en/code-of-conduct/', de: '/de/verhaltenskodex/', priority: '0.4', changefreq: 'yearly' },
  ];

  // Generate URL entries with hreflang
  const generateUrlEntry = (page: Page, lang: 'en' | 'de') => {
    const url = lang === 'en' ? page.en : page.de;
    return `  <url>
    <loc>${baseUrl}${url}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page.en}"/>
    <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}${page.de}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${page.en}"/>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  };

  // Generate all URL entries
  const urlEntries = pages.flatMap(page => [
    generateUrlEntry(page, 'en'),
    generateUrlEntry(page, 'de')
  ]).join('\n');

  // Generate XML sitemap with xhtml namespace for hreflang
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
    }
  });
};
