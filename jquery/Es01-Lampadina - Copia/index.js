"use strict";
$(document).ready(function () {
  let _btnaccendi = $("#btnAccendi");
  let _btnspegni = $("#btnSpegni");
  let _Descrizione = $("#descrizione");
  let _contenuto = $("#contenuto");
  let _lampadina = $(".lampadina");

  _btnspegni.hide();
  _lampadina.hide();

  _btnaccendi.on("click", function () {
    _lampadina.addClass("accesa");
    _lampadina.fadeIn(1500, function () {
      _btnspegni.show();
      _btnaccendi.hide();
    });
  });

  _btnspegni.on("click", function () {
    _lampadina.fadeOut(1500, function () {
      _btnaccendi.show();
      _btnspegni.hide();
    });
    _lampadina.removeClass("accesa");
  });

  let JSONdescrizione = {
    backgroundColor: "Brown",
    fontSize: "14pt",
    cursor: "pointer",
    borderRadius: "10px",
  };

  _Descrizione.css(JSONdescrizione);
_contenuto.hide();
  _Descrizione.on("mouseover", function () {
    _contenuto.slideDown(1000, function () {
      alert("il contenuto è stato visualizzato");
    });
  });
  _Descrizione.on("mouseout", function () {
    _contenuto.slideUp(1000, function () {
      alert("il contenuto non è piu visualizzato");
    });
  });
});
