// ================================
// DecideFácil - app.js COMPLETO
// Compatible con tu HTML actual
// ================================

/* =========================
   ELEMENTOS (HOME + TOP)
========================= */
const title = document.querySelector(".title");
const topButtons = document.querySelector(".top-buttons");

const btnDecidir = document.getElementById("btnDecidir");
const btnPregunta = document.getElementById("btnPregunta");

const premiumBtn = document.getElementById("premiumBtn");
const adsBtn = document.getElementById("adsBtn");
const configBtn = document.getElementById("configBtn");

/* =========================
   PANTALLAS PRINCIPALES
========================= */
const screenHome = document.getElementById("screen-home");
const screenDecidir = document.getElementById("screen-decidir");
const screenIA = document.getElementById("screen-ia");

/* =========================
   CHATS + INPUTS
========================= */
// DECIDIR
const chatDecidir = document.getElementById("chatDecidir");
const inputDecidir = document.getElementById("inputDecidir");
const enviarDecidir = document.getElementById("enviarDecidir");
const volverDecidir = document.getElementById("volverDecidir");

// IA
const chatIA = document.getElementById("chatIA");
const inputIA = document.getElementById("inputIA");
const enviarIA = document.getElementById("enviarIA");
const volverIA = document.getElementById("volverIA");

/* =========================
   PANELES (Premium / Ads / Config)
========================= */
const panelPremium = document.getElementById("panel-premium");
const panelAds = document.getElementById("panel-ads");
const panelConfig = document.getElementById("panel-config");

const panelBackButtons = document.querySelectorAll(".back-btn");

/* =========================
   VARIABLES
========================= */
let modoActual = "home"; // home / decidir / ia / premium / ads / config

/* =========================
   FUNCIONES DE UTILIDAD
========================= */

// Mostrar solo 1 sección y ocultar el resto
function ocultarTodo() {
  // Pantallas principales
  screenHome.classList.add("hidden");
  screenDecidir.classList.add("hidden");
  screenIA.classList.add("hidden");

  // Paneles
  panelPremium.classList.add("hidden");
  panelAds.classList.add("hidden");
  panelConfig.classList.add("hidden");
}

// Mostrar barra superior y título (en home sí, en chats no)
function mostrarTopSiHome() {
  if (modoActual === "home") {
    title.style.display = "block";
    topButtons.style.display = "flex";
  } else {
    title.style.display = "none";
    topButtons.style.display = "none";
  }
}

// Guardar historial (localStorage)
function guardarHistorial(clave, chatBox) {
  localStorage.setItem(clave, chatBox.innerHTML);
}

