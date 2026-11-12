import type { Metadata } from 'next';
import { ContentPage } from '@/components/ContentPage';
import { CONTENT_PAGES } from '@/lib/pages';

export const metadata: Metadata = {
  title: CONTENT_PAGES['case-studies__finance-automation'].title,
  description: CONTENT_PAGES['case-studies__finance-automation'].description,
  alternates: { canonical: '/de/case-studies/finance-automation/' },
};

export default function Page() {
  return <ContentPage page="case-studies__finance-automation" />;
}
