const VERSION='cppinkplan-8f9c293c31faa7';
const CORE=['./','index.html','presenter.html','Canon - Presenter Notes.html','Canon - Ink Planning Story.html',...Array.from({length:14},(_,i)=>'previews/slide-'+String(i+1).padStart(2,'0')+'.jpg')].map(p=>new URL(p,self.location).href);
const root=new URL('./',self.location);
const keyFor=request=>{const u=new URL(request.url);u.search='';return u.href;};
const refreshCore=async()=>{const c=await caches.open(VERSION);await c.addAll(CORE.map(u=>new Request(u,{cache:'reload'})));};
self.addEventListener('install',e=>e.waitUntil((async()=>{await refreshCore();await self.skipWaiting();})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('cppinkplan-')&&key!==VERSION)await caches.delete(key);await self.clients.claim();for(const c of await self.clients.matchAll())c.postMessage({type:'OFFLINE_READY',version:VERSION});})()));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;
 const url=new URL(e.request.url),path=url.pathname.slice(root.pathname.length);
 if(path==='sw.js'||path==='health'||path==='update.html')return;
 const documentRequest=e.request.mode==='navigate'||path===''||path.endsWith('.html');
 e.respondWith((async()=>{
  const cache=await caches.open(VERSION),key=keyFor(e.request);
  if(documentRequest){
   try{
    const response=await fetch(new Request(e.request,{cache:'no-cache'}));
    if(response.ok&&!response.redirected){const copy=response.clone();e.waitUntil(cache.put(key,copy));}
    return response;
   }catch{
    const saved=await cache.match(key);if(saved)return saved;
    if(e.request.mode==='navigate'){const name=decodeURIComponent(path).includes('Ink Planning Story')?'Canon - Ink Planning Story.html':'index.html';return await cache.match(new URL(name,root).href)||Response.error();}
    return Response.error();
   }
  }
  const saved=await cache.match(key);return saved||fetch(e.request);
 })());
});
self.addEventListener('message',e=>{
 if(!['CACHE_STATUS','REFRESH_CACHE'].includes(e.data?.type))return;
 e.waitUntil((async()=>{
  try{
   if(e.data.type==='REFRESH_CACHE')await refreshCore();
   const c=await caches.open(VERSION),ok=(await Promise.all(CORE.map(u=>c.match(u)))).every(Boolean);
   e.ports[0]?.postMessage({ready:ok,failed:!ok,version:VERSION});
  }catch{e.ports[0]?.postMessage({ready:false,failed:true,version:VERSION});}
 })());
});
