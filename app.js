// =====================================
// DECIDEFÁCIL - APP.JS COMPLETO
// =====================================

// Esperar a que cargue el HTML
document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // ELEMENTOS (BOTONES PRINCIPALES)
  // =====================================
  const btnDecidir = document.getElementById("btnDecidir");
  const btnPregunta = document.getElementById("btnPregunta");

  // Pantallas
  const screenHome = document.getElementById("screen-home");
  const screenChat = document.getElementById("screen-chat");

  // Botón volver
  const btnVolver = document.getElementById("btnVolver");

  // Chat y input
  const chatBox = document.getElementById("chat");
  const input = document.getElementById("input");
  const btnEnviar = document.getElementById("decidir");

  // =====================================
  // VALIDACIÓN DE ELEMENTOS
  // =====================================
  // (Esto evita que se rompa si falta algo en el HTML)
  if (!btnDecidir || !btnPregunta || !screenHome || !screenChat || !btnVolver || !chatBox || !input || !btnEnviar) {
    console.error("❌ Falta un elemento en el HTML. Revisá IDs.");
    return;
  }

  // =====================================
  // ESTADO GLOBAL
  // =====================================
  let modo = "decidir"; // decidir | ia

  // =====================================
  // FUNCIONES DE PANTALLAS
  // =====================================
  function mostrarPantallaHome() {
    screenHome.classList.remove("hidden");
    screenChat.classList.add("hidden");

    // Limpieza del input
    input.value = "";
  }

  function mostrarPantallaChat() {
    screenHome.classList.add("hidden");
    screenChat.classList.remove("hidden");

    // Focus al input
    setTimeout(() => {
      input.focus();
    }, 200);
  }

  // =====================================
  // FUNCIONES MENSAJES
  // =====================================
  function scrollChatAbajo() {
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function addUser(texto) {
    const div = document.createElement("div");
    div.className = "message user";
    div.textContent = texto;
    chatBox.appendChild(div);
    scrollChatAbajo();
  }

  function addAI(texto) {
    const div = document.createElement("div");
    div.className = "message ai";
    div.textContent = texto;
    chatBox.appendChild(div);
    scrollChatAbajo();
  }

  // =====================================
  // LIMPIAR CHAT
  // =====================================
  function limpiarChat() {
    chatBox.innerHTML = "";
  }

  // =====================================
  // BOTONES PRINCIPALES
  // =====================================
  btnDecidir.addEventListener("click", () => {
    modo = "decidir";
    limpiarChat();
    mostrarPantallaChat();

    addAI("🔥 Modo DECIDIR activado. Escribí:");
    addAI("Pizza o Pollo");
  });

  btnPregunta.addEventListener("click", () => {
    modo = "ia";
    limpiarChat();
    mostrarPantallaChat();

    addAI("🤖 Modo IA activado. Preguntame algo:");
    addAI("Ej: ¿Qué debería estudiar? / ¿Qué compro? / ¿Qué hago hoy?");
  });

  btnVolver.addEventListener("click", () => {
    mostrarPantallaHome();
  });

  // =====================================
  // FUNCIÓN PRINCIPAL AL ENVIAR
  // =====================================
  function enviarMensaje() {
    const texto = input.value.trim();

    if (texto.length === 0) return;

    addUser(texto);
    input.value = "";

    if (modo === "decidir") {
      responderDecidir(texto);
    } else {
      responderIA(texto);
    }
  }

  btnEnviar.addEventListener("click", enviarMensaje);

  // Enter para enviar
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      enviarMensaje();
    }
  });

  // =====================================
  // MODO DECIDIR
  // =====================================
  function limpiarTextoOpciones(texto) {
    return texto
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function obtenerOpciones(texto) {
    const limpio = limpiarTextoOpciones(texto);

    // Separadores permitidos:
    // - coma
    // - " o "
    // - "|"
    // - "/"
    // - salto de línea (ya lo pasamos a espacio)
    let opciones = limpio
      .split(/(?:\s+o\s+|,|\||\/)/i)
      .map(x => x.trim())
      .filter(x => x.length > 0);

    // Quitar duplicados
    opciones = [...new Set(opciones)];

    return opciones;
  }

  function responderDecidir(texto) {
    const opciones = obtenerOpciones(texto);

    if (opciones.length < 2) {
      addAI("😅 Poné mínimo 2 opciones. Ej:");
      addAI("✅ Pizza o Pollo");
      addAI("✅ Pizza, Pollo, Tacos");
      return;
    }

    addAI("🤔 Pensando...");

    setTimeout(() => addAI("3..."), 450);
    setTimeout(() => addAI("2..."), 950);
    setTimeout(() => addAI("1..."), 1450);

    setTimeout(() => {
      const opcion = opciones[Math.floor(Math.random() * opciones.length)];
      addAI("🎯 DecideFácil eligió: " + opcion.toUpperCase());
    }, 2000);
  }

  // =====================================
  // MODO IA (DEMO PRO)
  // =====================================
  function responderIA(texto) {

    // Respuestas demo con un toque inteligente
    const respuestas = [
      "🔥 Buena pregunta. Si querés te lo digo en 2 opciones rápidas.",
      "😎 Te lo digo directo: depende de tu objetivo. ¿Querés dinero, paz o diversión?",
      "📌 Yo haría esto: 1) simple 2) efectivo 3) sin complicarte.",
      "🤖 Si estás indeciso, hacé lo más fácil hoy y lo más importante mañana.",
      "💡 Te recomiendo: probá una semana y mirá resultados.",
      "⚡ Esa idea tiene potencial. ¿Querés que te lo arme en un plan paso a paso?"
    ];

    addAI("🤖 Analizando...");

    setTimeout(() => {
      const r = respuestas[Math.floor(Math.random() * respuestas.length)];
      addAI(r);
    }, 800);

    setTimeout(() => {
      addAI("📌 (IA demo) Próximo paso: conectar una IA real con API cuando quieras 😎");
    }, 1400);
  }

  // =====================================
  // INICIO
  // =====================================
  mostrarPantallaHome();

});
