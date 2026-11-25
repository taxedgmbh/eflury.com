import type { Metadata } from 'next';
import { PersonalFooter } from './PersonalFooter';
import { PersonalHeader } from './PersonalHeader';
import { RealEstate } from './RealEstate';
import { jsonLd } from '@/lib/schema';
import { SITE_URL } from '@/lib/site';
import { alternates, LANGS, OG_LOCALE, PAGES, pick, type Lang } from '@/lib/i18n';

/*
 * EF Real Estate's own address: eflury.com/en/real-estate/ (/de/immobilien/,
 * /fr/immobilier/; short link eflury.com/real-estate). The same section as on the
 * homepage. Owner rule as there: type and region only.
 */
const META = (lang: Lang) => ({
  title: 'EF Real Estate · Emanuel Flury',
  description: pick(
    lang,
    'EF Real Estate: residential property in the cantons of Solothurn and Bern, held by Emanuel Flury as private equity. Own home, a rental house and an apartment.',
    'EF Real Estate: Wohnimmobilien in den Kantonen Solothurn und Bern, von Emanuel Flury als Private Equity gehalten. Eigenheim, ein vermietetes Haus und eine Wohnung.',
  ),
});

export function realEstateMetadata(lang: Lang): Metadata {
  const { title, description } = META(lang);
  return {
    title: { absolute: title },
    description,
    alternates: alternates(PAGES.realEstate, lang),
    openGraph: {
      type: 'website',
      url: PAGES.realEstate[lang],
      title,
      description,
      siteName: 'Emanuel Flury',
      locale: OG_LOCALE[lang],
      alternateLocale: LANGS.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      images: [{ url: '/images/real-estate/own-home-exterior-1600.webp', width: 1600, height: 976, alt: 'EF Real Estate' }],
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export function RealEstateView({ lang }: { lang: Lang }) {
  const url = `${SITE_URL}${PAGES.realEstate[lang]}`;
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: META(lang).title,
        description: META(lang).description,
        inLanguage: lang === 'en' ? 'en' : `${lang}-CH`,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#person` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Emanuel Flury', item: `${SITE_URL}${PAGES.home[lang]}` },
          { '@type': 'ListItem', position: 2, name: 'EF Real Estate', item: url },
        ],
      },
    ],
  };
  return (
    <div className="pb">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(ld) }} />
      <a href="#main-content" className="skip">
        {pick(lang, 'Skip to content', 'Zum Inhalt springen')}
      </a>
      <PersonalHeader lang={lang} alts={PAGES.realEstate} />
      <main id="main-content">
        <RealEstate lang={lang} page />
      </main>
      <PersonalFooter lang={lang} />
    </div>
  );
}
