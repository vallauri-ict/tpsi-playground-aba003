"use strict";
const X_OFFSET = 180;
const Y_OFFSET = 210;
const MMG = 2436001000; // msec in un giorno
const RIGHE = 18;
const COLONNE = 37;

$(document).ready(function () {
  let _wrapper = $("#wrapper");
  let _mappa = $("#wrapper").children("div");
  let _btnVisualizzaMappa = $("#wrapper").children("button").eq(0);
  //  tag input sono NIPOTI d wrapper
  let _dataInizio = $("#wrapper").find("input").eq(0);
  let _dataFine = $("#wrapper").find("input").eq(1);
  let _msg = $("#wrapper").children("label").eq(2);
  let dataStart;
  let dataEnd;

  _mappa.hide();
  _btnVisualizzaMappa.prop("disabled", true);
  _dataFine.prop("disabled", true);
  _dataInizio.on("change", function () {
    _dataFine.prop("disabled", false);
    _dataFine.prop("min", _dataInizio.val());
  });

  _dataFine.on("change", function () {
    _btnVisualizzaMappa.prop("disabled", false);
    _btnVisualizzaMappa.addClass("buttonEnabled");
    dataEnd = new Date(_dataFine.val());
    _msg.text(`giorni scelti: ${(dataEnd- dataStart)/MMG+1}`);
  });

  _dataInizio.on("change", function () {
    _dataFine.prop("disabled", false);
    _dataFine.prop("min", _dataInizio.val());
    dataStart = _dataInizio.val();
    dataStart = new Date(_dataInizio.val());
  });

  _btnVisualizzaMappa.on("click", function () {
    _mappa.show();
    $.ajax({
      url: "http://localhost:3000/ombrelloni",
      error: errore,
      success: function (data) {
        console.log(data);
        for (let i = 0; i <= RIGHE; i++) {
          for (let j = 0; j <= COLONNE; j++) {
            let div = $("<div>");
            div.appendTo(_mappa);
            div.addClass("ombrellone");
            div.css({
              top: Y_OFFSET + 16 * i,
              left: X_OFFSET + 16 * j + i * -2,
            });
          }
        }
      },
    });
  });
  function errore(jqXHR, text_status, string_error) {
    if (jqXHR.status == 0) alert("Connection Refused or Server timeout");
    else if (jqXHR.status == 200)
      alert("Formato dei dati non corretto : " + jqXHR.responseText);
    else alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
  }
});
