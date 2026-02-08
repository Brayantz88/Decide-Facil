// =========================
// ELEMENTOS
// =========================
const screenHome = document.getElementById("screen-home");
const screenChat = document.getElementById("screen-chat");

const btnDecidir = document.getElementById("btnDecidir");
const btnPregunta = document.getElementById("btnPregunta");
const btnBack = document.getElementById("btnBack");

const chat = document.getElementById("chat");
const input = document.getElementById("input");
const btnEnviar = document.getElementById("decidir");

// Botones de arriba
const premiumBtn = document.getElementById("premiumBtn");
const adsBtn = document.getElementById("adsBtn");
const configBtn = document.getElementById("configBtn");

// Paneles
const panelPremium = document.getElementById("panel-premium");
const panelAds = document.getElementById("panel-ads");
const panelConfig = document.getElementById("panel-config");

// Botones volver de paneles
const backBtns = document.querySelectorAll(".back-btn");

// =========================
// VARIABLES
// =========================
let mode = ""; // "decidir" o "pregunta"

// =========================
// FUNCIONES
// =========================
function openChat(selectedMode) {
  mode = selectedMode;

  // Ocultar HOME y mostrar CHAT
  screenHome.classList.add("hidden");
  screenChat.classList.remove("hidden");

  // Limpiar chat al entrar (opcional)
  chat.innerHTML = "";

  // Mensaje inicial según modo
  if (mode === "decidir") {
    addAIMessage("🔥 Modo DECIDIR activado. Escribí tus opciones (ej: Pizza o Pollo).");
  } else {
    addAIMessage("😎 Modo IA activado. Preguntame lo que quieras.");
  }

  // Enfocar input
  setTimeout(() => input.focus(), 200);
}

function goHome() {
  // Ocultar CHAT y mostrar HOME
  screenChat.classList.add("hidden");
  screenHome.classList.remove("hidden");
}

function addUserMessage(text) {
  const div = document.createElement("div");
  div.className = "message user";
  div.textContent = text;
  chat.appendChild(div);
  scrollChat();
}

function addAIMessage(text) {
  const div = document.createElement("div");
  div.className = "message ai";
  div.textContent = text;
  chat.appendChild(div);
  scrollChat();
}

function scrollChat() {
  chat.scrollTop = chat.scrollHeight;
}

function getDecisionFromText(text) {
  // Separa por "o" o por ","
  // ejemplo: "pizza o pollo" o "pizza, pollo"
  let options = [];

  if (text.includes(",")) {
    options = text.split(",").map(o => o.trim()).filter(Boolean);
  } else if (text.toLowerCase().includes(" o ")) {
    options = text.split(" o ").map(o => o.trim()).filter(Boolean);
  } else {
    options = text.split(" ").map(o => o.trim()).filter(Boolean);
  }

  // Quitar duplicados
  options = [...new Set(options)];

  // Si hay menos de 2, no sirve
  if (options.length < 2) return null;

  // Elegir random
  const chosen = options[Math.floor(Math.random() * options.length)];
  return chosen;
}

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addUserMessage(text);
  input.value = "";

  // Respuesta según modo
  if (mode === "decidir") {
    const result = getDecisionFromText(text);

    if (!result) {
      addAIMessage("Poné al menos 2 opciones así: Pizza o Pollo 😎");
      return;
    }

    addAIMessage("✅ Elegí por vos: " + result);
  } else {
    // Modo IA (por ahora simple)
    addAIMessage("🤖 (Demo) Me preguntaste: " + text);
  }
}

// =========================
// EVENTOS
// =========================

// Botones principales
btnDecidir.addEventListener("click", () => openChat("decidir"));
btnPregunta.addEventListener("click", () => openChat("pregunta"));

// Volver
btnBack.addEventListener("click", goHome);

// Enviar mensaje
btnEnviar.addEventListener("click", sendMessage);

// Enter para enviar
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

// =========================
// PANELES (Premium / Ads / Config)
// =========================
function openPanel(panel) {
  panel.classList.remove("hidden");
}

function closePanels() {
  panelPremium.classList.add("hidden");
  panelAds.classList.add("hidden");
  panelConfig.classList.add("hidden");
}

premiumBtn.addEventListener("click", () => openPanel(panelPremium));
adsBtn.addEventListener("click", () => openPanel(panelAds));
configBtn.addEventListener("click", () => openPanel(panelConfig));

// Botones "Volver" dentro de paneles
backBtns.forEach(btn => {
  btn.addEventListener("click", closePanels);
});
