import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { LEGAL_PAGES } from '@/lib/legal';

export const metadata: Metadata = {
  title: LEGAL_PAGES.verhaltenskodex.title,
  description: LEGAL_PAGES.verhaltenskodex.description,
  alternates: { canonical: '/de/verhaltenskodex/' },
};

export default function Page() {
  return <LegalPage slug="verhaltenskodex" />;
}
