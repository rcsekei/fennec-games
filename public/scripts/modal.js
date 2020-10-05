let modal = document.getElementById("modal");
let openBtn = document.getElementById("add-friend-btn");
let closeBtn = document.getElementById("cancel-btn");

openBtn.onclick = function() {
  modal.style.display = "block";
  backdrop.style.display = "block";
}

closeBtn.onclick = function(){
  modal.style.display = "none";
  backdrop.style.display = "none";
}


window.onclick = function(event){
  if(event.target == modal){
    modal.style.display = "none";
    backdrop.style.display = "none";
  }
} 