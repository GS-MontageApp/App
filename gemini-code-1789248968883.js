const CACHE_NAME = 'master-suite-v1.6.0';
const urlsToCache = [
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  './img/a-0.png',
  './img/a-45.png',
  './img/a-90.png',
  './img/a-135.png',
  './img/a-180.png',
  './img/a-225.png',
  './img/a-270.png',
  './img/a-315.png',
  './img/a-f.png',
  './img/b-0.png',
  './img/b-45.png',
  './img/b-90.png',
  './img/b-135.png',
  './img/b-180.png',
  './img/b-225.png',
  './img/b-270.png',
  './img/b-315.png'
];

// Installation: Dateien cachen
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Aktivierung: Alte Caches aufräumen
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch: Anfragen abfangen und aus dem Cache bedienen
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});