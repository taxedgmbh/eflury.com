import { NotesIndex, notesIndexMetadata } from '@/components/personal/NotesViews';

export const metadata = notesIndexMetadata('fr');

export default function Page() {
  return <NotesIndex lang="fr" />;
}
