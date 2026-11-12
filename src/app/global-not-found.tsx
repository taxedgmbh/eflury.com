import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { RootDocument } from '@/components/RootDocument';
import { PersonalFooter } from '@/components/personal/PersonalFooter';
import { PersonalHeader } from '@/components/personal/PersonalHeader';
import '@/components/personal/personal.css';

export const metadata: Metadata = { title: 'Page not found · Emanuel Flury', robots: { index: false } };

/*
 * global-not-found renders its own document: the only root layout lives in
 * the (en) route group, so there is no app/layout.tsx to wrap an unmatched URL.
 */
export default function NotFound() {
  return (
    <RootDocument lang="en" bodyClassName="pb-body">
      <div className="pb">
        <PersonalHeader />
        <main id="main-content" className="band nf">
          <div className="wrap narrow">
            {/* A solid trace running into a dot, then a dashed one running out: the connection that did not complete. */}
            <svg className="nf-trace" viewBox="0 0 320 40" aria-hidden>
              <line x1="0" y1="20" x2="150" y2="20" />
              <circle cx="160" cy="20" r="7" />
              <line x1="172" y1="20" x2="320" y2="20" strokeDasharray="2 10" />
            </svg>
            <p className="eyebrow">404</p>
            <h1 className="nf-title">This page does not exist.</h1>
            <p className="section-lead">It may have moved, or the link is out of date.</p>
            <a href="/en/" className="bh-btn bh-btn-fill nf-btn">
              Back to the homepage <ArrowRight size={18} aria-hidden />
            </a>
          </div>
        </main>
        <PersonalFooter />
      </div>
    </RootDocument>
  );
}