// Cargar historial (localStorage)
function cargarHistorial(clave, chatBox) {
  const data = localStorage.getItem(clave);
  if (data) {
    chatBox.innerHTML = data;
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

// Crear mensaje del usuario
function addUser(chatBox, texto) {
  const div = document.createElement("div");
  div.className = "message user";
  div.textContent = texto;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Crear mensaje de la IA
function addAI(chatBox, texto) {
  const div = document.createElement("div");
  div.className = "message ai";
  div.textContent = texto;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Esperar (para animación)
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* =========================
   NAVEGACIÓN ENTRE PANTALLAS
========================= */

function irHome() {
  modoActual = "home";
  ocultarTodo();
  screenHome.classList.remove("hidden");
  mostrarTopSiHome();
}

function irDecidir() {
  modoActual = "decidir";
  ocultarTodo();
  screenDecidir.classList.remove("hidden");
  mostrarTopSiHome();

  // Si está vacío, mostrar mensaje inicial
  if (chatDecidir.innerHTML.trim() === "") {
    addAI(chatDecidir, "🔥 Modo DECIDIR activado. Escribí: Pizza o Pollo");
  }

  // Cargar historial
  cargarHistorial("historial_decidir", chatDecidir);


function irIA() {
  modoActual = "ia";
  ocultarTodo();
  screenIA.classList.remove("hidden");
  mostrarTopSiHome();

  // Si está vacío, mensaje inicial
  if (chatIA.innerHTML.trim() === "") {
    addAI(chatIA, "🤖 Modo IA activado. Escribí tu pregunta.");
  }

  // Cargar historial
  cargarHistorial("historial_ia", chatIA);

function irPanel(tipo) {
  modoActual = tipo;
  ocultarTodo();
  mostrarTopSiHome();

  if (tipo === "premium") panelPremium.classList.remove("hidden");
  if (tipo === "ads") panelAds.classList.remove("hidden");
  if (tipo === "config") panelConfig.classList.remove("hidden");
}

/* =========================
   LÓGICA: DECIDIR
========================= */

function limpiarTexto(texto) {
  return texto.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
}

// Detectar opciones: "Pizza o Pollo", "A, B, C", "A / B"
function obtenerOpciones(texto) {
  const limpio = limpiarTexto(texto);

  let opciones = limpio
    .split(/(?:\s+o\s+|,|\/|\||\n)/i)
    .map((x) => x.trim())
    .filter((x) => x.length > 0);

  // Quitar duplicados
  opciones = [...new Set(opciones)];

  return opciones;
}

async function responderDecidir(texto) {
  const opciones = obtenerOpciones(texto);

  if (opciones.length < 2) {
    addAI(chatDecidir, "⚠️ Escribí mínimo 2 opciones. Ejemplo: Pizza o Pollo");
    guardarHistorial("historial_decidir", chatDecidir);
    return;
  }

  addAI(chatDecidir, "🤔 Pensando...");
  await sleep(700);

  addAI(chatDecidir, "3...");
  await sleep(600);

  addAI(chatDecidir, "2...");
  await sleep(600);

  addAI(chatDecidir, "1...");
  await sleep(600);

  // Elegir random
  const elegido = opciones[Math.floor(Math.random() * opciones.length)];
  addAI(chatDecidir, `🎯 DecideFácil eligió: ${elegido.toUpperCase()}`);

  guardarHistorial("historial_decidir", chatDecidir);
}

/* =========================
   LÓGICA: IA (SIMULADA)
   (Por ahora no usa API real)
========================= */

async function responderIA(texto) {
  const limpio = limpiarTexto(texto);

  if (!limpio) return;

  // Simular respuesta rápida
  addAI(chatIA, "🤔 Pensando...");
  await sleep(900);

  // Respuesta simple por ahora (luego lo conectamos con IA real)
  let respuesta =
    "Buena pregunta 😎. Ahorita todavía no está conectada la IA real, pero ya está listo el chat. " +
    "Luego le metemos IA de verdad con una API.";

  // Algunas respuestas inteligentes básicas
  const t = limpio.toLowerCase();

  if (t.includes("hola")) respuesta = "¡Holaaa! 😄 ¿Qué querés preguntar?";
  if (t.includes("como estas")) respuesta = "Estoy al 100 🔥 listo para ayudarte.";
  if (t.includes("que es decidefacil"))
    respuesta =
      "DecideFácil es tu web para tomar decisiones rápido: escribís opciones y te elige una 😎.";

  // Quitar el "Pensando..." (opcional: lo dejamos, pero se ve feo)
  // Para no complicar: dejamos el pensando como un mensaje más.

  addAI(chatIA, respuesta);

  guardarHistorial("historial_ia", chatIA);
}

/* =========================
   EVENTOS PRINCIPALES (HOME)
========================= */

btnDecidir.addEventListener("click", () => {
  irDecidir();
});

btnPregunta.addEventListener("click", () => {
  irIA();
});

/* =========================
   BOTONES VOLVER
========================= */

volverDecidir.addEventListener("click", () => {
  irHome();
});

volverIA.addEventListener("click", () => {
  irHome();
});

/* =========================
   ENVIAR MENSAJES (BOTÓN)
========================= */

enviarDecidir.addEventListener("click", () => {
  const texto = inputDecidir.value.trim();
  if (!texto) return;

  addUser(chatDecidir, texto);
  inputDecidir.value = "";

  guardarHistorial("historial_decidir", chatDecidir);

  responderDecidir(texto);
});

enviarIA.addEventListener("click", () => {
  const texto = inputIA.value.trim();
  if (!texto) return;

  addUser(chatIA, texto);
  inputIA.value = "";

  guardarHistorial("historial_ia", chatIA);

  responderIA(texto);
});

/* =========================
   ENVIAR MENSAJES (ENTER)
========================= */

inputDecidir.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    enviarDecidir.click();
  }
});

inputIA.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    enviarIA.click();
  }
});

/* =========================
   TOP BUTTONS: PREMIUM / ADS / CONFIG
========================= */

premiumBtn.addEventListener("click", () => {
  irPanel("premium");
});

adsBtn.addEventListener("click", () => {
  irPanel("ads");
});

configBtn.addEventListener("click", () => {
  irPanel("config");
});

/* =========================
   BOTONES VOLVER DE LOS PANELES
========================= */

panelBackButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    irHome();
  });
});

/* =========================
   INICIO
========================= */

window.addEventListener("load", () => {
  // Cargar historiales (por si querés que se guarden siempre)
  cargarHistorial("historial_decidir", chatDecidir);
  cargarHistorial("historial_ia", chatIA);

  // Ir a home
  irHome();
});
