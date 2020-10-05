const cacheName = "my-cache";

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll([
        "./index.html", // cache your index page
        "./scss/style.css", // cache app.main css
        "./manifest.webmanifest",
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  console.log("fetch", event.request);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

// self.addEventListener('fetch', (event) => {
//  event.respondWith(caches.open('cache').then((cache) => {
//   return cache.match(event.request).then((response) => {
//    console.log("cache request: " + event.request.url);
//    var fetchPromise = fetch(event.request).then((networkResponse) => {
//    // if we got a response from the cache, update the cache  
//    console.log("fetch completed: " + event.request.url, networkResponse);
//    if (networkResponse) {
//     console.debug("updated cached page: " + event.request.url, networkResponse);
//     cache.put(event.request, networkResponse.clone());}
//    return networkResponse;
//   }, function (event) {
//   // rejected promise - just ignore it, we're offline!   
//   console.log("Error in fetch()", event);
//   event.waitUntil(
//    // our 'cache' here is named *cache* in the caches.open()
//    caches.open('cache').then((cache) => {
//     return cache.addAll
//       ([
//       // cache.addAll(), takes a list of URLs, then fetches them from 
//       // the server and adds the response to the cache 
//       '../../index.html', // cache your index page
//       '../../scss/style.css', // cache app.main css
//       '../../resource/*', // cache all images
//       '../../manifest.webmanifest'
//      ]);
//     }) );
//    });
//    // respond from the cache, or the network
//    return response || fetchPromise;
//  });
//  }));
// });

// // always updating i.e latest version available
// self.addEventListener('install', (event) => {
//    self.skipWaiting();
//    console.log("Latest version installed!");
// });
