import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, formatDate, readingTime } from '@/lib/content';
import { blogIndexGraph, jsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Beiträge zu KI-Automatisierung, Power BI und Prozessen in Schweizer KMU — aus der Praxis, mit Zahlen.',
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

      <div className="mx-auto max-w-5xl px-6 pt-20 pb-10">
        <h1 className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">Blog</h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-[var(--text-muted)]">
          Was Emanuel Flury in Projekten gelernt hat, aufgeschrieben. Meist zu
          Automatisierung, Power BI und dem, was in Schweizer KMU wirklich
          funktioniert.
        </p>
      </div>

      {/*
        The rail carries publication dates here, which are genuinely ordinal —
        so the tick reads as a mark on a scale rather than as decoration. On the
        home page the same rail carries roles, and deliberately has no ticks.
      */}
      <div className="mx-auto max-w-5xl px-6">
        <ul className="border-t border-[var(--rule-strong)]">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-[var(--rule)]">
              <Link href={`/de/blog/${post.slug}/`} className="rail group py-7">
                <p className="rail-tick">
                  <time dateTime={post.pubDate.toISOString()}>
                    {formatDate(post.pubDate)}
                  </time>
                  <span className="block text-[var(--text-faint)]">
                    {readingTime(post.body)} Min.
                  </span>
                </p>
                <div className="min-w-0">
                  <h2 className="max-w-2xl text-xl leading-snug font-medium group-hover:text-[var(--link)]">
                    {post.title}
                  </h2>
                  <p className="mt-2 max-w-2xl leading-relaxed text-[var(--text-muted)]">
                    {post.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
