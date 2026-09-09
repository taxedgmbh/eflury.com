import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { sans, serif } from './fonts';
import { SITE_URL, PERSON, GA_ID, IS_PRODUCTION } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PERSON.shortName} — Unternehmer`,
    template: `%s | ${PERSON.shortName}`,
  },
  description:
    'Emanuel Flury — Unternehmer aus Grenchen. Gründer von Taxed GmbH und SkopaAI, Berater für KI-Automatisierung bei Schweizer KMU.',
  authors: [{ name: PERSON.name, url: SITE_URL }],
  creator: PERSON.name,
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    siteName: PERSON.shortName,
    url: SITE_URL,
  },
  twitter: { card: 'summary_large_image' },
  robots: IS_PRODUCTION
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
};

/*
 * The Astro site shipped `maximum-scale=1.0, user-scalable=no`, which blocks
 * pinch-zoom. That is an accessibility failure and Safari ignores it anyway, so
 * it is deliberately not ported.
 */
export const viewport: Viewport = {
  themeColor: '#022554',
  width: 'device-width',
  initialScale: 1,
};

/**
 * Runs before paint: restores the stored theme so the page does not flash the
 * wrong palette. Same localStorage key as the Astro site, so an existing
 * preference survives the migration.
 */
const THEME_INIT = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t)}else if(matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.setAttribute('data-theme','dark')}}catch(e){}})()`;

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>
        {children}
        <Script id="sw-kill" strategy="afterInteractive">
          {SW_KILL}
        </Script>
        {IS_PRODUCTION && GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
