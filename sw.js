const CACHE_NAME='zangenschlosser-app-v1.10.34';
const urlsToCache=[
  './index.html','./changelogs.js','./manifest.json','https://cdn.tailwindcss.com',
  './img/icon-512.png','./img/dr-zange.jpg',
  './js/eo-data.js','./js/etagen.js','./js/zuschnitt.js','./js/drehwinkel.js','./js/tables.js','./js/app.js'
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(urlsToCache)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.map(n=>n!==CACHE_NAME?caches.delete(n):null))));self.clients.claim();});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
