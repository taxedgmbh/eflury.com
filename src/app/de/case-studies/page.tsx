import type { Metadata } from 'next';
import Link from 'next/link';
import { Building2, Calculator, BarChart3, Workflow, ArrowRight } from 'lucide-react';
import { CONTENT_PAGES } from '@/lib/pages';

const STUDY_ICONS = {
  '/de/case-studies/taxed-gmbh/': Building2,
  '/de/case-studies/finance-automation/': Calculator,
  '/de/case-studies/power-bi-reporting/': BarChart3,
  '/de/case-studies/llm-pipeline-showcase/': Workflow,
} as const;
import { contentPageGraph, jsonLd } from '@/lib/schema';
import { illustrationFor } from '@/lib/illustrations';
import { IconTile } from '@/components/ui';
import { PhotoBand } from '@/components/PhotoBand';

export const metadata: Metadata = {
  title: 'Referenzen',
  description:
    'Vier Projekte mit Zahlen: die eigene Treuhandfirma, Finanzautomatisierung, Power-BI-Reporting und ein vollständiger Mahnlauf.',
  alternates: { canonical: '/de/case-studies/' },
};

/*
 * Derived from CONTENT_PAGES rather than a second hand-written list, so a new
 * page cannot exist without appearing here. The Astro site kept three parallel
 * lists of the same routes and they drifted apart.
 */
const STUDIES = Object.values(CONTENT_PAGES).filter(
  // No content page is registered at the index route itself, so
  // startsWith is sufficient — an inequality guard here is provably dead
  // once the routes are literal types.
  (p) => p.route.startsWith('/de/case-studies/')
);

export default function CaseStudiesIndex() {
  const Illustration = illustrationFor('index:case-studies');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(contentPageGraph('/de/case-studies/', 'Referenzen')) }}
      />
      {/*
       * An open watch movement: the page's claim is that the numbers were
       * measured rather than estimated, and this is what measurement looks like
       * in a town that makes watches.
       */}
      <PhotoBand
        id="watch-movement"
        as="h1"
        size="opener"
        eyebrow="Referenzen"
        heading="Vier Projekte, gemessen statt geschätzt."
        lead="Jeweils mit dem, was vorher war, was gebaut wurde und was messbar herauskam. Das erste ist die eigene Firma."
      />

      <div className="mx-auto max-w-5xl px-6 pt-16 pb-10">

        {Illustration ? (
          <div className="mt-10">
            <Illustration />
          </div>
        ) : null}
      </div>
      <div className="mx-auto max-w-5xl px-6">
        <ul className="border-t border-[var(--rule-strong)]">
          {STUDIES.map((a) => (
            <li key={a.route} className="border-b border-[var(--rule)]">
              <Link href={a.route} className="rail group py-7">
                <span className="inline-flex"><IconTile icon={STUDY_ICONS[a.route as keyof typeof STUDY_ICONS] ?? Workflow} /></span>
                <div className="min-w-0">
                  <h2 className="text-xl font-semibold tracking-tight group-hover:text-[var(--link)]">
                    {a.title}
                  </h2>
                  <p className="mt-2 max-w-2xl leading-relaxed text-[var(--text-muted)]">
                    {a.description}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--link)]">
                    Fallstudie lesen
                    <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
