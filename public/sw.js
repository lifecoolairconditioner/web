if(!self.define){let e,t={};const s=(s,n)=>(s=new URL(s+".js",n).href,t[s]||new Promise((t=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=t,document.head.appendChild(e)}else e=s,importScripts(s),t()})).then((()=>{let e=t[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,a)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(t[i])return;let c={};const r=e=>s(e,i),h={module:{uri:i},exports:c,require:r};t[i]=Promise.all(n.map((e=>h[e]||r(e)))).then((e=>(a(...e),c)))}}define(["./workbox-c2c0676f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/Xh-ge7tqJwqIt27BhQTfn/_buildManifest.js",revision:"3e2d62a10f4d6bf0b92e14aecf7836f4"},{url:"/_next/static/Xh-ge7tqJwqIt27BhQTfn/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/2109-91e7e4a1266d05b0.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/2403-6f2ed81bd488e6c6.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/2585-9dccaf6fe679f375.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/2738-a4095b28ff5be93b.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/2832-662611ddd793b2ee.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/2967-62d499c7d5473832.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/6648-d378ea059947d920.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/7138-2a95058f79be00d4.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/7907-95ac22a08e851186.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/8029-35dad48394b24aa1.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/8118-6bbebdf8c68c74fe.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/8139-c5d03ec26afb578f.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/8472-a45c314dd1462423.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/8566-e31dae8c7d7dc5f7.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/9473-080663fde182deb9.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/%5Bcategory%5D/%5Bid%5D/book/%5Border%5D/page-bc9fb670e4f055af.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/%5Bcategory%5D/%5Bid%5D/book/page-1f526f711152d92e.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/%5Bcategory%5D/%5Bid%5D/page-5e1b0b1e734a5b8e.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/%5Bcategory%5D/page-dce8e8d06b335ada.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/_not-found/page-80b3180ace61f1cd.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/ac-rent/%5Bid%5D/%5Bbook%5D/%5Brentalorderid%5D/page-8913eef229da7ab6.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/ac-rent/%5Bid%5D/%5Bbook%5D/page-2c22caaf62c6b0b4.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/ac-rent/%5Bid%5D/page-d00d2bcef3e876f7.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/ac-rent/page-62035562e3e2d0fc.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/admin-dash/ac-rent/page-8cd5d300debd8af4.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/admin-dash/carousel/page-f6ff49021f91b206.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/admin-dash/carousel2/page-88723c2cd6888394.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/admin-dash/layout-6628d00f315a6946.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/admin-dash/orders/page-9861fcaffc406e4a.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/admin-dash/page-ec32caaa17f8e97b.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/admin-dash/payment/page-30e3311c2bae7cca.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/admin-dash/services/page-e264e7713dc7bd3f.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/admin-dash/technician/page-6cd00287f7478981.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/amc/%5Bid%5D/%5Bbook%5D/%5Brentalorderid%5D/page-56e1ac58b2976354.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/amc/%5Bid%5D/%5Bbook%5D/page-8bb19ee55e9cce33.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/amc/%5Bid%5D/page-bab6206bcb2e9ea4.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/amc/page-2a98275100cbdf2c.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/auth/login/page-6458eebb10f66347.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/auth/register/page-26a7acf52b9f6772.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/home/page-827392d830c35134.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/layout-0334f5fc5789966a.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/page-ffd0450c7616b880.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/payment/%5Bpdetails%5D/page-27081d1e48189ecd.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/payment/page-f6d169f7139694c2.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/review/page-a2194fcc2fad6c8e.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/technician/page-7a5c6204dfa1d29c.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/app/track/page-3b9a0834de6da398.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/fd9d1056-d36f9e0a2b0a458e.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/framework-8e0e0f4a6b83a956.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/main-app-0a7d7af24bedd076.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/main-e154d966c609313b.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/pages/_app-f870474a17b7f2fd.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/pages/_error-c66a4e8afc46f17b.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-4e68c842a0e96b08.js",revision:"Xh-ge7tqJwqIt27BhQTfn"},{url:"/_next/static/css/5a56e3c1761e58ad.css",revision:"5a56e3c1761e58ad"},{url:"/_next/static/css/dd968d15d9388e5c.css",revision:"dd968d15d9388e5c"},{url:"/ac-repair.png",revision:"af30e2b3e819020678e761a053b4c779"},{url:"/fridge-repair.png",revision:"f6ffd4a836b0c471daddb1cd577e37ce"},{url:"/manifest.json",revision:"9f1d24f8dcc509f195b42277b6735966"},{url:"/microoven-repair.png",revision:"d9d73689496740f452f564ef10ec2380"},{url:"/placeholder.svg",revision:"a415d5868c9d997da5259298634c5299"},{url:"/washing-machine-repair.png",revision:"a1854062d744037c778c542ab4802d5f"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:t}})=>!(!e||t.startsWith("/api/auth/callback")||!t.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:t},sameOrigin:s})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&s&&!t.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:t},sameOrigin:s})=>"1"===e.headers.get("RSC")&&s&&!t.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:t})=>t&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
