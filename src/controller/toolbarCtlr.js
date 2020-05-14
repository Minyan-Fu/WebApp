function hamburgerExpand(x){
  var crosses = document.getElementsByClassName("hamburger");
  var modal = document.getElementById("hamburger-modal");

    if (firstClickModal === false){
      for (i=0;i < crosses.length; i++){
        crosses[i].classList.toggle("change");
        }
      modal.classList.toggle("none");
      firstClickModal = true;
    } else {
      for (i=0;i < crosses.length; i++){
        crosses[i].classList.toggle("change");
        }
      if (x.getAttribute("data-close") !== null){
        x.parentNode.parentNode.parentNode.classList.toggle("menu-of-hamburger-inactive");
        setTimeout(function(){
          x.parentNode.parentNode.parentNode.classList.toggle("menu-of-hamburger-inactive");
          modal.classList.toggle("none");
        }, 140);
        firstClickModal = false;
      }
    }
}
//Hamburger close
window.onclick = function(event) {
  var crosses = document.getElementsByClassName("hamburger");
  var modal = document.getElementById("hamburger-modal");

  if (event.target == modal) {
    for (i=0;i < crosses.length; i++){
      crosses[i].classList.toggle("change");
      }
      modal.classList.toggle("menu-of-hamburger-inactive");
      setTimeout(function(){
        modal.classList.toggle("menu-of-hamburger-inactive");
        modal.classList.toggle("none");
      }, 140);
      firstClickModal = false;
  }
}














