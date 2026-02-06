// =======================
// DecideFácil - app.js
// =======================

const chat = document.getElementById("chat");
const input = document.getElementById("input");
const btnDecidir = document.getElementById("decidir");

const btnElegir = document.getElementById("btnDecidir");
const btnIA = document.getElementById("btnPregunta");

const mainActions = document.querySelector(".main-actions");
const inputArea = document.querySelector(".input-area");

const premiumBtn = document.getElementById("premiumBtn");
const adsBtn = document.getElementById("adsBtn");
const configBtn = document.getElementById("configBtn");

const panelPremium = document.getElementById("panel-premium");
const panelAds = document.getElementById("panel-ads");
const panelConfig = document.getElementById("panel-config");

// =======================
// ESTADO
// =======================
let modo = ""; // "decidir" o "ia"
let bloqueado = false; // evita spam

// =======================
// FUNCIONES
// =======================
function addMessage(text, type = "ai") {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function activarChat(nuevoModo) {
  modo = nuevoModo;

  // Ocultar botones grandes
  if (mainActions) mainActions.style.display = "none";

  // Mostrar input
  inputArea.style.display = "flex";
  btnDecidir.style.display = "block";

  // Limpiar input
  input.value = "";
  input.focus();

  // Mensaje inicial SOLO una vez
  if (modo === "decidir") {
    addMessage("🔥 Modo DECIDIR activado. Escribí tus opciones (ej: Pizza o Pollo).", "ai");
  } else {
    addMessage("😎 Modo IA activado. Preguntame lo que querrás.", "ai");
  }
}

function responderDecidir(texto) {
  // Ejemplo simple (después lo hacemos pro)
  const opciones = texto.split(" o ").map(t => t.trim()).filter(Boolean);

  if (opciones.length < 2) {
    addMessage("Escribí 2 opciones así:  Pizza o Pollo", "ai");
    return;
  }

  const random = Math.floor(Math.random() * opciones.length);
  addMessage(`Elegí por vos 👇\n${opciones[random]}`, "ai");
}

function responderIA(texto) {
  // Por ahora respuesta simple
  addMessage("🤖 (IA) Entendido. Luego conectamos IA real.", "ai");
}

// =======================
// BOTÓN DECIDIR / ENVIAR
// =======================
function enviar() {
  if (bloqueado) return; // evita spam
  const texto = input.value.trim();
  if (!texto) return;

  bloqueado = true;
  setTimeout(() => (bloqueado = false), 350);

  addMessage(texto, "user");
  input.value = "";

  if (modo === "decidir") responderDecidir(texto);
  else if (modo === "ia") responderIA(texto);
}

// Click enviar
btnDecidir.addEventListener("click", enviar);

// Enter enviar
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") enviar();
});

// =======================
// BOTONES PRINCIPALES
// =======================
btnElegir.addEventListener("click", () => activarChat("decidir"));
btnIA.addEventListener("click", () => activarChat("ia"));

// =======================
// PANELES
// =======================
function abrirPanel(panel) {
  panel.classList.remove("hidden");
}

function cerrarPanel(panel) {
  panel.classList.add("hidden");
}

// Premium
premiumBtn.addEventListener("click", () => abrirPanel(panelPremium));
panelPremium.querySelector(".back-btn").addEventListener("click", () => cerrarPanel(panelPremium));

// Ads
adsBtn.addEventListener("click", () => abrirPanel(panelAds));
panelAds.querySelector(".back-btn").addEventListener("click", () => cerrarPanel(panelAds));

// Config
configBtn.addEventListener("click", () => abrirPanel(panelConfig));
panelConfig.querySelector(".back-btn").addEventListener("click", () => cerrarPanel(panelConfig));
