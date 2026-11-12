import type { Metadata } from 'next';
import { RootDocument, rootMetadata, rootViewport } from '@/components/RootDocument';
import '@/components/personal/personal.css';

export const metadata: Metadata = {
  ...rootMetadata,
  title: { default: 'Emanuel Flury · Entrepreneur', template: '%s · Emanuel Flury' },
  description:
    'Emanuel Flury builds companies where finance, tax and technology meet: Skopa AG, Taxed GmbH and real estate.',
  openGraph: { ...rootMetadata.openGraph, locale: 'en_GB' },
};
export const viewport = rootViewport;

/** Root layout for the English personal homepage. See RootDocument. */
export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootDocument lang="en" bodyClassName="pb-body">
      {children}
    </RootDocument>
  );
}
