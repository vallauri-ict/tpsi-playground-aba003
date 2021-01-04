"use strict";
window.onload = function () {
  let _btnAvanti = $("#btnAvanti");
  let _btnIndietro = $("#btnIndietro");
  let _img = $("#img");
  _img.css("width", "400px");
  let dettagliBottoni = {
    width: "140px",
    height: "40px",
    "background-color": "orange",
    "text-align": "center",
    fontSize: "14pt",
    cursor: "pointer",
    borderRadius: "50px",
  };
  _btnAvanti.css(dettagliBottoni);
  _btnIndietro.css(dettagliBottoni);
  _btnIndietro.disabled = true;
  let i = 1;
  _img.prop("src", "img/img" + i + ".jpg");
  gestionealtezze();

  _btnIndietro.prop("disabled", true);
  _btnAvanti.on("click", function () {
    i++;
    if (i == 7) {
      _img.prop("src", "img/img" + i + ".jpg");
      _btnAvanti.prop("disabled", true);
    } else {
      _img.prop("src", "img/img" + i + ".jpg");

      _btnIndietro.prop("disabled", false);
    }
    gestionealtezze();
  });

  _btnIndietro.on("click", function () {
    i--;
    if (i == 1) {
      _img.prop("src", "img/img" + i + ".jpg");
      _btnIndietro.prop("disabled", true);
    } else {
      _img.prop("src", "img/img" + i + ".jpg");

      _btnAvanti.prop("disabled", false);
    }
    gestionealtezze();
  });

  function gestionealtezze() {
    _btnAvanti.css("vertical-align", _img.css("middle"));
    _btnIndietro.css("vertical-align", _img.css("middle"));
  }
};
