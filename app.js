// PANELES
const panelConfig = document.getElementById("panel-config");
const panelPremium = document.getElementById("panel-premium");
const panelAds = document.getElementById("panel-ads");

// BOTONES SUPERIORES
document.getElementById("btn-config").onclick = () => {
  panelConfig.classList.remove("hidden");
};

document.getElementById("btn-premium").onclick = () => {
  panelPremium.classList.remove("hidden");
};

document.getElementById("btn-ads").onclick = () => {
  panelAds.classList.remove("hidden");
};

// BOTONES VOLVER
document.querySelectorAll(".back-btn").forEach(btn => {
  btn.onclick = () => {
    panelConfig.classList.add("hidden");
    panelPremium.classList.add("hidden");
    panelAds.classList.add("hidden");
  };
});

// CHAT / ENVIAR
const input = document.getElementById("input");
const chat = document.getElementById("chat");
const decidirBtn = document.getElementById("decidir");

decidirBtn.onclick = () => {
  if (input.value.trim() === "") return;

  const msg = document.createElement("div");
  msg.textContent = input.value;
  msg.style.padding = "8px";
  msg.style.marginBottom = "6px";

  chat.appendChild(msg);
  input.value = "";
};
