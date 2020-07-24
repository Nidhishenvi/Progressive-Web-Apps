// caches.open
// cache.all and cache.add('./index.html')

const staticCacheName = 'site-static';
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
   // '/css/bootstrap.css',
   // '/css/style.css',
   // '/css/bootstrap.js',
   // '/css/popper.min.js',
    //'/css/tooltip.min.js',
    //'/css/jquery-3.4.0.slim.min.js',
    '/icon-384x384.png'
];

// install event
self.addEventListener('install', event => {
    console.log('service worker installed');
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
});

// activate service worker
self.addEventListener('activate', event => {
    console.log('service worker has been activated');
});

// fetch event
// when we want to use button to add on home screen
self.addEventListener('fetch', event => {
    console.log('fetch event fired', event);
    event.respondWith(
        caches.match(event.request).then(cacheRes => {
            return cacheRes || fetch(event.request);
        })
    );
});