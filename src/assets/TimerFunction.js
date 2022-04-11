// Função para Roda do Timer para embelezar a tela adaptada de:
// https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 16;
const ALERT_THRESHOLD = 11;
const timerPath = 'base-timer-path-remaining';
const COLOR_CODES = {
  info: {
    color: 'green',
  },
  warning: {
    color: 'orange',
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: 'red',
    threshold: ALERT_THRESHOLD,
  },
};

export const remainingPathColor = COLOR_CODES.info.color;

export const setRemainingPathColor = (timeLeft) => {
  const { alert, warning, info } = COLOR_CODES;
  const timeLimit = 30;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById(timerPath)
      .classList.remove(warning.color);
    document
      .getElementById(timerPath)
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById(timerPath)
      .classList.remove(info.color);
    document
      .getElementById(timerPath)
      .classList.add(warning.color);
  } else if (timeLeft === timeLimit) {
    document
      .getElementById(timerPath)
      .classList.remove(alert.color);
    document
      .getElementById(timerPath)
      .classList.add(info.color);
  }
};

export const calculateTimeFraction = (time) => time - (1 / time) * (1 - time);

export const setCircleDasharray = () => {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById(timerPath)
    .setAttribute('stroke-dasharray', circleDasharray);
};
