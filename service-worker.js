/**
 * ExamPro Service Worker (v1.0.0)
 * Enables 100% offline access, fast asset caching, and offline quiz execution.
 */

const CACHE_NAME = "exampro-pwa-v1";

const PRECACHE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/main.css",
  "./css/components.css",
  "./css/animations.css",
  "./js/app.js",
  "./js/ui.js",
  "./js/state.js",
  "./js/quizEngine.js",
  "./js/mockEngine.js",
  "./js/pyqHub.js",
  "./js/analytics.js",
  "./js/gamification.js",
  "./js/data/questions.js",
  "./js/data/mockTests.js",
  "./icons/favicon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-192.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png"
];

// Install Event: Pre-cache core shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log("[ExamPro SW] Pre-caching app shell and question bank");
      await Promise.all(
        PRECACHE_ASSETS.map((asset) =>
          cache.add(asset).catch((err) => {
            console.warn("[ExamPro SW] Precache warning for:", asset, err);
          })
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Clean up outdated caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log("[ExamPro SW] Removing legacy cache:", name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Stale-While-Revalidate with Offline Fallback
self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Ignore non-GET requests and chrome-extension schemes
  if (request.method !== "GET" || !request.url.startsWith("http")) {
    return;
  }

  // Navigation requests: return index.html if offline
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match("./index.html")
          .then((res) => res || caches.match("./") || caches.match("index.html"));
      })
    );
    return;
  }

  // For static assets & runtime requests: Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (
            networkResponse &&
            (networkResponse.status === 200 || networkResponse.type === "opaque")
          ) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Network failed, fall back to cached response if present
        });

      return cachedResponse || fetchPromise;
    })
  );
});
