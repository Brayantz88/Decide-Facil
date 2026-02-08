// ===============================
// DecideFácil - app.js (PRO)
// ===============================

// ELEMENTOS
const screenHome = document.getElementById("screen-home");
const screenChat = document.getElementById("screen-chat");

const btnDecidir = document.getElementById("btnDecidir");
const btnPregunta = document.getElementById("btnPregunta");
const btnBack = document.getElementById("btnBack");

const chat = document.getElementById("chat");
const input = document.getElementById("input");
const btnEnviar = document.getElementById("decidir");

// BOTONES ARRIBA
const premiumBtn = document.getElementById("premiumBtn");
const adsBtn = document.getElementById("adsBtn");
const configBtn = document.getElementById("configBtn");

// PANELES
const panelPremium = document.getElementById("panel-premium");
const panelAds = document.getElementById("panel-ads");
const panelConfig = document.getElementById("panel-config");

// BOTONES VOLVER DE PANELES
const backBtns = document.querySelectorAll(".back-btn");

// MODO ACTUAL
let modo = ""; // "decidir" o "pregunta"

// ===============================
// FUNCIONES DE PANTALLA
// ===============================
function mostrarHome() {
  screenHome.classList.remove("hidden");
  screenChat.classList.add("hidden");
}

function mostrarChat() {
  screenHome.classList.add("hidden");
  screenChat.classList.remove("hidden");
}

// ===============================
// FUNCIONES DE CHAT
// ===============================
function agregarMensaje(texto, quien = "ia") {
  const msg = document.createElement("div");
  msg.classList.add("msg");

  if (quien === "user") {
    msg.classList.add("user");
  } else {
    msg.classList.add("ia");
  }

  msg.textContent = texto;
  chat.appendChild(msg);

  // Scroll abajo
  chat.scrollTop = chat.scrollHeight;
}

function limpiarChat() {
  chat.innerHTML = "";
}

function respuestaIA(textoUser) {
  // MODO DECIDIR
  if (modo === "decidir") {
    // Ejemplo: "Pizza o Pollo"
    const opciones = textoUser
      .split("o")
      .map(x => x.trim())
      .filter(x => x.length > 0);

    if (opciones.length < 2) {
      return "Escribí 2 opciones así: Pizza o Pollo 😎";
    }

    const random = Math.floor(Math.random() * opciones.length);
    return `Yo elijo: ${opciones[random]} 🔥`;
  }

  // MODO PREGUNTA
  if (modo === "pregunta") {
    return `Modo IA activado 😎\nPreguntame lo que quieras.\n\nTu pregunta fue: "${textoUser}"`;
  }

  // Por si acaso
  return "Elegí un modo primero 😅";
}

// ===============================
// BOTONES PRINCIPALES
// ===============================
btnDecidir.addEventListener("click", () => {
  modo = "decidir";
  limpiarChat();
  mostrarChat();
  agregarMensaje("🔥 Modo DECIDIR activado.\nEscribí tus opciones (ej: Pizza o Pollo).", "ia");
});

btnPregunta.addEventListener("click", () => {
  modo = "pregunta";
  limpiarChat();
  mostrarChat();
  agregarMensaje("😎 Modo IA activado.\nEscribí tu pregunta.", "ia");
});

// BOTÓN VOLVER
btnBack.addEventListener("click", () => {
  mostrarHome();
});

// ===============================
// ENVIAR MENSAJE
// ===============================
function enviarMensaje() {
  const texto = input.value.trim();
  if (!texto) return;

  // Mensaje usuario
  agregarMensaje(texto, "user");

  // Respuesta IA
  const resp = respuestaIA(texto);
  agregarMensaje(resp, "ia");

  // Limpiar input
  input.value = "";
  input.focus();
}

btnEnviar.addEventListener("click", enviarMensaje);

// ENTER PARA ENVIAR
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    enviarMensaje();
  }
});

// ===============================
// PANELES PREMIUM / ADS / CONFIG
// ===============================
function abrirPanel(panel) {
  panel.classList.remove("hidden");
}

function cerrarPanel(panel) {
  panel.classList.add("hidden");
}

premiumBtn.addEventListener("click", () => abrirPanel(panelPremium));
adsBtn.addEventListener("click", () => abrirPanel(panelAds));
configBtn.addEventListener("click", () => abrirPanel(panelConfig));

// BOTONES "VOLVER" DE LOS PANELES
backBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    cerrarPanel(panelPremium);
    cerrarPanel(panelAds);
    cerrarPanel(panelConfig);
  });
});

// ===============================
// INICIO
// ===============================
mostrarHome();
