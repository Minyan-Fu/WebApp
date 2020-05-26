var body = document.getElementsByTagName("BODY")[0];
var firstClickModel = false;
function navExpand(x){
  var crosses = document.getElementsByClassName("nav-button");
  var model = document.getElementById("toolbar-model");

    if (firstClickModel === false){
      for (i=0;i < crosses.length; i++){
        crosses[i].classList.toggle("change");
        }
      model.classList.toggle("none");
      firstClickModel = true;
    } else {
      for (i=0;i < crosses.length; i++){
        crosses[i].classList.toggle("change");
        }
      if (x.getAttribute("data-close") !== null){
        x.parentNode.parentNode.parentNode.classList.toggle("nav-menu-inactive");
        setTimeout(function(){
          x.parentNode.parentNode.parentNode.classList.toggle("nav-menu-inactive");
          model.classList.toggle("none");
        }, 140);
        firstClickModel = false;
      }
    }
}

window.onclick = function(event) {
  var crosses = document.getElementsByClassName("nav-button");
  var model = document.getElementById("toolbar-model");

  if (event.target == model) {
    for (i=0;i < crosses.length; i++){
      crosses[i].classList.toggle("change");
      }
      model.classList.toggle("nav-menu-inactive");
      setTimeout(function(){
        model.classList.toggle("nav-menu-inactive");
        model.classList.toggle("none");
      }, 140);
      firstClickModel = false;
  }
}














