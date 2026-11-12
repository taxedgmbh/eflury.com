import { getNotes } from '@/lib/notes';
import { SITE_URL } from '@/lib/site';

// Built once per deploy: notes only change with a commit.
export const dynamic = 'force-static';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** RSS 2.0 feed of the published notes at https://eflury.com/rss.xml. */
export function GET() {
  const notes = getNotes();
  const items = notes
    .map((n) => {
      const url = `${SITE_URL}/en/notes/${n.slug}/`;
      return `    <item>
      <title>${esc(n.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${n.date.toUTCString()}</pubDate>
      <description>${esc(n.description)}</description>
      <dc:creator>Emanuel Flury</dc:creator>
    </item>`;
    })
    .join('\n');
  const updated = (notes[0]?.date ?? new Date('2026-11-13')).toUTCString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Emanuel Flury · Notes</title>
    <link>${SITE_URL}/en/notes/</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <description>Notes by Emanuel Flury on building companies where finance, tax and technology meet.</description>
    <language>en</language>
    <lastBuildDate>${updated}</lastBuildDate>
    <image>
      <url>${SITE_URL}/images/apple-touch-icon.png</url>
      <title>Emanuel Flury · Notes</title>
      <link>${SITE_URL}/en/notes/</link>
    </image>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
