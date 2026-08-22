const svg = document.getElementsByClassName('svg');
const personalTableData = window.serverData;
const body = document.querySelector("body")

if(window.location.pathname === "/library"){
  body.style.backdropFilter = "blur(7px)";
}
for (let i = 0; i < svg.length; i++) {
  const choosen = svg[i];
  const object = personalTableData.find((obj) => obj.book_id == choosen.dataset.item);

  const rating = object.rating;
  const children = Array.from(choosen.children);
  children.forEach((element) => {
    element.style.fill = Number(element.id) <= rating ? 'gold' : '';
  });
}
