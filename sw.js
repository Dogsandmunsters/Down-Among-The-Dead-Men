const CACHE_NAME = 'deadmen-v1';
const urlsToCache = ['/', '/index.html', '/manifest.json', '/images/map1.jpg', '/images/map2.jpg', '/images/cover.jpg', '/images/icon-192.png', '/images/icon-512.png', '/sounds/click.mp3', '/sounds/coins.mp3', '/sounds/damage.mp3', '/sounds/paper.mp3'];

self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(urlsToCache))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));