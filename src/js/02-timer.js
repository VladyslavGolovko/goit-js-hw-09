import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  searchInput: document.querySelector('datetime-picker'),
};

refs.startBtn.disabled = true;
const selectedTime = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0].getTime();
    const currentDate = this.config.defaultDate.getTime();
    if (currentDate > selectedDate) {
      alert('Please choose a date in the future');
      return;
    }
    selectedTime = selectedDates[0];
    refs.start.removeAttribute('disabled');
    /*console.log(selectedDates[0]);*/
  },
};

flatpickr(refs.searchInput, options);

refs.startBtn.addEventListener('click', start);

function start() {
  setInterval(() => {
    const currentTime = Date.now();
    console.log(currentTime);
    const backTimer = selectedTime.getTime() - currentTime;
    console.log(convertMs(backTimer));
  }, 1000);
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
