const configBtn = document.getElementById("configBtn");
const premiumBtn = document.getElementById("premiumBtn");
const adsBtn = document.getElementById("adsBtn");

const panelConfig = document.getElementById("panelConfig");
const panelPremium = document.getElementById("panelPremium");
const panelAds = document.getElementById("panelAds");

const backBtns = document.querySelectorAll(".back-btn");

const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");
const chat = document.getElementById("chat");

function openPanel(panel) {
  panel.classList.remove("hidden");
}

function closePanels() {
  panelConfig.classList.add("hidden");
  panelPremium.classList.add("hidden");
  panelAds.classList.add("hidden");
}

configBtn.onclick = () => openPanel(panelConfig);
premiumBtn.onclick = () => openPanel(panelPremium);
adsBtn.onclick = () => openPanel(panelAds);

backBtns.forEach(btn => {
  btn.onclick = closePanels;
});

sendBtn.onclick = () => {
  if (input.value.trim() === "") return;

  const msg = document.createElement("div");
  msg.textContent = input.value;
  msg.style.marginBottom = "8px";

  chat.appendChild(msg);
  input.value = "";
};
