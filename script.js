const datadiv = document.querySelector("#datadiv")
const csv = document.querySelector("#csv")
const qns = document.querySelector("#qns")
const ans = document.querySelector("#ans")
const show = document.querySelector("#showhide")
const next = document.querySelector("#next")
const deck = document.querySelector("#deck")
const totalno = document.querySelector("#totalno")
const currno = document.querySelector("#currno")
const selectCard = document.querySelector("#select_card")
const qnscheck = document.querySelector("#qnscheck")
const anscheck = document.querySelector("#anscheck")

var tri= 1
function temprend(){
    console.log(`triggered ${tri}`)
    tri ++
}

const handlecheckbok =()=>{
    if( ! qnscheck.checked ){
        qns.classList.add('hide_cont')
		// temprend()
    }
    else if (! anscheck.checked ){
        ans.classList.add('hide_cont')
    //    temprend()
    }
    else{
        ans.classList.remove('hide_cont')
        qns.classList.remove('hide_cont')
        // temprend()
    }
   
}

const handlecheckbokk =()=>{
    console.log(`triggered ${tri}`)
    tri ++
}

qnscheck.addEventListener('change',handlecheckbok)
anscheck.addEventListener('change',handlecheckbok)

var tittle =''
var data = ''
var finalarr =[]
var isqnschecked =''
var isanschecked =''

function makingarray(longstr){

    finalarr =[]
    const arr = longstr.split("\n")
    // console.log(arr)
    arr.forEach(element => {
        let arr_element= element.split(",")
        console.log(element);
        console.log(arr_element);
        finalarr.push(arr_element)
    });
    console.log(finalarr);
    totalno.innerText = ''
    totalno.innerText = finalarr.length
    // localStorage.setItem("arr",finalarr.toString())
}

csv.addEventListener("change",(event)=>{
    const files = event.target.files
    const file = files[0]
    // console.log("file name down");
    tittle= file.name.slice(0,-4)
    
	// console.log(typeof(file))    
    reader = new FileReader
    reader.readAsText(file)
    console.log(typeof(reader.onloadend));
    reader.onloadend=()=>{
        // datadiv.innerText= reader.result
        data = reader.result
        // console.log(data)
        makingarray(data)
        if (localStorage.getItem(tittle) != null){
            if(localStorage.getItem(tittle) == data) return
            else{
                localStorage.setItem(tittle +1,data)

            }

        }
		else{
        localStorage.setItem(tittle,data)
        }
    }
})


show.addEventListener('click',()=>{
    if( ! qnscheck.checked ){
        qns.classList.toggle('hide_cont')
    }
    if (! anscheck.checked ){
        ans.classList.toggle('hide_cont')

    }
    //toggling feature
   
})

deck.addEventListener('change',(e)=>{
	// console.log("change happening");
	console.log(deck.value)
    ele =0
    makingarray(localStorage.getItem(deck.value))

})

selectCard.addEventListener('change',(e)=>{
    console.log("card selection");
    ele = e.target.value -1
    if(typeof( e.target.value) =='number'){
        ele = e.target.value -1
    }
})

var ele = 0

const render =()=>{
    handlecheckbok()
    if(finalarr.length -1 > ele ){

        qns.innerText = finalarr[ele][0]      //    here
        ans.innerText = finalarr[ele][1]
        currno.innerText = ele +1
        ele ++
    }
    else{
        // console.log("overflow happ");
        ele = 0
        //  render()
    }
}

next.addEventListener("click",()=>{
    // ans.classList.add("hide_cont")    26march

    if( ! qnscheck.checked ){
        qns.classList.add('hide_cont')
    }
    if (! anscheck.checked ){
        ans.classList.add('hide_cont')
    }
    render()
})

const useLocalStorage =()=>{

if (localStorage.length != 0){
		for (let i=0;1<=localStorage.length;i++){

            makingarray(localStorage.getItem(localStorage.key(i)))
            const key = localStorage.key(i)
            const op1 = document.createElement("option")
            op1.innerText = key
            op1.value =key
            deck.appendChild(op1)
        }
    
}

}

useLocalStorage()

