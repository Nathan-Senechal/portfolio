const burger = document.querySelector('.burger');
const fullscreenMenu = document.querySelector('.fullscreen-menu');
const closeBtn = document.querySelector('.close-btn');

burger.addEventListener('click', () => {
  fullscreenMenu.classList.add('show');
});

closeBtn.addEventListener('click', () => {
  fullscreenMenu.classList.remove('show');
});

document.querySelectorAll('.fullscreen-menu a').forEach(link => {
  link.addEventListener('click', () => {
    fullscreenMenu.classList.remove('show');
  });
});
