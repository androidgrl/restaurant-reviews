//set variables
let currentCacheName = 'resto-app-v1';
const urls = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/css/styles.css',
  '/css/desktop.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json'
]

//create cache
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(currentCacheName).then(function(cache) {
      return cache.addAll(urls);
    }));
});

//delete old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      cacheNames.forEach(function(name) {
        if (name != currentCacheName) {
          caches.delete(name);
        }
      });
    }));
})

//fetch cache
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    }));
});
