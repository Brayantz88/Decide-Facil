// ================================
// DecideFácil - app.js
// ================================

// Botones superiores
const premiumBtn = document.getElementById("premiumBtn");
const adsBtn = document.getElementById("adsBtn");
const configBtn = document.getElementById("configBtn");

// Paneles
const panelPremium = document.getElementById("panel-premium");
const panelAds = document.getElementById("panel-ads");
const panelConfig = document.getElementById("panel-config");

// Botones principales
const btnDecidir = document.getElementById("btnDecidir");
const btnPregunta = document.getElementById("btnPregunta");

// Chat
const chatBox = document.getElementById("chat");
const input = document.getElementById("input");
const decidirBtn = document.getElementById("decidir");

// ================================
// FUNCIONES
// ================================

// Cierra todos los paneles
function closeAllPanels() {
  panelPremium.classList.add("hidden");
  panelAds.classList.add("hidden");
  panelConfig.classList.add("hidden");
}

// Abre un panel
function openPanel(panel) {
  closeAllPanels();
  panel.classList.remove("hidden");
}

// Agregar mensaje al chat
function addMessage(text, type = "bot") {
  const msg = document.createElement("div");
  msg.className = `msg ${type}`;
  msg.textContent = text;
  chatBox.appendChild(msg);

  // Baja automático
  chatBox.scrollTop = chatBox.scrollHeight;
}

// ================================
// EVENTOS - BOTONES SUPERIORES
// ================================

premiumBtn.addEventListener("click", () => {
  openPanel(panelPremium);
});

adsBtn.addEventListener("click", () => {
  openPanel(panelAds);
});

configBtn.addEventListener("click", () => {
  openPanel(panelConfig);
});

// ================================
// BOTONES "VOLVER"
// ================================

document.querySelectorAll(".back-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    closeAllPanels();
  });
});

// ================================
// BOTÓN: DECIDE POR MÍ
// ================================

const respuestas = [
  "Sí 😎",
  "No 😅",
  "Tal vez 🤔",
  "Mejor mañana 🔥",
  "Hazlo de una 💪",
  "No lo hagas 🚫",
  "Es buena idea ✅",
  "No conviene ahora ❌",
  "Dale sin miedo 😏",
  "Pensalo un poco más 🧠"
];

btnDecidir.addEventListener("click", () => {
  closeAllPanels();

  // Muestra chat por si estaba oculto
  chatBox.style.display = "block";

  addMessage("Elegí por vos 👇", "bot");
  addMessage(respuestas[Math.floor(Math.random() * respuestas.length)], "bot");
});

// ================================
// BOTÓN: PREGUNTA A LA IA
// ================================

btnPregunta.addEventListener("click", () => {
  closeAllPanels();

  chatBox.style.display = "block";

  // Activar input y botón decidir
  document.querySelector(".input-area").style.display = "flex";
  decidirBtn.style.display = "inline-block";

  addMessage("Modo IA activado 😎 Preguntame lo que quieras.", "bot");
});

// ================================
// BOTÓN DECIDIR (del input)
// ================================

decidirBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  // Respuesta simple tipo IA
  const respuestasIA = [
    "Buena pregunta 😎",
    "Te recomiendo que sí 🔥",
    "Yo digo que no conviene por ahora 🤔",
    "Depende, pero si querés te doy una respuesta más exacta.",
    "Dame 2 opciones y elijo por vos 💪"
  ];

  setTimeout(() => {
    addMessage(respuestasIA[Math.floor(Math.random() * respuestasIA.length)], "bot");
  }, 500);
});

// Enter para enviar
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    decidirBtn.click();
  }
});
