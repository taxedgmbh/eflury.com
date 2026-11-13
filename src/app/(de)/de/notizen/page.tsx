import { NotesIndex, notesIndexMetadata } from '@/components/personal/NotesViews';

export const metadata = notesIndexMetadata('de');

export default function Page() {
  return <NotesIndex lang="de" />;
}
