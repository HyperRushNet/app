const CACHE_NAME = 'offline-cache-v1';
const URLsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/service-worker.js',
  'https://hyperrushnet.github.io/ift',
  'https://cdn.glitch.global/9f0d898a-f212-4456-a044-c8849a98f902/thumbnails%2FTheHyperLogo%20(1).png?1737233725726',
  // Voeg eventueel andere statische bestanden toe die je wilt cachen
];

// Installeren van de Service Worker en cachen van de bestanden
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching belangrijke bestanden');
        return cache.addAll(URLsToCache);
      })
  );
});

// Activeren van de Service Worker en het verwijderen van oude caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Het ophalen van bestanden uit de cache wanneer de gebruiker offline is
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
  );
});
