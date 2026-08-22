const svg = document.querySelectorAll('.svg-star');
const input = document.getElementById('Rating');
const dropDown = document.getElementById('progress');
const id = window.serverData.map((obj) => obj.rating);
const progress = window.serverData.map((obj) => obj.progress);

input.value = id[0] || 0;

document.body.style.backdropFilter = "blur(7px)";


svg.forEach((obj) => {
  svg.forEach((item) => (item.style.fill = item.id <= id[0] ? 'gold' : ''));
  obj.addEventListener('click', () => {
    if (obj.style.fill === '') {
      svg.forEach((item) => (item.style.fill = item.id <= obj.id ? 'gold' : ''));
      input.value = obj.id;
    } else {
      svg.forEach((item) => (item.style.fill = item.id < obj.id ? 'gold' : ''));
      input.value = obj.id - 1;
    }
  });
});
