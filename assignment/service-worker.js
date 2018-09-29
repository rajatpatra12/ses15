var CACHE_NAME = 'V4';

self.addEventListener('install', async function() {
    var cache = await caches.open(CACHE_NAME);
    
    caches.keys().then(function(data) {
        data.forEach(function(cacheName) {
            if(cacheName !== CACHE_NAME) {
                caches.delete(cacheName);
            }
        }); 
    });

    cache.addAll([
        './index.html',
        './style.css',
        './script.js',
        './manifest.json',
        
    ]);
});

self.addEventListener('fetch', function(event) {
    
    const getCustomResponsePromise = async function() {
        console.log(`URL ${event.request.url}`, `location origin ${location}`)

        try {
    
            const cachedResponse = await caches.match(event.request)
            if (cachedResponse) {
    
                console.log(`Cached response ${cachedResponse}`)
                return cachedResponse
            }

    
            const netResponse = await fetch(event.request)
            console.log(`adding net response to cache`)

    
            let cache = await caches.open(CACHE_NAME)

    
            cache.put(event.request, netResponse.clone())

    
            return netResponse
        } catch (err) {
            console.error(`Error ${err}`)
            throw err
        }
    }
    
    event.respondWith(getCustomResponsePromise())
})