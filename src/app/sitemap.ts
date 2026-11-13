import type { MetadataRoute } from 'next';
import { getNotes } from '@/lib/notes';
import { PAGES, type Lang } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site';

/*
 * Indexable pages only: the imprint, privacy policy and terms are noindex.
 * Every page lists its twin in the other language (hreflang). The homepage
 * changes with every build (YouTube feed, copy), so lastModified is the build
 * time.
 */
const abs = (p: string) => `${SITE_URL}${p}`;
const langs = (en: string, de?: string) => ({
  languages: { en: abs(en), ...(de ? { de: abs(de) } : {}), 'x-default': abs(en) },
});

export default function sitemap(): MetadataRoute.Sitemap {
  const en = getNotes('en');
  const de = getNotes('de');
  const latest = (l: Lang) => (l === 'de' ? de : en)[0]?.date ?? new Date();
  return [
    ...(['en', 'de'] as const).map((l) => ({
      url: abs(PAGES.home[l]),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
      alternates: langs(PAGES.home.en, PAGES.home.de),
    })),
    ...(['en', 'de'] as const).map((l) => ({
      url: abs(PAGES.notes[l]),
      lastModified: latest(l),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: langs(PAGES.notes.en, PAGES.notes.de),
    })),
    ...en.map((n) => {
      const url = `${PAGES.notes.en}${n.slug}/`;
      const twin = n.twin ? `${PAGES.notes.de}${n.twin}/` : undefined;
      return { url: abs(url), lastModified: n.date, priority: 0.7, alternates: langs(url, twin) };
    }),
    ...de.map((n) => {
      const url = `${PAGES.notes.de}${n.slug}/`;
      const twin = n.twin ? `${PAGES.notes.en}${n.twin}/` : undefined;
      return {
        url: abs(url),
        lastModified: n.date,
        priority: 0.7,
        alternates: twin ? langs(twin, url) : { languages: { de: abs(url) } },
      };
    }),
  ];
}
