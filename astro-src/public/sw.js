/**
 * TOMBSTONE SERVICE WORKER — do not delete this file before 2027-03.
 *
 * The previous worker (eflury-v3) cached every 200 response with no allow-list,
 * no origin check and no max-age, and only self-invalidated when its CACHE_NAME
 * constant was hand-edited. Left in place, it would keep serving Hostinger-era
 * HTML to returning visitors long after the site moves to Firebase — and its
 * offline document fallback was `caches.match('/')`, i.e. the noindex redirect
 * shim.
 *
 * This replacement unregisters itself and empties every cache. It ships to the
 * OLD site first so the installed base drains while that site is still the one
 * being served; killing the worker during the cutover instead would leave a
 * window where stale HTML is served from an origin that no longer exists.
 *
 * There is deliberately NO fetch listener. A service worker with no fetch
 * handler is bypassed entirely by the browser, so nothing is intercepted even
 * in the window between install and activate.
 *
 * The registration call in MainLayout.astro was replaced with an unregister at
 * the same time. Shipping this file while that call still existed would cause
 * a register -> unregister -> register churn on every page load.
 */

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      for (const key of await caches.keys()) {
        await caches.delete(key);
      }
      await self.registration.unregister();
      for (const client of await self.clients.matchAll({ type: 'window' })) {
        client.navigate(client.url);
      }
    })()
  );
});
