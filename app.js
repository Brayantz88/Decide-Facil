// =============================
// ELEMENTOS
// =============================
const screenHome = document.getElementById("screen-home");
const screenChat = document.getElementById("screen-chat");

const btnDecidir = document.getElementById("btnDecidir");
const btnPregunta = document.getElementById("btnPregunta");
const btnVolver = document.getElementById("btnVolver");

const chat = document.getElementById("chat");
const input = document.getElementById("input");
const btnEnviar = document.getElementById("decidir");
const inputArea = document.getElementById("inputArea");

// Top botones
const premiumBtn = document.getElementById("premiumBtn");
const adsBtn = document.getElementById("adsBtn");
const configBtn = document.getElementById("configBtn");

// Paneles
const panelPremium = document.getElementById("panel-premium");
const panelAds = document.getElementById("panel-ads");
const panelConfig = document.getElementById("panel-config");

// Botones volver paneles
const backBtns = document.querySelectorAll(".back-btn");

// =============================
// VARIABLES
// =============================
let modo = "decidir"; // decidir o ia

// =============================
// FUNCIONES
// =============================
function abrirChat(modoElegido) {
  modo = modoElegido;

  // Ocultar home
  screenHome.classList.add("hidden");

  // Mostrar chat
  screenChat.classList.remove("hidden");

  // Mostrar input
  inputArea.style.display = "flex";

  // Limpiar chat
  chat.innerHTML = "";

  // Mensaje inicial
  if (modo === "decidir") {
    addAI("🔥 Modo DECIDIR activado. Escribí tus opciones (ej: Pizza o Pollo).");
  } else {
    addAI("🤖 Modo IA activado. Escribí tu pregunta.");
  }

  input.focus();
}

function volverHome() {
  screenChat.classList.add("hidden");
  screenHome.classList.remove("hidden");
  inputArea.style.display = "none";
}

function addUser(texto) {
  const div = document.createElement("div");
  div.className = "message user";
  div.textContent = texto;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function addAI(texto) {
  const div = document.createElement("div");
  div.className = "message ai";
  div.textContent = texto;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function responderDecidir(texto) {
  // Separar por "o"
  const partes = texto.split(" o ").map(x => x.trim()).filter(x => x);

  if (partes.length < 2) {
    addAI("😅 Escribí mínimo 2 opciones así: Pizza o Pollo");
    return;
  }

  const opcion = partes[Math.floor(Math.random() * partes.length)];
  addAI("🎯 DecideFácil eligió: " + opcion.toUpperCase());
}

function responderIA(texto) {
  // Por ahora solo simulación
  addAI("🤖 (IA demo) Entendí tu pregunta: " + texto);
  addAI("⚡ Próximo paso: conectar IA real cuando tengas API.");
}

// =============================
// EVENTOS HOME
// =============================
btnDecidir.addEventListener("click", () => abrirChat("decidir"));
btnPregunta.addEventListener("click", () => abrirChat("ia"));

// =============================
// EVENTO VOLVER
// =============================
btnVolver.addEventListener("click", volverHome);

// =============================
// ENVIAR MENSAJE
// =============================
btnEnviar.addEventListener("click", () => {
  const texto = input.value.trim();
  if (!texto) return;

  addUser(texto);
  input.value = "";

  if (modo === "decidir") {
    responderDecidir(texto);
  } else {
    responderIA(texto);
  }
});

// Enter para enviar
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    btnEnviar.click();
  }
});

// =============================
// PANELES (PREMIUM / ADS / CONFIG)
// =============================
premiumBtn.addEventListener("click", () => {
  panelPremium.classList.remove("hidden");
});

adsBtn.addEventListener("click", () => {
  panelAds.classList.remove("hidden");
});

configBtn.addEventListener("click", () => {
  panelConfig.classList.remove("hidden");
});

backBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    panelPremium.classList.add("hidden");
    panelAds.classList.add("hidden");
    panelConfig.classList.add("hidden");
  });
});

// =============================
// INICIO
// =============================
volverHome();
