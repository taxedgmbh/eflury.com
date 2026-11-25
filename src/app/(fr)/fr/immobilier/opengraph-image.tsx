import { ogSize, realEstateOg } from '@/components/personal/realEstateOg';

export const alt = 'EF Real Estate · Emanuel Flury';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return realEstateOg('fr');
}
