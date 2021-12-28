import Notiflix from 'notiflix';
const refs = {
  form: document.querySelector('form'),
};

refs.form.addEventListener('submit', onBtnSubmit);

function onBtnSubmit(e) {
  e.preventDefault();
  let position = 0;

  let delay = Number(e.currentTarget.delay.value);
  let step = Number(e.currentTarget.step.value);
  let amount = Number(e.currentTarget.amount.value);

  const setIntervalId = setInterval(() => {
    if (position === amount) {
      clearInterval(setIntervalId);
      position = 0;
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
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
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

/*import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formEl = document.querySelector('form');
let position = 0;

formEl.addEventListener('click', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  let delay = Number(e.currentTarget.elements.delay.value);
  const amount = Number(e.currentTarget.elements.amount.value);
  const step = Number(e.currentTarget.elements.step.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
          width: '40vw',
        });
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
          width: '40vw',
        });
      });
    delay += step;
    position += 1;
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setInterval(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

/*import Notiflix from 'notiflix';
const refs = {
  form: document.querySelector('form'),
};

refs.form.addEventListener('submit', onBtnSubmit);

function onBtnSubmit(e) {
  e.preventDefault();
  let position = 0;

  let delay = Number(e.currentTarget.delay.value);
  let step = Number(e.currentTarget.step.value);
  let amount = Number(e.currentTarget.amount.value);

  const setIntervalId = setInterval(() => {
    if (position === amount) {
      clearInterval(setIntervalId);
      position = 0;
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
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
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

/*import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formEl = document.querySelector('form');
let position = 0;

formEl.addEventListener('click', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  let delay = Number(e.currentTarget.elements.delay.value);
  const amount = Number(e.currentTarget.elements.amount.value);
  const step = Number(e.currentTarget.elements.step.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
          width: '40vw',
        });
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
          width: '40vw',
        });
      });
    delay += step;
    position += 1;
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setInterval(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
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
