import type { Metadata } from 'next';
import { ContentPage } from '@/components/ContentPage';
import { CONTENT_PAGES } from '@/lib/pages';

export const metadata: Metadata = {
  title: CONTENT_PAGES['branchen__finanzteams'].title,
  description: CONTENT_PAGES['branchen__finanzteams'].description,
  alternates: { canonical: '/de/branchen/finanzteams/' },
};

export default function Page() {
  return <ContentPage page="branchen__finanzteams" />;
}
