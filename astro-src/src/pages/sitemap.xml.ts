/**
 * Sitemap XML Generator for eflury.com
 * Generates dynamic sitemap with priority scores and change frequencies
 * Optimized for SEO and LLM visibility
 */

import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const baseUrl = 'https://eflury.com';
  const lastmod = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  const pages = [
    // Priority 1.0 - Most important pages (Homepage)
    { url: '/en', priority: '1.0', changefreq: 'weekly' },
    { url: '/de', priority: '1.0', changefreq: 'weekly' },

    // Priority 0.9 - Core service pages
    { url: '/en/services/claude-automation', priority: '0.9', changefreq: 'monthly' },
    { url: '/de/services/claude-automation', priority: '0.9', changefreq: 'monthly' },

    // Priority 0.8 - Package and case study pages
    { url: '/en/services/packages', priority: '0.8', changefreq: 'monthly' },
    { url: '/de/services/packages', priority: '0.8', changefreq: 'monthly' },
    { url: '/en/case-studies/taxed-gmbh', priority: '0.8', changefreq: 'monthly' },
    { url: '/de/case-studies/taxed-gmbh', priority: '0.8', changefreq: 'monthly' },

    // Priority 0.7 - About, process, and tool pages
    { url: '/en/about', priority: '0.7', changefreq: 'monthly' },
    { url: '/de/about', priority: '0.7', changefreq: 'monthly' },
    { url: '/en/process', priority: '0.7', changefreq: 'monthly' },
    { url: '/de/process', priority: '0.7', changefreq: 'monthly' },
    { url: '/en/tools/roi-calculator', priority: '0.7', changefreq: 'monthly' },
    { url: '/de/tools/roi-calculator', priority: '0.7', changefreq: 'monthly' },
    { url: '/en/tools/assessment', priority: '0.7', changefreq: 'monthly' },
    { url: '/de/tools/assessment', priority: '0.7', changefreq: 'monthly' },

    // Priority 0.6 - Blog hub pages
    { url: '/en/blog', priority: '0.6', changefreq: 'weekly' },
    { url: '/de/blog', priority: '0.6', changefreq: 'weekly' },

    // Priority 0.5 - Contact and resources
    { url: '/en/contact', priority: '0.5', changefreq: 'monthly' },
    { url: '/de/contact', priority: '0.5', changefreq: 'monthly' },
    { url: '/en/resources', priority: '0.5', changefreq: 'monthly' },
    { url: '/de/resources', priority: '0.5', changefreq: 'monthly' },

    // Priority 0.3 - Legal pages (low priority but required)
    { url: '/en/legal/privacy', priority: '0.3', changefreq: 'yearly' },
    { url: '/de/legal/privacy', priority: '0.3', changefreq: 'yearly' },
    { url: '/en/legal/terms', priority: '0.3', changefreq: 'yearly' },
    { url: '/de/legal/terms', priority: '0.3', changefreq: 'yearly' },
    { url: '/en/legal/cookies', priority: '0.3', changefreq: 'yearly' },
    { url: '/de/legal/cookies', priority: '0.3', changefreq: 'yearly' },
  ];

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
    }
  });
};
