const openButton = document.getElementById('open-sidebar-button')
const navbar = document.getElementById('navbar')

function openSidebar(){
  navbar.classList.add('show')
  openButton.setAttribute('aria-expanded', 'true')
}

function closeSidebar(){
  navbar.classList.remove('show')
  openButton.setAttribute('aria-expanded', 'false')
}
