const CACHE_NAME = 'zangenschlosser-app-v1.10.41
  ';
const urlsToCache = [
  './index.html',
  './changelogs.js',
  './js/zuschnitt.js',
  './js/etagen.js',
  './js/drehwinkel.js',
  './js/tabellen.js',
  './js/shell.js',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  './img/icon-512.png',
  './img/dr-zange.jpg',
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

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

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
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
