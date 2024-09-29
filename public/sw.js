if (!self.define) {
  let e,
    t = {};
  const s = (s, n) => (
    (s = new URL(s + ".js", n).href),
    t[s] ||
      new Promise((t) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = s), (e.onload = t), document.head.appendChild(e);
        } else (e = s), importScripts(s), t();
      }).then(() => {
        let e = t[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, a) => {
    const i =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (t[i]) return;
    let c = {};
    const r = (e) => s(e, i),
      o = { module: { uri: i }, exports: c, require: r };
    t[i] = Promise.all(n.map((e) => o[e] || r(e))).then((e) => (a(...e), c));
  };
}
define(["./workbox-c2c0676f"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/static/P3KTHhEUAW3x4mtWXnPkt/_buildManifest.js",
          revision: "2ec694eb52ae4f523f265a46bae4d768",
        },
        {
          url: "/_next/static/P3KTHhEUAW3x4mtWXnPkt/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/0e5ce63c-0a909fa5e3f49b72.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/109-64a79c456f9e4864.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/138-279b6d19b79e7fdd.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/144-419ad1055abbcfc9.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/183-c587babe1b1dea9e.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/381-0dc9c7ffc232ce1f.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/403-9728683925cef2d7.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/472-df71467dc22b6768.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/543-820b060343e587b1.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/602-48366735a3ab8dd3.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/648-afda53e2735eb050.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/933-7c4251f88aea9d74.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/app/%5Bcategory%5D/%5Bid%5D/book/%5Border%5D/page-d14f520ef8d887b2.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/app/%5Bcategory%5D/%5Bid%5D/book/page-b6b661c788044b9a.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/app/%5Bcategory%5D/%5Bid%5D/page-5ec9f52b1374bdd1.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/app/%5Bcategory%5D/page-6f6a280f159bc50f.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-85586b0f168163f4.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/app/ac-rent/%5Bid%5D/%5Bbook%5D/%5Brentalorderid%5D/page-4d1ae20ced073209.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/app/ac-rent/%5Bid%5D/%5Bbook%5D/page-295a273054192a78.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/app/ac-rent/%5Bid%5D/page-491033d7627c6016.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/app/ac-rent/page-7a489e410fbd38db.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/app/admin-dash/ac-rent/page-664f031bb1085d39.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/app/admin-dash/layout-7c167910c6979e70.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/app/admin-dash/orders/page-b57ec12338b97142.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/app/admin-dash/page-2fbf1a20aaa426e3.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/app/admin-dash/services/page-0647d05a608aa9b2.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/app/admin-dash/technician/page-6069f39a31ec36f4.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/app/auth/login/page-32bf84ba47191bac.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/app/auth/register/page-84194778e8a5801a.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/app/layout-016c194686f2fe92.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/app/page-668d223ad57367f1.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/app/payment/%5Bpdetails%5D/page-b05156875ffb7173.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/app/payment/page-3b74f1f5dd646b0a.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/app/track/page-367a6d00667bfb4d.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/fd9d1056-c176ba62bfa905c4.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/framework-f66176bb897dc684.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/main-05c3769b76e3349d.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/main-app-7a025af48e79ef88.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/pages/_app-6a626577ffa902a4.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/pages/_error-1be831200e60c5c0.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",
          revision: "79330112775102f91e1010318bae2bd3",
        },
        {
          url: "/_next/static/chunks/webpack-30b0b94136edf6a8.js",
          revision: "P3KTHhEUAW3x4mtWXnPkt",
        },
        {
          url: "/_next/static/css/3d5b105d8c56da55.css",
          revision: "3d5b105d8c56da55",
        },
        {
          url: "/_next/static/css/5a56e3c1761e58ad.css",
          revision: "5a56e3c1761e58ad",
        },
        {
          url: "/_next/static/media/26a46d62cd723877-s.woff2",
          revision: "befd9c0fdfa3d8a645d5f95717ed6420",
        },
        {
          url: "/_next/static/media/55c55f0601d81cf3-s.woff2",
          revision: "43828e14271c77b87e3ed582dbff9f74",
        },
        {
          url: "/_next/static/media/581909926a08bbc8-s.woff2",
          revision: "f0b86e7c24f455280b8df606b89af891",
        },
        {
          url: "/_next/static/media/6d93bde91c0c2823-s.woff2",
          revision: "621a07228c8ccbfd647918f1021b4868",
        },
        {
          url: "/_next/static/media/97e0cb1ae144a2a9-s.woff2",
          revision: "e360c61c5bd8d90639fd4503c829c2dc",
        },
        {
          url: "/_next/static/media/a34f9d1faa5f3315-s.p.woff2",
          revision: "d4fe31e6a2aebc06b8d6e558c9141119",
        },
        {
          url: "/_next/static/media/df0a9ae256c0569c-s.woff2",
          revision: "d54db44de5ccb18886ece2fda72bdfe0",
        },
        {
          url: "/icon512_maskable.png",
          revision: "1a27d679433930a7525c0ab108447dea",
        },
        {
          url: "/icon512_rounded.png",
          revision: "e7f2714c46222f7fc9135784498c6320",
        },
        { url: "/manifest.json", revision: "9f1d24f8dcc509f195b42277b6735966" },
        {
          url: "/placeholder.svg",
          revision: "a415d5868c9d997da5259298634c5299",
        },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({ response: e }) =>
              e && "opaqueredirect" === e.type
                ? new Response(e.body, {
                    status: 200,
                    statusText: "OK",
                    headers: e.headers,
                  })
                : e,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/static.+\.js$/i,
      new e.CacheFirst({
        cacheName: "next-static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4|webm)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ sameOrigin: e, url: { pathname: t } }) =>
        !(!e || t.startsWith("/api/auth/callback") || !t.startsWith("/api/")),
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: t }, sameOrigin: s }) =>
        "1" === e.headers.get("RSC") &&
        "1" === e.headers.get("Next-Router-Prefetch") &&
        s &&
        !t.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages-rsc-prefetch",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: t }, sameOrigin: s }) =>
        "1" === e.headers.get("RSC") && s && !t.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages-rsc",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: { pathname: e }, sameOrigin: t }) => t && !e.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ sameOrigin: e }) => !e,
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});
