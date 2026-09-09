import type { Metadata } from 'next';
import Link from 'next/link';
import { VENTURES, PERSON } from '@/lib/site';
import { getAllPosts, formatDate } from '@/lib/content';
import { homeGraph, jsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: `${PERSON.shortName} — Unternehmer`,
  description:
    'Emanuel Flury — Unternehmer aus Grenchen. Gründer von Taxed GmbH und SkopaAI, Berater für KI-Automatisierung bei Schweizer KMU.',
  alternates: { canonical: '/de/' },
};

/*
 * Phase 1 skeleton of the portfolio hub. The structure is the point: the three
 * ventures are peers rendered from VENTURES, not a case study and a service line
 * as on the Astro site. Phase 2 does the visual design over this shape.
 */
export default async function HomePage() {
  const posts = (await getAllPosts()).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(homeGraph()) }}
      />

      <section className="mx-auto max-w-5xl px-5 pt-20 pb-16">
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          {PERSON.name}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-[var(--text-muted)]">
          Unternehmer aus Grenchen. Ich baue Firmen, die Routinearbeit an Software
          abgeben — und berate Schweizer KMU dabei, dasselbe zu tun.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-16" aria-labelledby="ventures">
        <h2 id="ventures" className="text-sm font-semibold tracking-wide text-[var(--text-muted)] uppercase">
          Unternehmen
        </h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-3">
          {VENTURES.map((v) => (
            <li
              key={v.id}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] p-5"
            >
              <p className="text-base font-semibold">{v.name}</p>
              <p className="mt-0.5 text-xs tracking-wide text-[var(--text-muted)] uppercase">
                {v.role}
              </p>
              <p className="mt-3 text-sm text-[var(--text-muted)]">{v.tagline}</p>
              {v.external ? (
                <a
                  href={v.url}
                  className="mt-4 inline-block text-sm text-[var(--accent)] hover:underline"
                >
                  {v.url.replace('https://', '')} ↗
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      {posts.length > 0 ? (
        <section className="mx-auto max-w-5xl px-5 pb-8" aria-labelledby="latest">
          <div className="flex items-baseline justify-between">
            <h2
              id="latest"
              className="text-sm font-semibold tracking-wide text-[var(--text-muted)] uppercase"
            >
              Aus dem Blog
            </h2>
            <Link href="/de/blog/" className="text-sm text-[var(--accent)] hover:underline">
              Alle Beiträge
            </Link>
          </div>
          <ul className="mt-5 divide-y divide-[var(--border)] border-t border-[var(--border)]">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/de/blog/${p.slug}/`} className="group block py-4">
                  <p className="font-medium group-hover:text-[var(--accent)]">{p.title}</p>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    <time dateTime={p.pubDate.toISOString()}>{formatDate(p.pubDate)}</time>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}
