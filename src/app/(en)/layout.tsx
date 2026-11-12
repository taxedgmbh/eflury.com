import type { Metadata } from 'next';
import { RootDocument, rootMetadata, rootViewport } from '@/components/RootDocument';
import '@/components/personal/personal.css';
import { HOME_DESCRIPTION } from '@/lib/site';

export const metadata: Metadata = {
  ...rootMetadata,
  title: { default: 'Emanuel Flury · Entrepreneur', template: '%s · Emanuel Flury' },
  description: HOME_DESCRIPTION,
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
