import { NotesIndex, notesIndexMetadata } from '@/components/personal/NotesViews';

export const metadata = notesIndexMetadata('en');

export default function Page() {
  return <NotesIndex lang="en" />;
}
