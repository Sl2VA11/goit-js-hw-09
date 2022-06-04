
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
const handleButtonClick = () => {
  if (timerId) {
     clearBodyColor();
     
  } else {
    changeBodyColor();
  }
};


refs.btnStart.addEventListener('click', handleButtonClick);
refs.btnStop.addEventListener('click', handleButtonClick);






