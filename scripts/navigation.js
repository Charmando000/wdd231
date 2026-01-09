// Toggle hamburger menu
const navbutton = document.querySelector('#ham-btn');
const navlinks = document.querySelector('#nav-bar');
// toggle the 'show' class on click
navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navlinks.classList.toggle('show');
});
