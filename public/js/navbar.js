const links = document.querySelectorAll('.navbar a');
const pill = document.querySelector('.pill');
const body = document.querySelector("body")

if(window.location.pathname === "/"){
  body.style.backdropFilter = "blur(0px)"
}

function setActiveFromURL() {
  links.forEach((link) => {
    if (link.getAttribute('href') === window.location.pathname) {
      link.classList.add('active');
    }
  });
}

function movePill(link) {
  if (!link) return;
  pill.style.transform = `translateX(${link.offsetLeft}px)`;
  pill.style.height = link.offsetHeight + 'px';
  pill.style.width = link.offsetWidth + 'px';
  link.classList.add("active")
}

setActiveFromURL();
const activeLink = document.querySelector('.navbar a.active') || links[1];
console.log(links);


links.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    movePill(link);
    setTimeout(() => {
      window.location.href = link.getAttribute('href');
    }, 500);
  });
});

window.addEventListener('load', () => {
  pill.style.transition = 'none';
  movePill(activeLink);
  pill.offsetHeight;
  pill.style.transition = '';
});
