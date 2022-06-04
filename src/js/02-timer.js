import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
   input: document.querySelector('#datetime-picker'),
   btn: document.querySelector('button[data-start]'),
   days: document.querySelector('span[data-days]'),
   hours: document.querySelector('span[data-hours]'),
   minutes: document.querySelector('span[data-minutes]'),
   seconds: document.querySelector('span[data-seconds]'),

}

let intervalId = null;
let deltaTime = null;
let timeToFinish = null;
const currentTime = Date.now();

const options = {
   enableTime: true,
   
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkDate(selectedDates[0]);
  },
};
flatpickr(refs.input, options)

refs.btn.addEventListener('click' , timer)

refs.btn.disabled = true

function checkDate(selectedDate) {

   if (!refs.btn.disabled) {
      return
   } else {
      timeToFinish = selectedDate.getTime()
      deltaTime = timeToFinish - currentTime;
   }
   if (deltaTime <= 0) {
      Notify.failure("Please choose a date in the future");
      return
   } else {
      refs.btn.disabled = false
      return timeToFinish
   }



}

function timer() {
   intervalId = setInterval(() => {
      const timeToStart = Date.now()
      deltaTime = timeToFinish - timeToStart

      const time = convertMs(deltaTime)
      updateClockFace(time)
  } , 1000)
}


function updateClockFace({ days, hours, minutes, seconds }) {
   
   refs.days.textContent = `${days}`
   refs.hours.textContent = `${hours}`
   refs.minutes.textContent = `${minutes}`
   refs.seconds.textContent = `${seconds}`
}



function pad(value) {
   return String(value).padStart(2,'0')
}

function convertMs(ms) {
   
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour)) ;
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}





