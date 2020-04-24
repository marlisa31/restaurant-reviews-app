const cacheVersion = 'v3';

// installation of service worker
self.addEventListener('install', (event) => {

});

// activate service worker and update cache
self.addEventListener('activate', (event) => {
	// remove old caches
	event.waitUntil(
		caches
			.keys()
			.then((cacheVersion) => {
				return Promise.all(
					// loop through all cache versions and remove all except the current version
					cacheVersion.filter((loopVersion) => {
						if(loopVersion !== cacheVersion) {
								const deleted = caches.delete(loopVersion);
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
			.then((cache) => {

				// check if ressource is available through network
				return fetch(event.request)
				.then((response) => {

					// add copy to the cache when network data is accessed
					cache.put(event.request, response.clone());
					return response;
			 	})
				// search for matching cache ressource if no network connection available
				.catch(() => {
					caches.match(event.request)
					.catch((error) => {
						 console.log('This page is not available offline.' + error);
					})
				});

			})
	)
})
