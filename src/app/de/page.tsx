import type { Metadata } from 'next';
import Link from 'next/link';
import { VENTURES, PERSON, ADDRESS } from '@/lib/site';
import { getAllPosts, formatDate } from '@/lib/content';
import { homeGraph, jsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: `${PERSON.shortName} — Unternehmer`,
  description:
    'Emanuel Flury, Unternehmer in Grenchen. Gründer von Taxed GmbH und SkopaAI. Er baut Firmen, die Routinearbeit an Software abgeben — und begleitet Schweizer KMU dabei.',
  alternates: { canonical: '/de/' },
};

/*
 * The hero is a register entry, not a tagline over three cards.
 *
 * For a Treuhänder the Handelsregister is a native document form, and the
 * ventures are the most characteristic true thing about him — so they are the
 * opening content rather than a supporting section further down. The left rail
 * carries the role, which is real data; it does not carry founding years because
 * none are recorded anywhere in the old site and inventing them would put a
 * fabricated fact in the most prominent position on the page.
 */
export default async function HomePage() {
  const posts = (await getAllPosts()).slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(homeGraph()) }}
      />

      <section className="mx-auto max-w-5xl px-6 pt-20 pb-4">
        <h1 className="text-[2.6rem] leading-[1.05] font-semibold tracking-[-0.03em] sm:text-6xl">
          {PERSON.name}
        </h1>
        <p className="mt-4 font-serif text-xl leading-snug text-[var(--text-muted)] italic">
          Unternehmer in {ADDRESS.addressLocality}, Kanton Solothurn
        </p>
        <p className="mt-8 max-w-xl font-serif text-lg leading-relaxed">
          Emanuel Flury baut Firmen, die Routinearbeit an Software abgeben. Was
          in seiner eigenen Treuhandfirma funktioniert, gibt er an andere
          Schweizer KMU weiter — nicht als Folien, sondern als Prozesse, die
          laufen.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pt-14 pb-8" aria-labelledby="ventures">
        <h2 id="ventures" className="sr-only">
          Meine Unternehmen
        </h2>

        <dl className="border-t border-[var(--rule-strong)]">
          {VENTURES.map((v) => (
            <div
              key={v.id}
              className="rail border-b border-[var(--rule)] py-7 sm:py-8"
            >
              <dt className="rail-label">
                {v.role}
                <span className="block text-[var(--text-faint)]">{v.place}</span>
              </dt>
              <dd className="min-w-0">
                <p className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
                  {v.external ? (
                    <a
                      href={v.url}
                      rel="me noopener"
                      className="underline decoration-[var(--accent)] decoration-1 underline-offset-[6px] hover:text-[var(--link)] hover:decoration-[var(--link)]"
                    >
                      {v.name}
                    </a>
                  ) : (
                    <Link
                      href="/de/services/"
                      className="underline decoration-[var(--accent)] decoration-1 underline-offset-[6px] hover:text-[var(--link)] hover:decoration-[var(--link)]"
                    >
                      {v.name}
                    </Link>
                  )}
                </p>
                <p className="mt-2.5 max-w-2xl font-serif text-[1.0625rem] leading-relaxed text-[var(--text-muted)]">
                  {v.what}
                </p>
                {v.external ? (
                  <p className="mt-2.5 text-sm text-[var(--text-faint)]">
                    {v.url.replace('https://', '')}
                  </p>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-5xl px-6 pt-10" aria-labelledby="schreiben">
        <div className="rail">
          <h2 id="schreiben" className="rail-label">
            Schreiben
          </h2>
          <div className="min-w-0">
            <ul className="border-t border-[var(--rule-strong)]">
              {posts.map((p) => (
                <li key={p.slug} className="border-b border-[var(--rule)]">
                  <Link href={`/de/blog/${p.slug}/`} className="group block py-5">
                    <p className="font-serif text-lg leading-snug group-hover:text-[var(--link)]">
                      {p.title}
                    </p>
                    <p className="mt-1.5 text-sm text-[var(--text-faint)]">
                      <time dateTime={p.pubDate.toISOString()}>{formatDate(p.pubDate)}</time>
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5">
              <Link href="/de/blog/" className="text-[var(--link)] hover:underline">
                Alle Beiträge
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pt-20" aria-labelledby="kontakt">
        <div className="rail border-t border-[var(--rule-strong)] pt-8">
          <h2 id="kontakt" className="rail-label">
            Kontakt
          </h2>
          <div className="min-w-0 max-w-lg">
            <p className="font-serif text-lg leading-relaxed">
              Wenn Sie einen Prozess im Kopf haben, der Sie jede Woche Stunden
              kostet: schreiben Sie ihm, was er tut und wie oft. Das reicht für
              eine erste Einschätzung.
            </p>
            <p className="mt-5">
              <a
                href={`mailto:${PERSON.email}`}
                className="text-[var(--link)] underline underline-offset-4 hover:decoration-[var(--accent)]"
              >
                {PERSON.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
