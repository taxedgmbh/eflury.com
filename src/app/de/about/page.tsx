import type { Metadata } from 'next';
import { ContentPage } from '@/components/ContentPage';
import { CONTENT_PAGES } from '@/lib/pages';

export const metadata: Metadata = {
  title: CONTENT_PAGES.about.title,
  description: CONTENT_PAGES.about.description,
  alternates: { canonical: '/de/about/' },
};

export default function Page() {
  return <ContentPage page="about" />;
}
