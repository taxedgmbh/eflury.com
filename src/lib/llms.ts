import { SITE_URL, PERSON, ADDRESS, VENTURES } from './site';
import { SERVICES } from '@/data/services';
import { CONTENT_PAGES } from './pages';
import { getAllPosts, formatDate } from './content';

/**
 * /llms.txt and /llms-full.txt, replacing the static files the Astro site
 * shipped. Both return 200 on eflury.com today, and robots.txt explicitly
 * invites GPTBot, ClaudeBot, PerplexityBot and Google-Extended — so these are
 * the documents those crawlers are told to read.
 *
 * Generated rather than hand-written, which is how the old pair went stale:
 * they still described a bilingual consultancy with a price list that had moved
 * on. Everything here comes from the same data the pages render.
 *
 * German only, and written about Emanuel in the third person, matching the site.
 */

function header(): string {
  return `# ${PERSON.name}

> Unternehmer in ${ADDRESS.addressLocality} (Kanton Solothurn), Schweiz. Führt drei Unternehmen und begleitet Schweizer KMU dabei, Routinearbeit an Software abzugeben — von der Analyse über den Bau bis zum Betrieb.

Eckdaten:
- 13 Jahre Automatisierungserfahrung in einem grossen internationalen Konzern
- Gründer der Taxed GmbH (Treuhand) — die Automatisierungen laufen zuerst in der eigenen Firma
- UiPath-RPA-zertifiziert, MA Economics-Finance (University of Aberdeen)
- Kontakt: ${PERSON.email} · ${PERSON.telephoneDisplay} · ${ADDRESS.streetAddress}, ${ADDRESS.postalCode} ${ADDRESS.addressLocality}
- Sprache: Deutsch. Die Website ist ausschliesslich deutschsprachig.
- Rechtsform: Einzelunternehmen, nicht im Handelsregister eingetragen, keine UID-Nummer

## Unternehmen

${VENTURES.map((v) => `- [${v.name}](${v.url}): ${v.what} (${v.role}, ${v.place})`).join('\n')}

## Leistungen

${SERVICES.map((s) => `- [${s.serviceType}](${SITE_URL}/de/services/${s.slug}/): ${s.metaDescription}`).join('\n')}

## Seiten

${Object.values(CONTENT_PAGES)
  .map((p) => `- [${p.title}](${SITE_URL}${p.route}): ${p.description}`)
  .join('\n')}`;
}

export async function llmsTxt(): Promise<string> {
  const posts = await getAllPosts();
  return `${header()}

## Blog

${posts
  .slice(0, 10)
  .map((p) => `- [${p.title}](${SITE_URL}/de/blog/${p.slug}/): ${p.description}`)
  .join('\n')}

Vollständige Fassung: ${SITE_URL}/llms-full.txt
`;
}

export async function llmsFullTxt(): Promise<string> {
  const posts = await getAllPosts();

  const services = SERVICES.map(
    (s) => `### ${s.serviceType}
${SITE_URL}/de/services/${s.slug}/

${s.heroTitle}

${s.heroDescription}

Ausgangslage: ${s.problems.join(' · ')}

Ansatz: ${s.solutionDescription}

Ablauf: ${s.processSteps.map((p, i) => `${i + 1}. ${p.title} — ${p.description}`).join(' ')}`
  ).join('\n\n');

  const faqs = SERVICES.flatMap((s) =>
    s.faqs.map((f) => `- **${f.question}** ${f.answer}`)
  ).join('\n');

  return `${header()}

## Leistungen im Detail

${services}

## Häufige Fragen

${faqs}

## Blog — alle Beiträge

${posts
  .map(
    (p) =>
      `- [${p.title}](${SITE_URL}/de/blog/${p.slug}/) — ${formatDate(p.pubDate)}. ${p.description}`
  )
  .join('\n')}
`;
}
