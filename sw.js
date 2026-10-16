const CACHE='ny-game-v2';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./assets/atlas.png','./assets/atlas.json','./assets/sfx/boing.mp3','./assets/sfx/buy.mp3','./assets/sfx/click.mp3','./assets/sfx/coin.mp3','./assets/sfx/correct.mp3','./assets/sfx/hurt.mp3','./assets/sfx/jump.mp3','./assets/sfx/pop.mp3','./assets/sfx/power.mp3','./assets/sfx/quiz.mp3','./assets/sfx/right.mp3','./assets/sfx/star.mp3','./assets/sfx/start.mp3','./assets/sfx/stomp.mp3','./assets/sfx/win.mp3','./assets/sfx/wrong.mp3'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp)).catch(()=>{});return r})
    .catch(()=>caches.match(e.request).then(m=>m||caches.match('./index.html'))));
});
