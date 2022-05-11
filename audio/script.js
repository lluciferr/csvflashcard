
const word = document.querySelector("#word")
const btn= document.querySelector("#trans")
const audio = document.querySelector("#audio")

const url = "https://translate.google.com/translate_tts?ie=UTF-8&total=1&idx=0&client=tw-ob&tl=en-US&q=Rathee&textlen=6"


const url1 = "https://translate.google.com/translate_tts?ie=UTF-8&total=1&idx=0&client=tw-ob&tl=en-US&q=naive"


const handleclick =  (e)=>{
    console.log("fireitup")
    btn.style.color="blue"
    alert(word.value) 
    // alert("really")
}

const getaudio = async (e)=>{
    const real_url = url1+ e
    sound = await real_url
    audio.src =  await sound
    sound.play()

}

btn.addEventListener('click',getaudio)


