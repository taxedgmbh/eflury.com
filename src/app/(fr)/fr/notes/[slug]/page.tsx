import type { Metadata } from 'next';
import { NoteArticle, noteMetadata, noteParams } from '@/components/personal/NotesViews';

export const dynamicParams = false;
export const generateStaticParams = () => noteParams('fr');

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return noteMetadata('fr', (await params).slug);
}

export default async function Page({ params }: Props) {
  return <NoteArticle lang="fr" slug={(await params).slug} />;
}
