"use strict"
$(document).ready(function () {
  var _p = $("p");//_p è una collezione (vettore enumerativo di puntatori)
  console.log(_p.length);

  //tutti gli elementi jquery in scrittura applicano 
  //quella proprietà a tutti gli elementi della collezione
  _p.css("backgroundColor", "#FF0"); //uso metodo css in scrittura 

  $(".primo").css("backgroundColor", "#F00");

  //in lettura ritorna solo il primo
  console.log(_p.css("backgroundColor"));
  //_p.hide(800);

  _p[2].innerHTML="nuovo valore";

  for (const puntatore of _p) {
    puntatore.innerHTML="pipi";
    puntatore.style.backgroundColor="blue";
  }

});
