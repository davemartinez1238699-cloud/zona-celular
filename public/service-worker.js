const CACHE_NAME = "zona-celular-v1";

const ARCHIVOS = [
    "/",
    "/index.html",
    "/inicio.html",
    "/styles.css",
    "/script.js",
    "/manifest.json",
    "/icono.png"
];

self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ARCHIVOS))
    );

    self.skipWaiting();
});


self.addEventListener("activate", event => {

    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        )
    );

    self.clients.claim();
});


self.addEventListener("fetch", event => {

    event.respondWith(
        caches.match(event.request)
            .then(response => {

                return response ||
                    fetch(event.request);

            })
    );

});