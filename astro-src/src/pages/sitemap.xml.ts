/**
 * Sitemap XML Generator for eflury.com
 *
 * Fully dynamic: blog posts are pulled from the content collection (so new
 * posts appear automatically), while the fixed marketing/legal pages are
 * declared once below. hreflang alternates are emitted for every URL.
 *
 * lastmod policy:
 *   - Blog posts use their real content date (updatedDate ?? pubDate), which is
 *     stable across rebuilds — this is honest for crawlers and avoids the
 *     "every URL changed today" churn that previously caused merge conflicts.
 *   - Static pages omit lastmod (valid per the sitemap spec) rather than
 *     stamping a fake build date on content that did not change.
 */

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const baseUrl = 'https://eflury.com';

type Lang = 'en' | 'de';

interface StaticPage {
  en: string;
  de: string;
  priority: string;
  changefreq: string;
}

// Fixed pages with their EN/DE equivalents (legal pages use localized slugs).
const staticPages: StaticPage[] = [
  // Homepage
  { en: '/en/', de: '/de/', priority: '1.0', changefreq: 'weekly' },

  // Core marketing pages
  { en: '/en/about/', de: '/de/about/', priority: '0.8', changefreq: 'monthly' },
  { en: '/en/pricing/', de: '/de/pricing/', priority: '0.8', changefreq: 'monthly' },
  { en: '/en/skopaai/', de: '/de/skopaai/', priority: '0.8', changefreq: 'monthly' },
  { en: '/en/method/', de: '/de/methode/', priority: '0.7', changefreq: 'monthly' },
  { en: '/en/trust/', de: '/de/sicherheit/', priority: '0.6', changefreq: 'monthly' },
  { en: '/en/careers/', de: '/de/karriere/', priority: '0.5', changefreq: 'monthly' },
  { en: '/en/contact/', de: '/de/kontakt/', priority: '0.8', changefreq: 'monthly' },

  // Industries
  { en: '/en/industries/', de: '/de/branchen/', priority: '0.8', changefreq: 'monthly' },
  { en: '/en/industries/finance-teams/', de: '/de/branchen/finanzteams/', priority: '0.7', changefreq: 'monthly' },
  { en: '/en/industries/professional-services/', de: '/de/branchen/dienstleister/', priority: '0.7', changefreq: 'monthly' },
  { en: '/en/industries/reporting-data/', de: '/de/branchen/reporting-daten/', priority: '0.7', changefreq: 'monthly' },

  // Services
  { en: '/en/services/', de: '/de/services/', priority: '0.8', changefreq: 'monthly' },
  { en: '/en/services/ai-audit/', de: '/de/services/ki-audit/', priority: '0.7', changefreq: 'monthly' },
  { en: '/en/services/managed-ai-operations/', de: '/de/services/ki-betrieb/', priority: '0.7', changefreq: 'monthly' },
  { en: '/en/services/claude-skills/', de: '/de/services/claude-skills/', priority: '0.7', changefreq: 'monthly' },
  { en: '/en/services/mcp-integration/', de: '/de/services/mcp-integration/', priority: '0.7', changefreq: 'monthly' },
  { en: '/en/services/finance-automation/', de: '/de/services/finanzen-automatisierung/', priority: '0.7', changefreq: 'monthly' },
  { en: '/en/services/power-bi/', de: '/de/services/power-bi/', priority: '0.7', changefreq: 'monthly' },
  { en: '/en/services/data-quality/', de: '/de/services/datenqualitaet/', priority: '0.7', changefreq: 'monthly' },

  // Blog index + guides
  { en: '/en/blog/', de: '/de/blog/', priority: '0.7', changefreq: 'weekly' },
  { en: '/en/guides/', de: '/de/leitfaeden/', priority: '0.6', changefreq: 'monthly' },

  // Case studies (DE keeps English slugs)
  { en: '/en/case-studies/', de: '/de/case-studies/', priority: '0.7', changefreq: 'monthly' },
  { en: '/en/case-studies/taxed-gmbh/', de: '/de/case-studies/taxed-gmbh/', priority: '0.7', changefreq: 'monthly' },
  { en: '/en/case-studies/finance-automation/', de: '/de/case-studies/finance-automation/', priority: '0.7', changefreq: 'monthly' },
  { en: '/en/case-studies/power-bi-reporting/', de: '/de/case-studies/power-bi-reporting/', priority: '0.7', changefreq: 'monthly' },

  // Legal (localized slugs)
  { en: '/en/privacy/', de: '/de/datenschutz/', priority: '0.4', changefreq: 'yearly' },
  { en: '/en/terms/', de: '/de/nutzungsbedingungen/', priority: '0.4', changefreq: 'yearly' },
  { en: '/en/cookies/', de: '/de/cookies/', priority: '0.4', changefreq: 'yearly' },
  { en: '/en/disclaimer/', de: '/de/haftungsausschluss/', priority: '0.4', changefreq: 'yearly' },
  { en: '/en/code-of-conduct/', de: '/de/verhaltenskodex/', priority: '0.4', changefreq: 'yearly' },
  { en: '/en/imprint/', de: '/de/impressum/', priority: '0.4', changefreq: 'yearly' },
];

