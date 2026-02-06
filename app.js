// ===============================
// DecideFácil - app.js completo
// ===============================

// BOTONES
const premiumBtn = document.getElementById("premiumBtn");
const adsBtn = document.getElementById("adsBtn");
const configBtn = document.getElementById("configBtn");

const btnDecidir = document.getElementById("btnDecidir");
const btnPregunta = document.getElementById("btnPregunta");
const decidirBtn = document.getElementById("decidir");

// INPUT Y CHAT
const input = document.getElementById("input");
const chat = document.getElementById("chat");

// PANELES
const panelPremium = document.getElementById("panel-premium");
const panelAds = document.getElementById("panel-ads");
const panelConfig = document.getElementById("panel-config");

// BOTONES VOLVER (hay 3)
const backBtns = document.querySelectorAll(".back-btn");

// ===============================
// FUNCIONES DE PANELES
// ===============================
function cerrarPanels() {
  panelPremium.classList.add("hidden");
  panelAds.classList.add("hidden");
  panelConfig.classList.add("hidden");
}

function abrirPanel(panel) {
  cerrarPanels();
  panel.classList.remove("hidden");
}

// ===============================
// EVENTOS BOTONES SUPERIORES
// ===============================
premiumBtn.addEventListener("click", () => abrirPanel(panelPremium));
adsBtn.addEventListener("click", () => abrirPanel(panelAds));
configBtn.addEventListener("click", () => abrirPanel(panelConfig));

// Volver (para los 3)
backBtns.forEach((btn) => {
  btn.addEventListener("click", () => cerrarPanels());
});

// ===============================
// FUNCIONES DE MENSAJES
// ===============================
function agregarMensaje(texto, tipo = "bot") {
  const msg = document.createElement("div");
  msg.classList.add("msg");

  if (tipo === "user") {
    msg.classList.add("user-msg");
  } else {
    msg.classList.add("bot-msg");
  }

  msg.textContent = texto;
  chat.appendChild(msg);

  // auto scroll al final
  chat.scrollTop = chat.scrollHeight;
}

// ===============================
// DECIDE POR MÍ
// ===============================
btnDecidir.addEventListener("click", () => {
  const respuestas = [
    "Elegí por vos 👇",
    "Mejor mañana 🔥",
    "Hoy no conviene 😌",
    "Dale, hacelo 😎",
    "Pensalo un poco más 🧠",
    "Sí, de una 💯",
    "No por ahora 🤔"
  ];

  const random = respuestas[Math.floor(Math.random() * respuestas.length)];

  agregarMensaje(random, "bot");
});

// ===============================
// PREGUNTA A LA IA (modo simple)
// ===============================
btnPregunta.addEventListener("click", () => {
  agregarMensaje("Modo IA activado 😎 Preguntame lo que quieras.", "bot");
});

// ===============================
// BOTÓN DECIDIR (ENVÍA TEXTO)
// ===============================
decidirBtn.addEventListener("click", () => {
  const texto = input.value.trim();

  if (texto === "") return;

  agregarMensaje(texto, "user");

  // Respuesta automática simple
  setTimeout(() => {
    agregarMensaje("Entendido 😎. Estoy pensando...", "bot");
  }, 400);

  input.value = "";
});

// ENTER PARA ENVIAR
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    decidirBtn.click();
  }
});
