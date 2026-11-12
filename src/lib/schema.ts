import { SITE_URL, PERSON } from './site';

/** Stable @id for the one Person this site is about. */
const ID = { person: `${SITE_URL}/#person` } as const;

/** Renders a graph as a JSON-LD script tag payload. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/**
 * The personal homepage: one Person, roles exactly as on LinkedIn, and the
 * page itself.
 */
export function personalHomeGraph(socials: readonly string[]) {
  const url = `${SITE_URL}/en/`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': ID.person,
        name: PERSON.shortName,
        alternateName: PERSON.name,
        jobTitle: 'Entrepreneur',
        email: PERSON.email,
        url,
        sameAs: [...socials, 'https://skopa.ai', 'https://taxed.ch'],
        address: { '@type': 'PostalAddress', addressLocality: 'Grenchen', addressCountry: 'CH' },
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Aberdeen' },
        worksFor: [
          { '@type': 'Organization', name: 'Skopa AG', url: 'https://skopa.ai' },
          { '@type': 'Organization', name: 'Taxed GmbH', url: 'https://taxed.ch' },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: 'Emanuel Flury · Entrepreneur',
        about: { '@id': ID.person },
        inLanguage: 'en',
      },
    ],
  };
}
