import type { Metadata } from 'next';
import { ContentPage } from '@/components/ContentPage';
import { CONTENT_PAGES } from '@/lib/pages';

export const metadata: Metadata = {
  title: CONTENT_PAGES.skopaai.title,
  description: CONTENT_PAGES.skopaai.description,
  alternates: { canonical: '/de/skopaai/' },
};

export default function Page() {
  return <ContentPage page="skopaai" />;
}
