import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { LEGAL_PAGES } from '@/lib/legal';

export const metadata: Metadata = {
  title: LEGAL_PAGES.cookies.title,
  description: LEGAL_PAGES.cookies.description,
  alternates: { canonical: '/de/cookies/' },
};

export default function Page() {
  return <LegalPage slug="cookies" />;
}
