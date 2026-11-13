import { getNotes } from './notes';
import { PAGES, type Lang } from './i18n';
import { SITE_URL } from './site';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const CHANNEL = {
  en: {
    title: 'Emanuel Flury · Notes',
    description: 'Notes by Emanuel Flury on building companies where finance, tax and technology meet.',
    language: 'en',
  },
  de: {
    title: 'Emanuel Flury · Notizen',
    description:
      'Notizen von Emanuel Flury über das Aufbauen von Unternehmen, in denen Finanzen, Steuern und Technologie zusammenkommen.',
    language: 'de-CH',
  },
  fr: {
    title: 'Emanuel Flury · Notes',
    description:
      'Notes d’Emanuel Flury sur la création d’entreprises à la croisée de la finance, de la fiscalité et de la technologie.',
    language: 'fr-CH',
  },
};

/** RSS 2.0 feed of the published notes in one language. */
export function rssResponse(lang: Lang) {
  const notes = getNotes(lang);
  const c = CHANNEL[lang];
  const list = `${SITE_URL}${PAGES.notes[lang]}`;
  const items = notes
    .map((n) => {
      const url = `${list}${n.slug}/`;
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
    <title>${c.title}</title>
    <link>${list}</link>
    <atom:link href="${SITE_URL}${PAGES.rss[lang]}" rel="self" type="application/rss+xml"/>
    <description>${esc(c.description)}</description>
    <language>${c.language}</language>
    <lastBuildDate>${updated}</lastBuildDate>
    <image>
      <url>${SITE_URL}/images/apple-touch-icon.png</url>
      <title>${c.title}</title>
      <link>${list}</link>
    </image>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
