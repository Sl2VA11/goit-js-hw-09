
import Notiflix from "notiflix"
const refs = {
  form: document.querySelector('form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  btn: document.querySelector('button'),

}


const handleSubmit = (event) => {
  event.preventDefault()
  
  let firstDelay = Number(refs.delay.value) 
  let amounts = refs.amount.value
  let firstStep = Number(refs.step.value)
  
  let totalDelay
  
  for (let amount of amounts) {
    totalDelay = firstDelay
    if (amount >= 0) {
      totalDelay = firstDelay + firstStep * Number(amount - 1)
    } 

    createPromise(amount, totalDelay)
      .then(resolved)
      .catch(rejected)
    
    
  }
  
  event.currentTarget.reset()
}
refs.form.addEventListener('submit', handleSubmit)

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay})
      } else {
        reject({position, delay})
      }
    }, delay)
  })
}

const resolved = ({ position, delay }) => {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
}
const rejected = ({ position, delay }) => {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
}
