/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
import { build, files, version } from "$service-worker";

const sw = self as unknown as ServiceWorkerGlobalScope;

const CACHE = `cache-${version}`;
// The app shell: the built js/css plus everything in /static. index.html is the SPA fallback for every route.
const ASSETS = [...build, ...files, "/index.html"];

sw.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
});

sw.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))),
  );
});

sw.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  // Firestore, auth and fonts from other origins go straight to the network.
  if (event.request.method !== "GET" || url.origin !== sw.location.origin) return;

  // Pages: try the network so a new deploy shows up, and fall back to the cached shell when offline.
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).catch(async () => (await caches.match("/index.html"))!));
    return;
  }

  // Assets have hashed names (or change with the version), so the cache is always right.
  event.respondWith(caches.match(event.request).then((cached) => cached ?? fetch(event.request)));
});
