import Notiflix from 'notiflix';
const refs = {
  form: document.querySelector('form'),
};

refs.form.addEventListener('submit', onBtnSubmit);

function onBtnSubmit(e) {
  e.preventDefault();

  let delay = Number(e.currentTarget.delay.value);
  let step = Number(e.currentTarget.step.value);
  let amount = Number(e.currentTarget.amount.value);

  setInterval(() => {
    if (position >= amount) {
      return;
    }
    position += 1;
    setTimeout(() => {
      delay += step;
    });

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }, delay);
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setInterval(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
  return promise;
}

/*function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}*/
