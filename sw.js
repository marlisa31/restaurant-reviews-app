const cacheVersion = 'v1';

// installation of service worker
self.addEventListener('install', (event) => {

});

// activate service worker and update cache
self.addEventListener('activate', (event) => {
	// remove old caches
	event.waitUntil(
		caches
			.keys()
			.then((cacheKeys) => {
				return Promise.all(

					// loop through all cache keys and remove all except the current version
					cacheKeys.map((cacheKey) => {
						if(cacheKey !== cacheVersion) {
								const deleted = caches.delete(cacheKey);
								return deleted;
						}
					})
			)
		})
	)
});

// store data inside cache and fetch it
self.addEventListener('fetch', (event) => {

	// ignore events that are not GET events
	if (event.request.method !== 'GET') {
		return
	}

	event.respondWith(
		caches
			.open(cacheVersion)
			.then(function(cache) {
				return cache
					// find matching resource
					.match(event.request)
					.then(function(response) {
						// if resource is inside cache, return it from cache
						if(response) {
							return response;

						// else fetch resource from the network
						} else {
							return fetch(event.request)
								.then(function(networkResponse) {
									// put networkResponse into cache for future offline caching
									cache.put(event.request, networkResponse.clone());
									return networkResponse;
								});
						}
					})
					// show error display offline page if page is not in cache and network is not available
					.catch(function(error) {
						console.log('You are currently offline. Please connect to the internet. The following error occured: ' + error);
					});
			})
	)
})
