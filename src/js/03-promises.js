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
  let amounts = Number(refs.amount.value)
  let firstStep = Number(refs.step.value)
  
  
  
  for (let position = 1; position <= amounts; position += 1) {
    
    createPromise(position, firstDelay)
    .then(({ position, firstDelay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${firstDelay}ms`);
  })
  .catch(({ position, firstDelay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${firstDelay}ms`);
  });
    
    firstDelay += firstStep
  }
  
  event.currentTarget.reset()
}
refs.form.addEventListener('submit', handleSubmit)

function createPromise(position, firstDelay) {
  const shouldResolve = Math.random() > 0.3

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, firstDelay})
      } else {
        reject({position, firstDelay})
      }
    }, firstDelay)
  })
}


