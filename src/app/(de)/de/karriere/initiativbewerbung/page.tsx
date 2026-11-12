import type { Metadata } from 'next';
import { ContentPage } from '@/components/ContentPage';
import { CONTENT_PAGES } from '@/lib/pages';
import { ApplicationForm } from '@/components/ApplicationForm';

export const metadata: Metadata = {
  title: CONTENT_PAGES['karriere__initiativbewerbung'].title,
  description: CONTENT_PAGES['karriere__initiativbewerbung'].description,
  alternates: { canonical: '/de/karriere/initiativbewerbung/' },
};

export default function Page() {
  return (
    <>
      <ContentPage page="karriere__initiativbewerbung" />
      {/*
        id="bewerben" is load-bearing: the page copy has a "Jetzt bewerben" CTA
        pointing at this anchor, and the build gate fails if it does not exist.
      */}
      <section
        id="bewerben"
        aria-labelledby="bewerben-title"
        className="mx-auto max-w-5xl px-6 pb-20"
      >
        <h2
          id="bewerben-title"
          className="border-t border-[var(--rule-strong)] pt-8 text-2xl font-bold tracking-tight"
        >
          Initiativbewerbung
        </h2>
        <p className="mt-3 max-w-xl leading-relaxed text-[var(--text-muted)]">
          Links schlagen Adjektive: Repos und Projekte sagen mehr als jedes
          Motivationsschreiben.
        </p>
        <div className="mt-8">
          <ApplicationForm />
        </div>
      </section>
    </>
  );
}
