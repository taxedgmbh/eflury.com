import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { LEGAL_PAGES } from '@/lib/legal';

export const metadata: Metadata = {
  title: LEGAL_PAGES.nutzungsbedingungen.title,
  description: LEGAL_PAGES.nutzungsbedingungen.description,
  alternates: { canonical: '/de/nutzungsbedingungen/' },
};

export default function Page() {
  return <LegalPage slug="nutzungsbedingungen" />;
}
