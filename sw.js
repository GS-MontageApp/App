// ============================================================================
// ZANGENSCHLOSSER APP SERVICE WORKER (Dynamic Version via APP_CONFIG)
// ============================================================================
importScripts('./js/version.js');

const CACHE_NAME = `zangenschlosser-app-${self.APP_CONFIG ? self.APP_CONFIG.version : 'fallback'}`;
const ASSETS = [
  './',
  './index.html',
  './js/version.js',
  './js/shell.js',
  './js/etagen.js',
  './js/zuschnitt.js',
  './js/drehwinkel.js',
  './js/tabellen.js'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS).catch((err) => {
        console.warn('Nicht alle Assets konnten vorgecached werden:', err);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          if (event.request.url.startsWith(self.location.origin)) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });
      }).catch(() => {
        // Fallback für Navigation / Offline
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
