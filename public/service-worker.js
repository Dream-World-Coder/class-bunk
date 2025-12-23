importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js",
);

const CACHE_NAME = "bunk-v2";

// Handle updates
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Cache strategy for all requests
workbox.routing.registerRoute(
  ({ request }) =>
    request.mode === "navigate" ||
    ASSETS.includes(new URL(request.url).pathname),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE_NAME,
  }),
);
