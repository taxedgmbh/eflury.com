import type { Metadata } from 'next';
import { ContentPage } from '@/components/ContentPage';
import { CONTENT_PAGES } from '@/lib/pages';

export const metadata: Metadata = {
  title: CONTENT_PAGES.karriere.title,
  description: CONTENT_PAGES.karriere.description,
  alternates: { canonical: '/de/karriere/' },
};

export default function Page() {
  return <ContentPage page="karriere" />;
}
