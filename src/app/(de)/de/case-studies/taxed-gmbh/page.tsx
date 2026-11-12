import type { Metadata } from 'next';
import { ContentPage } from '@/components/ContentPage';
import { CONTENT_PAGES } from '@/lib/pages';

export const metadata: Metadata = {
  title: CONTENT_PAGES['case-studies__taxed-gmbh'].title,
  description: CONTENT_PAGES['case-studies__taxed-gmbh'].description,
  alternates: { canonical: '/de/case-studies/taxed-gmbh/' },
};

export default function Page() {
  return <ContentPage page="case-studies__taxed-gmbh" />;
}
