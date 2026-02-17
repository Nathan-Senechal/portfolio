(function () {
  const filters = document.querySelectorAll(".projects-hub__filters .chip");
  const cards = document.querySelectorAll(".project-card");

  if (!filters.length || !cards.length) return;

  const TRANSITION_MS = 180; // doit matcher ton CSS
  let timer = null;

  function setActive(btn) {
    filters.forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
  }

  function shouldShow(card, value) {
    const cat = card.getAttribute("data-cat");
    return value === "all" || cat === value;
  }

  function applyFilter(value) {
    // stop timer si clics rapides
    if (timer) clearTimeout(timer);

    const outgoing = []; // visibles -> à cacher
    const incoming = []; // cachées -> à montrer
    const stayingVisible = []; // visibles -> restent
    const stayingHidden = []; // cachées -> restent cachées

    cards.forEach(card => {
      const isVisible = card.style.display !== "none";
      const show = shouldShow(card, value);

      if (isVisible && !show) outgoing.push(card);
      else if (!isVisible && show) incoming.push(card);
      else if (isVisible && show) stayingVisible.push(card);
      else stayingHidden.push(card);
    });

    // --- PHASE A : fade-out uniquement (aucune nouvelle card n'apparaît)
    stayingVisible.forEach(c => c.classList.remove("is-hidden"));
    outgoing.forEach(c => c.classList.add("is-hidden"));
    stayingHidden.forEach(c => {
      c.classList.add("is-hidden");
      c.style.display = "none";
    });

    // --- PHASE B : après transition, on enlève du flow + on fade-in les nouvelles
    timer = setTimeout(() => {
      // Retirer les anciennes du layout
      outgoing.forEach(c => {
        c.style.display = "none";
      });

      // Ajouter les nouvelles (d'abord cachées, puis fade-in)
      incoming.forEach(c => {
        c.style.display = "";
        c.classList.add("is-hidden"); // start hidden
        requestAnimationFrame(() => {
          c.classList.remove("is-hidden"); // fade-in
        });
      });
    }, TRANSITION_MS);
  }

  filters.forEach(btn => {
    btn.addEventListener("click", () => {
      const value = btn.getAttribute("data-filter") || "all";
      setActive(btn);
      applyFilter(value);
    });
  });

  // Init
  const initial = document.querySelector('.projects-hub__filters .chip[data-filter="all"]');
  if (initial) setActive(initial);

  // État initial propre
  cards.forEach(c => { c.style.display = ""; c.classList.remove("is-hidden"); });
  applyFilter("all");
})();
