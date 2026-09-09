import type { Metadata } from 'next';
import { ContentPage } from '@/components/ContentPage';
import { CONTENT_PAGES } from '@/lib/pages';

export const metadata: Metadata = {
  title: CONTENT_PAGES['branchen__reporting-daten'].title,
  description: CONTENT_PAGES['branchen__reporting-daten'].description,
  alternates: { canonical: '/de/branchen/reporting-daten/' },
};

export default function Page() {
  return <ContentPage page="branchen__reporting-daten" />;
}
