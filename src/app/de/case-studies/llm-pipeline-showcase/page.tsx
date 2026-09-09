import type { Metadata } from 'next';
import { ContentPage } from '@/components/ContentPage';
import { CONTENT_PAGES } from '@/lib/pages';

export const metadata: Metadata = {
  title: CONTENT_PAGES['case-studies__llm-pipeline-showcase'].title,
  description: CONTENT_PAGES['case-studies__llm-pipeline-showcase'].description,
  alternates: { canonical: '/de/case-studies/llm-pipeline-showcase/' },
};

export default function Page() {
  return <ContentPage page="case-studies__llm-pipeline-showcase" />;
}
