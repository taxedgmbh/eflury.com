import type { Metadata } from 'next';
import { ContentPage } from '@/components/ContentPage';
import { CONTENT_PAGES } from '@/lib/pages';

export const metadata: Metadata = {
  title: CONTENT_PAGES.leitfaeden.title,
  description: CONTENT_PAGES.leitfaeden.description,
  alternates: { canonical: '/de/leitfaeden/' },
};

export default function Page() {
  return <ContentPage page="leitfaeden" />;
}
