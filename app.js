// =============================
// PANTALLAS
// =============================
const screenHome = document.getElementById("screen-home");
const screenDecidir = document.getElementById("screen-decidir");
const screenIA = document.getElementById("screen-ia");

// =============================
// BOTONES HOME
// =============================
const btnDecidir = document.getElementById("btnDecidir");
const btnPregunta = document.getElementById("btnPregunta");

// =============================
// CHAT DECIDIR
// =============================
const chatDecidir = document.getElementById("chatDecidir");
const inputDecidir = document.getElementById("inputDecidir");
const enviarDecidir = document.getElementById("enviarDecidir");
const volverDecidir = document.getElementById("volverDecidir");

// =============================
// CHAT IA
// =============================
const chatIA = document.getElementById("chatIA");
const inputIA = document.getElementById("inputIA");
const enviarIA = document.getElementById("enviarIA");
const volverIA = document.getElementById("volverIA");

// =============================
// TOP BOTONES
// =============================
const premiumBtn = document.getElementById("premiumBtn");
const adsBtn = document.getElementById("adsBtn");
const configBtn = document.getElementById("configBtn");

// Paneles
const panelPremium = document.getElementById("panel-premium");
const panelAds = document.getElementById("panel-ads");
const panelConfig = document.getElementById("panel-config");
const backBtns = document.querySelectorAll(".back-btn");

// =============================
// FUNCIONES
// =============================
function ocultarTodo() {
  screenHome.classList.add("hidden");
  screenDecidir.classList.add("hidden");
  screenIA.classList.add("hidden");
}

function mostrarHome() {
  ocultarTodo();
  screenHome.classList.remove("hidden");

  // Mostrar botones de arriba SOLO en home
  document.querySelector(".top-buttons").style.display = "flex";
  document.querySelector(".title").style.display = "block";
}

function mostrarDecidir() {
  ocultarTodo();
  screenDecidir.classList.remove("hidden");

  // Ocultar botones de arriba en chat
  document.querySelector(".top-buttons").style.display = "none";
  document.querySelector(".title").style.display = "none";

  chatDecidir.innerHTML = "";
  addAI(chatDecidir, "🔥 Modo DECIDIR activado. Escribí: Pizza o Pollo");
  inputDecidir.focus();
}

function mostrarIA() {
  ocultarTodo();
  screenIA.classList.remove("hidden");

  // Ocultar botones de arriba en chat
  document.querySelector(".top-buttons").style.display = "none";
  document.querySelector(".title").style.display = "none";

  chatIA.innerHTML = "";
  addAI(chatIA, "🤖 Modo IA activado. Escribí tu pregunta.");
  inputIA.focus();
}

// =============================
// MENSAJES
// =============================
function addUser(chatBox, texto) {
  const div = document.createElement("div");
  div.className = "message user";
  div.textContent = texto;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function addAI(chatBox, texto) {
  const div = document.createElement("div");
  div.className = "message ai";
  div.textContent = texto;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// =============================
// RESPUESTA DECIDIR
// =============================
function responderDecidir(texto) {
  const partes = texto.split(" o ").map(x => x.trim()).filter(x => x);

  if (partes.length < 2) {
    addAI(chatDecidir, "😅 Poné mínimo 2 opciones así: Pizza o Pollo");
    return;
  }

  const opcion = partes[Math.floor(Math.random() * partes.length)];
  addAI(chatDecidir, "🎯 DecideFácil eligió: " + opcion.toUpperCase());
}

// =============================
// RESPUESTA IA (DEMO)
// =============================
function responderIA(texto) {
  addAI(chatIA, "🤖 (IA demo) Entendí tu pregunta: " + texto);
  addAI(chatIA, "⚡ Próximo paso: conectar IA real cuando tengas API.");
}

// =============================
// EVENTOS HOME
// =============================
btnDecidir.addEventListener("click", mostrarDecidir);
btnPregunta.addEventListener("click", mostrarIA);

// =============================
// VOLVER
// =============================
volverDecidir.addEventListener("click", mostrarHome);
volverIA.addEventListener("click", mostrarHome);

// =============================
// ENVIAR DECIDIR
// =============================
enviarDecidir.addEventListener("click", () => {
  const texto = inputDecidir.value.trim();
  if (!texto) return;

  addUser(chatDecidir, texto);
  inputDecidir.value = "";
  responderDecidir(texto);
});

inputDecidir.addEventListener("keydown", (e) => {
  if (e.key === "Enter") enviarDecidir.click();
});

// =============================
// ENVIAR IA
// =============================
enviarIA.addEventListener("click", () => {
  const texto = inputIA.value.trim();
  if (!texto) return;

  addUser(chatIA, texto);
  inputIA.value = "";
  responderIA(texto);
});

inputIA.addEventListener("keydown", (e) => {
  if (e.key === "Enter") enviarIA.click();
});

// =============================
// PANELES TOP
// =============================
premiumBtn.addEventListener("click", () => panelPremium.classList.remove("hidden"));
adsBtn.addEventListener("click", () => panelAds.classList.remove("hidden"));
configBtn.addEventListener("click", () => panelConfig.classList.remove("hidden"));

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
mostrarHome();
