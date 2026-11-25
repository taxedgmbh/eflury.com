import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, HelpCircle } from 'lucide-react';
import { PersonalFooter } from './PersonalFooter';
import { PersonalHeader } from './PersonalHeader';
import { cards, RealEstate } from './RealEstate';
import { getNotes } from '@/lib/notes';
import { jsonLd } from '@/lib/schema';
import { SITE_URL } from '@/lib/site';
import { alternates, LANGS, OG_LOCALE, PAGES, pick, type Lang } from '@/lib/i18n';

/*
 * EF Real Estate's own address: eflury.com/en/real-estate/ (/de/immobilien/,
 * /fr/immobilier/; short link eflury.com/real-estate). The homepage section plus
 * an introduction, questions and answers, and the related note. Owner rule as on
 * the homepage: type and region only, never addresses, tenants, values or financing.
 * The FAQ text is shown on the page and repeated 1:1 in the FAQPage data.
 */
const BRAND_ID = `${SITE_URL}/#ef-real-estate`;
/** The note on the abolition of the imputed rental value, the one about homeowners. */
const NOTE_EN = 'eigenmietwert-abolition';

function meta(lang: Lang) {
  return {
    title: pick(
      lang,
      'EF Real Estate · Residential property · Emanuel Flury',
      'EF Real Estate · Wohnimmobilien · Emanuel Flury',
    ),
    description: pick(
      lang,
      'EF Real Estate: residential property in the cantons of Solothurn and Bern, held by Emanuel Flury as private equity. Own home, a rental house and an apartment.',
      'EF Real Estate: Wohnimmobilien in den Kantonen Solothurn und Bern, von Emanuel Flury als Private Equity gehalten. Eigenheim, ein vermietetes Haus und eine Wohnung.',
    ),
  };
}

function faq(lang: Lang) {
  const t = (en: string, de: string) => pick(lang, en, de);
  return [
    {
      q: t('What is EF Real Estate?', 'Was ist EF Real Estate?'),
      a: t(
        'EF Real Estate is the name for the residential property that Emanuel Flury holds privately, as private equity. It is not a company. The owner is Emanuel Flury.',
        'EF Real Estate ist der Name für die Wohnimmobilien, die Emanuel Flury privat als Private Equity hält. Es ist keine Firma. Eigentümer ist Emanuel Flury.',
      ),
    },
    {
      q: t('Where are the properties?', 'Wo liegen die Liegenschaften?'),
      a: t(
        'In the cantons of Solothurn and Bern: the own home in the Lebern district, the rental house in the Wasseramt district (both Canton of Solothurn) and the apartment in the Seeland (Canton of Bern).',
        'In den Kantonen Solothurn und Bern: das Eigenheim im Bezirk Lebern, das vermietete Haus im Bezirk Wasseramt (beide Kanton Solothurn) und die Wohnung im Seeland (Kanton Bern).',
      ),
    },
    {
      q: t('Why are there no addresses or figures?', 'Warum gibt es keine Adressen oder Zahlen?'),
      a: t(
        'To protect the privacy of the tenants and of my own home. The page shows each property by type and region only, without addresses, tenants, values or financing.',
        'Zum Schutz der Privatsphäre der Mieter und meines eigenen Zuhauses. Die Seite zeigt jede Liegenschaft nur nach Art und Region, ohne Adressen, Mieter, Werte oder Finanzierung.',
      ),
    },
    {
      q: t('How can I get in touch about real estate?', 'Wie erreiche ich Sie zum Thema Immobilien?'),
      a: t(
        'By email at me@eflury.com, or by WhatsApp or LinkedIn. All three are in the contact section below.',
        'Per E-Mail an me@eflury.com, per WhatsApp oder über LinkedIn. Alle drei stehen im Kontaktbereich weiter unten.',
      ),
    },
  ];
}

export function realEstateMetadata(lang: Lang): Metadata {
  const { title, description } = meta(lang);
  return {
    title: { absolute: title },
    description,
    alternates: alternates(PAGES.realEstate, lang),
    // the preview image comes from opengraph-image.tsx next to each page
    openGraph: {
      type: 'website',
      url: PAGES.realEstate[lang],
      title,
      description,
      siteName: 'Emanuel Flury',
      locale: OG_LOCALE[lang],
      alternateLocale: LANGS.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export function RealEstateView({ lang }: { lang: Lang }) {
  const t = (en: string, de: string) => pick(lang, en, de);
  const url = `${SITE_URL}${PAGES.realEstate[lang]}`;
  const { title, description } = meta(lang);
  const items = faq(lang);
  const note = getNotes(lang).find((n) => n.twins.en === NOTE_EN);
  const props = cards(lang);
  const img = (base: string) => `${SITE_URL}${base}-1600.webp`;
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: lang === 'en' ? 'en' : `${lang}-CH`,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: [{ '@id': BRAND_ID }, { '@id': `${SITE_URL}/#person` }],
        mainEntity: { '@id': `${url}#properties` },
        primaryImageOfPage: props[0].photos ? img(props[0].photos[0].base) : undefined,
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@type': 'Brand',
        '@id': BRAND_ID,
        name: 'EF Real Estate',
        description: t('Private equity in residential property.', 'Private Equity in Wohnimmobilien.'),
        logo: `${SITE_URL}/images/brands/ef-real-estate-mark.svg`,
        url: `${SITE_URL}${PAGES.realEstate.en}`,
      },
      {
        '@type': 'ItemList',
        '@id': `${url}#properties`,
        name: t('EF Real Estate properties', 'Liegenschaften von EF Real Estate'),
        numberOfItems: props.length,
        itemListElement: props.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': p.schema.type,
            name: `${p.type} · ${p.region}`,
            description: p.text,
            image: p.photos?.map((ph) => img(ph.base)),
            containedInPlace: {
              '@type': 'AdministrativeArea',
              name: p.schema.district[0],
              sameAs: p.schema.district[1],
              containedInPlace: { '@type': 'AdministrativeArea', name: p.schema.canton[0], sameAs: p.schema.canton[1] },
            },
          },
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: items.map((i) => ({
          '@type': 'Question',
          name: i.q,
          acceptedAnswer: { '@type': 'Answer', text: i.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
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
        <section className="band" aria-labelledby="re-faq-title">
          <div className="wrap">
            <p className="eyebrow">{t('Questions', 'Fragen')}</p>
            <h2 id="re-faq-title">{t('EF Real Estate in brief.', 'EF Real Estate in Kürze.')}</h2>
            <div className="pv-cards">
              {items.map(({ q, a }) => (
                <article key={q} className="pv-french rd-card">
                  <span className="pv-icon" aria-hidden>
                    <HelpCircle size={22} />
                  </span>
                  <div>
                    <h3>{q}</h3>
                    <p>{a}</p>
                  </div>
                </article>
              ))}
            </div>
            {note && (
              <p className="rd-note">
                {t('Related note:', 'Passende Notiz:')}{' '}
                <Link href={`${PAGES.notes[lang]}${note.slug}/`}>
                  {note.title} <ArrowRight size={14} aria-hidden />
                </Link>
              </p>
            )}
          </div>
        </section>
      </main>
      <PersonalFooter lang={lang} />
    </div>
  );
}
