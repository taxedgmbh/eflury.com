import type { Metadata } from 'next';
import { ContentPage } from '@/components/ContentPage';
import { CONTENT_PAGES } from '@/lib/pages';

export const metadata: Metadata = {
  title: CONTENT_PAGES.kontakt.title,
  description: CONTENT_PAGES.kontakt.description,
  alternates: { canonical: '/de/kontakt/' },
};

export default function Page() {
  return <ContentPage page="kontakt" />;
}
