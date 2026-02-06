// ====== ELEMENTOS ======
const premiumBtn = document.getElementById("premium-btn");
const adsBtn = document.getElementById("ads-btn");
const configBtn = document.getElementById("config-btn");

const panelPremium = document.getElementById("panel-premium");
const panelAds = document.getElementById("panel-ads");
const panelConfig = document.getElementById("panel-config");

const backBtns = document.querySelectorAll(".back-btn");

// ====== FUNCIONES ======
function hideAllPanels() {
  panelPremium.classList.add("hidden");
  panelAds.classList.add("hidden");
  panelConfig.classList.add("hidden");
}

function showPanel(panel) {
  hideAllPanels();
  panel.classList.remove("hidden");
}

// ====== EVENTOS ======
premiumBtn.addEventListener("click", () => {
  showPanel(panelPremium);
});

adsBtn.addEventListener("click", () => {
  showPanel(panelAds);
});

configBtn.addEventListener("click", () => {
  showPanel(panelConfig);
});

backBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    hideAllPanels();
  });
});
