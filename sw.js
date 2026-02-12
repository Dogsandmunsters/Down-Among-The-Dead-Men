const CACHE_NAME = 'deadmen-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  // Icons
  './images/icon-192.png',
  './images/icon-512.png',
  './images/apple-touch-icon.png',
  // Maps
  './images/map1.jpg',
  './images/map2.jpg',
  // Cover
  './images/cover.jpg',
  // Section illustrations
  './images/illo_4.jpg',
  './images/illo_14.jpg',
  './images/illo_41.jpg',
  './images/illo_53.jpg',
  './images/illo_69.jpg',
  './images/illo_106.jpg',
  './images/illo_146.jpg',
  './images/illo_172.jpg',
  './images/illo_206.jpg',
  './images/illo_238.jpg',
  './images/illo_311.jpg',
  './images/illo_325.jpg',
  './images/illo_336.jpg',
  './images/illo_374.jpg',
  './images/illo_423.jpg',
  // Filler illustrations
  './images/filler_chart.jpg',
  './images/filler_demise.jpg',
  './images/filler_ship.jpg',
  // Sounds
  './sounds/click.mp3',
  './sounds/coins.mp3',
  './sounds/damage.mp3',
  './sounds/paper.mp3'
];

// Install: precache all essential assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: cache-first, falling back to network (and cache new responses)
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(response => {
        // Don't cache non-OK responses or non-GET requests
        if (!response || response.status !== 200 || e.request.method !== 'GET') {
          return response;
        }
        // Clone and cache the response for future offline use
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(e.request, responseToCache);
        });
        return response;
      });
    })
  );
});
