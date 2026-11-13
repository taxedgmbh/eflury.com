import type { Metadata } from 'next';
import { NewsletterStatus, STATUSES } from '@/components/personal/NewsletterStatus';

export const dynamicParams = false;
export const generateStaticParams = () => STATUSES.map((status) => ({ status }));
export const metadata: Metadata = { title: 'Newsletter', robots: { index: false, follow: true } };

export default async function Page({ params }: { params: Promise<{ status: string }> }) {
  return <NewsletterStatus lang="de" status={(await params).status} />;
}
