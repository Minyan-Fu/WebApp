var body = document.getElementsByTagName("BODY")[0];
var firstClickModel = false;
function navExpand(x) {
  var nav_button = document.getElementsByClassName("nav-button");
  var toolbar_model = document.getElementById("toolbar-model");

  if (firstClickModel === false) {
    for (i = 0; i < nav_button.length; i++) {
      nav_button[i].classList.toggle("change");
    }
    toolbar_model.classList.toggle("none");
    firstClickModel = true;
  } else {
    for (i = 0; i < nav_button.length; i++) {
      nav_button[i].classList.toggle("change");
    }
    if (x.getAttribute("data-close") !== null) {
      x.parentNode.parentNode.parentNode.classList.toggle("nav-menu-inactive");
      setTimeout(function () {
        x.parentNode.parentNode.parentNode.classList.toggle("nav-menu-inactive");
        toolbar_model.classList.toggle("none");
      }, 140);
      firstClickModel = false;
    }
  }
}

window.onclick = function (event) {
  var nav_button = document.getElementsByClassName("nav-button");
  var toolbar_model = document.getElementById("toolbar-model");

  if (event.target == toolbar_model) {
    for (i = 0; i < nav_button.length; i++) {
      nav_button[i].classList.toggle("change");
    }
    toolbar_model.classList.toggle("nav-menu-inactive");
    setTimeout(function () {
      toolbar_model.classList.toggle("nav-menu-inactive");
      toolbar_model.classList.toggle("none");
    }, 140);
    firstClickModel = false;
  }
}














