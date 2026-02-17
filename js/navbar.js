const burger = document.querySelector(".nav__burger");
const mobileMenu = document.querySelector(".nav-mobile");

function openMenu() {
  burger.classList.add("active");
  mobileMenu.classList.add("open");
  document.body.classList.add("no-scroll");
  burger.setAttribute("aria-expanded", "true");
  mobileMenu.setAttribute("aria-hidden", "false");
}

function closeMenu() {
  burger.classList.remove("active");
  mobileMenu.classList.remove("open");
  document.body.classList.remove("no-scroll");
  burger.setAttribute("aria-expanded", "false");
  mobileMenu.setAttribute("aria-hidden", "true");
}

burger.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.contains("open");
  isOpen ? closeMenu() : openMenu();
});

/* Fermer au clic sur un lien */
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

/* Fermer si clic sur le fond (hors liens) */
mobileMenu.addEventListener("click", (e) => {
  if (e.target === mobileMenu) closeMenu();
});

/* Fermer avec ESC */
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu.classList.contains("open")) closeMenu();
});
