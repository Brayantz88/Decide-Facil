const panels = {
  btnConfig: "panelConfig",
  btnPremium: "panelPremium",
  btnAds: "panelAds"
};

Object.keys(panels).forEach(btn => {
  document.getElementById(btn).onclick = () => {
    closeAll();
    document.getElementById(panels[btn]).style.display = "block";
  };
});

function closeAll() {
  document.querySelectorAll(".panel").forEach(p => p.style.display = "none");
}

document.querySelectorAll(".close").forEach(b => b.onclick = closeAll);

const chat = document.getElementById("chat");
const input = document.getElementById("input");

document.getElementById("send").onclick = () => {
  if (input.value) {
    chat.innerHTML += `<p>${input.value}</p>`;
    input.value = "";
    chat.scrollTop = chat.scrollHeight;
  }
};

document.getElementById("decidir").onclick = () => {
  const r = ["Sí", "No", "Tal vez"];
  chat.innerHTML += `<p><b>${r[Math.floor(Math.random()*3)]}</b></p>`;
};
