import { ImageResponse } from 'next/og';
import { getAllPosts, getPost } from '@/lib/content';

/*
 * Not one post carries a hero image, so every share card on the Astro site fell
 * back to a single static file. Generating per-post cards gives all 17 posts a
 * distinct card for free, with no asset production.
 */
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Blogbeitrag von Emanuel Flury';

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPost((await params).slug);
  const title = post?.title ?? 'Blog';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #022554 0%, #0f2744 55%, #276297 100%)',
          padding: '72px',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: '#0d9488' }} />
          <div style={{ fontSize: 26, letterSpacing: 1.5, color: '#9CADBE' }}>EFLURY.COM</div>
        </div>

        <div
          style={{
            fontSize: title.length > 90 ? 52 : 64,
            lineHeight: 1.15,
            fontWeight: 700,
            letterSpacing: -1,
            display: 'flex',
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26 }}>
          <div style={{ color: '#ffffff' }}>Emanuel Flury</div>
          <div style={{ color: '#9CADBE' }}>Grenchen, Schweiz</div>
        </div>
      </div>
    ),
    size
  );
}
