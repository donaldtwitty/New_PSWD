const CACHE_NAME = 'pswd-v1';
const urlsToCache = [
    '/',
    '/New_PSWD/assets/css/bootstrap.min.css',
    '/New_PSWD/assets/css/templatemo-softy-pinko.min.css',
    '/New_PSWD/assets/js/custom.js',
    '/New_PSWD/assets/js/modal.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});