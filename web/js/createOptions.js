import { fetchNui } from "./fetchNui.js";

const optionsWrapper = document.getElementById("options-wrapper");

function onClick() {
  this.style.pointerEvents = "none";
  fetchNui("select", [this.targetType, this.targetId, this.zoneId]);
  setTimeout(() => (this.style.pointerEvents = "auto"), 100);
}

export function createOptions(type, data, id, zoneId) {
  if (data.hide) return;

  const option = document.createElement("div");
  const dotColor = data.iconColor || getDefaultDotColor(type);
  const iconColor = data.iconColor || dotColor;

  const iconHtml = data.icon
    ? `<i class="fa-fw ${data.icon} option-icon" style="color:${iconColor}"></i>`
    : `<span class="option-dot" style="background:${dotColor};box-shadow:0 0 6px ${dotColor},0 0 10px ${dotColor}40;"></span>`;

  option.innerHTML = `
    <span class="connector-dot" data-color="${dotColor}" style="background:${dotColor};box-shadow:0 0 5px ${dotColor},0 0 10px ${dotColor}60;"></span>
    <div class="option-content">
      ${iconHtml}
      <p class="option-label">${data.label}</p>
    </div>
  `;

  option.className = "option-container";
  option.style.borderLeftColor = dotColor;
  option.targetType = type;
  option.targetId = id;
  option.zoneId = zoneId;

  option.addEventListener("click", onClick);
  optionsWrapper.appendChild(option);
}

function getDefaultDotColor(type) {
  switch (type) {
    case "player": return "#4ade80";
    case "vehicle": return "#60a5fa";
    case "entity": return "#f472b6";
    case "zones": return "#fbbf24";
    default: return "#4ade80";
  }
}