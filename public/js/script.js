// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("trackify JS imported successfully!");
});



document.addEventListener("DOMContentLoaded", function () {
  let elems = document.querySelectorAll(".dropdown-trigger");
  let instances = M.Dropdown.init(elems, {});
  
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);
});
