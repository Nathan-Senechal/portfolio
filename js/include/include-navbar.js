(async function () {
  const slot = document.getElementById("navbar-slot");
  if (!slot) return;

  const res = await fetch("components/navbar.html");
  slot.innerHTML = await res.text();

  const s = document.createElement("script");
  s.src = "js/navbar.js";
  s.defer = true;
  document.body.appendChild(s);
})();
