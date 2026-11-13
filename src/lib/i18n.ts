/*
 * Two languages: English (/en/, the default and x-default) and German
 * (/de/, Swiss High German: "ss" not "ß", «Guillemets», CHF 1'000).
 *
 * Components take a `lang` prop and pick their text with `pick(lang, en, de)`.
 * Pages that exist in both languages are listed in PAGES so the header's
 * language switch and the hreflang alternates always point at the twin page.
 */
export type Lang = 'en' | 'de';
export const LANGS: Lang[] = ['en', 'de'];

export const pick = <T,>(lang: Lang, en: T, de: T): T => (lang === 'de' ? de : en);

export const PAGES = {
  home: { en: '/en/', de: '/de/' },
  notes: { en: '/en/notes/', de: '/de/notizen/' },
  imprint: { en: '/en/imprint/', de: '/de/impressum/' },
  privacy: { en: '/en/privacy/', de: '/de/datenschutz/' },
  terms: { en: '/en/terms/', de: '/de/nutzungsbedingungen/' },
  newsletter: { en: '/en/newsletter/', de: '/de/newsletter/' },
  rss: { en: '/rss.xml', de: '/de/rss.xml' },
} as const;

export type Pair = { en: string; de: string };

/** Next.js `alternates` for a page that exists in both languages. */
export function alternates(pair: Pair, lang: Lang) {
  return {
    canonical: pair[lang],
    languages: { en: pair.en, de: pair.de, 'x-default': pair.en },
    types: {
      'application/rss+xml': [
        { url: PAGES.rss[lang], title: pick(lang, 'Emanuel Flury · Notes', 'Emanuel Flury · Notizen') },
      ],
    },
  };
}

export const OG_LOCALE = { en: 'en_GB', de: 'de_CH' } as const;

/**
 * Link-preview image for pages that set their own openGraph (Notes, legal):
 * Next drops the file-based opengraph-image there. Same artwork as
 * app/(en)/en/opengraph-image.tsx and app/(de)/de/opengraph-image.tsx.
 */
export const OG_IMAGE = {
  en: { url: '/images/og-en.png', width: 1200, height: 630, alt: 'Emanuel Flury · Entrepreneur' },
  de: { url: '/images/og-de.png', width: 1200, height: 630, alt: 'Emanuel Flury · Unternehmer' },
} as const;

/** In-page anchor on the homepage of a language, e.g. home('de', 'contact') -> /de/#contact */
export const home = (lang: Lang, anchor?: string) => `${PAGES.home[lang]}${anchor ? `#${anchor}` : ''}`;

export const fmtDate = (lang: Lang, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(lang === 'de' ? 'de-CH' : 'en-GB', { timeZone: 'UTC', ...opts });
