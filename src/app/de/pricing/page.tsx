import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { CONTENT_PAGES } from '@/lib/pages';
import { contentPageGraph, jsonLd } from '@/lib/schema';
import {
  PACKAGES,
  AUDIT_CREDIT,
  ADD_ONS,
  PRICING_FAQS,
  COMPARISON_ROWS,
  chf,
} from '@/data/pricing';
import { PhotoBand } from '@/components/PhotoBand';
import { Card } from '@/components/ui';

const meta = CONTENT_PAGES.pricing;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: meta.route },
};

/**
 * Rebuilt from src/data/pricing.ts rather than rendered from extracted HTML.
 *
 * The extracted version was unusable: the packages arrived as unlabelled runs
 * of paragraphs, the reference price and the savings badge had collapsed into
 * one line of prose, and the audit-credit sum sat above the packages it was
 * meant to demonstrate. Nothing here is new information — it is the same
 * prices and inclusions, put back into the shape they were written in.
 */

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(contentPageGraph(meta.route, meta.title, PRICING_FAQS)),
        }}
      />

      <PhotoBand
        id="balance-scale"
        as="h1"
        size="opener"
        eyebrow={meta.title}
        heading="Der Preis steht, bevor die Arbeit beginnt."
        lead="Vier Pakete, je mit Fixpreis, Dauer und Inhalt. Sie sehen hier, ob die Grössenordnung passt — ohne anrufen zu müssen."
      />

      {/* ---- packages ---------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-6 pt-20" aria-labelledby="pakete">
        <h2 id="pakete" className="title">
          Vier Pakete
        </h2>
        <p className="lead mt-4 max-w-2xl">
          Alle enthalten die vollständige eflury Method™. Die Reihenfolge ist die
          Reihenfolge der Grösse — Micro ist der kleinste sinnvolle Einstieg, keine
          abgespeckte Variante.
        </p>

        <ul className="mt-12 grid gap-6 lg:grid-cols-2">
          {PACKAGES.map((p) => (
            <li key={p.slug}>
              <Card
                className={`flex h-full flex-col ${
                  p.badge ? 'border-[var(--accent)] ring-1 ring-[var(--accent)]' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="heading">{p.name}</h3>
                    <p className="mt-1.5 text-[var(--text-muted)]">{p.fit}</p>
                  </div>
                  {p.badge ? (
                    <span className="shrink-0 rounded-full bg-[var(--accent-text)] px-3 py-1 micro font-medium text-white">
                      {p.badge}
                    </span>
                  ) : null}
                </div>

                <div className="mt-7 border-t border-[var(--rule)] pt-6">
                  <p className="flex flex-wrap items-baseline gap-x-3">
                    <span className="stat">
                      {chf(p.price)}
                    </span>
                    <span className="text-sm text-[var(--text-faint)]">
                      einmalig, exkl. 8,1 % MWST
                    </span>
                  </p>
                  {/*
                   * A comparison, not a struck-through "was" price. The old card
                   * showed "CHF 19'200  CHF 9'900  48% sparen", which reads as a
                   * limited-time sale — and fake-discount optics cost more on a
                   * page arguing the price is knowable in advance than the big
                   * number gains.
                   */}
                  {p.reference ? (
                    <p className="mt-2.5 small text-[var(--text-muted)]">
                      Dieselbe Arbeit zu Schweizer Beratersätzen von CHF 2’400 pro Tag:{' '}
                      rund {chf(p.reference)}.
                    </p>
                  ) : null}
                  {p.instalments ? (
                    <p className="mt-1.5 small text-[var(--text-muted)]">
                      Auf Wunsch {p.instalments} — die Hälfte bei Auftrag, die Hälfte bei
                      Deployment.
                    </p>
                  ) : null}
                </div>

                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-[var(--rule)] pt-6 small">
                  <div>
                    <dt className="text-[var(--text-faint)]">Dauer</dt>
                    <dd className="mt-0.5 font-medium">{p.weeks} Wochen</dd>
                  </div>
                  <div>
                    <dt className="text-[var(--text-faint)]">Amortisation</dt>
                    <dd className="mt-0.5 font-medium">{p.roiPayback}</dd>
                  </div>
                </dl>

                <h4 className="mt-7 micro font-medium tracking-[0.04em] text-[var(--text-faint)] uppercase">
                  Enthalten
                </h4>
                <ul className="mt-3 space-y-2.5 small">
                  {p.includes.map((item) => (
                    <li key={item} className="flex gap-2.5 leading-relaxed">
                      <Check
                        className="mt-1 h-4 w-4 shrink-0 text-[var(--accent-text)]"
                        strokeWidth={2}
                        aria-hidden
                      />
                      <span className="text-[var(--text-muted)]">{item}</span>
                    </li>
                  ))}
                </ul>

                {/*
                 * Omitted rather than filled with a hedge where there is no
                 * number. Micro is one process; a range invented for it would
                 * undercut the one thing this page is for.
                 */}
                {p.roiHours ? (
                  <p className="mt-7 border-t border-[var(--rule)] pt-5 small text-[var(--text-muted)]">
                    Angestrebte Ersparnis: {p.roiHours} — geschätzt aus vergleichbaren
                    Projekten, nicht zugesichert.
                  </p>
                ) : null}

                <p className="mt-auto pt-6">
                  <Link
                    href="/de/kontakt/"
                    className="tap rounded-xl bg-[var(--text)] px-6 font-medium text-[var(--surface)]"
                  >
                    {p.cta}
                  </Link>
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      {/* ---- audit credit, directly under the packages it applies to ----- */}
      <section className="mx-auto max-w-6xl px-6 pt-24" aria-labelledby="anrechnung">
        <div className="rail">
          <h2 id="anrechnung" className="rail-label">
            Anrechnung
          </h2>
          <div className="min-w-0">
            <p className="max-w-2xl text-xl leading-snug">{AUDIT_CREDIT.note}</p>

            <div className="mt-8 max-w-md rounded-xl border border-[var(--rule)] bg-[var(--surface-raised)] p-6">
              <dl className="space-y-3 small">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-[var(--text-muted)]">{AUDIT_CREDIT.example.base.label}</dt>
                  <dd className="font-medium tabular-nums">
                    {chf(AUDIT_CREDIT.example.base.amount)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-[var(--text-muted)]">{AUDIT_CREDIT.example.credit.label}</dt>
                  <dd className="font-medium tabular-nums text-[var(--accent-text)]">
                    − {chf(AUDIT_CREDIT.example.credit.amount)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-t border-[var(--rule-strong)] pt-3">
                  <dt className="font-medium">{AUDIT_CREDIT.example.net.label}</dt>
                  {/*
                     * text-xl, not text-lg: this is the answer to the sum above
                     * it, and 18px against a 17px body is not a size difference
                     * anyone reads as emphasis — the weight was doing all the
                     * work on its own.
                     */}
                  <dd className="text-xl font-semibold tabular-nums">
                    {chf(AUDIT_CREDIT.example.net.amount)}
                  </dd>
                </div>
              </dl>
              <p className="mt-5 border-t border-[var(--rule)] pt-4 text-sm text-[var(--text-faint)]">
                Beispielrechnung. Wer innert sechs Monaten umsetzt, zahlt das Audit
                faktisch nicht.
              </p>
            </div>

            <p className="mt-6">
              <Link href="/de/services/ki-audit/" className="text-[var(--link)] hover:underline">
                Was im Audit passiert
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ---- comparison, derived from the same data ---------------------- */}
      <section className="mx-auto max-w-6xl px-6 pt-24" aria-labelledby="vergleich">
        <h2 id="vergleich" className="title">
          Vergleich
        </h2>
        {/* Wide content scrolls inside its own container, never the page. */}
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[44rem] border-collapse text-left small">
            <caption className="sr-only">
              Die vier Pakete im Vergleich: Preis, Dauer, Umfang und angestrebte Ersparnis.
            </caption>
            <thead>
              <tr className="border-b border-[var(--rule-strong)]">
                <th scope="col" className="py-3 pe-4 font-medium text-[var(--text-faint)]">
                  &nbsp;
                </th>
                {PACKAGES.map((p) => (
                  <th key={p.slug} scope="col" className="py-3 pe-4 font-semibold">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.label} className="border-b border-[var(--rule)]">
                  <th scope="row" className="py-3.5 pe-4 font-medium text-[var(--text-muted)]">
                    {row.label}
                  </th>
                  {PACKAGES.map((p) => (
                    <td key={p.slug} className="py-3.5 pe-4 tabular-nums">
                      {row.value(p)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ---- add-ons ----------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-6 pt-24" aria-labelledby="zusatz">
        <h2 id="zusatz" className="title">
          Dazu buchbar
        </h2>
        <p className="lead mt-4 max-w-2xl">
          Nach dem Paket, wenn Sie es brauchen — nicht als Teil der Offerte.
        </p>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {ADD_ONS.map((a) => (
            <li key={a.name}>
              <Card className="h-full">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-semibold tracking-tight">{a.name}</h3>
                  <p className="shrink-0 font-medium tabular-nums text-[var(--accent-text)]">
                    {a.price}
                  </p>
                </div>
                <p className="mt-2.5 leading-relaxed text-[var(--text-muted)]">{a.what}</p>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      {/* ---- FAQs -------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-24" aria-labelledby="fragen">
        <h2 id="fragen" className="title">
          Fragen zum Preis
        </h2>
        <dl className="mt-10 max-w-3xl divide-y divide-[var(--rule)] border-t border-[var(--rule-strong)]">
          {PRICING_FAQS.map((f) => (
            <div key={f.question} className="py-6">
              <dt className="font-semibold tracking-tight">{f.question}</dt>
              <dd className="mt-2.5 leading-relaxed text-[var(--text-muted)]">{f.answer}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 border-t border-[var(--rule-strong)] pt-10">
          <h2 className="title max-w-2xl">Unsicher, welches Paket passt?</h2>
          <p className="lead mt-4 max-w-2xl">
            Das ist der Normalfall, und genau dafür gibt es das Audit: eine Woche,{' '}
            {chf(AUDIT_CREDIT.auditPrice)}, und am Ende eine schriftliche
            Entscheidungsgrundlage — auch wenn sie gegen ein Projekt spricht.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/de/kontakt/"
              className="tap rounded-xl bg-[var(--text)] px-6 font-medium text-[var(--surface)]"
            >
              Kostenloses Gespräch
            </Link>
            <Link
              href="/de/case-studies/taxed-gmbh/"
              className="tap rounded-xl border border-[var(--rule-strong)] px-6 font-medium"
            >
              ROI-Fallstudie ansehen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
