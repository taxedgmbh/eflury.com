import type { Metadata } from 'next';
import { CONTENT_PAGES, getPageHtml } from '@/lib/pages';
import { contentPageGraph, jsonLd } from '@/lib/schema';
import { ContactForm } from '@/components/ContactForm';
import { PERSON, ADDRESS } from '@/lib/site';

const meta = CONTENT_PAGES.kontakt;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: meta.route },
};

/**
 * Not the generic ContentPage: this one carries a working form. The extraction
 * strips <form> elements, so the prose here is the surrounding copy and the
 * form is rebuilt against /api/contact.
 */
export default async function KontaktPage() {
  const html = await getPageHtml(meta.file);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(contentPageGraph(meta.route, meta.title)) }}
      />

      <div className="mx-auto max-w-5xl px-6 pt-16 pb-20">
        <header className="border-b border-[var(--rule-strong)] pb-8">
          <h1 className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">Kontakt</h1>
          <p className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-[var(--text-muted)]">
            Ein kostenloses Gespräch von dreissig Minuten, unverbindlich und
            vertraulich. Am Ende wissen Sie, ob sich ein Projekt lohnt — auch wenn
            die Antwort nein lautet.
          </p>
        </header>

        <div className="rail mt-12">
          <h2 className="rail-label">Schreiben</h2>
          <ContactForm />
        </div>

        <div className="rail mt-16 border-t border-[var(--rule)] pt-8">
          <h2 className="rail-label">Direkt</h2>
          <div className="min-w-0 max-w-xl">
            <p className="font-serif leading-relaxed">
              <a href={`mailto:${PERSON.email}`} className="text-[var(--link)] hover:underline">
                {PERSON.email}
              </a>
              <br />
              <a href={`tel:${PERSON.telephone}`} className="text-[var(--link)] hover:underline">
                {PERSON.telephoneDisplay}
              </a>
            </p>
            <p className="mt-4 text-sm text-[var(--text-muted)]">
              {ADDRESS.streetAddress}, {ADDRESS.postalCode} {ADDRESS.addressLocality}
            </p>
          </div>
        </div>

        <div className="rail mt-16 border-t border-[var(--rule)] pt-8">
          <h2 className="rail-label">Ablauf</h2>
          <div
            className="prose-de legal-prose min-w-0"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </>
  );
}
