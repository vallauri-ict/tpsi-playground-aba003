"use strict";

$(document).ready(function () {
  let _lampadina = $(".lampadina");
  // $ restituisce un vettore  di elementi;
  let _btnSpegni = $("#btnSpegni");
  let _btnAccendi = $("#btnAccendi");
  let _descrizione = $("#descrizione");
  let _contenuto = $("#contenuto");

  _btnSpegni.hide();
  _lampadina.hide();

  _btnAccendi.on("click", function () {
    _lampadina.addClass("accesa"); //sull oclick aplico la classe accesa
    _lampadina.fadeIn(2000, function () {
      _btnSpegni.show();
      _btnAccendi.hide();
    });
  });

  _btnSpegni.on("click", function () {
    
    _lampadina.fadeOut(2000, function () {
      _btnSpegni.hide();
      _btnAccendi.show();
    });
    _lampadina.removeClass("accesa");
  });

  let descrizione = {
    width: "160px",
    height: "40px",
    "text-align": "center",
    "line-Height": "40px",
    "background-color": "#aaa",
    textDecortion: "underline",
    fontSize: "14pt",
    cursor: "pointer",
    borderRadius: "10px",
    "margin-left": "10px",
  };

  //aggiunge un css json
  _descrizione.css(descrizione);
  _contenuto.hide();

  _descrizione.on("mouseover", function () {
    _contenuto.slideDown(1000);
  });

  _descrizione.on("mouseout", function () {
    _contenuto.slideUp(2000);
  });
  
});
