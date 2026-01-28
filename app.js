const panelConfig = document.getElementById("panel-config");
const panelPremium = document.getElementById("panel-premium");
const panelAds = document.getElementById("panel-ads");

document.getElementById("btn-config").onclick = () => {
  panelConfig.classList.remove("hidden");
};

document.getElementById("btn-premium").onclick = () => {
  panelPremium.classList.remove("hidden");
};

document.getElementById("btn-ads").onclick = () => {
  panelAds.classList.remove("hidden");
};

document.querySelectorAll(".back-btn").forEach(btn => {
  btn.onclick = () => {
    panelConfig.classList.add("hidden");
    panelPremium.classList.add("hidden");
    panelAds.classList.add("hidden");
  };
});
