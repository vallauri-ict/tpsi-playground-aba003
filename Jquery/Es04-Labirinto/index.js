$(document).ready(function () {
  var _btnAvvia = $("#btnAvvia");
  _btnAvvia.on("click", eseguiAnimazione);
  _btnAvvia.css("opacity", 0); //1 = solido (default)
  let lampeggio=true;
  lamp();
  function eseguiAnimazione() {
    _btnAvvia.off("click");//rimuovo il listener di evento
    lampeggio=false;//nascondo graficamente il pulsante
    _btnAvvia.css("cursor","default");
    $("#pedina")
      .css({ left: "10px", top: "260px", width: "15px", height: "15px" })
      .animate({ left: "+=60px", width: "8px", height: "8px" }, "1300")
      .animate({ top: "+=38px", width: "15px", height: "15px" }, "1300")
      .animate({ left: "+=116px", width: "8px", height: "8px" }, "1300")
      .animate({ top: "+=77px", width: "15px", height: "15px" }, "1300")
      .animate({ left: "+=250px", width: "8px", height: "8px" }, "1300",function () {
        _btnAvvia.on("click", eseguiAnimazione);
        lampeggio=true;
        _btnAvvia.css("cursor","pointer");
        lamp();//richiamo l animazione
        
      });
  }
  function lamp() {
    //animazioni successive su un solo oggetto vengono accodate
    //metre su oggetti diversi vengono lanciate in parallelo
    _btnAvvia.animate({ opacity: 1 }, 450, function () {
      _btnAvvia.animate({ opacity: 0 }, 450, function () {
        if(lampeggio)lamp();
      });
    });
  }
});
