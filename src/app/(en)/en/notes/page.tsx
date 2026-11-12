import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { NotesPage } from '@/components/personal/NotesPage';
import { NEWSLETTER_ON, NewsletterForm } from '@/components/personal/NewsletterForm';
import { fmtNoteDate, getNotes } from '@/lib/notes';

const DESCRIPTION = 'Notes by Emanuel Flury on building companies where finance, tax and technology meet.';

export const metadata: Metadata = {
  title: 'Notes',
  description: DESCRIPTION,
  alternates: { canonical: '/en/notes/', types: { 'application/rss+xml': [{ url: '/rss.xml', title: 'Emanuel Flury · Notes' }] } },
  openGraph: { type: 'website', url: '/en/notes/', title: 'Notes · Emanuel Flury', description: DESCRIPTION, siteName: 'Emanuel Flury', locale: 'en_GB' },
};

export default function NotesIndex() {
  const notes = getNotes();
  return (
    <NotesPage>
      <p className="eyebrow">Notes</p>
      <h1 className="nt-title">What I learn while building.</h1>
      <p className="section-lead">Short notes on technology, tax and real estate, and on building companies.</p>

      {notes.length === 0 ? (
        <p className="nt-empty">The first note is on its way.</p>
      ) : (
        <ol className="nt-list">
          {notes.map((n) => (
            <li key={n.slug}>
              <a href={`/en/notes/${n.slug}/`} className="nt-item">
                <time dateTime={n.date.toISOString().slice(0, 10)}>{fmtNoteDate.format(n.date)}</time>
                <span className="nt-item-title">{n.title}</span>
                <span className="nt-item-desc">{n.description}</span>
                <span className="nt-more">
                  Read <ArrowRight size={16} aria-hidden />
                </span>
              </a>
            </li>
          ))}
        </ol>
      )}

      <section className="nt-sub" aria-labelledby="nt-sub-title">
        <h2 id="nt-sub-title" className="h-small">
          {NEWSLETTER_ON ? 'Get new notes by email' : 'Follow new notes'}
        </h2>
        <NewsletterForm id="nl-notes" />
      </section>
    </NotesPage>
  );
}
