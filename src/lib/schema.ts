import { SITE_URL, PERSON, PORTRAIT, HOME_META } from './site';
import { HTML_LANG, PAGES, type Lang } from './i18n';
import { REGISTRY } from '@/components/personal/data';
import { PINNED_VIDEO } from './youtube';

/** Stable @id for the one Person this site is about. */
const ID = { person: `${SITE_URL}/#person`, video: `${SITE_URL}/#intro-video` } as const;

/** Topics with a Wikipedia entry, so search engines and LLMs can tie them to known entities. */
const KNOWS_ABOUT = [
  ['Artificial intelligence', 'https://en.wikipedia.org/wiki/Artificial_intelligence'],
  ['Quantum computing', 'https://en.wikipedia.org/wiki/Quantum_computing'],
  ['Business process automation', 'https://en.wikipedia.org/wiki/Business_process_automation'],
  ['Taxation in Switzerland', 'https://en.wikipedia.org/wiki/Taxation_in_Switzerland'],
  ['Finance', 'https://en.wikipedia.org/wiki/Finance'],
  ['Transfer pricing', 'https://en.wikipedia.org/wiki/Transfer_pricing'],
  ['Real estate', 'https://en.wikipedia.org/wiki/Real_estate'],
].map(([name, sameAs]) => ({ '@type': 'Thing', name, sameAs }));

/** Renders a graph as a JSON-LD script tag payload. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/**
 * The homepage as a ProfilePage (Google's type for a page about one person)
 * whose mainEntity is the Person, plus the WebSite node Google reads the site
 * name from. Roles exactly as on LinkedIn.
 */
export function personalHomeGraph(socials: readonly string[], lang: Lang = 'en') {
  const url = `${SITE_URL}${PAGES.home[lang]}`;
  const meta = HOME_META[lang];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: 'Emanuel Flury',
        alternateName: ['eflury.com', 'Emanuel Aaron Flury'],
        description: meta.description,
        inLanguage: ['en', 'de-CH', 'fr-CH'],
        publisher: { '@id': ID.person },
        about: { '@id': ID.person },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${url}#webpage`,
        url,
        name: meta.title,
        description: meta.description,
        inLanguage: HTML_LANG[lang],
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: { '@id': ID.person },
        about: { '@id': ID.person },
        primaryImageOfPage: { '@id': `${SITE_URL}/#portrait` },
        dateModified: new Date().toISOString(),
      },
      {
        '@type': 'VideoObject',
        '@id': ID.video,
        name: PINNED_VIDEO.title,
        description: { en: 'Emanuel Flury introduces himself and his work in tech, tax and real estate in 70 seconds.', de: 'Emanuel Flury stellt sich und seine Arbeit in Technologie, Steuern und Immobilien in 70 Sekunden vor.', fr: 'Emanuel Flury se présente, ainsi que son travail dans la technologie, la fiscalité et l’immobilier, en 70 secondes.' }[lang],
        thumbnailUrl: [`${SITE_URL}${PINNED_VIDEO.thumb!.src}`, `https://i.ytimg.com/vi/${PINNED_VIDEO.id}/hqdefault.jpg`],
        uploadDate: PINNED_VIDEO.published.toISOString(),
        duration: 'PT1M10S',
        contentUrl: `https://www.youtube.com/watch?v=${PINNED_VIDEO.id}`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${PINNED_VIDEO.id}`,
        inLanguage: 'en',
        author: { '@id': ID.person },
        about: { '@id': ID.person },
      },
      {
        '@type': 'Person',
        '@id': ID.person,
        name: PERSON.shortName,
        alternateName: PERSON.name,
        givenName: 'Emanuel',
        additionalName: 'Aaron',
        familyName: 'Flury',
        jobTitle: { en: 'Entrepreneur', de: 'Unternehmer', fr: 'Entrepreneur' }[lang],
        description: meta.description,
        email: `mailto:${PERSON.email}`,
        telephone: PERSON.telephone,
        url: `${SITE_URL}/en/`,
        mainEntityOfPage: { '@id': `${url}#webpage` },
        subjectOf: { '@id': ID.video },
        image: {
          '@type': 'ImageObject',
          '@id': `${SITE_URL}/#portrait`,
          url: `${SITE_URL}${PORTRAIT.url}`,
          width: PORTRAIT.width,
          height: PORTRAIT.height,
          caption: 'Emanuel Flury',
        },
        sameAs: [...socials, 'https://www.wikidata.org/wiki/Q142211195', 'https://skopa.ai', 'https://taxed.ch'],
        nationality: { '@type': 'Country', name: 'Switzerland' },
        address: { '@type': 'PostalAddress', addressLocality: 'Grenchen', addressRegion: 'SO', addressCountry: 'CH' },
        homeLocation: {
          '@type': 'Place',
          name: 'Grenchen, Canton of Solothurn, Switzerland',
          sameAs: 'https://en.wikipedia.org/wiki/Grenchen',
        },
        hasOccupation: [
          { '@type': 'Occupation', name: 'Entrepreneur', occupationLocation: { '@type': 'Country', name: 'Switzerland' } },
          { '@type': 'Occupation', name: 'Managing Director', occupationLocation: { '@type': 'Country', name: 'Switzerland' } },
        ],
        alumniOf: [
          { '@type': 'CollegeOrUniversity', name: 'University of Aberdeen', url: 'https://www.abdn.ac.uk' },
          { '@type': 'CollegeOrUniversity', name: 'University of Wisconsin–La Crosse', url: 'https://www.uwlax.edu' },
        ],
        hasCredential: [
          ['degree', 'Master of Arts in Economics-Finance, University of Aberdeen', '2016'],
          ['certification', 'UiPath Certified RPA Developer', '2022'],
          ['certification', 'Microsoft Certified: Power BI Data Analyst Associate', '2021'],
          ['certification', 'Alteryx Designer Core', '2021'],
          ['certification', 'RYA Day Skipper', '2024'],
        ].map(([credentialCategory, name, dateCreated]) => ({
          '@type': 'EducationalOccupationalCredential',
          credentialCategory,
          name,
          dateCreated,
        })),
        knowsLanguage: ['de', 'en', 'fr'],
        knowsAbout: KNOWS_ABOUT,
        worksFor: [{ '@id': 'https://skopa.ai/#org' }, { '@id': 'https://taxed.ch/#org' }],
      },
      ...(
        [
          ['https://skopa.ai', 'Skopa AG', REGISTRY.skopa, 'Grenchen', 'Artificial intelligence and quantum computing.', 'Q142211189'],
          ['https://taxed.ch', 'Taxed GmbH', REGISTRY.taxed, 'Biel/Bienne', 'Tax advice for expats living in Switzerland.', 'Q142211194'],
        ] as const
      ).map(([orgUrl, name, reg, seat, description, wikidata]) => ({
        '@type': 'Organization',
        '@id': `${orgUrl}/#org`,
        name,
        description,
        url: orgUrl,
        foundingDate: reg.founded,
        founder: { '@id': ID.person },
        location: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: seat, addressCountry: 'CH' } },
        identifier: { '@type': 'PropertyValue', propertyID: 'CH-UID', value: reg.uid },
        sameAs: [reg.zefix, `https://www.wikidata.org/wiki/${wikidata}`],
      })),
    ],
  };
}
