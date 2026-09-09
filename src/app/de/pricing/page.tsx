import type { Metadata } from 'next';
import { ContentPage } from '@/components/ContentPage';
import { CONTENT_PAGES } from '@/lib/pages';

export const metadata: Metadata = {
  title: CONTENT_PAGES.pricing.title,
  description: CONTENT_PAGES.pricing.description,
  alternates: { canonical: '/de/pricing/' },
};

export default function Page() {
  return <ContentPage page="pricing" />;
}
