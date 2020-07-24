const myChache=[
    '/',
    'index.html',
    'a.png',
    'successful.html',
    'unsuccessful.html',
    'style.css',
];

const myCacheName="MyCache";
self.addEventListener('install',event=>{
    console.log("installing service worker and cache");
    event.waitUntil(
        caches.open(myCacheName)
        .then(cache=>{
            return cache.addAll(myChache)
        })
    );
});
self.addEventListener('fetch',event=>{
    console.log('fetching ',event.request.url); 
    event.respondWith(
        caches.match(event.request)
        .then(response=>{
            if(response){
                console.log('found',event.request.url,'in cache');
                return response
            }
            console.log('network request for ',event.request.url);
            return fetch(event.request)
            .then(response=>{
                if(response.status===404){
                    return caches.match('404.html');
                }
                return caches.open(myCacheName)
                .then(cache=>{
                    cache.put(event.request.url,response.clone());
                    return response;
                })
            })
        })
        .catch(err=>{
            console.log(err);
            return caches.match('404.html');
        })
    )
})