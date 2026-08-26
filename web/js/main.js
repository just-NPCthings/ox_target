import { createOptions } from "./createOptions.js";

const optionsWrapper = document.getElementById("options-wrapper");
const body = document.body;
const eye = document.getElementById("eyeImg");
const eyeContainer = document.getElementById("eye");

function updateRingColor() {
  // Grab the color from the first option's connector dot
  const firstDot = optionsWrapper.querySelector(".connector-dot");
  if (!firstDot) return;

  const color = firstDot.dataset.color || "#4ade80";
  // Create a slightly lighter/different secondary color
  eyeContainer.style.setProperty("--ring-primary", color);
  eyeContainer.style.setProperty("--ring-secondary", color);
}

window.addEventListener("message", (event) => {
  switch (event.data.event) {
    case "visible": {
      optionsWrapper.innerHTML = "";
      body.style.visibility = event.data.state ? "visible" : "hidden";
      eyeContainer.classList.remove("eye-hover");
      return;
    }

    case "leftTarget": {
      optionsWrapper.innerHTML = "";
      eyeContainer.classList.remove("eye-hover");
      return;
    }

    case "setTarget": {
      optionsWrapper.innerHTML = "";
      eyeContainer.classList.add("eye-hover");

      if (event.data.options) {
        for (const type in event.data.options) {
          event.data.options[type].forEach((data, id) => {
            createOptions(type, data, id + 1);
          });
        }
      }

      if (event.data.zones) {
        for (let i = 0; i < event.data.zones.length; i++) {
          event.data.zones[i].forEach((data, id) => {
            createOptions("zones", data, id + 1, i + 1);
          });
        }
      }

      // Sync ring color to the first option's dot color
      requestAnimationFrame(updateRingColor);
    }
  }
});