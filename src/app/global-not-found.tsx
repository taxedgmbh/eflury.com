import Link from 'next/link';
import { RootDocument } from '@/components/RootDocument';

export const metadata = { title: 'Page not found', robots: { index: false } };

/*
 * global-not-found renders its own document: the only root layout lives in
 * the (en) route group, so there is no app/layout.tsx to wrap an unmatched URL.
 */
export default function NotFound() {
  return (
    <RootDocument lang="en">
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center px-5 py-24">
      {/*
        Emanuel's 404 artwork: a solid trace running into the brand mark, then a
        dashed one running out — the connection that did not complete.
      */}
      <svg
        viewBox="0 0 320 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="mb-8 w-full max-w-[320px]"
      >
        <path d="M20 60 L 108 60" stroke="var(--eflury-teal)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="114" cy="60" r="5" fill="var(--eflury-teal)" />
        <path d="M206 60 L 300 60" stroke="var(--eflury-teal)" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 9" opacity="0.6" />
        <circle cx="206" cy="60" r="5" fill="none" stroke="var(--eflury-teal)" strokeWidth="2.5" />
        <g>
          <rect x="130" y="30" width="60" height="60" rx="14" fill="#fff" stroke="var(--eflury-teal)" strokeWidth="2.5" />
          <image href="/images/favicon-tab.png" x="135" y="35" width="50" height="50" />
        </g>
      </svg>

      <p className="text-sm font-medium text-[var(--accent-text)]">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">This page does not exist.</h1>
      <p className="mt-3 text-[var(--text-muted)]">
        It may have moved, or the link is out of date.
      </p>
      <p className="mt-8">
        <Link href="/en/" className="text-[var(--link)] hover:underline">
          Back to the homepage
        </Link>
      </p>
    </div>
    </RootDocument>
  );
}
