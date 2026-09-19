// ============================================================================
// ZANGENSCHLOSSER-APP: SERVICE WORKER (v1.12.1)
// ============================================================================
const CACHE_NAME = 'zangenschlosser-cache-v1.12.1';
const ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/version.js',
  './js/shell.js',
  './js/etagen.js',
  './js/zuschnitt.js',
  './js/drehwinkel.js',
  './js/tabellen.js',
  './js/drehmoment.js',
  './manifest.json',
  './img/dr-zange.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request).then((response) => response).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
