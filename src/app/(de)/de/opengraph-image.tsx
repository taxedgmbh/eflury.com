import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Emanuel Flury · Unternehmer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** The link preview for every page: navy, the EF mark, name and the three fields. */
export default async function OpenGraphImage() {
  // Satori reads TTF/OTF/WOFF only, not the site's WOFF2, so this uses the
  // built-in sans at its heaviest weight.
  const mark = await readFile(join(process.cwd(), 'public/images/ef-mark-white.svg'), 'base64');
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 96px',
          background: '#022554',
          color: '#fefefe',
          fontWeight: 800,
        }}
      >
        <img src={`data:image/svg+xml;base64,${mark}`} width={150} height={120} alt="" />
        <div style={{ fontSize: 96, marginTop: 40, letterSpacing: -2 }}>EMANUEL FLURY</div>
        <div style={{ fontSize: 32, marginTop: 16, color: '#2dd4bf', letterSpacing: 6 }}>
          UNTERNEHMER · TECH · TAX · REAL ESTATE
        </div>
      </div>
    ),
    size,
  );
}
