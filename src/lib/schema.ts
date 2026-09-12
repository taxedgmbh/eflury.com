import { SITE_URL, PERSON, ADDRESS, VENTURES, DEFAULT_LOCALE } from './site';
import type { Post } from './content';

/**
 * One @graph per page.
 *
 * The Astro site emitted overlapping JSON-LD from three places at once — a
 * LocalBusinessSchema on every page plus two inline blocks in MainLayout, one of
 * which was an English FAQPage that rendered on German pages and collided with
 * the per-service FAQPage. Two FAQPage nodes on one URL is a plausible reason FAQ
 * rich results never appeared.
 *
 * Here every node is emitted once, from one place, with stable @ids.
 */

const ID = {
  person: `${SITE_URL}/#person`,
  website: `${SITE_URL}/#website`,
  org: (id: string) => (id === 'eflury' ? `${SITE_URL}/#org` : `${ventureUrl(id)}/#org`),
} as const;

function ventureUrl(id: string): string {
  return VENTURES.find((v) => v.id === id)?.url ?? SITE_URL;
}

type Node = Record<string, unknown>;

/**
 * The three ventures as sibling Organizations, each with `founder` pointing at
 * the same Person @id. This is the repositioning expressed in a form a crawler
 * can read: one entity behind three domains. Pair it with reciprocal `sameAs`
 * from taxed.ch and skopa.ai back here.
 */
function identityNodes(): Node[] {
  const person: Node = {
    '@type': 'Person',
    '@id': ID.person,
    name: PERSON.name,
    alternateName: PERSON.shortName,
    email: PERSON.email,
    telephone: PERSON.telephone,
    url: SITE_URL,
    sameAs: [...PERSON.sameAs, ...VENTURES.filter((v) => v.external).map((v) => v.url)],
    address: {
      '@type': 'PostalAddress',
      streetAddress: ADDRESS.streetAddress,
      postalCode: ADDRESS.postalCode,
      addressLocality: ADDRESS.addressLocality,
      addressRegion: ADDRESS.addressRegion,
      addressCountry: ADDRESS.addressCountry,
    },
  };

  const orgs: Node[] = VENTURES.map((v) => ({
    '@type': 'Organization',
    '@id': ID.org(v.id),
    name: v.name,
    url: v.url,
    description: v.what,
    founder: { '@id': ID.person },
  }));

  const website: Node = {
    '@type': 'WebSite',
    '@id': ID.website,
    url: SITE_URL,
    name: `${PERSON.shortName} — Unternehmer`,
    inLanguage: DEFAULT_LOCALE,
    publisher: { '@id': ID.org('eflury') },
  };

  return [person, ...orgs, website];
}

function breadcrumbs(trail: { name: string; path: string }[]): Node {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function graph(...pageNodes: Node[]) {
  return { '@context': 'https://schema.org', '@graph': [...identityNodes(), ...pageNodes] };
}

export function homeGraph() {
  return graph({
    '@type': 'WebPage',
    '@id': `${SITE_URL}/de/#webpage`,
    url: `${SITE_URL}/de/`,
    isPartOf: { '@id': ID.website },
    about: { '@id': ID.person },
    inLanguage: DEFAULT_LOCALE,
  });
}

export function blogIndexGraph() {
  return graph(
    {
      '@type': 'Blog',
      '@id': `${SITE_URL}/de/blog/#blog`,
      url: `${SITE_URL}/de/blog/`,
      inLanguage: DEFAULT_LOCALE,
      publisher: { '@id': ID.org('eflury') },
    },
    breadcrumbs([
      { name: 'Start', path: '/de/' },
      { name: 'Blog', path: '/de/blog/' },
    ])
  );
}

export function blogPostGraph(post: Post) {
  const url = `${SITE_URL}/de/blog/${post.slug}/`;
  return graph(
    {
      '@type': 'BlogPosting',
      '@id': `${url}#post`,
      url,
      headline: post.title,
      description: post.description,
      datePublished: post.pubDate.toISOString(),
      dateModified: (post.updatedDate ?? post.pubDate).toISOString(),
      author: { '@id': ID.person },
      publisher: { '@id': ID.org('eflury') },
      inLanguage: DEFAULT_LOCALE,
      keywords: post.tags.join(', '),
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      image: `${SITE_URL}/de/blog/${post.slug}/opengraph-image/`,
    },
    breadcrumbs([
      { name: 'Start', path: '/de/' },
      { name: 'Blog', path: '/de/blog/' },
      { name: post.title, path: `/de/blog/${post.slug}/` },
    ])
  );
}

export function servicesIndexGraph() {
  return graph(
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/de/services/#page`,
      url: `${SITE_URL}/de/services/`,
      name: 'Leistungen',
      isPartOf: { '@id': ID.website },
      inLanguage: DEFAULT_LOCALE,
    },
    breadcrumbs([
      { name: 'Start', path: '/de/' },
      { name: 'Leistungen', path: '/de/services/' },
    ])
  );
}

/**
 * FAQPage is emitted only when the service actually renders those questions.
 * The Astro site put a global English FAQPage in MainLayout on every page,
 * which both collided with the per-service one and shipped English markup on
 * German URLs.
 */
export function serviceGraph(service: {
  slug: string;
  serviceType: string;
  heroTitle: string;
  metaDescription: string;
  faqs: { question: string; answer: string }[];
}) {
  const url = `${SITE_URL}/de/services/${service.slug}/`;
  const nodes: Node[] = [
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      url,
      name: service.serviceType,
      description: service.metaDescription,
      provider: { '@id': ID.org('eflury') },
      areaServed: { '@type': 'Country', name: 'Schweiz' },
      inLanguage: DEFAULT_LOCALE,
    },
    breadcrumbs([
      { name: 'Start', path: '/de/' },
      { name: 'Leistungen', path: '/de/services/' },
      { name: service.serviceType, path: `/de/services/${service.slug}/` },
    ]),
  ];

  if (service.faqs.length > 0) {
    nodes.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: service.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    });
  }

  return graph(...nodes);
}

export function legalGraph(slug: string, title: string) {
  return graph(
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/de/${slug}/#page`,
      url: `${SITE_URL}/de/${slug}/`,
      name: title,
      isPartOf: { '@id': ID.website },
      inLanguage: DEFAULT_LOCALE,
    },
    breadcrumbs([
      { name: 'Start', path: '/de/' },
      { name: title, path: `/de/${slug}/` },
    ])
  );
}

/**
 * `faqs` is optional and emitted only where the page actually renders those
 * questions on screen — /de/pricing/ does, with ten of them. Marking up
 * questions a visitor cannot see is exactly what Google's structured-data
 * guidelines forbid, and the site already has one FAQPage-related scar from the
 * Astro era.
 */
export function contentPageGraph(
  route: string,
  title: string,
  faqs?: { question: string; answer: string }[]
) {
  const nodes: Node[] = [
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${route}#page`,
      url: `${SITE_URL}${route}`,
      name: title,
      isPartOf: { '@id': ID.website },
      inLanguage: DEFAULT_LOCALE,
    },
    breadcrumbs([
      { name: 'Start', path: '/de/' },
      { name: title, path: route },
    ]),
  ];

  if (faqs?.length) {
    nodes.push({
      '@type': 'FAQPage',
      '@id': `${SITE_URL}${route}#faq`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    });
  }

  return graph(...nodes);
}

/** Renders a graph as a JSON-LD script tag payload. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
