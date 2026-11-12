import { RootDocument, rootMetadata, rootViewport } from '@/components/RootDocument';

export const metadata = rootMetadata;
export const viewport = rootViewport;

export default function GermanRootLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="de">{children}</RootDocument>;
}
