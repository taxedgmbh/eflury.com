import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, formatDate, readingTime } from '@/lib/content';
import { blogIndexGraph, jsonLd } from '@/lib/schema';
import { photoIdForPost } from '@/lib/post-photos';
import { PhotoBand } from '@/components/PhotoBand';
import { PhotoThumb } from '@/components/PhotoThumb';

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

      <PhotoBand
        id="composing-room"
        as="h1"
        size="opener"
        eyebrow="Blog"
        heading="Aufgeschrieben, während es passierte."
        lead="Was Emanuel Flury in Projekten gelernt hat. Meist zu Automatisierung, Power BI und dem, was in Schweizer KMU wirklich funktioniert."
      />

      {/*
        The rail carries publication dates here, which are genuinely ordinal —
        so the tick reads as a mark on a scale rather than as decoration. On the
        home page the same rail carries roles, and deliberately has no ticks.
      */}
      <div className="mx-auto max-w-5xl px-6 pt-14">
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
                {/*
                 * The thumbnail goes after the text in source order so the
                 * heading is what a screen reader and a crawler reach first;
                 * `order` puts it on the left visually from sm up. The dated
                 * rail stays — the dates are genuinely ordinal, which is what
                 * the tick is for, and a card grid would throw that away.
                 */}
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
