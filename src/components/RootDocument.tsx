import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import '@/app/globals.css';
import { SITE_URL, PERSON, IS_PRODUCTION, HOME_DESCRIPTION } from '@/lib/site';

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PERSON.shortName} · Entrepreneur`,
    template: `%s | ${PERSON.shortName}`,
  },
  description:
    HOME_DESCRIPTION,
  authors: [{ name: PERSON.name, url: SITE_URL }],
  creator: PERSON.name,
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: PERSON.shortName,
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/images/favicon-96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: '/images/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  robots: IS_PRODUCTION
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
};

/*
 * The Astro site shipped `maximum-scale=1.0, user-scalable=no`, which blocks
 * pinch-zoom. That is an accessibility failure and Safari ignores it anyway, so
 * it is deliberately not ported.
 */
export const rootViewport: Viewport = {
  themeColor: '#022554',
  width: 'device-width',
  initialScale: 1,
};

/**
 * Belt and braces for the service-worker retirement.
 *
 * /sw.js is a tombstone that unregisters itself, and it shipped to the old site
 * ahead of the cutover so the installed base drains there. This catches anyone
 * who arrives here with a registration whose update check has not yet run.
 * Removing this before ~March 2027 risks stranding those clients on cached
 * Hostinger-era HTML.
 */
const SW_KILL = `if('serviceWorker' in navigator){navigator.serviceWorker.getRegistrations().then(function(rs){rs.forEach(function(r){r.unregister()})}).catch(function(){})}if(window.caches){caches.keys().then(function(ks){ks.forEach(function(k){caches.delete(k)})}).catch(function(){})}`;

/**
 * The <html> document, shared by the root layout and global-not-found.
 */
export function RootDocument({
  lang,
  bodyClassName,
  children,
}: {
  lang: 'en' | 'de-CH';
  bodyClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={bodyClassName}>
        {children}
        <Script id="sw-kill" strategy="afterInteractive">
          {SW_KILL}
        </Script>
      </body>
    </html>
  );
}
