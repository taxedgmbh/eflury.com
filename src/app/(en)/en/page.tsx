import type { Metadata } from 'next';
import { BrandHero } from '@/components/personal/BrandHero';
import { PersonalFooter } from '@/components/personal/PersonalFooter';
import { PersonalHeader } from '@/components/personal/PersonalHeader';
import { PersonalHome } from '@/components/personal/PersonalHome';
import { SOCIALS } from '@/components/personal/data';
import { personalHomeGraph, jsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: { absolute: 'Emanuel Flury · Entrepreneur' },
  alternates: { canonical: '/en/' },
};

// The YouTube feed is re-read at most every six hours (src/lib/youtube.ts).
export const revalidate = 21600;

/**
 * The personal-brand homepage. Design and copy as approved section by section
 * on the Astro site (brand/PERSONAL-BRAND-HOMEPAGE.md).
 */
export default function PersonalHomePage() {
  return (
    <div className="pb">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(personalHomeGraph(SOCIALS.map((s) => s.href))) }} />
      <a href="#main-content" className="skip">
        Skip to content
      </a>
      <PersonalHeader />
      <main id="main-content">
        <BrandHero />
        <PersonalHome />
      </main>
      <PersonalFooter />
    </div>
  );
}
