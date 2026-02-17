(async function () {
  const slot = document.getElementById("bg-slot");
  if (!slot) return;

  // évite double init si tu rappelles le script
  if (window.__bgIncluded) return;
  window.__bgIncluded = true;

  try {
    const res = await fetch("components/background.html", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status} while loading background.html`);
    slot.innerHTML = await res.text();

    // Vérif canvas
    const canvas = document.getElementById("scene");
    if (!canvas) throw new Error("Canvas #scene introuvable après injection du background.");

    // Charge les scripts dans l'ordre (et une seule fois)
    await loadScriptOnce("js/components/three.min.js");
    await loadScriptOnce("js/components/TweenMax.min.js");
    await loadScriptOnce("js/components/demo1.js");

  } catch (err) {
    console.error("Background include failed:", err);
  }

  function loadScriptOnce(src) {
    return new Promise((resolve, reject) => {
      // déjà chargé ?
      const already = [...document.scripts].some(s => s.src && s.src.includes(src));
      if (already) return resolve();

      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error(`Impossible de charger ${src}`));
      document.body.appendChild(s);
    });
  }
})();
