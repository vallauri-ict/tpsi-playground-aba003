"use strict";

$(document).ready(function () {
  let _calciatore = $("#calciatore");
  let _palla = $("#palla");

  let btnEntra = $("#btnEntra");
  let btnEsci = $("#btnEsci");
  let btnVisualizzaPalla = $("#btnVisualizzaPalla");
  let btnNascondiPalla = $("#btnNascondiPalla");
  let btnTira = $("#btnTira");

  _calciatore.hide();
  _palla.hide();
  _palla.prop("goal", false);

  //btnEsci.hide();
  btnEsci.css("visibility", "hidden"); //qui uso la property normale
  btnNascondiPalla.css({ visibility: "hidden" }); //se volio settare piu proprieta posso fare un json
  btnTira.css("visibility", "hidden");
  btnEntra.on("click", function () {
    //this è un puntatore js
    //this.css({"visibility":"hidden"});
    //this.style.visibility="hidden"
    $(this).css({ visibility: "hidden" }); //fa un casting di un oggetto js
    _calciatore.show(2000, function () {
      //fa l animazione e quanto è finita abilita l altra scritta
      btnEsci.css("visibility", "visible");
      checkTira();
    });
  });

  btnEsci.on("click", function () {
    $(this).css({ visibility: "hidden" }); //fa un casting di un oggetto js
    _calciatore.hide(2000, function () {
      //fa l animazione e quanto è finita abilita l altra scritta
      btnEntra.css("visibility", "visible");
      btnTira.css("visibility", "hidden");
    });
  });

  btnVisualizzaPalla.on("click", function () {
    $(this).css({ visibility: "hidden" }); //fa un casting di un oggetto js
    _palla.fadeIn(2000, function () {
      //fa l animazione e quanto è finita abilita l altra scritta
      btnNascondiPalla.css("visibility", "visible");
      checkTira();
    });
  });

  btnNascondiPalla.on("click", function () {
    $(this).css({ visibility: "hidden" }); //fa un casting di un oggetto js
    _palla.fadeOut(2000, function () {
      //fa l animazione e quanto è finita abilita l altra scritta
      btnVisualizzaPalla.css("visibility", "visible");
      btnTira.css("visibility", "hidden");
      if (_palla.prop("goal")) {
        let pos = {
          left: "",
          top: "",
          width: "",
          height: "",
        };
        _palla.css(pos);
        _palla.prop("goal", false);
      }
    });
  });
  function checkTira() {
    if (_calciatore.is(":visible") && _palla.is(":visible")) {
      //is vede se l immagine del calciatore e della palla sono visibili sulla palla
      btnTira.css("visibility", "visible");
    }
  }
  btnTira.on("click", function () {
    $(this).css("visibility", "hidden");
    let pos = {
      left: "1025px",
      top: "300px",
      width: "50px",
      height: "50px",
    };
    _palla.animate(pos, 1500, function () {
      $(this).prop("goal", true);
    });
  });

  $("#btnRosso").on("click", function () {
    _palla.prop("src", "img/PalloneRosso.jpg");
  });

  $("#btnBianco").on("click", function () {
    _palla.prop("src", "img/palla.jpg");
  });
});
