const datadiv = document.querySelector("#datadiv");
const csv = document.querySelector("#csv");
const qns = document.querySelector("#qns");
const ans = document.querySelector("#ans");
const show = document.querySelector("#showhide");
const next = document.querySelector("#next");
const deck = document.querySelector("#deck");
const totalno = document.querySelector("#totalno");
const currno = document.querySelector("#currno");
const selectCard = document.querySelector("#select_card");
const qnscheck = document.querySelector("#qnscheck");
const anscheck = document.querySelector("#anscheck");
const html = document.querySelector("html");
const random = document.querySelector("#random");
const getrandom = document.querySelector("#getrandom");

var tittle = "";
var data = "";
var finalarr = [];
var isqnschecked = "";
var isanschecked = "";

const randomOrNext = () => {
  if (random.checked) {
    next.classList.add("hide_cont");
    getrandom.classList.remove("hide_cont");
  } else {
    getrandom.classList.add("hide_cont");
    next.classList.remove("hide_cont");
  }
};
random.addEventListener("change", randomOrNext);
randomOrNext()
const randomQns = () => {
  let randomQnsNum = Math.ceil( (Math.random() * finalarr.length * 10) % finalarr.length)
  qns.innerText = finalarr[randomQnsNum][0]      
  ans.innerText = finalarr[randomQnsNum][1]
};

getrandom.addEventListener("click", randomQns);
var tri = 1;
function temprend() {
  console.log(`triggered ${tri}`);
  tri++;
}

const handlecheckbok = () => {
  if (!qnscheck.checked && !anscheck.checked) {
    qns.classList.add("hide_cont");
    ans.classList.add("hide_cont");
    // temprend()
  } else if (qnscheck.checked && anscheck.checked) {
    qns.classList.remove("hide_cont");
    ans.classList.remove("hide_cont");
    //    temprend()
  } else if (!qnscheck.checked && anscheck.checked) {
    qns.classList.add("hide_cont");
    ans.classList.remove("hide_cont");
    // temprend()
  } else if (qnscheck.checked && !anscheck.checked) {
    qns.classList.remove("hide_cont");
    ans.classList.add("hide_cont");
    // temprend()
  }
};

qnscheck.addEventListener("change", handlecheckbok);
anscheck.addEventListener("change", handlecheckbok);

function makingarray(longstr) {
  finalarr = [];
  const arr = longstr.split("\n");
  // console.log(arr)
  arr.forEach((element) => {
    let arr_element = element.split(",");
    console.log(element);
    console.log(arr_element);
    finalarr.push(arr_element);
  });
  console.log(finalarr);
  totalno.innerText = "";
  totalno.innerText = finalarr.length;
  // localStorage.setItem("arr",finalarr.toString())
}

document.addEventListener("keypress", (e) => {
  // console.log(e.key);
  switch (e.key) {
    case "s":
    case "S": {
      toggleShow();
      console.log("show");
      break;
    }
    case "n":
    case "N": {
      gotonext();
      console.log("next");
      break;
    }
    case "g":
    case "G": {
      selectCard.focus();
      break;
    }
    // default:{
    //     selectCard.blur()
    // }
  }
});

csv.addEventListener("change", (event) => {
  const files = event.target.files;
  const file = files[0];
  // console.log("file name down");
  tittle = file.name.slice(0, -4);

  // console.log(typeof(file))
  reader = new FileReader();
  reader.readAsText(file);
  console.log(typeof reader.onloadend);
  reader.onloadend = () => {
    // datadiv.innerText= reader.result
    data = reader.result;
    // console.log(data)
    makingarray(data);
    if (localStorage.getItem(tittle) != null) {
      if (localStorage.getItem(tittle) == data) return;
      else {
        localStorage.setItem(tittle + 1, data);
      }
    } else {
      localStorage.setItem(tittle, data);
    }
  };
});

function toggleShow() {
  if (!qnscheck.checked) {
    qns.classList.toggle("hide_cont");
  }
  if (!anscheck.checked) {
    ans.classList.toggle("hide_cont");
  }
  //toggling feature
}

show.addEventListener("click", toggleShow);

deck.addEventListener("change", (e) => {
  // console.log("change happening");
  console.log(deck.value);
  ele = 0;
  makingarray(localStorage.getItem(deck.value));
});

selectCard.addEventListener("change", (e) => {
  console.log("card selection");
  ele = e.target.value - 1;
  if (typeof e.target.value == "number") {
    ele = e.target.value - 1;
  }
});

var ele = 0;

const render = () => {
  handlecheckbok();
  if (finalarr.length - 1 > ele) {
    qns.innerText = finalarr[ele][0]; //    here
    ans.innerText = finalarr[ele][1];
    currno.innerText = ele + 1;
    ele++;
  } else {
    // console.log("overflow happ");
    ele = 0;
    //  render()
  }
};

function gotonext() {
  // ans.classList.add("hide_cont")    26march

  if (!qnscheck.checked) {
    qns.classList.add("hide_cont");
  }
  if (!anscheck.checked) {
    ans.classList.add("hide_cont");
  }
  render();
}

next.addEventListener("click", gotonext);

const useLocalStorage = () => {
  if (localStorage.length != 0) {
    for (let i = 0; 1 <= localStorage.length; i++) {
      makingarray(localStorage.getItem(localStorage.key(i)));
      const key = localStorage.key(i);
      const op1 = document.createElement("option");
      op1.innerText = key;
      op1.value = key;
      deck.appendChild(op1);
    }
  }
};

const toggledark = () => {
  html.classList.toggle("dark_mode");
};
document.querySelector("#darkbtn").addEventListener("click", toggledark);

useLocalStorage();
