const fileToCache=[
    'index.html',
    'offline.html',
    '404.html',
    'style.css',
    'img3.png',
];

const staticCacheName='our-first-cache';

self.addEventListener('install',event=>{
    console.log('attempting to install service worker and cache assets')
    event.waitUntil(
        caches.open(staticCacheName)
        .then(cache=>{
            return cache.addAll(fileToCache)
        })
    );
});

self.addEventListener('fetch',event=>{
    console.log('fetch event for',event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then(response=>{
            if(response){
                console.log('found ',event.request.url,'in cache');
                return response;
            }
            console.log('network request for',event.request.url);
            return fetch(event.request)
            .then(response=>{
                if(response.status===404){
                    return caches.match('404.html');
                }
                return caches.open(staticCacheName)
                .then(cache=>{
                    cache.put(event.request.url,response.clone());
                    return response;
                })
            })



        })
        .catch(err=>{
            console.error(err);
            return caches.match('offline.html');
        })
    )
})