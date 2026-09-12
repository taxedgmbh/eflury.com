import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, AlertCircle, ChevronDown, ArrowRight, FileText } from 'lucide-react';
import { notFound } from 'next/navigation';
import { SERVICES, getService } from '@/data/services';
import { serviceGraph, jsonLd } from '@/lib/schema';
import { PERSON } from '@/lib/site';
import { illustrationFor } from '@/lib/illustrations';
import { Card, IconTile, Button } from '@/components/ui';
import { MethodTrustBand } from '@/components/MethodTrustBand';
import { DataQualityShowcase } from '@/components/DataQualityShowcase';
import { PhotoBand } from '@/components/PhotoBand';

export const dynamicParams = false;

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return {
    title: service.serviceType,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: `/de/services/${service.slug}/` },
    openGraph: {
      type: 'website',
      title: service.heroTitle,
      description: service.metaDescription,
      url: `/de/services/${service.slug}/`,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);
  const Illustration = illustrationFor(`service:${service.slug}`);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(serviceGraph(service)) }}
      />

      <div className="mx-auto max-w-5xl px-6 pt-12 pb-6">
        <nav aria-label="Brotkrumen" className="text-sm">
          <Link href="/de/services/" className="tap text-[var(--text-muted)] hover:text-[var(--text)]">
            Leistungen
          </Link>
        </nav>

        {/*
         * Only the ruled header is conditional. The illustration is not replaced
         * by the photograph — they do different jobs: the photograph says what
         * kind of work this is, the diagram says how it runs, and the drawings
         * are Emanuel's own.
         */}
        {service.photo ? null : (
          <header className="mt-8 border-b border-[var(--rule-strong)] pb-10">
            <p className="rail-label">{service.serviceType}</p>
            <h1 className="mt-3 max-w-3xl display">
              {service.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]">
              {service.heroDescription}
            </p>
          </header>
        )}
      </div>

      {service.photo ? (
        <PhotoBand
          id={service.photo}
          as="h1"
          size="opener"
          eyebrow={service.serviceType}
          heading={service.heroTitle}
          lead={service.heroDescription}
        />
      ) : null}

      {Illustration ? (
        <div className="mx-auto max-w-5xl px-6 pt-14">
          <div className="max-w-3xl">
            <Illustration />
          </div>
        </div>
      ) : null}

      <section className="mx-auto max-w-5xl px-6 pt-12" aria-labelledby="problem">
        <div className="rail">
          <h2 id="problem" className="rail-label">
            Ausgangslage
          </h2>
          <div className="min-w-0">
            <p className="max-w-2xl text-xl leading-snug">{service.problemTitle}</p>
            <ul className="mt-6 max-w-2xl border-t border-[var(--rule)]">
              {service.problems.map((p) => (
                <li
                  key={p}
                  className="flex gap-3 border-b border-[var(--rule)] py-3.5 leading-relaxed text-[var(--text-muted)]"
                >
                  <AlertCircle
                    className="mt-1 h-4 w-4 shrink-0 text-[var(--text-faint)]"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pt-16" aria-labelledby="ansatz">
        <div className="rail">
          <h2 id="ansatz" className="rail-label">
            Ansatz
          </h2>
          <div className="min-w-0">
            <p className="max-w-2xl text-xl leading-snug">{service.solutionTitle}</p>
            <p className="mt-5 max-w-2xl leading-relaxed text-[var(--text-muted)]">
              {service.solutionDescription}
            </p>

            <dl className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
              {service.benefits.map((b) => (
                <Card key={b.title} className="h-full">
                  <span className="inline-flex">
                    <IconTile icon={CheckCircle2} />
                  </span>
                  <dt className="mt-4 font-semibold">{b.title}</dt>
                  <dd className="mt-2 leading-relaxed text-[var(--text-muted)]">
                    {b.description}
                  </dd>
                </Card>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/*
        Numbered markers are used here and nowhere else on the site: the process
        genuinely is a sequence, so the numbers carry information rather than
        decorate the layout.
      */}
      <section className="mx-auto max-w-5xl px-6 pt-16" aria-labelledby="ablauf">
        <div className="rail">
          <h2 id="ablauf" className="rail-label">
            Ablauf
          </h2>
          <div className="min-w-0">
            <p className="max-w-2xl text-xl leading-snug">{service.processTitle}</p>
            <ol className="mt-6 max-w-2xl border-t border-[var(--rule)]">
              {service.processSteps.map((step, i) => (
                <li
                  key={step.title}
                  className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4 border-b border-[var(--rule)] py-5"
                >
                  <span
                    aria-hidden
                    className="pt-0.5 font-medium tabular-nums text-[var(--accent-text)]"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{step.title}</p>
                    <p className="mt-1.5 leading-relaxed text-[var(--text-muted)]">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {service.faqs.length > 0 ? (
        <section className="mx-auto max-w-5xl px-6 pt-16" aria-labelledby="fragen">
          <div className="rail">
            <h2 id="fragen" className="rail-label">
              Häufige Fragen
            </h2>
            <div className="min-w-0 max-w-2xl border-t border-[var(--rule)]">
              {service.faqs.map((f) => (
                <details key={f.question} className="group border-b border-[var(--rule)] py-4">
                  <summary className="flex cursor-pointer list-none items-start gap-3 font-medium marker:content-none">
                    <ChevronDown
                      className="mt-1 h-4 w-4 shrink-0 text-[var(--accent-text)] transition-transform group-open:rotate-180"
                      strokeWidth={2}
                      aria-hidden
                    />
                    {f.question}
                  </summary>
                  <p className="mt-2.5 ps-7 leading-relaxed text-[var(--text-muted)]">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {service.slug === 'datenqualitaet' ? (
        <section className="mx-auto max-w-5xl px-6 pt-16" aria-labelledby="konkret">
          <h2 id="konkret" className="sr-only">Ein konkretes Beispiel</h2>
          <DataQualityShowcase />
        </section>
      ) : null}

      {service.sampleReport ? (
        <section className="mx-auto max-w-5xl px-6 pt-16" aria-labelledby="muster">
          <div className="rail">
            <h2 id="muster" className="rail-label">Musterbericht</h2>
            <Card className="min-w-0 max-w-2xl">
              <span className="inline-flex"><IconTile icon={FileText} /></span>
              <p className="mt-5 text-xl font-bold tracking-tight">{service.sampleReport.title}</p>
              <p className="mt-3 leading-relaxed text-[var(--text-muted)]">
                {service.sampleReport.note}
              </p>
              <p className="mt-5">
                <a
                  href={service.sampleReport.href}
                  download
                  className="inline-flex items-center gap-1.5 font-semibold text-[var(--link)] hover:underline"
                >
                  {service.sampleReport.cta}
                  <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                </a>
              </p>
            </Card>
          </div>
        </section>
      ) : null}

      {service.relatedCaseStudy ? (
        <section className="mx-auto max-w-5xl px-6 pt-16" aria-labelledby="beleg">
          <div className="rail">
            <h2 id="beleg" className="rail-label">Beleg</h2>
            <Card className="min-w-0 max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.08em] text-[var(--accent-text)] uppercase">
                {service.relatedCaseStudy.metric}
              </p>
              <p className="mt-3 text-lg font-bold tracking-tight">
                {service.relatedCaseStudy.title}
              </p>
              <p className="mt-4">
                <Link
                  href={`${service.relatedCaseStudy.link.replace(/\/$/, '')}/`}
                  className="inline-flex items-center gap-1.5 font-semibold text-[var(--link)] hover:underline"
                >
                  Fallstudie lesen
                  <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                </Link>
              </p>
            </Card>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-5xl px-6 pt-20" aria-labelledby="cta">
        <div className="rail border-t border-[var(--rule-strong)] pt-8">
          <h2 id="cta" className="rail-label">
            Nächster Schritt
          </h2>
          <div className="min-w-0 max-w-2xl">
            <p className="text-xl leading-snug">{service.ctaTitle}</p>
            <p className="mt-4 leading-relaxed text-[var(--text-muted)]">
              {service.ctaDescription}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button href="/de/kontakt/">{service.ctaButtonText}</Button>
              <Button href="/de/pricing/" variant="ghost">Preise ansehen</Button>
            </div>
            <p className="mt-4 text-sm text-[var(--text-faint)]">
              Oder direkt:{' '}
              <a href={`mailto:${PERSON.email}`} className="text-[var(--link)] hover:underline">
                {PERSON.email}
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pt-16" aria-labelledby="vorgehen">
        <div className="rail">
          <h2 id="vorgehen" className="rail-label">Vorgehen &amp; Daten</h2>
          <div className="min-w-0">
            <MethodTrustBand />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pt-20" aria-labelledby="weitere">
        <div className="rail border-t border-[var(--rule)] pt-8">
          <h2 id="weitere" className="rail-label">
            Weitere Leistungen
          </h2>
          <ul className="min-w-0">
            {others.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/de/services/${s.slug}/`}
                  className="tap text-lg text-[var(--link)] hover:underline"
                >
                  {s.serviceType}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
