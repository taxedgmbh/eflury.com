import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { getAllPosts, getPost, formatDate, readingTime } from '@/lib/content';
import { AuthorBio, RelatedPosts, Breadcrumbs, TagLinks } from '@/components/blog-parts';
import { PhotoThumb } from '@/components/PhotoThumb';
import { photoIdForPost, photoForPost } from '@/lib/post-photos';
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
  const all = await getAllPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(blogPostGraph(post)) }}
      />

      <article className="mx-auto max-w-5xl px-6 pt-12 pb-16">
        <Breadcrumbs
          trail={[
            { name: 'Start', href: '/de/' },
            { name: 'Blog', href: '/de/blog/' },
            { name: post.title },
          ]}
        />

        <header className="mt-8 border-b border-[var(--rule-strong)] pb-8">
          <h1 className="max-w-3xl text-[2.1rem] leading-[1.15] font-medium tracking-[-0.02em] sm:text-[2.6rem]">
            {post.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]">
            {post.description}
          </p>
          <div className="rail mt-8">
            <p className="rail-tick">
              <time dateTime={post.pubDate.toISOString()}>{formatDate(post.pubDate)}</time>
              <span className="block text-[var(--text-faint)]">
                {readingTime(post.body)} Min.
              </span>
            </p>
            <p className="text-sm text-[var(--text-muted)]">
              {post.author}
              {post.updatedDate ? (
                <span className="block text-[var(--text-faint)]">
                  Aktualisiert am{' '}
                  <time dateTime={post.updatedDate.toISOString()}>
                    {formatDate(post.updatedDate)}
                  </time>
                </span>
              ) : null}
            </p>
          </div>
        </header>

        {/*
         * No post carries a heroImage, so every article fell back to nothing.
         * The mapped photograph fills that in — chosen from the post's tags in
         * src/lib/post-photos.ts rather than stored per file, so a new post gets
         * one without anybody remembering to add it.
         *
         * Not a PhotoBand: post titles here run to fifteen words, which over a
         * photograph is five lines of reversed text at the top of a long read.
         * The ruled header keeps the title legible and the picture still lands
         * above the first paragraph.
         */}
        {post.heroImage ? (
          <Image
            src={post.heroImage}
            alt={post.heroImageAlt ?? ''}
            width={1200}
            height={630}
            priority
            className="mt-10 w-full rounded-xl border border-[var(--rule)]"
          />
        ) : (
          <div className="mt-10 max-w-3xl">
            <PhotoThumb
              id={photoIdForPost(post)}
              variant="wide"
              alt={photoForPost(post).alt}
              className="border border-[var(--rule)]"
            />
          </div>
        )}

        <div className="prose-de mt-12">
          <MDXRemote source={post.body} options={mdxOptions} />
        </div>

        <TagLinks tags={post.tags} />

        <AuthorBio />

        <RelatedPosts current={post} all={all} />

      </article>
    </>
  );
}
