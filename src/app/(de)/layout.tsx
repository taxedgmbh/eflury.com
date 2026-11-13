import type { Metadata } from 'next';
import { RootDocument, rootMetadata, rootViewport } from '@/components/RootDocument';
import '@/components/personal/personal.css';
import { HOME_DESCRIPTION_DE } from '@/lib/site';

export const metadata: Metadata = {
  ...rootMetadata,
  title: { default: 'Emanuel Flury · Unternehmer', template: '%s · Emanuel Flury' },
  description: HOME_DESCRIPTION_DE,
  openGraph: { type: 'website', locale: 'de_CH', siteName: 'Emanuel Flury' },
};
export const viewport = rootViewport;

/** Root layout for the German pages under /de/. See RootDocument. */
export default function GermanRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootDocument lang="de-CH" bodyClassName="pb-body">
      {children}
    </RootDocument>
  );
}
