import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { getAllPosts, getPost, formatDate, readingTime } from '@/lib/content';
import { blogPostGraph, jsonLd } from '@/lib/schema';
import { PERSON } from '@/lib/site';

/** An unknown slug is a 404, not an on-demand render. */
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    // German-only: a self-referencing canonical and no hreflang alternates at
    // all. This retires the bug class rather than fixing it — the Astro site
    // derived alternates by swapping /en/ for /de/ in the path, which produced a
    // non-existent URL for every post, since the German slugs differ.
    alternates: { canonical: `/de/blog/${post.slug}/` },
    keywords: post.tags,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `/de/blog/${post.slug}/`,
      publishedTime: post.pubDate.toISOString(),
      modifiedTime: (post.updatedDate ?? post.pubDate).toISOString(),
      authors: [PERSON.name],
      tags: post.tags,
      // Declared explicitly rather than left to the file convention. The
      // auto-generated URL is slashless, and `trailingSlash: true` answers it
      // with a 308 before serving the PNG — a wasted hop on every share, and the
      // redirect mangles the cache-buster into `?hash=`.
      images: [
        {
          url: `/de/blog/${post.slug}/opengraph-image/`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

/**
 * Typed from the component rather than annotated by hand: a bare object literal
 * widens the `[plugin, options]` entry to an array union, which does not satisfy
 * unified's `Pluggable` tuple.
 */
const mdxOptions: React.ComponentProps<typeof MDXRemote>['options'] = {
  mdxOptions: {
    format: 'md',
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap', properties: { className: 'heading-anchor' } }],
    ],
  },
};

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(blogPostGraph(post)) }}
      />

      <article className="mx-auto max-w-3xl px-5 pt-12 pb-16">
        <nav aria-label="Brotkrumen" className="text-sm text-[var(--text-muted)]">
          <Link href="/de/blog/" className="hover:text-[var(--text)]">
            ← Blog
          </Link>
        </nav>

        <header className="mt-6">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-lg text-[var(--text-muted)]">{post.description}</p>
          <p className="mt-5 flex flex-wrap items-center gap-x-2 border-t border-[var(--border)] pt-5 text-sm text-[var(--text-muted)]">
            <span>{post.author}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.pubDate.toISOString()}>{formatDate(post.pubDate)}</time>
            <span aria-hidden>·</span>
            <span>{readingTime(post.body)} Min. Lesezeit</span>
          </p>
          {post.updatedDate ? (
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Aktualisiert am{' '}
              <time dateTime={post.updatedDate.toISOString()}>
                {formatDate(post.updatedDate)}
              </time>
            </p>
          ) : null}
        </header>

        <div className="prose-de mt-10">
          <MDXRemote source={post.body} options={mdxOptions} />
        </div>

        {post.tags.length > 0 ? (
          <ul className="mt-12 flex flex-wrap gap-2 border-t border-[var(--border)] pt-6">
            {post.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-muted)]"
              >
                {t}
              </li>
            ))}
          </ul>
        ) : null}
      </article>
    </>
  );
}
