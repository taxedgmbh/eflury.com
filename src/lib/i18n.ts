import { FR } from './fr';

/*
 * Three languages: English (/en/, the default and x-default), German (/de/,
 * Swiss High German: "ss" not "ß", «Guillemets», CHF 1'000) and French (/fr/,
 * Swiss French: vous, «Guillemets» with non-breaking spaces, CHF 1'000).
 *
 * Components take a `lang` prop and pick their text with `pick(lang, en, de)`.
 * French comes from the FR dictionary (src/lib/fr.ts), keyed by the English
 * text: a missing entry fails the build, so no English slips onto /fr/.
 * Pages that exist in every language are listed in PAGES so the language
 * switch and the hreflang alternates always point at the twin page.
 */
export type Lang = 'en' | 'de' | 'fr';
export const LANGS: Lang[] = ['en', 'de', 'fr'];

export function fr(en: string): string {
  const v = FR[en];
  if (v === undefined) {
    if (process.env.FR_COLLECT) {
      console.warn(`FRMISSING ${JSON.stringify(en)}`);
      return en;
    }
    throw new Error(`Missing French translation for: ${JSON.stringify(en)}`);
  }
  return v;
}

export function pick<T>(lang: Lang, en: T, de: T): T {
  if (lang === 'de') return de;
  if (lang === 'fr') return (typeof en === 'string' ? fr(en) : en) as T;
  return en;
}

export type LangMap = Record<Lang, string>;

export const PAGES = {
  home: { en: '/en/', de: '/de/', fr: '/fr/' },
  notes: { en: '/en/notes/', de: '/de/notizen/', fr: '/fr/notes/' },
  imprint: { en: '/en/imprint/', de: '/de/impressum/', fr: '/fr/mentions-legales/' },
  privacy: { en: '/en/privacy/', de: '/de/datenschutz/', fr: '/fr/confidentialite/' },
  terms: { en: '/en/terms/', de: '/de/nutzungsbedingungen/', fr: '/fr/conditions-utilisation/' },
  newsletter: { en: '/en/newsletter/', de: '/de/newsletter/', fr: '/fr/newsletter/' },
  rss: { en: '/rss.xml', de: '/de/rss.xml', fr: '/fr/rss.xml' },
} as const satisfies Record<string, LangMap>;

export const HTML_LANG = { en: 'en', de: 'de-CH', fr: 'fr-CH' } as const;
export const OG_LOCALE = { en: 'en_GB', de: 'de_CH', fr: 'fr_CH' } as const;
const FEED_TITLE = { en: 'Emanuel Flury · Notes', de: 'Emanuel Flury · Notizen', fr: 'Emanuel Flury · Notes' };

/** Next.js `alternates` for a page; `map` lists the twin URL per language (missing = none). */
export function alternates(map: Partial<LangMap>, lang: Lang) {
  const languages: Record<string, string> = {};
  for (const l of LANGS) if (map[l]) languages[l] = map[l]!;
  if (map.en) languages['x-default'] = map.en;
  return {
    canonical: map[lang],
    languages,
    types: { 'application/rss+xml': [{ url: PAGES.rss[lang], title: FEED_TITLE[lang] }] },
  };
}

/**
 * Link-preview image for pages that set their own openGraph (Notes, legal):
 * Next drops the file-based opengraph-image there. Same artwork as the
 * opengraph-image.tsx in app/(en)/en, app/(de)/de and app/(fr)/fr.
 */
export const OG_IMAGE = {
  en: { url: '/images/og-en.png', width: 1200, height: 630, alt: 'Emanuel Flury · Entrepreneur' },
  de: { url: '/images/og-de.png', width: 1200, height: 630, alt: 'Emanuel Flury · Unternehmer' },
  fr: { url: '/images/og-fr.png', width: 1200, height: 630, alt: 'Emanuel Flury · Entrepreneur' },
} as const;

/** In-page anchor on the homepage of a language, e.g. home('de', 'contact') -> /de/#contact */
export const home = (lang: Lang, anchor?: string) => `${PAGES.home[lang]}${anchor ? `#${anchor}` : ''}`;

export const fmtDate = (lang: Lang, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat({ en: 'en-GB', de: 'de-CH', fr: 'fr-CH' }[lang], { timeZone: 'UTC', ...opts });

/** Twin pages for a static page key, e.g. alts('privacy'). */
export const alts = (key: keyof typeof PAGES): LangMap => PAGES[key];
