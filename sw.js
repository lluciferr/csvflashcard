self.addEventListener("install",(e)=>{

    console.log("install !!!")
    e.waitUntil(
        caches.open("static").then(cache =>{
            return cache.addAll(["./","./assets/icon192.png"])
        })
)

})

self.addEventListener("fetch",e=>{
    console.log(`fetch workign ${e.request.url}`);
})