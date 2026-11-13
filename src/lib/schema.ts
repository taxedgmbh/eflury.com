import { SITE_URL, PERSON, PORTRAIT, HOME_TITLE, HOME_DESCRIPTION, HOME_TITLE_DE, HOME_DESCRIPTION_DE } from './site';
import { PAGES, type Lang } from './i18n';
import { REGISTRY } from '@/components/personal/data';

/** Stable @id for the one Person this site is about. */
const ID = { person: `${SITE_URL}/#person` } as const;

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
  const de = lang === 'de';
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: 'Emanuel Flury',
        inLanguage: ['en', 'de-CH'],
        publisher: { '@id': ID.person },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${url}#webpage`,
        url,
        name: de ? HOME_TITLE_DE : HOME_TITLE,
        description: de ? HOME_DESCRIPTION_DE : HOME_DESCRIPTION,
        inLanguage: de ? 'de-CH' : 'en',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: { '@id': ID.person },
        primaryImageOfPage: { '@id': `${SITE_URL}/#portrait` },
      },
      {
        '@type': 'Person',
        '@id': ID.person,
        name: PERSON.shortName,
        alternateName: PERSON.name,
        givenName: 'Emanuel',
        additionalName: 'Aaron',
        familyName: 'Flury',
        jobTitle: de ? 'Unternehmer' : 'Entrepreneur',
        description: de ? HOME_DESCRIPTION_DE : HOME_DESCRIPTION,
        email: `mailto:${PERSON.email}`,
        telephone: PERSON.telephone,
        url: `${SITE_URL}/en/`,
        image: {
          '@type': 'ImageObject',
          '@id': `${SITE_URL}/#portrait`,
          url: `${SITE_URL}${PORTRAIT.url}`,
          width: PORTRAIT.width,
          height: PORTRAIT.height,
          caption: 'Emanuel Flury',
        },
        sameAs: [...socials, 'https://skopa.ai', 'https://taxed.ch'],
        nationality: { '@type': 'Country', name: 'Switzerland' },
        address: { '@type': 'PostalAddress', addressLocality: 'Grenchen', addressRegion: 'SO', addressCountry: 'CH' },
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
        knowsAbout: ['Artificial intelligence', 'Quantum computing', 'Business automation', 'Swiss tax', 'Finance', 'Residential real estate'],
        worksFor: [{ '@id': 'https://skopa.ai/#org' }, { '@id': 'https://taxed.ch/#org' }],
      },
      ...(
        [
          ['https://skopa.ai', 'Skopa AG', REGISTRY.skopa, 'Grenchen'],
          ['https://taxed.ch', 'Taxed GmbH', REGISTRY.taxed, 'Biel/Bienne'],
        ] as const
      ).map(([orgUrl, name, reg, seat]) => ({
        '@type': 'Organization',
        '@id': `${orgUrl}/#org`,
        name,
        url: orgUrl,
        foundingDate: reg.founded,
        founder: { '@id': ID.person },
        location: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: seat, addressCountry: 'CH' } },
        identifier: { '@type': 'PropertyValue', propertyID: 'CH-UID', value: reg.uid },
        sameAs: [reg.zefix],
      })),
    ],
  };
}
