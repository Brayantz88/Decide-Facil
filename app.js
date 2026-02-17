/* =========================================================
   DecideFácil - app.js
   COMPLETO + FIX BACK BUTTON CELULAR + sessionStorage
   + FIX PENSANDO 3 2 1 (se borra)
========================================================= */

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

// INPUT AREAS (para el back button fix)
const inputAreaDecidir = document.getElementById("inputAreaDecidir");
const inputAreaIA = document.getElementById("inputAreaIA");

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

// Ocultar todo
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

// Mostrar barra superior y título solo en HOME
function mostrarTopSiHome() {
  if (modoActual === "home") {
    title.style.display = "block";
    topButtons.style.display = "flex";
  } else {
    title.style.display = "none";
    topButtons.style.display = "none";
  }
}

// Guardar historial (sessionStorage)
function guardarHistorial(clave, chatBox) {
  sessionStorage.setItem(clave, chatBox.innerHTML);
}

// Cargar historial (sessionStorage)
function cargarHistorial(clave, chatBox) {
  const data = sessionStorage.getItem(clave);
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

// Crear mensaje temporal (para "Pensando... 3..2..1..")
function addAITemporal(chatBox, texto) {
  const div = document.createElement("div");
  div.className = "message ai thinking-temp";
  div.textContent = texto;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
  return div;
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

  // Guardar modo
  sessionStorage.setItem("modoActual", modoActual);

  // Quitar focus para que no abra teclado
  document.activeElement.blur();
}

function irDecidir() {
  modoActual = "decidir";
  ocultarTodo();
  screenDecidir.classList.remove("hidden");
  mostrarTopSiHome();

  // Cargar historial
  cargarHistorial("historial_decidir", chatDecidir);

  // Mensaje inicial si está vacío
  if (chatDecidir.innerHTML.trim() === "") {
    addAI(chatDecidir, "🔥 Modo DECIDIR activado. Escribí: Pizza o Pollo");
  }

  // Guardar modo
  sessionStorage.setItem("modoActual", modoActual);

  // NO hacemos focus (para que no se levante el teclado)
  document.activeElement.blur();
}

function irIA() {
  modoActual = "ia";
  ocultarTodo();
  screenIA.classList.remove("hidden");
  mostrarTopSiHome();

  // Cargar historial
  cargarHistorial("historial_ia", chatIA);

  // Mensaje inicial si está vacío
  if (chatIA.innerHTML.trim() === "") {
    addAI(chatIA, "🤖 Modo IA activado. Escribí tu pregunta.");
  }

  // Guardar modo
  sessionStorage.setItem("modoActual", modoActual);

  // NO hacemos focus
  document.activeElement.blur();
}

function irPanel(tipo) {
  modoActual = tipo;
  ocultarTodo();
  mostrarTopSiHome();

  if (tipo === "premium") panelPremium.classList.remove("hidden");
  if (tipo === "ads") panelAds.classList.remove("hidden");
  if (tipo === "config") panelConfig.classList.remove("hidden");

  // Guardar modo
  sessionStorage.setItem("modoActual", modoActual);

  // Quitar focus para que no abra teclado
  document.activeElement.blur();
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

  // 🔥 MENSAJE TEMPORAL (1 solo)
  const temp = addAITemporal(chatDecidir, "🤔 Pensando...");
  await sleep(600);

  temp.textContent = "3...";
  await sleep(400);

  temp.textContent = "2...";
  await sleep(400);

  temp.textContent = "1...";
  await sleep(400);

  // BORRAR el temporal
  temp.remove();

  const elegida = opciones[Math.floor(Math.random() * opciones.length)];
  addAI(chatDecidir, `✅ DecideFácil dice: ${elegida}`);

  guardarHistorial("historial_decidir", chatDecidir);
}

/* =========================
   LÓGICA: IA (Simulada)
========================= */

async function responderIA(texto) {
  // 🔥 MENSAJE TEMPORAL (1 solo)
  const temp = addAITemporal(chatIA, "🤖 Pensando...");
  await sleep(700);

  const lower = texto.toLowerCase();

  let respuesta =
    "Interesante 😄 ¿Querés que te ayude a decidir o te explico mejor?";

  if (lower.includes("hola")) respuesta = "¡Hola! 😄 ¿Qué querés hacer hoy?";
  if (lower.includes("quien eres"))
    respuesta = "Soy DecideFácil 🤖, tu ayudante para decidir y responder.";
  if (lower.includes("ayuda"))
    respuesta = "Decime tu duda y te respondo claro y rápido 💪";
  if (lower.includes("gta 6"))
    respuesta =
      "GTA 6 va a estar brutal 🔥 ¿Querés que te diga requisitos o precio estimado?";
  if (lower.includes("ps5"))
    respuesta = "La PS5 es buenísima 😎 ¿Querés la normal o la Pro?";

  // BORRAR temporal
  temp.remove();

  addAI(chatIA, respuesta);

  guardarHistorial("historial_ia", chatIA);
}

/* =========================
   BOTONES PRINCIPALES
========================= */

btnDecidir.addEventListener("click", () => {
  irDecidir();
});

btnPregunta.addEventListener("click", () => {
  irIA();
});

/* =========================
   BOTONES VOLVER (CHATS)
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

  inputDecidir.blur();
});

enviarIA.addEventListener("click", () => {
  const texto = inputIA.value.trim();
  if (!texto) return;

  addUser(chatIA, texto);
  inputIA.value = "";

  guardarHistorial("historial_ia", chatIA);

  responderIA(texto);

  inputIA.blur();
});

/* =========================
   ENVIAR MENSAJES (ENTER)
========================= */

inputDecidir.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    enviarDecidir.click();
  }
});

inputIA.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
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
   BOTÓN ATRÁS DEL CELULAR (ANDROID)
   - Si estás en chat o panel -> vuelve a HOME
   - Si estás en HOME -> ahí sí deja salir
========================= */

history.pushState(null, "", location.href);

window.addEventListener("popstate", function () {
  if (modoActual !== "home") {
    irHome();

    // Volver a bloquear el salir
    history.pushState(null, "", location.href);
  }
});

/* =========================
   INICIO
========================= */

window.addEventListener("load", () => {
  // Cargar historiales
  cargarHistorial("historial_decidir", chatDecidir);
  cargarHistorial("historial_ia", chatIA);

  // Ver si había modo guardado
  const modoGuardado = sessionStorage.getItem("modoActual");

  if (modoGuardado === "decidir") irDecidir();
  else if (modoGuardado === "ia") irIA();
  else irHome();
});
