const elements = {
  openButton: document.getElementById("open-invitation"),
  introScreen: document.getElementById("intro-screen"),
  landing: document.getElementById("main-content"),
  tapHint: document.getElementById("tap-hint"),
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  readButton: document.getElementById("read-invitation")
};

let countdownInterval;

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const targetDate = new Date("2026-05-23T10:00:00-04:00");
  const now = new Date();
  const difference = targetDate - now;

  if (difference <= 0) {
    elements.days.textContent = "00";
    elements.hours.textContent = "00";
    elements.minutes.textContent = "00";
    elements.seconds.textContent = "00";

    if (countdownInterval) {
      clearInterval(countdownInterval);
    }

    return;
  }

  const totalSeconds = Math.floor(difference / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  elements.days.textContent = pad(days);
  elements.hours.textContent = pad(hours);
  elements.minutes.textContent = pad(minutes);
  elements.seconds.textContent = pad(seconds);
}

function openEnvelope() {
  if (document.body.classList.contains("is-opening")) {
    return;
  }

  document.body.classList.add("is-opening");
  elements.openButton.setAttribute("aria-expanded", "true");

  window.setTimeout(() => {
    document.body.classList.add("show-read-button");
  }, 1800);
}

function revealLanding() {
  if (document.body.classList.contains("is-revealed")) {
    return;
  }

  document.body.classList.add("is-revealed");
  elements.landing.setAttribute("tabindex", "-1");
  elements.landing.focus({ preventScroll: true });
  elements.landing.removeAttribute("tabindex");

  window.setTimeout(() => {
    elements.introScreen.setAttribute("hidden", "hidden");
  }, 1200);
}

function bindEvents() {
  elements.openButton.addEventListener("click", openEnvelope);
  elements.readButton.addEventListener("click", revealLanding);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      if (document.activeElement === elements.openButton) {
        openEnvelope();
      } else if (document.activeElement === elements.readButton) {
        revealLanding();
      }
    }
  });
}

function startCountdown() {
  updateCountdown();
  countdownInterval = window.setInterval(updateCountdown, 1000);
}

function init() {
  bindEvents();
  startCountdown();
}

init();
