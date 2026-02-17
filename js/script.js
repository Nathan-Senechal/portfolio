window.addEventListener("scroll", () => {
  const header = document.querySelector(".site-header");

  if (!header) return;

  header.classList.toggle("scrolled", window.scrollY > 40);
});

window.addEventListener("scroll", () => {
  const header = document.querySelector(".site-header");
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 40);
});

// Floating CTA (À propos)
(() => {
  const cta = document.getElementById("floatingCta");
  const hero = document.querySelector(".about-hero");
  if (!cta || !hero) return;

  const show = () => {
    cta.classList.add("is-visible");
    cta.setAttribute("aria-hidden", "false");
  };

  const hide = () => {
    cta.classList.remove("is-visible");
    cta.setAttribute("aria-hidden", "true");
  };

  // visible quand le hero n'est plus dans le viewport
  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) hide();
      else show();
    },
    { threshold: 0.1}
  );

  io.observe(hero);
})();
