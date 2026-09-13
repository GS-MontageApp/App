const CACHE_NAME = 'zangenschlosser-app-v1.10.35';
const urlsToCache = [
  './index.html',
  './changelogs.js',
  './app.js',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  './img/icon-512.png',
  './img/dr-zange.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
