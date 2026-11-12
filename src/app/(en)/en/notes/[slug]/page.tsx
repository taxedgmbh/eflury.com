import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { NotesPage } from '@/components/personal/NotesPage';
import { NEWSLETTER_ON, NewsletterForm } from '@/components/personal/NewsletterForm';
import { fmtNoteDate, getNote, getNotes } from '@/lib/notes';
import { jsonLd } from '@/lib/schema';
import { SITE_URL } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return getNotes().map((n) => ({ slug: n.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = getNote((await params).slug);
  if (!note) return {};
  const url = `/en/notes/${note.slug}/`;
  return {
    title: note.title,
    description: note.description,
    alternates: { canonical: url, types: { 'application/rss+xml': [{ url: '/rss.xml', title: 'Emanuel Flury · Notes' }] } },
    openGraph: {
      type: 'article',
      url,
      title: note.title,
      description: note.description,
      siteName: 'Emanuel Flury',
      locale: 'en_GB',
      publishedTime: note.date.toISOString(),
      authors: [`${SITE_URL}/en/`],
    },
    twitter: { card: 'summary_large_image', title: note.title, description: note.description },
  };
}

export default async function NoteArticle({ params }: Props) {
  const note = getNote((await params).slug);
  if (!note) notFound();
  const url = `${SITE_URL}/en/notes/${note.slug}/`;
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: note.title,
    description: note.description,
    datePublished: note.date.toISOString().slice(0, 10),
    url,
    mainEntityOfPage: url,
    inLanguage: 'en',
    author: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: 'Emanuel Flury', url: `${SITE_URL}/en/` },
  };
  return (
    <NotesPage>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(ld) }} />
      <article className="nt-article">
        <Link href="/en/notes/" className="nt-back">
          <ArrowLeft size={16} aria-hidden /> All notes
        </Link>
        <p className="eyebrow">
          <time dateTime={note.date.toISOString().slice(0, 10)}>{fmtNoteDate.format(note.date)}</time>
        </p>
        <h1 className="nt-title">{note.title}</h1>
        <p className="section-lead">{note.description}</p>
        <div className="nt-body">
          <MDXRemote
            source={note.body}
            options={{ mdxOptions: { format: 'md', remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
          />
        </div>
      </article>
      <section className="nt-sub" aria-labelledby="nt-sub-title">
        <h2 id="nt-sub-title" className="h-small">
          {NEWSLETTER_ON ? 'Get new notes by email' : 'Follow new notes'}
        </h2>
        <NewsletterForm id="nl-note" />
      </section>
    </NotesPage>
  );
}
