import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NotesPage } from '@/components/personal/NotesPage';
import { NewsletterForm } from '@/components/personal/NewsletterForm';

const PAGES = {
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
  invalid: {
    title: 'That address does not look right.',
    text: 'Please check the email address and try again.',
  },
  limit: {
    title: 'Too many sign-ups.',
    text: 'There have been too many sign-ups from your connection today. Please try again tomorrow, or email me directly at me@eflury.com.',
  },
  error: {
    title: 'Something went wrong.',
    text: 'The sign-up could not be completed. Please try again later, or email me directly at me@eflury.com.',
  },
} as const;

type Status = keyof typeof PAGES;
const SHOW_FORM: Status[] = ['expired', 'invalid'];

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(PAGES).map((status) => ({ status }));
}

export const metadata: Metadata = { title: 'Newsletter', robots: { index: false, follow: true } };

export default async function NewsletterStatus({ params }: { params: Promise<{ status: string }> }) {
  const status = (await params).status as Status;
  const page = PAGES[status];
  if (!page) notFound();
  return (
    <NotesPage>
      <p className="eyebrow">Newsletter</p>
      <h1 className="nt-title">{page.title}</h1>
      <p className="section-lead">{page.text}</p>
      {SHOW_FORM.includes(status) && <NewsletterForm id="nl-status" />}
      <p>
        <Link href="/en/notes/" className="pf-btn pf-btn-line">
          Read the notes
        </Link>
      </p>
    </NotesPage>
  );
}
