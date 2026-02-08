// ===============================
// DecideFácil - app.js (para tu CSS)
// ===============================

// PANTALLAS
const screenHome = document.getElementById("screen-home");
const screenChat = document.getElementById("screen-chat");

// BOTONES PRINCIPALES
const btnDecidir = document.getElementById("btnDecidir");
const btnPregunta = document.getElementById("btnPregunta");
const btnBack = document.getElementById("btnBack");

// CHAT + INPUT
const chat = document.getElementById("chat");
const input = document.getElementById("input");
const btnEnviar = document.getElementById("decidir");
const inputArea = document.querySelector(".input-area");

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

// MODO
let modo = "";

// ===============================
// FUNCIONES DE PANTALLAS
// ===============================
function mostrarHome() {
  screenHome.classList.remove("hidden");
  screenChat.classList.add("hidden");

  // ocultar input abajo
  inputArea.style.display = "none";
}

function mostrarChat() {
  screenHome.classList.add("hidden");
  screenChat.classList.remove("hidden");

  // mostrar input abajo
  inputArea.style.display = "flex";
}

// ===============================
// CHAT
// ===============================
function agregarMensaje(texto, quien = "ai") {
  const msg = document.createElement("div");

  // TU CSS usa .message
  msg.classList.add("message");

  if (quien === "user") {
    msg.classList.add("user");
  } else {
    msg.classList.add("ai");
  }

  msg.textContent = texto;
  chat.appendChild(msg);

  // bajar scroll
  chat.scrollTop = chat.scrollHeight;
}

function limpiarChat() {
  chat.innerHTML = "";
}

function respuestaIA(textoUser) {
  // MODO DECIDIR
  if (modo === "decidir") {
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
    return `Modo IA activado 😎\n\nTu pregunta fue:\n"${textoUser}"`;
  }

  return "Elegí un modo primero 😅";
}

// ===============================
// BOTONES PRINCIPALES
// ===============================
btnDecidir.addEventListener("click", () => {
  modo = "decidir";
  limpiarChat();
  mostrarChat();
  agregarMensaje("🔥 Modo DECIDIR activado.\nEscribí tus opciones (ej: Pizza o Pollo).", "ai");
});

btnPregunta.addEventListener("click", () => {
  modo = "pregunta";
  limpiarChat();
  mostrarChat();
  agregarMensaje("😎 Modo IA activado.\nEscribí tu pregunta.", "ai");
});

// VOLVER
btnBack.addEventListener("click", () => {
  mostrarHome();
});

// ===============================
// ENVIAR
// ===============================
function enviarMensaje() {
  const texto = input.value.trim();
  if (!texto) return;

  agregarMensaje(texto, "user");

  const resp = respuestaIA(texto);
  agregarMensaje(resp, "ai");

  input.value = "";
  input.focus();
}

btnEnviar.addEventListener("click", enviarMensaje);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    enviarMensaje();
  }
});

// ===============================
// PANELES
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
