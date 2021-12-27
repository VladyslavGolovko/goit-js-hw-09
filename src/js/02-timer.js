import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startBtnEl: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.startBtnEl.disabled = true;
let counterTime = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const counterDate = selectedDates[0];
    const currentDate = this.config.defaultDate.getTime();
    if (currentDate > counterDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    refs.startBtnEl.disabled = false;
  },
};

const datePickr = flatpickr(refs.dateInput, options);
refs.startBtnEl.addEventListener('click', () => {
  timer.end();
});

const timer = {
  isActive: false,
  end() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = datePickr.selectedDates[0] - currentTime;
      const time = convertMs(deltaTime);
      updateClockFace(time);
      if (deltaTime < 1000) {
        clearInterval(intervalId);
      }
    }, 1000);
  },
};

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

/*const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const data = selectedDates[0];
    choseCorrectTime(data);
  },
};
const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startBtnEl: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
let time;
refs.startBtnEl.setAttribute('disabled', 'disabled');
refs.startBtnEl.addEventListener('click', startCount);
flatpickr(refs.dateInput, options);
function choseCorrectTime(data) {
  time = data;
  if (data < Date.now()) {
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    refs.startBtnEl.removeAttribute('disabled');
    return time;
  }
}
function startCount() {
  const timerId = setInterval(() => {
    const newTime = Date.now();
    let timeLeft = time - newTime;
    const result = convertMs(timeLeft);
    console.log(result);
    refs.days.textContent = addLeadingZero(result.days);
    refs.hours.textContent = addLeadingZero(result.hours);
    refs.minutes.textContent = addLeadingZero(result.minutes);
    refs.seconds.textContent = addLeadingZero(result.seconds);
  }, 1000);
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}

/*import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const data = selectedDates[0];

    choseCorectTime(data);
  },
};

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startBtnEl = document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let time = null;

refs.startBtnEl.disabled = true;
refs.startBtnEl.addEventListener('click', startCount);

function choseCorectTime(data) {
  time = data;
  if (data < Date.now()) {
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    refs.startBtnEl.disabled = false;
    return time;
  }
};

function startCount() {
  setInterval(() => {
    const newTime = Date.now();
    let timeLeft = time - newTime;

    const result = convertMs(timeLeft);
    console.log(result);

    refs.days.textContent = addLeadingZero(result.days);
    refs.hours.textContent = addLeadingZero(result.hours);
    refs.minutes.textContent = addLeadingZero(result.minutes);
    refs.seconds.textContent = addLeadingZero(result.seconds);
  }, 1000)
};

function addLeadingZero(value) {
  return value.ToString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

/*import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const refs = {
  startBtn: document.querySelector('button[data-start'),
  datetimePickerInput: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
let date = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    date = selectedDates[0].getTime();
    if (date <= options.defaultDate.getTime()) {
      alert('Please choose a date in the future');
      return;
    }
    startBtn.disabled = false;
  },
};

flatpickr(refs.datetimePickerInput, options);

const timer = {
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    const startTime = Date.now();
    this.isActive = true;

    setInterval(() => {
      const currentTime = Date.now();
      const ms = currentTime - startTime;
      const { days, hours, minutes, seconds } = convertMs(ms);
      updateClockFace({ days, hours, minutes, seconds });
    }, 1000);
  },
};

refs.startBtn.addEventListener('click', timer.start.bind(timer));

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}*/
