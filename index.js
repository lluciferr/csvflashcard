const serviceWorkerInit=()=>{

    navigator.serviceWorker.register("sw.js").then(registration=>{
        console.log("service log registered !!!")
        console.log(registration)
    })
}
// serviceWorkerInit()

if ("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").then(registration=>{
        console.log("service worker registered !!!")
        console.log(registration)

    }).catch(error=>{
        console.log("not working ")
        console.log(error)
    })
}
else{
    console.log("no serviceworker found");
    console.log(navigator)
}