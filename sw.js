/* 宝可梦卡牌店课程 service worker
   HTML: network-first (always try to get the latest page).
   Assets: cache-first, then network, then cache.
   A new SW version replaces the cache name so updates are not stuck. */
var CACHE = "pcsc-static-v2-20261118";
var PRECACHE = [
  "/pokemon-card-shop-course/",
  "/pokemon-card-shop-course/manifest.webmanifest",
  "/pokemon-card-shop-course/assets/icons/pokeball-192.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(PRECACHE).catch(function () {});
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

function isHtml(request, url) {
  if (request.mode === "navigate") return true;
  var accept = request.headers.get("accept") || "";
  if (accept.indexOf("text/html") !== -1) return true;
  if (url.pathname.endsWith(".html") || url.pathname.endsWith("/")) return true;
  return false;
}

self.addEventListener("fetch", function (event) {
  var request = event.request;
  if (request.method !== "GET") return;
  var url;
  try { url = new URL(request.url); } catch (e) { return; }
  if (url.origin !== self.location.origin) return;
  if (url.pathname.indexOf("/pokemon-card-shop-course/") !== 0) return;

  if (isHtml(request, url)) {
    // no-cache：每次都向服务器确认（ETag），不吃浏览器 HTTP 缓存里的旧页面
    event.respondWith(
      fetch(request.url, { cache: "no-cache", credentials: "same-origin" }).then(function (res) {
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(CACHE).then(function (cache) { cache.put(request, copy); });
        }
        return res;
      }).catch(function () {
        return caches.match(request).then(function (cached) {
          if (cached) return cached;
          return caches.match(request.url, { ignoreSearch: true }).then(function (c2) {
            return c2 || caches.match("/pokemon-card-shop-course/");
          });
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(function (cached) {
      if (cached) {
        // Revalidate in the background so CSS/images don't stay stale forever.
        fetch(request).then(function (res) {
          if (res && res.ok) caches.open(CACHE).then(function (cache) { cache.put(request, res); });
        }).catch(function () {});
        return cached;
      }
      return fetch(request).then(function (res) {
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(CACHE).then(function (cache) { cache.put(request, copy); });
        }
        return res;
      });
    })
  );
});
