(() => {
  const form = document.getElementById("contactForm");
  const note = document.getElementById("contactNote");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const hp = form.querySelector('input[name="company"]')?.value?.trim();
    if (hp) return; // bot

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    const to = "ton.email@exemple.com"; // <-- remplace
    const body = [
      `Nom : ${name}`,
      `Email : ${email}`,
      "",
      message
    ].join("\n");

    const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    if (note) note.textContent = "Ouverture de votre client mail…";
  });
})();
