// ============================================================================
// ZANGENSCHLOSSER-APP: SERVICE WORKER (v1.10.122)
// ============================================================================
const CACHE_NAME = 'zangenschlosser-cache-v1.10.122';

const urlsToCache = [
  './',
  './index.html',
  './js/version.js?v=v1.10.122',
  './js/zuschnitt.js?v=v1.10.122',
  './js/etagen.js?v=v1.10.122',
  './js/drehwinkel.js?v=v1.10.122',
  './js/tabellen.js?v=v1.10.122',
  './js/drehmoment.js?v=v1.10.122',
  './js/shell.js?v=v1.10.122',
  './manifest.json',
  './img/dr-zange.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
