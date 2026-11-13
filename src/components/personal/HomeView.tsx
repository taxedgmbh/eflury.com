import type { Metadata } from 'next';
import { BrandHero } from './BrandHero';
import { PersonalFooter } from './PersonalFooter';
import { PersonalHeader } from './PersonalHeader';
import { PersonalHome } from './PersonalHome';
import { SOCIALS } from './data';
import { personalHomeGraph, jsonLd } from '@/lib/schema';
import { HOME_META } from '@/lib/site';
import { alternates, LANGS, OG_LOCALE, PAGES, pick, type Lang } from '@/lib/i18n';

export function homeMetadata(lang: Lang): Metadata {
  const { title, description } = HOME_META[lang];
  return {
    title: { absolute: title },
    description,
    alternates: alternates(PAGES.home, lang),
    // Next replaces the layout's openGraph object rather than merging it, so
    // every field is restated here.
    openGraph: {
      type: 'profile',
      firstName: 'Emanuel',
      lastName: 'Flury',
      url: PAGES.home[lang],
      title,
      description,
      siteName: 'Emanuel Flury',
      locale: OG_LOCALE[lang],
      alternateLocale: LANGS.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

/**
 * The personal-brand homepage, /en/ and /de/. Design and copy as approved
 * section by section (brand/PERSONAL-BRAND-HOMEPAGE.md).
 */
export function HomeView({ lang }: { lang: Lang }) {
  return (
    <div className="pb">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(personalHomeGraph(SOCIALS.map((s) => s.href), lang)) }}
      />
      <a href="#main-content" className="skip">
        {pick(lang, 'Skip to content', 'Zum Inhalt springen')}
      </a>
      <PersonalHeader lang={lang} />
      <main id="main-content">
        <BrandHero lang={lang} />
        <PersonalHome lang={lang} />
      </main>
      <PersonalFooter lang={lang} />
    </div>
  );
}
