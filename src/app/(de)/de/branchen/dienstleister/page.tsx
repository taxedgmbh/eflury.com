import type { Metadata } from 'next';
import { ContentPage } from '@/components/ContentPage';
import { CONTENT_PAGES } from '@/lib/pages';

export const metadata: Metadata = {
  title: CONTENT_PAGES['branchen__dienstleister'].title,
  description: CONTENT_PAGES['branchen__dienstleister'].description,
  alternates: { canonical: '/de/branchen/dienstleister/' },
};

export default function Page() {
  return <ContentPage page="branchen__dienstleister" />;
}
