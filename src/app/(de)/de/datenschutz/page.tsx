import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { LEGAL_PAGES } from '@/lib/legal';

export const metadata: Metadata = {
  title: LEGAL_PAGES.datenschutz.title,
  description: LEGAL_PAGES.datenschutz.description,
  alternates: { canonical: '/de/datenschutz/' },
};

export default function Page() {
  return <LegalPage slug="datenschutz" />;
}
