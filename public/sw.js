if(!self.define){let e,a={};const t=(t,s)=>(t=new URL(t+".js",s).href,a[t]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=a,document.head.appendChild(e)}else e=t,importScripts(t),a()})).then((()=>{let e=a[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(s,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(a[i])return;let c={};const r=e=>t(e,i),u={module:{uri:i},exports:c,require:r};a[i]=Promise.all(s.map((e=>u[e]||r(e)))).then((e=>(n(...e),c)))}}define(["./workbox-c2c0676f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/129-44e025eaddde0475.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/1930-520c06a7b8040940.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/2109-9f3210797cc6ecf1.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/2183-bd17a87d0fe5246c.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/2365-dab0c5a252d8c0bc.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/2403-6f2ed81bd488e6c6.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/2800-8644e8900f096014.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/5317-599ab4fd1ca2f938.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/6648-d378ea059947d920.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/7138-2a95058f79be00d4.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/7155-618d6a5e375d0ca8.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/7372-5dbca0e47a4b5466.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/8577-542e6ddf0c2a96fd.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/8890-b8d0e1082ce77647.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/9393-c66d966efe13db76.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/9472-c66afd0dbf0587d8.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/9736-b3335db492f024ed.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/%5Bcategory%5D/%5Bid%5D/book/%5Border%5D/page-0a87043cc10f2d65.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/%5Bcategory%5D/%5Bid%5D/book/page-cf8c9b5b4edbf61a.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/%5Bcategory%5D/%5Bid%5D/page-70ffe168f093442e.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/%5Bcategory%5D/page-434278951cd773d1.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/_not-found/page-80b3180ace61f1cd.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/ac-rent/%5Bid%5D/%5Bbook%5D/%5Brentalorderid%5D/page-aa32228bb7ef49c6.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/ac-rent/%5Bid%5D/%5Bbook%5D/page-0a00e583adc972a0.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/ac-rent/%5Bid%5D/page-29a098a056702ea2.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/ac-rent/page-bb5d81bc8a74b5d3.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/admin-dash/ac-rent/page-480efba7a00d027b.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/admin-dash/carousel/page-4c27c5f54c6050f2.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/admin-dash/carousel2/page-94abfe50a6659048.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/admin-dash/cms/page-3a5dc69bdaa3faba.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/admin-dash/layout-9237e5b60256195d.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/admin-dash/orders/page-0030683df6772c51.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/admin-dash/page-53893737152b070d.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/admin-dash/payment/page-d70c8ae373c5ad75.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/admin-dash/services/page-9a9a744e66523929.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/admin-dash/technician/page-e410a0baabb29e8a.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/amc/%5Bid%5D/%5Bbook%5D/%5Brentalorderid%5D/page-c89d53481c9ee94a.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/amc/%5Bid%5D/%5Bbook%5D/page-7b03d1e58df27f91.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/amc/%5Bid%5D/page-16229b72d72c19ab.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/amc/page-9dfa339286fb2124.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/auth/login/page-1a65e91c4d1b9f04.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/auth/register/page-97c9bcbda56285d6.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/home/page-52aa87ef78e8788c.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/layout-b602b339f4f11b36.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/page-f3ed13e767edb60b.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/payment/%5Bpdetails%5D/page-7d8aecfafb63cd59.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/payment/page-fdc91e5a315174a6.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/privacy-policy/page-a4f850804687d6af.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/review/page-9b0784b6dff226f6.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/technician/page-cc1856e73a9cdc58.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/terms-and-conditions/page-86172c2420b8b08d.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/app/track/page-c9f33e76ac481dd4.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/fce19104-49e6791c2d878b41.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/fd9d1056-d36f9e0a2b0a458e.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/framework-8e0e0f4a6b83a956.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/main-29b59f56ca87a8fa.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/main-app-32b4305386de0f33.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/pages/_app-f870474a17b7f2fd.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/pages/_error-c66a4e8afc46f17b.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-4e68c842a0e96b08.js",revision:"t2BtpKErYA3mMyugeZwTD"},{url:"/_next/static/css/5a56e3c1761e58ad.css",revision:"5a56e3c1761e58ad"},{url:"/_next/static/css/a32cd9f0d045801f.css",revision:"a32cd9f0d045801f"},{url:"/_next/static/t2BtpKErYA3mMyugeZwTD/_buildManifest.js",revision:"3e2d62a10f4d6bf0b92e14aecf7836f4"},{url:"/_next/static/t2BtpKErYA3mMyugeZwTD/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/ac-install.jpg",revision:"df4d83f908b3cc6c0b996dee156cb94d"},{url:"/ac-rent.jpg",revision:"4f4a0d204036da7f5eed2b15e590604a"},{url:"/ac-repair.png",revision:"af30e2b3e819020678e761a053b4c779"},{url:"/acservices.png",revision:"192496c368a0c41b4ec370e10c344d36"},{url:"/amc.jpg",revision:"8e9eaef54ffd50abf6f1434240c5ec67"},{url:"/amc.png",revision:"0cf5e2ccdd6d26829af4ee27de815ec2"},{url:"/customer-avatar-1.jpg",revision:"c3669a725d1e53dd3850afdf5ddfd5e3"},{url:"/customer-avatar-2.jpg",revision:"816f769fd17e0701bd65857a039e37f4"},{url:"/customer-avatar-3.jpg",revision:"df24ab1499af87f8ff78d77ddfca826c"},{url:"/duct.jpg",revision:"68059bf9d32411441d58bc64b3fd65f0"},{url:"/expert-technicians.jpg",revision:"f0085451787d77738958527e19860a80"},{url:"/fridge-repair.png",revision:"f6ffd4a836b0c471daddb1cd577e37ce"},{url:"/image.png",revision:"df55eb835eaf9f348afa5fd69bcb2b28"},{url:"/image2.png",revision:"14094bbc00cd81f225014018f3003849"},{url:"/image3.png",revision:"6c12cf693db6f81139737a108c17298e"},{url:"/image4.png",revision:"5eafb63a303d17e893f98b1faa5c71f2"},{url:"/logo-wide.png",revision:"516d225bb289befaeab3d13a937aa1c3"},{url:"/logo.png",revision:"bbb2c396029b7e520e2fad40e3353af5"},{url:"/logosmall-t.png",revision:"0bdf61fc292aa80ff1ee27d0be77318e"},{url:"/logosmall.png",revision:"575f8b4003a522ead42cbdd540d22361"},{url:"/manifest.json",revision:"d61ba8a50bf599db94d2ca885e4cd879"},{url:"/microoven-repair.png",revision:"d9d73689496740f452f564ef10ec2380"},{url:"/placeholder.svg",revision:"a415d5868c9d997da5259298634c5299"},{url:"/washing-machine-repair.png",revision:"a1854062d744037c778c542ab4802d5f"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:a}})=>!(!e||a.startsWith("/api/auth/callback")||!a.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:a},sameOrigin:t})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&t&&!a.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:a},sameOrigin:t})=>"1"===e.headers.get("RSC")&&t&&!a.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:a})=>a&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
