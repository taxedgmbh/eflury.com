import { LEGAL_PAGES, getLegalHtml, type LegalSlug } from '@/lib/legal';
import { legalGraph, jsonLd } from '@/lib/schema';

export async function LegalPage({ slug }: { slug: LegalSlug }) {
  const meta = LEGAL_PAGES[slug];
  const html = await getLegalHtml(slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(legalGraph(slug, meta.title)) }}
      />
      <div className="mx-auto max-w-5xl px-6 pt-16 pb-20">
        <header className="border-b border-[var(--rule-strong)] pb-8">
          <h1 className="text-4xl font-semibold tracking-[-0.03em]">{meta.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]">
            {meta.description}
          </p>
        </header>
        <div
          className="prose-de legal-prose mt-10"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </>
  );
}