const xmlEscape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const formatDate = (d: Date) => d.toISOString().split('T')[0];

interface UrlEntry {
  loc: string;
  enHref?: string;
  deHref?: string;
  lastmod?: string;
  changefreq: string;
  priority: string;
}

const renderUrl = (e: UrlEntry): string => {
  const alternates: string[] = [];
  if (e.enHref) {
    alternates.push(`    <xhtml:link rel="alternate" hreflang="en" href="${xmlEscape(e.enHref)}"/>`);
  }
  if (e.deHref) {
    alternates.push(`    <xhtml:link rel="alternate" hreflang="de" href="${xmlEscape(e.deHref)}"/>`);
  }
  if (e.enHref) {
    alternates.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(e.enHref)}"/>`);
  }

  const lines = [
    `  <url>`,
    `    <loc>${xmlEscape(e.loc)}</loc>`,
    ...alternates,
    ...(e.lastmod ? [`    <lastmod>${e.lastmod}</lastmod>`] : []),
    `    <changefreq>${e.changefreq}</changefreq>`,
    `    <priority>${e.priority}</priority>`,
    `  </url>`,
  ];
  return lines.join('\n');
};

export const GET: APIRoute = async () => {
  const entries: UrlEntry[] = [];

  // --- Static pages -------------------------------------------------------
  for (const page of staticPages) {
    const enHref = `${baseUrl}${page.en}`;
    const deHref = `${baseUrl}${page.de}`;
    for (const lang of ['en', 'de'] as Lang[]) {
      entries.push({
        loc: lang === 'en' ? enHref : deHref,
        enHref,
        deHref,
        changefreq: page.changefreq,
        priority: page.priority,
      });
    }
  }

  // --- Blog posts (dynamic) ----------------------------------------------
  // Sort by id so Map insertion order — and therefore emitted URL order — is
  // stable across builds (getCollection order is not deterministic).
  const posts = (await getCollection('blog'))
    .filter((p) => !p.data.draft)
    .sort((a, b) => a.id.localeCompare(b.id));

  // Group posts by translationKey so EN/DE counterparts cross-link via hreflang.
  const byKey = new Map<string, { en?: typeof posts[number]; de?: typeof posts[number] }>();
  for (const post of posts) {
    const key = post.data.translationKey ?? `__solo__${post.data.lang}__${post.id}`;
    const group = byKey.get(key) ?? {};
    group[post.data.lang as Lang] = post;
    byKey.set(key, group);
  }

  for (const group of byKey.values()) {
    const enHref = group.en ? `${baseUrl}/en/blog/${group.en.id}/` : undefined;
    const deHref = group.de ? `${baseUrl}/de/blog/${group.de.id}/` : undefined;

    for (const lang of ['en', 'de'] as Lang[]) {
      const post = group[lang];
      if (!post) continue;
      const lastmod = formatDate(post.data.updatedDate ?? post.data.pubDate);
      entries.push({
        loc: lang === 'en' ? enHref! : deHref!,
        enHref,
        deHref,
        lastmod,
        changefreq: 'monthly',
        priority: '0.6',
      });
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.map(renderUrl).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
