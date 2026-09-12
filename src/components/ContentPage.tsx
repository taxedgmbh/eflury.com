import { CONTENT_PAGES, getPageHtml, type ContentPage as ContentPageMeta, type ContentPageKey } from '@/lib/pages';
import { contentPageGraph, jsonLd } from '@/lib/schema';
import { illustrationFor } from '@/lib/illustrations';
import { PhotoBand } from './PhotoBand';

export async function ContentPage({ page }: { page: ContentPageKey }) {
  /*
   * Widened deliberately. CONTENT_PAGES is `as const`, so each key infers a
   * narrow type on which the optional fields simply do not exist — which is why
   * the previous version had to write `'standfirst' in meta`. One annotation
   * here is cheaper than an `in` guard per optional field.
   */
  const meta: ContentPageMeta = CONTENT_PAGES[page];
  const html = await getPageHtml(meta.file);
  // Emanuel drew one illustration per page; this is where it belongs.
  const Illustration = illustrationFor(`page:${page}`);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(contentPageGraph(meta.route, meta.title)) }}
      />
      {/*
       * Two openers, chosen per page in CONTENT_PAGES rather than here. Pages
       * that carry a photograph put the h1 over it; pages that do not keep the
       * ruled header, which is the right treatment for something meant to be
       * read closely.
       */}
      {meta.photo ? (
        <PhotoBand
          id={meta.photo}
          as="h1"
          size="opener"
          eyebrow={meta.title}
          heading={meta.openerHeading ?? meta.title}
          lead={meta.standfirst}
        />
      ) : null}

      <div className="mx-auto max-w-5xl px-6 pt-16 pb-20">
        {meta.photo ? null : (
          <header className="border-b border-[var(--rule-strong)] pb-8">
            <h1 className="display">{meta.title}</h1>
            {meta.standfirst ? (
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]">
                {meta.standfirst}
              </p>
            ) : null}
          </header>
        )}
        {Illustration ? (
          <div className="mt-10">
            <Illustration />
          </div>
        ) : null}

        <div
          className="prose-de legal-prose mt-10"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </>
  );
}
