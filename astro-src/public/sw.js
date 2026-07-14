// Service Worker for PWA functionality
const CACHE_NAME = 'eflury-v3';
const RUNTIME_CACHE = 'eflury-runtime-v3';

// Assets to cache on install
const PRECACHE_ASSETS = [
  '/en/',
  '/de/',
  '/en/about/',
  '/de/about/',
  '/en/pricing/',
  '/de/pricing/',
  '/favicon.svg',
  '/manifest.json',
  '/images/portraits/emanuel-aaron-flury-portrait.webp',
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response
        const responseToCache = response.clone();

        // Cache only clean same-origin responses; never cache redirects or
        // mid-deploy snapshots that could pin a broken page
        if (response.status === 200 && response.type === 'basic' && !response.redirected) {
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }

        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Return offline page if available
          if (event.request.destination === 'document') {
            return caches.match('/en/');
          }
        });
      })
  );
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  // Get pending form data from IndexedDB
  // Submit and clear on success
  console.log('Background sync: Contact form');
}

