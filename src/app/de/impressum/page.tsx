import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { LEGAL_PAGES } from '@/lib/legal';

export const metadata: Metadata = {
  title: LEGAL_PAGES.impressum.title,
  description: LEGAL_PAGES.impressum.description,
  alternates: { canonical: '/de/impressum/' },
};

export default function Page() {
  return <LegalPage slug="impressum" />;
}
