
const refs = {
   btnStart: document.querySelector('button[data-start]'),
   btnStop: document.querySelector('button[data-stop]'),
   body: document.querySelector("body"),
}

let timerId = null;



function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBodyColor() {
   timerId = setInterval(() => {
   refs.body.style.backgroundColor = getRandomHexColor()
   }, 1000);
}

function clearBodyColor() {
   clearInterval(timerId);
}



const handleButtonStop = () => {
   if (timerId) {
      clearBodyColor();
   } 
//   } else {
//     changeBodyColor();
//   }
};


refs.btnStart.addEventListener('click', changeBodyColor);
refs.btnStop.addEventListener('click', handleButtonStop);






