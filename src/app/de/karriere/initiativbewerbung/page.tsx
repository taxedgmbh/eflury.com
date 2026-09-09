import type { Metadata } from 'next';
import { ContentPage } from '@/components/ContentPage';
import { CONTENT_PAGES } from '@/lib/pages';

export const metadata: Metadata = {
  title: CONTENT_PAGES['karriere__initiativbewerbung'].title,
  description: CONTENT_PAGES['karriere__initiativbewerbung'].description,
  alternates: { canonical: '/de/karriere/initiativbewerbung/' },
};

export default function Page() {
  return <ContentPage page="karriere__initiativbewerbung" />;
}
