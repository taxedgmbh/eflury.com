import { CONTENT_PAGES, getPageHtml, type ContentPageKey } from '@/lib/pages';
import { contentPageGraph, jsonLd } from '@/lib/schema';

export async function ContentPage({ page }: { page: ContentPageKey }) {
  const meta = CONTENT_PAGES[page];
  const html = await getPageHtml(meta.file);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(contentPageGraph(meta.route, meta.title)) }}
      />
      <div className="mx-auto max-w-5xl px-6 pt-16 pb-20">
        <header className="border-b border-[var(--rule-strong)] pb-8">
          <h1 className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{meta.title}</h1>
          {'standfirst' in meta && meta.standfirst ? (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]">
              {meta.standfirst}
            </p>
          ) : null}
        </header>
        <div
          className="prose-de legal-prose mt-10"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </>
  );
}
