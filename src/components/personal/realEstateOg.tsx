/* eslint-disable @next/next/no-img-element -- Satori draws a PNG; next/image does not apply */
import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pick, type Lang } from '@/lib/i18n';

export const ogSize = { width: 1200, height: 630 };

/** Link preview for the EF Real Estate page: the brand on navy, a property photo on the right. */
export async function realEstateOg(lang: Lang) {
  const read = (p: string) => readFile(join(process.cwd(), 'public', p), 'base64');
  const [mark, photo] = await Promise.all([
    read('images/brands/ef-real-estate-mark.svg'),
    read('images/real-estate/og-photo.jpg'),
  ]);
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: '#022554',
        color: '#fefefe',
        fontWeight: 800,
      }}
    >
      <div
        style={{ width: 600, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px' }}
      >
        <img src={`data:image/svg+xml;base64,${mark}`} width={130} height={135} alt="" />
        <div style={{ fontSize: 120, marginTop: 28, lineHeight: 1 }}>EF</div>
        <div style={{ fontSize: 34, marginTop: 10, color: '#5AB8E8', letterSpacing: 12 }}>REAL ESTATE</div>
        <div style={{ fontSize: 28, marginTop: 36, fontWeight: 600, opacity: 0.9, lineHeight: 1.3 }}>
          {pick(lang, 'Private equity in residential property.', 'Private Equity in Wohnimmobilien.')}
        </div>
      </div>
      <img src={`data:image/jpeg;base64,${photo}`} width={600} height={630} alt="" style={{ objectFit: 'cover' }} />
    </div>,
    ogSize,
  );
}
