const cacheVersion = 'v1';

// installation of service worker
self.addEventListener('install', function(event) {
	// installation needs to wait until promise is finished
	event.waitUntil(
		caches
			.open(cacheVersion)
			.then(function(cacheVersion) {
				// put all relevant files into the cache
				cacheVersion.addAll([
					'index.html',
					'restaurant.html',
					'css/styles.min.css',
					'js/dbhelper.js',
					'js/main.js',
					'js/restaurant_info.js',
					'data/restaurants.json',
					'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
					'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
					'img/1.jpg',
					'img/2.jpg',
					'img/3.jpg',
					'img/4.jpg',
					'img/5.jpg',
					'img/6.jpg',
					'img/7.jpg',
					'img/8.jpg',
					'img/9.jpg',
					'img/10.jpg'
				])
			})
			// force waiting service worker to become the active one
			.then(() => self.skipWaiting())
	);
});

// activate service worker and update cache
self.addEventListener('activate', function(event) {
	// remove old caches
	event.waitUntil(
		caches.keys().then(function(cacheVersion) {
			return Promise.all(
				// loop through all cache versions and remove all except the current version
				cacheVersion.filter(function(loopVersion) {
					if(loopVersion != cacheVersion) {
							const deleted = caches.delete(loopVersion);
							return deleted;
					}
				})
			)
		})
	)
});

// fetch what is inside the cache
self.addEventListener('fetch', function(event) {
	event.respondWith(
		fetch(event.request).catch(function() {
			caches.match(event.request)
		})
	)
})
