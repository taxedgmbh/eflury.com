import type { Metadata } from 'next';
import { ContentPage } from '@/components/ContentPage';
import { CONTENT_PAGES } from '@/lib/pages';

export const metadata: Metadata = {
  title: CONTENT_PAGES.methode.title,
  description: CONTENT_PAGES.methode.description,
  alternates: { canonical: '/de/methode/' },
};

export default function Page() {
  return <ContentPage page="methode" />;
}
