import { HomeView, homeMetadata } from '@/components/personal/HomeView';

export const metadata = homeMetadata('fr');

// The YouTube feed is re-read at most every six hours (src/lib/youtube.ts).
export const revalidate = 21600;

export default function Page() {
  return <HomeView lang="fr" />;
}
