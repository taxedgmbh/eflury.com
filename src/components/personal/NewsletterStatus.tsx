import Link from 'next/link';
import { notFound } from 'next/navigation';
import { NotesPage } from './NotesPage';
import { NewsletterForm } from './NewsletterForm';
import { PAGES, type Lang } from '@/lib/i18n';

/* Status pages after sign-up, confirmation and unsubscribe, in both languages. */
const TEXT = {
  en: {
    'check-email': {
      title: 'Check your inbox.',
      text: 'I have sent you an email with a link. Click it to confirm your subscription. Nothing else arrives until you do. If nothing comes within a few minutes, look in your spam folder.',
    },
    confirmed: {
      title: 'You are subscribed.',
      text: 'Thank you. New notes will arrive by email when I publish them. Every email has a link to unsubscribe.',
    },
    expired: {
      title: 'This link has expired.',
      text: 'The confirmation link is no longer valid, or the subscription was already confirmed. Sign up again below if you like.',
    },
    unsubscribed: {
      title: 'You are unsubscribed.',
      text: 'Your email address has been deleted. You will receive no more emails from this list.',
    },
    invalid: { title: 'That address does not look right.', text: 'Please check the email address and try again.' },
    limit: {
      title: 'Too many sign-ups.',
      text: 'There have been too many sign-ups from your connection today. Please try again tomorrow, or email me directly at me@eflury.com.',
    },
    error: {
      title: 'Something went wrong.',
      text: 'The sign-up could not be completed. Please try again later, or email me directly at me@eflury.com.',
    },
  },
  de: {
    'check-email': {
      title: 'Bitte prüfen Sie Ihr Postfach.',
      text: 'Ich habe Ihnen ein E-Mail mit einem Link geschickt. Klicken Sie darauf, um Ihr Abonnement zu bestätigen. Vorher erhalten Sie nichts. Falls in ein paar Minuten nichts ankommt, schauen Sie im Spam-Ordner nach.',
    },
    confirmed: {
      title: 'Sie sind angemeldet.',
      text: 'Danke. Neue Notizen kommen per E-Mail, sobald ich sie veröffentliche. Jedes E-Mail enthält einen Link zur Abmeldung.',
    },
    expired: {
      title: 'Dieser Link ist abgelaufen.',
      text: 'Der Bestätigungslink ist nicht mehr gültig, oder das Abonnement wurde bereits bestätigt. Sie können sich unten gerne neu anmelden.',
    },
    unsubscribed: {
      title: 'Sie sind abgemeldet.',
      text: 'Ihre E-Mail-Adresse wurde gelöscht. Sie erhalten keine E-Mails mehr von dieser Liste.',
    },
    invalid: {
      title: 'Diese Adresse scheint nicht zu stimmen.',
      text: 'Bitte prüfen Sie die E-Mail-Adresse und versuchen Sie es nochmals.',
    },
    limit: {
      title: 'Zu viele Anmeldungen.',
      text: 'Von Ihrer Verbindung gab es heute zu viele Anmeldungen. Bitte versuchen Sie es morgen wieder oder schreiben Sie mir direkt an me@eflury.com.',
    },
    error: {
      title: 'Etwas ist schiefgelaufen.',
      text: 'Die Anmeldung konnte nicht abgeschlossen werden. Bitte versuchen Sie es später nochmals oder schreiben Sie mir direkt an me@eflury.com.',
    },
  },
} as const;

export type Status = keyof (typeof TEXT)['en'];
export const STATUSES = Object.keys(TEXT.en) as Status[];
const SHOW_FORM: Status[] = ['expired', 'invalid'];

export function NewsletterStatus({ lang, status }: { lang: Lang; status: string }) {
  if (!STATUSES.includes(status as Status)) notFound();
  const page = TEXT[lang][status as Status];
  const other: Lang = lang === 'de' ? 'en' : 'de';
  return (
    <NotesPage lang={lang} alt={`${PAGES.newsletter[other]}${status}/`}>
      <p className="eyebrow">Newsletter</p>
      <h1 className="nt-title">{page.title}</h1>
      <p className="section-lead">{page.text}</p>
      {SHOW_FORM.includes(status as Status) && <NewsletterForm id="nl-status" lang={lang} />}
      <p>
        <Link href={PAGES.notes[lang]} className="pf-btn pf-btn-line">
          {lang === 'de' ? 'Zu den Notizen' : 'Read the notes'}
        </Link>
      </p>
    </NotesPage>
  );
}
