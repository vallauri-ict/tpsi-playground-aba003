"use strict";
const X_OFFSET = 180;
const Y_OFFSET = 210;
const MMG = 24 * 3600 * 1000; // msec in un giorno
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
  });
  _btnVisualizzaMappa.on("click", function () {
    _mappa.show();
    $.ajax({
      url: "http://localhost:3000/ombrelloni",
      error: errore,
      success: function (data) {
        console.log(data);
        for (let i = 0; i <= RIGHE; i++) {
          if (i != 9) {
            for (let j = 0; j <= COLONNE; j++) {
              if (j != 22) {
                let div = $("<div>");
                div.appedTo(_mappa);
                div.addClass("ombrelloni");
                div.css({
                  top: Y_OFFSET + 16 * i,
                  left: X_OFFSET + 16 * j,
                });
              }
            }
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
