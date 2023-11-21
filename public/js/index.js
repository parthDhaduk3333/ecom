const menu = document.querySelector('.nav-menu')
const nav = document.querySelector('.nav-header')
const close = document.querySelector('.close')
menu?.addEventListener('click',() => {
    nav.classList.toggle('view')
})
close?.addEventListener('click',() => {
    nav.classList.remove('view')
})