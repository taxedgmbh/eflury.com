import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { NotesPage } from './NotesPage';
import { NEWSLETTER_ON, NewsletterForm } from './NewsletterForm';
import { getNote, getNotes } from '@/lib/notes';
import { alternates, fmtDate, OG_IMAGE, OG_LOCALE, PAGES, pick, type Lang } from '@/lib/i18n';
import { jsonLd } from '@/lib/schema';
import { SITE_URL } from '@/lib/site';

/*
 * The Notes index and article pages, shared by /en/notes/ and /de/notizen/.
 * The route files only pass the language.
 */

const longDate = (lang: Lang) => fmtDate(lang, { day: 'numeric', month: 'long', year: 'numeric' });
const iso = (d: Date) => d.toISOString().slice(0, 10);

const INDEX = {
  en: {
    title: 'Notes',
    description: 'Notes by Emanuel Flury on building companies where finance, tax and technology meet.',
  },
  de: {
    title: 'Notizen',
    description:
      'Notizen von Emanuel Flury über das Aufbauen von Unternehmen, in denen Finanzen, Steuern und Technologie zusammenkommen.',
  },
};

export function notesIndexMetadata(lang: Lang): Metadata {
  const m = INDEX[lang];
  return {
    title: m.title,
    description: m.description,
    alternates: alternates(PAGES.notes, lang),
    openGraph: {
      type: 'website',
      url: PAGES.notes[lang],
      title: `${m.title} · Emanuel Flury`,
      description: m.description,
      siteName: 'Emanuel Flury',
      locale: OG_LOCALE[lang],
      images: [OG_IMAGE[lang]],
    },
  };
}

function Subscribe({ lang, id }: { lang: Lang; id: string }) {
  const t = (en: string, de: string) => pick(lang, en, de);
  return (
    <section className="nt-sub" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="h-small">
        {NEWSLETTER_ON ? t('Get new notes by email', 'Neue Notizen per E-Mail') : t('Follow new notes', 'Neuen Notizen folgen')}
      </h2>
      <NewsletterForm id={id} lang={lang} />
    </section>
  );
}

export function NotesIndex({ lang }: { lang: Lang }) {
  const t = (en: string, de: string) => pick(lang, en, de);
  const notes = getNotes(lang);
  return (
    <NotesPage lang={lang} alt={PAGES.notes[lang === 'de' ? 'en' : 'de']}>
      <p className="eyebrow">{t('Notes', 'Notizen')}</p>
      <h1 className="nt-title">{t('What I learn while building.', 'Was ich beim Aufbauen lerne.')}</h1>
      <p className="section-lead">
        {t(
          'Short notes on technology, tax and real estate, and on building companies.',
          'Kurze Texte zu Technologie, Steuern, Immobilien und zum Aufbau von Unternehmen.',
        )}
      </p>

      {notes.length === 0 ? (
        <p className="nt-empty">{t('The first note is on its way.', 'Die erste Notiz ist unterwegs.')}</p>
      ) : (
        <ol className="nt-list">
          {notes.map((n) => (
            <li key={n.slug}>
              <Link href={`${PAGES.notes[lang]}${n.slug}/`} className="nt-item">
                <time dateTime={iso(n.date)}>{longDate(lang).format(n.date)}</time>
                <span className="nt-item-title">{n.title}</span>
                <span className="nt-item-desc">{n.description}</span>
                <span className="nt-more">
                  {t('Read', 'Lesen')} <ArrowRight size={16} aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}

      <Subscribe lang={lang} id="nl-notes" />
    </NotesPage>
  );
}

const twinUrl = (lang: Lang, twin?: string) => {
  const other: Lang = lang === 'de' ? 'en' : 'de';
  return twin ? `${PAGES.notes[other]}${twin}/` : undefined;
};

export function noteParams(lang: Lang) {
  return getNotes(lang).map((n) => ({ slug: n.slug }));
}

export function noteMetadata(lang: Lang, slug: string): Metadata {
  const note = getNote(slug, lang);
  if (!note) return {};
  const url = `${PAGES.notes[lang]}${note.slug}/`;
  const other = twinUrl(lang, note.twin);
  const pair = lang === 'de' ? { de: url, en: other ?? '' } : { en: url, de: other ?? '' };
  return {
    title: note.title,
    description: note.description,
    alternates: other
      ? alternates(pair, lang)
      : { canonical: url, types: alternates(PAGES.notes, lang).types },
    openGraph: {
      type: 'article',
      url,
      title: note.title,
      description: note.description,
      siteName: 'Emanuel Flury',
      locale: OG_LOCALE[lang],
      images: [OG_IMAGE[lang]],
      publishedTime: note.date.toISOString(),
      authors: [`${SITE_URL}${PAGES.home[lang]}`],
    },
    twitter: { card: 'summary_large_image', title: note.title, description: note.description, images: [OG_IMAGE[lang].url] },
  };
}

export function NoteArticle({ lang, slug }: { lang: Lang; slug: string }) {
  const t = (en: string, de: string) => pick(lang, en, de);
  const note = getNote(slug, lang);
  if (!note) notFound();
  const url = `${SITE_URL}${PAGES.notes[lang]}${note.slug}/`;
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: note.title,
    description: note.description,
    datePublished: iso(note.date),
    url,
    mainEntityOfPage: url,
    inLanguage: lang === 'de' ? 'de-CH' : 'en',
    author: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: 'Emanuel Flury', url: `${SITE_URL}${PAGES.home[lang]}` },
  };
  return (
    <NotesPage lang={lang} alt={twinUrl(lang, note.twin) ?? PAGES.notes[lang === 'de' ? 'en' : 'de']}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(ld) }} />
      <article className="nt-article">
        <Link href={PAGES.notes[lang]} className="nt-back">
          <ArrowLeft size={16} aria-hidden /> {t('All notes', 'Alle Notizen')}
        </Link>
        <p className="eyebrow">
          <time dateTime={iso(note.date)}>{longDate(lang).format(note.date)}</time>
        </p>
        <h1 className="nt-title">{note.title}</h1>
        <p className="section-lead">{note.description}</p>
        <div className="nt-body">
          <MDXRemote
            source={note.body}
            options={{ mdxOptions: { format: 'md', remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
          />
        </div>
      </article>
      <Subscribe lang={lang} id="nl-note" />
    </NotesPage>
  );
}
