import { RealEstateView, realEstateMetadata } from '@/components/personal/RealEstateView';

export const metadata = realEstateMetadata('en');

export default function Page() {
  return <RealEstateView lang="en" />;
}
