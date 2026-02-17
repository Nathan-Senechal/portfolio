(() => {
  const root = document.getElementById("projectsCarousel");
  if (!root) return;

  const track = root.querySelector(".carousel__track");
  const slides = Array.from(root.querySelectorAll(".slide"));
  const dots = Array.from(root.querySelectorAll(".dot"));
  const prevBtn = root.querySelector(".carousel__nav--prev");
  const nextBtn = root.querySelector(".carousel__nav--next");

  if (!track || slides.length === 0) return;

  let index = 0;
  let timer = null;

  const AUTO_DELAY = 5500;   // ms
  const RESUME_DELAY = 8000; // ms après interaction

  const setActive = (i) => {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(${-index * 100}%)`;
    slides.forEach((s, k) => s.classList.toggle("is-active", k === index));
    dots.forEach((d, k) => d.classList.toggle("is-active", k === index));
  };

  const stop = () => {
    if (timer) clearInterval(timer);
    timer = null;
  };

  const start = () => {
    stop();
    timer = setInterval(() => setActive(index + 1), AUTO_DELAY);
  };

  const restartLater = () => {
    stop();
    setTimeout(start, RESUME_DELAY);
  };

  // Init
  setActive(0);
  start();

  // Buttons
  prevBtn?.addEventListener("click", () => {
    setActive(index - 1);
    restartLater();
  });

  nextBtn?.addEventListener("click", () => {
    setActive(index + 1);
    restartLater();
  });

  // Dots
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      setActive(i);
      restartLater();
    });
  });

  // Keyboard
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      setActive(index - 1);
      restartLater();
    }
    if (e.key === "ArrowRight") {
      setActive(index + 1);
      restartLater();
    }
  });

  // Pause on hover / focus (desktop)
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", start);

  // Pause when tab hidden
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  // Swipe mobile
  let x0 = null;
  root.addEventListener(
    "touchstart",
    (e) => {
      x0 = e.touches?.[0]?.clientX ?? null;
    },
    { passive: true }
  );

  root.addEventListener(
    "touchend",
    (e) => {
      if (x0 == null) return;
      const x1 = e.changedTouches?.[0]?.clientX ?? x0;
      const dx = x1 - x0;
      const threshold = 40;

      if (Math.abs(dx) > threshold) {
        setActive(index + (dx < 0 ? 1 : -1));
        restartLater();
      }
      x0 = null;
    },
    { passive: true }
  );

  // ✅ Wheel / trackpad : scroll dans le carousel = changer de slide
  let wheelLock = false;
  let wheelAcc = 0;
  const WHEEL_THRESHOLD = 80; // trackpad friendly
  const WHEEL_COOLDOWN = 650;

  root.addEventListener(
    "wheel",
    (e) => {
      // accumule les petits deltas (trackpad)
      wheelAcc += e.deltaY;

      if (Math.abs(wheelAcc) < WHEEL_THRESHOLD) return;
      if (wheelLock) {
        wheelAcc = 0;
        return;
      }

      const goingDown = wheelAcc > 0;
      wheelAcc = 0;

      // Laisse le scroll de page aux extrémités (UX propre)
      if (goingDown && index >= slides.length - 1) return;
      if (!goingDown && index <= 0) return;

      // Ici on prend le contrôle
      e.preventDefault();

      wheelLock = true;
      setActive(index + (goingDown ? 1 : -1));
      restartLater();

      setTimeout(() => {
        wheelLock = false;
      }, WHEEL_COOLDOWN);
    },
    { passive: false }
  );
})();
