import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { LEGAL_PAGES } from '@/lib/legal';

export const metadata: Metadata = {
  title: LEGAL_PAGES.haftungsausschluss.title,
  description: LEGAL_PAGES.haftungsausschluss.description,
  alternates: { canonical: '/de/haftungsausschluss/' },
};

export default function Page() {
  return <LegalPage slug="haftungsausschluss" />;
}
