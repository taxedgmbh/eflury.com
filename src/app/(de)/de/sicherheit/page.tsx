import type { Metadata } from 'next';
import { ContentPage } from '@/components/ContentPage';
import { CONTENT_PAGES } from '@/lib/pages';

export const metadata: Metadata = {
  title: CONTENT_PAGES.sicherheit.title,
  description: CONTENT_PAGES.sicherheit.description,
  alternates: { canonical: '/de/sicherheit/' },
};

export default function Page() {
  return <ContentPage page="sicherheit" />;
}
