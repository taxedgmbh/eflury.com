import type { Metadata } from 'next';
import { BrandHero } from '@/components/personal/BrandHero';
import { PersonalFooter } from '@/components/personal/PersonalFooter';
import { PersonalHeader, type Topic } from '@/components/personal/PersonalHeader';
import { PersonalHome } from '@/components/personal/PersonalHome';
import type { PostCard } from '@/components/personal/data';
import { getAllPosts, readingTime, tagSlug } from '@/lib/content';
import { personalHomeGraph, jsonLd } from '@/lib/schema';
import { SOCIALS } from '@/components/personal/data';

export const metadata: Metadata = {
  title: { absolute: 'Emanuel Flury · Entrepreneur' },
  alternates: { canonical: '/en/' },
};

// The YouTube feed is re-read at most every six hours (src/lib/youtube.ts).
export const revalidate = 21600;

/**
 * The personal-brand homepage. Design and copy as approved section by section
 * on the Astro site (brand/PERSONAL-BRAND-HOMEPAGE.md); the German consulting
 * site stays under /de/ as the archive.
 */
export default async function PersonalHomePage() {
  const all = await getAllPosts();
  const cards: PostCard[] = all.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    date: p.pubDate,
    minutes: readingTime(p.body),
  }));
  const latest = cards.slice(0, 3);

  const counts = new Map<string, number>();
  for (const p of all) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  const topics: Topic[] = [...counts]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'de'))
    .slice(0, 6)
    .map(([label, count]) => ({ label, count, href: `/de/blog/tag/${tagSlug(label)}/` }));

  return (
    <div className="pb">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(personalHomeGraph(SOCIALS.map((s) => s.href))) }} />
      <a href="#main-content" className="skip">
        Skip to content
      </a>
      <PersonalHeader posts={latest} total={cards.length} topics={topics} />
      <main id="main-content">
        <BrandHero />
        <PersonalHome posts={latest} />
      </main>
      <PersonalFooter latest={cards[0]} total={cards.length} />
    </div>
  );
}
