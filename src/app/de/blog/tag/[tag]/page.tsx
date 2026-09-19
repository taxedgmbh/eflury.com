import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getAllTags, formatDate, readingTime, tagSlug } from '@/lib/content';
import { photoIdForPost } from '@/lib/post-photos';
import { PhotoThumb } from '@/components/PhotoThumb';
import { contentPageGraph, jsonLd } from '@/lib/schema';

/**
 * Tag archive. `getAllTags()` has existed in the content layer since Phase 1 and
 * was never imported anywhere — post tags rendered as inert text with nothing to
 * click.
 *
 * The slug is the tag lowercased with spaces and slashes collapsed, so
 * "Finance Automation" becomes "finance-automation". Matching is done against
 * that slug rather than the raw tag so the URL stays stable if a tag's casing
 * changes.
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAllTags()).map((tag) => ({ tag: tagSlug(tag) }));
}

async function resolve(slug: string) {
  const tag = (await getAllTags()).find((t) => tagSlug(t) === slug);
  if (!tag) return null;
  const posts = (await getAllPosts()).filter((p) => p.tags.includes(tag));
  return { tag, posts };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const found = await resolve((await params).tag);
  if (!found) return {};
  return {
    title: `${found.tag} — Beiträge`,
    description: `Alle Beiträge zum Thema ${found.tag}.`,
    alternates: { canonical: `/de/blog/tag/${tagSlug(found.tag)}/` },
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const found = await resolve((await params).tag);
  if (!found) notFound();
  const { tag, posts } = found;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(contentPageGraph(`/de/blog/tag/${tagSlug(tag)}/`, tag)),
        }}
      />
      <div className="mx-auto max-w-5xl px-6 pt-12 sm:pt-16 pb-10">
        <nav aria-label="Brotkrumen" className="text-sm">
          <Link href="/de/blog/" className="text-[var(--text-muted)] hover:text-[var(--text)]">
            Blog
          </Link>
        </nav>
        <h1 className="mt-6 display">{tag}</h1>
        <p className="mt-4 text-[var(--text-muted)]">
          {posts.length} {posts.length === 1 ? 'Beitrag' : 'Beiträge'}
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-6 pb-16">
        <ul className="border-t border-[var(--rule-strong)]">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-[var(--rule)]">
              <Link href={`/de/blog/${post.slug}/`} className="rail group py-7">
                <p className="rail-tick">
                  <time dateTime={post.pubDate.toISOString()}>{formatDate(post.pubDate)}</time>
                  <span className="block text-[var(--text-faint)]">
                    {readingTime(post.body)} Min.
                  </span>
                </p>
                {/* Same row shape as the blog index, so the two read alike. */}
                <div className="flex min-w-0 flex-col gap-5 sm:flex-row-reverse sm:items-start sm:gap-6">
                  <div className="min-w-0 flex-1">
                    <h2 className="max-w-2xl text-xl leading-snug font-medium group-hover:text-[var(--link)]">
                      {post.title}
                    </h2>
                    <p className="mt-2 max-w-2xl leading-relaxed text-[var(--text-muted)]">
                      {post.description}
                    </p>
                  </div>
                  <div className="sm:w-48 sm:shrink-0">
                    <PhotoThumb id={photoIdForPost(post)} />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
