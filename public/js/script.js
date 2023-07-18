// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("trackify JS imported successfully!");
});

document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);
});
