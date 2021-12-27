import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('button[data-start'),
  datetimePickerInput: document.querySelector('#datetime-picker'),
  daysField: document.querySelector('span[data-days'),
  hoursField: document.querySelector('span[data-hours]'),
  minutesField: document.querySelector('span[data-minutes]'),
  secondsField: document.querySelector('span[data-seconds]'),
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

flatpickr("input[type = 'text']", options);
startBtn.disabled = true;

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
      const time = convertMs(ms);
      updateClockFace(time);
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
}
