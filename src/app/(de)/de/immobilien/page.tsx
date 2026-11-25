import { RealEstateView, realEstateMetadata } from '@/components/personal/RealEstateView';

export const metadata = realEstateMetadata('de');

export default function Page() {
  return <RealEstateView lang="de" />;
}
