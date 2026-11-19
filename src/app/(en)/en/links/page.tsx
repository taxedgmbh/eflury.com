import { LinksView, linksMetadata } from '@/components/personal/LinksView';

// The latest video comes from the YouTube feed; refresh it every six hours.
export const revalidate = 21600;
export const metadata = linksMetadata;

export default function LinksPage() {
  return <LinksView />;
}
