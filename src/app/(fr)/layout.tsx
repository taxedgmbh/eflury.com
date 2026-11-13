import type { Metadata } from 'next';
import { RootDocument, rootMetadata, rootViewport } from '@/components/RootDocument';
import '@/components/personal/personal.css';
import { HOME_DESCRIPTION_FR } from '@/lib/site';

export const metadata: Metadata = {
  ...rootMetadata,
  title: { default: 'Emanuel Flury · Entrepreneur', template: '%s · Emanuel Flury' },
  description: HOME_DESCRIPTION_FR,
  openGraph: { type: 'website', locale: 'fr_CH', siteName: 'Emanuel Flury' },
};
export const viewport = rootViewport;

/** Root layout for the French pages under /fr/. See RootDocument. */
export default function FrenchRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootDocument lang="fr-CH" bodyClassName="pb-body">
      {children}
    </RootDocument>
  );
}
