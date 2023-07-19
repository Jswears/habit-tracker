// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("trackify JS imported successfully!");
});

let subMenu = document.getElementById("subMenu");

function toggleMenu() {
  subMenu.classList.toggle("open-menu");
}

document.addEventListener("DOMContentLoaded", function () {
  let elems = document.querySelectorAll(".dropdown-trigger");
  let instances = M.Dropdown.init(elems, {});
});
