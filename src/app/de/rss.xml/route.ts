import { getAllPosts } from '@/lib/content';
import { SITE_URL, PERSON } from '@/lib/site';

/**
 * RSS feed, replacing astro-src/src/pages/de/rss.xml.ts.
 *
 * The old feed is live at https://eflury.com/de/rss.xml and returns 200 today,
 * so it may well have subscribers. Same URL, same shape — only the description
 * changes, to match the entrepreneur positioning.
 *
 * Written by hand rather than pulled from a package: it is forty lines, and one
 * fewer dependency in the build is worth more than the abstraction.
 */
export const dynamic = 'force-static';

function escape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function GET() {
  const posts = await getAllPosts();
  const updated = posts[0]?.pubDate ?? new Date();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/de/blog/${post.slug}/`;
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(post.description)}</description>
      <pubDate>${post.pubDate.toUTCString()}</pubDate>
      <dc:creator>${escape(post.author)}</dc:creator>
${post.tags.map((t) => `      <category>${escape(t)}</category>`).join('\n')}
    </item>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escape(PERSON.shortName)} — Blog</title>
    <link>${SITE_URL}/de/blog/</link>
    <atom:link href="${SITE_URL}/de/rss.xml" rel="self" type="application/rss+xml"/>
    <description>Beiträge zu KI-Automatisierung, Power BI und Prozessen in Schweizer KMU — aus der Praxis, mit Zahlen.</description>
    <language>de-CH</language>
    <lastBuildDate>${updated.toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
