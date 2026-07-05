/**
 * RSS feed — English blog posts
 * Autodiscovered via <link rel="alternate" type="application/rss+xml"> in MainLayout.
 */

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (
    await getCollection('blog', ({ data }) => data.lang === 'en' && !data.draft)
  ).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf() || a.id.localeCompare(b.id));

  return rss({
    title: 'eFlury Consulting Blog',
    description:
      'Expert insights on AI automation, Power BI, and business process optimization for Swiss SMEs. Practical guides and industry analysis.',
    site: context.site ?? 'https://eflury.com',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/en/blog/${post.id}/`,
      categories: post.data.tags,
    })),
    customData: '<language>en</language>',
  });
}
