/**
 * RSS feed — German blog posts
 * Autodiscovered via <link rel="alternate" type="application/rss+xml"> in MainLayout.
 */

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (
    await getCollection('blog', ({ data }) => data.lang === 'de' && !data.draft)
  ).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf() || a.id.localeCompare(b.id));

  return rss({
    title: 'eFlury Consulting Blog',
    description:
      'Experten-Einblicke zu KI-Automatisierung, Power BI und Geschäftsprozessoptimierung für Schweizer KMU. Praktische Anleitungen und Branchenanalysen.',
    site: context.site ?? 'https://eflury.com',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/de/blog/${post.id}/`,
      categories: post.data.tags,
    })),
    customData: '<language>de</language>',
  });
}
