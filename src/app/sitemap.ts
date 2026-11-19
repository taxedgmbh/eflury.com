import type { MetadataRoute } from 'next';
import { getNotes } from '@/lib/notes';
import { LANGS, PAGES, type Lang } from '@/lib/i18n';
import { PORTRAIT, SITE_URL } from '@/lib/site';
import { PINNED_VIDEO } from '@/lib/youtube';

/*
 * Indexable pages only: the imprint, privacy policy and terms are noindex.
 * Every page lists its twins in the other languages (hreflang). The homepage
 * changes with every build (YouTube feed, copy), so lastModified is the build
 * time.
 */
const abs = (p: string) => `${SITE_URL}${p}`;
function languages(map: Partial<Record<Lang, string>>) {
  const out: Record<string, string> = {};
  for (const l of LANGS) if (map[l]) out[l] = abs(map[l]!);
  if (map.en) out['x-default'] = abs(map.en);
  return { languages: out };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const l of LANGS) {
    const notes = getNotes(l);
    entries.push(
      {
        url: abs(PAGES.home[l]),
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
        alternates: languages(PAGES.home),
        images: [abs(PORTRAIT.url), abs(`/images/og-${l}.png`)],
        videos: [
          {
            title: PINNED_VIDEO.title,
            description: 'Emanuel Flury introduces himself and his work in tech, tax and real estate in 70 seconds.',
            thumbnail_loc: abs(PINNED_VIDEO.thumb!.src),
            player_loc: `https://www.youtube-nocookie.com/embed/${PINNED_VIDEO.id}`,
            publication_date: PINNED_VIDEO.published.toISOString(),
            duration: 70,
          },
        ],
      },
      {
        url: abs(PAGES.notes[l]),
        lastModified: notes[0]?.date ?? new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: languages(PAGES.notes),
      },
      ...notes.map((n) => {
        const urls = Object.fromEntries(
          Object.entries(n.twins).map(([tl, slug]) => [tl, `${PAGES.notes[tl as Lang]}${slug}/`]),
        ) as Partial<Record<Lang, string>>;
        return { url: abs(urls[l]!), lastModified: n.date, priority: 0.7, alternates: languages(urls) };
      }),
    );
  }
  return entries;
}
