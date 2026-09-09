import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, formatDate, readingTime } from '@/lib/content';
import { blogIndexGraph, jsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Beiträge zu KI-Automatisierung, Power BI und Prozessoptimierung für Schweizer KMU.',
  alternates: { canonical: '/de/blog/' },
};

export default async function BlogIndex() {
  const posts = await getAllPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(blogIndexGraph()) }}
      />

      <div className="mx-auto max-w-3xl px-5 pt-16 pb-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Blog</h1>
        <p className="mt-3 text-[var(--text-muted)]">
          {posts.length} Beiträge zu KI-Automatisierung, Power BI und Prozessen in
          Schweizer KMU.
        </p>
      </div>

      <ul className="mx-auto max-w-3xl divide-y divide-[var(--border)] border-t border-[var(--border)] px-5">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/de/blog/${post.slug}/`} className="group block py-6">
              <h2 className="text-lg font-medium tracking-tight group-hover:text-[var(--accent)]">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{post.description}</p>
              <p className="mt-3 flex flex-wrap items-center gap-x-2 text-xs text-[var(--text-muted)]">
                <time dateTime={post.pubDate.toISOString()}>{formatDate(post.pubDate)}</time>
                <span aria-hidden>·</span>
                <span>{readingTime(post.body)} Min. Lesezeit</span>
                {post.tags.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[var(--border)] px-2 py-0.5"
                  >
                    {t}
                  </span>
                ))}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
