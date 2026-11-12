import type { Metadata } from 'next';
import { ContentPage } from '@/components/ContentPage';
import { CONTENT_PAGES } from '@/lib/pages';

export const metadata: Metadata = {
  title: CONTENT_PAGES['case-studies__power-bi-reporting'].title,
  description: CONTENT_PAGES['case-studies__power-bi-reporting'].description,
  alternates: { canonical: '/de/case-studies/power-bi-reporting/' },
};

export default function Page() {
  return <ContentPage page="case-studies__power-bi-reporting" />;
}
