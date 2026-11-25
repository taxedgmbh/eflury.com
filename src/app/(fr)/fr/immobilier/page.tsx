import { RealEstateView, realEstateMetadata } from '@/components/personal/RealEstateView';

export const metadata = realEstateMetadata('fr');

export default function Page() {
  return <RealEstateView lang="fr" />;
}
