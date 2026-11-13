import type { Metadata } from 'next';
import { NoteArticle, noteMetadata, noteParams } from '@/components/personal/NotesViews';

export const dynamicParams = false;
export const generateStaticParams = () => noteParams('de');

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return noteMetadata('de', (await params).slug);
}

export default async function Page({ params }: Props) {
  return <NoteArticle lang="de" slug={(await params).slug} />;
}
