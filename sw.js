const CACHE_NAME = "JaksFileEditor-v1.0";

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
      '/',
      '/index.js',
      '/index.css',
      '/Stephen_Baxter_Jak_E_Chronicle_Icon_256.png'
    ]);
  })());
});

self.addEventListener('fetch', event_ => {
    event_.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    // Get the resource from the cache.
    const cachedResponse = await cache.match(event_.request);
    if (cachedResponse)
    {
      return cachedResponse;
    }
    else
    {
        try
        {
          // If the resource was not in the cache, try the network.
          const fetchResponse = await fetch(event_.request);

          // Save the resource in the cache and return it.
          cache.put(event_.request, fetchResponse.clone());
          return fetchResponse;
        }
        catch (e)
        {
          // The network failed.
        }
    }
  })());
});