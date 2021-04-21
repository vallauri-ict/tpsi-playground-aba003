"use strict";

const X0 = 152;
const Y0 = 109;

const VERDE = "rgba(0, 200, 0, 0.5)";
const ROSSO = "rgba(255, 0, 0, 0.5)";
const BLU = "rgba(0, 0, 255, 0.5)";

let nomeFila = [
  "T",
  "S",
  "R",
  "Q",
  "P",
  "O",
  "N",
  "M",
  "L",
  "I",
  "H",
  "G",
  "F",
  "E",
  "D",
  "C",
  "B",
  "A",
];
let nomeColonna = [
  28,
  26,
  24,
  22,
  20,
  18,
  16,
  14,
  12,
  10,
  8,
  6,
  4,
  2,
  1,
  3,
  5,
  7,
  9,
  11,
  13,
  15,
  17,
  19,
  21,
  23,
  25,
  27,
];

let inizioFine = [
  { inizio: 0, fine: 27 },
  { inizio: 0, fine: 27 },
  { inizio: 0, fine: 27 },
  { inizio: 0, fine: 27 },
  { inizio: 0, fine: 27 },
  { inizio: 0, fine: 27 },
  { inizio: 0, fine: 27 },
  { inizio: 0, fine: 27 },
  { inizio: 0, fine: 27 },
  { inizio: 0, fine: 27 },

  { inizio: 1, fine: 26 },
  { inizio: 2, fine: 25 },
  { inizio: 2, fine: 25 },
  { inizio: 3, fine: 24 },
  { inizio: 3, fine: 24 },
  { inizio: 4, fine: 23 },
  { inizio: 4, fine: 23 },
  { inizio: 4, fine: 23 },
];

$(document).ready(function () {
  /*for (const item of inizioFine) {
		console.log(item.inizio+" "+ item.fine);
		
	}*/
  let wrapper = $("#wrapper");
  let divSpettacoli = $("#divSpettacoli");
  let divMappa = $("#divMappa");
  let mappa = divMappa.children("div").eq(0);
  let titolo = wrapper.children("h3");
  let sottotitolo = wrapper.children("p");
  let btnAcquista = divMappa.children("button");

  let acquisti = [];
  let spettacoloScelto;

  divMappa.hide();

  // getta il time di adesso console.log(new Date().getTime()/(24*3600*1000))

  btnAcquista.on("click", function () {
    for (let i = 0; i < acquisti.length; i++) {
      let request = inviaRichiesta(
        "patch",
        "/mappaPoltrone_" + spettacoloScelto + "/" + acquisti[i],
        { prenotazione: "booked" }
      );
      request.fail(errore);
      request.done(function (data) {
        alert("Hai eseguito la prenotazione");
        console.log(data);
        location.reload();
      });
    }
  });

  let request = inviaRichiesta("get", "/spettacoli");
  request.fail(errore);
  request.done(function (data) {
    console.log(data);

    for (const item of data) {
      let div = $("<div>");
      div.appendTo(divSpettacoli);

      // *************img
      let divImg = $("<div>");
      divImg.addClass("img");
      divImg.appendTo(div);

      let img = $("<img>");
      img.prop("src", "img/" + item.titolo + ".jpg");
      img.appendTo(divImg);

      // **********details
      let divDetails = $("<div>");
      divDetails.addClass("details");
      divDetails.appendTo(div);

      $("<p>").text(item.titolo).appendTo(divDetails);
      $("<p>")
        .text("di: " + item.autore)
        .appendTo(divDetails);
      $("<p>").text(item.data).appendTo(divDetails);
      $("<p>").text(item.prezzo).appendTo(divDetails);

      let button = $("<button>");
      button.text("Acquista Biglietti");
      button.on("click", acquistaBiglietti);
      if (new Date(item["data-utc"]) < new Date().getTime()) {
        button.prop("disabled", true);
      }
      button.prop("spettacolo", item);
      button.appendTo(divDetails);
    }
  });

  function acquistaBiglietti() {
    btnAcquista.prop("disabled", true);

    spettacoloScelto = $(this).prop("spettacolo").id;

    divSpettacoli.fadeOut(function () {
      divMappa.fadeIn();
    });

    wrapper.children("h3").text($(this).prop("spettacolo").titolo);
    wrapper.children("p").text($(this).prop("spettacolo").data);

    let request = inviaRichiesta(
      "get",
      "/mappaPoltrone_" + $(this).prop("spettacolo").id
    );
    request.fail(errore);
    request.done(function (data) {
      let posto = 0;

      for (let i = 0; i < nomeFila.length; i++) {
        for (let j = 0; j < nomeColonna.length; j++) {
          let div = $("<div>");
          div.addClass("poltrona");
          div.appendTo(mappa);
          div.prop("posto", data[posto]);
          console.log(data[posto]);

          if (j >= inizioFine[i].inizio && j <= inizioFine[i].fine) {
            if (data[posto].prenotazione == "") {
              div.css("background-color", VERDE);
            } else if (data[posto].prenotazione == "booked") {
              div.css("background-color", ROSSO);
            }
            posto++;
          }

          if (j > 13) {
            div.css("left", X0 + 16.5 * j + 33);
          } else {
            div.css("left", X0 + 16.5 * j);
          }

          if (i > 9) {
            div.css("top", Y0 + 17.5 * i + 24);
          } else {
            div.css("top", Y0 + 17.5 * i);
          }

          div.on("click", prenota);
        }
      }
    });
  }

  function prenota() {
    if ($(this).css("background-color") == ROSSO) {
      alert("è occupato");
    } else {
      if ($(this).css("background-color") == BLU) {
        $(this).css("background-color", VERDE);
        acquisti = acquisti.splice(
          acquisti.indexOf($(this).prop("posto").id),
          1
        );
        console.log(acquisti);
      } else {
        $(this).css("background-color", BLU);
        acquisti.push($(this).prop("posto").id);
        console.log(acquisti);
      }
    }

    if (acquisti.length == 0) {
      btnAcquista.prop("disabled", true);
    } else {
      btnAcquista.prop("disabled", false);
    }
  }
});
