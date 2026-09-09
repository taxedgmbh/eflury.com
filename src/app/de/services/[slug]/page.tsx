import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SERVICES, getService } from '@/data/services';
import { serviceGraph, jsonLd } from '@/lib/schema';
import { PERSON } from '@/lib/site';

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(serviceGraph(service)) }}
      />

      <div className="mx-auto max-w-5xl px-6 pt-12">
        <nav aria-label="Brotkrumen" className="text-sm">
          <Link href="/de/services/" className="text-[var(--text-muted)] hover:text-[var(--text)]">
            Leistungen
          </Link>
        </nav>

        <header className="mt-8 border-b border-[var(--rule-strong)] pb-10">
          <p className="rail-label">{service.serviceType}</p>
          <h1 className="mt-3 max-w-3xl text-[2.2rem] leading-[1.1] font-semibold tracking-[-0.028em] sm:text-[3rem]">
            {service.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-[var(--text-muted)]">
            {service.heroDescription}
          </p>
        </header>
      </div>

      <section className="mx-auto max-w-5xl px-6 pt-12" aria-labelledby="problem">
        <div className="rail">
          <h2 id="problem" className="rail-label">
            Ausgangslage
          </h2>
          <div className="min-w-0">
            <p className="max-w-2xl font-serif text-xl leading-snug">{service.problemTitle}</p>
            <ul className="mt-6 max-w-2xl border-t border-[var(--rule)]">
              {service.problems.map((p) => (
                <li
                  key={p}
                  className="border-b border-[var(--rule)] py-3.5 font-serif leading-relaxed text-[var(--text-muted)]"
                >
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
            <p className="max-w-2xl font-serif text-xl leading-snug">{service.solutionTitle}</p>
            <p className="mt-5 max-w-2xl font-serif leading-relaxed text-[var(--text-muted)]">
              {service.solutionDescription}
            </p>

            <dl className="mt-10 max-w-2xl border-t border-[var(--rule)]">
              {service.benefits.map((b) => (
                <div key={b.title} className="border-b border-[var(--rule)] py-5">
                  <dt className="font-semibold">{b.title}</dt>
                  <dd className="mt-1.5 font-serif leading-relaxed text-[var(--text-muted)]">
                    {b.description}
                  </dd>
                </div>
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
            <p className="max-w-2xl font-serif text-xl leading-snug">{service.processTitle}</p>
            <ol className="mt-6 max-w-2xl border-t border-[var(--rule)]">
              {service.processSteps.map((step, i) => (
                <li
                  key={step.title}
                  className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4 border-b border-[var(--rule)] py-5"
                >
                  <span
                    aria-hidden
                    className="pt-0.5 font-medium tabular-nums text-[var(--accent)]"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{step.title}</p>
                    <p className="mt-1.5 font-serif leading-relaxed text-[var(--text-muted)]">
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
                  <summary className="cursor-pointer list-none font-medium marker:content-none">
                    {f.question}
                  </summary>
                  <p className="mt-2.5 font-serif leading-relaxed text-[var(--text-muted)]">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-5xl px-6 pt-20" aria-labelledby="cta">
        <div className="rail border-t border-[var(--rule-strong)] pt-8">
          <h2 id="cta" className="rail-label">
            Nächster Schritt
          </h2>
          <div className="min-w-0 max-w-2xl">
            <p className="font-serif text-xl leading-snug">{service.ctaTitle}</p>
            <p className="mt-4 font-serif leading-relaxed text-[var(--text-muted)]">
              {service.ctaDescription}
            </p>
            <p className="mt-6">
              <a
                href={`mailto:${PERSON.email}`}
                className="text-[var(--link)] underline underline-offset-4 hover:decoration-[var(--accent)]"
              >
                {service.ctaButtonText}
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pt-20" aria-labelledby="weitere">
        <div className="rail border-t border-[var(--rule)] pt-8">
          <h2 id="weitere" className="rail-label">
            Weitere Leistungen
          </h2>
          <ul className="min-w-0 space-y-2">
            {others.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/de/services/${s.slug}/`}
                  className="font-serif text-lg text-[var(--link)] hover:underline"
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
