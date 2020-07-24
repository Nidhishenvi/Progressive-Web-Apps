const filesToCache = [
    '/',
    'index.html',
    '404.html',
    'offline.html',
    'icons256.png',
    'icons512.png',
];

const staticCacheName = 'static-cache';

self.addEventListener('install', event => {
    console.log('Installing Service worker and Cache static assets');
    event.waitUntil(
        caches.open(staticCacheName)
        .then(cache => {
            return cache.addAll(filesToCache);
        })
    )
})

self.addEventListener('fetch',event =>{
    console.log('fetch event for',event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if(response){
                console.log('Found',event.request.url,'in cache');
                return response;
            }
        console.log('network request for ',event.request.url);
        return fetch(event.request)
        .then(response=>{
            return caches.open(staticCacheName)
            .then(cache=>{
                cache.put(event.request.url,response.clone());
                return response;
            })
        })
        })
        .catch(err =>{
            console.error(err);
        })
    )
})
