"use strict";

$(document).ready(function () {
  let _divFilm = $("#div_Film");
  let _divDettagli = $("#div_Dettagli");
  let _divRiproduzione = $("#div_Riproduzione");
  let _listBoxGeneri = $("#generiSelect");
  let divElencoFilm = $(".elencoFilm");
  let lente = $("#div_Film").find("button");
  let x = $("#div_Dettagli").find("span");
  let titolo = $("#div_Dettagli").children("p").eq(0);
  let prezzo = $("#div_Dettagli").children("p").eq(1);
  let descrizione = $("#div_Dettagli").children("p").eq(2);
  let Nviasual = $("#div_Dettagli").children("p").eq(3);
  let bntVisualizzaFilm = $("#div_Dettagli").find("button");
  let imgDetails = $("#div_Dettagli").children("img").eq(0);
  let divVideo = $("#div_Riproduzione").children().eq(0);
  let chkFree = $("#div_Film").find("input");

  let h2 = $("#wrapper").children().eq(1);
  let globalid;
  let globalTitle;
  let globalvisual;

  bntVisualizzaFilm.click(function () {
    _divFilm.hide();
    _divDettagli.hide();
    _divRiproduzione.show();
    divVideo.prop("src", "video/video" + globalid + ".mp4");
    h2.text(globalTitle);
    let request = inviaRichiesta("patch", "/film/" + globalid, {
      nVisualizzazioni: globalvisual + 1,
    });
  });

  _divDettagli.hide();
  _divRiproduzione.hide();
  caricaListBox();
  let request = inviaRichiesta("get", "/film");
  request.fail(errore);
  request.done(function (films) {
    caricaFilm(films);
  });

  x.click(function () {
    _divFilm.show();
    _divDettagli.hide();
  });

  lente.click(function () {
    if (_listBoxGeneri.val() == "Tutti" && chkFree.prop("checked") == false) {
      let request = inviaRichiesta("get", "/film");
      request.fail(errore);
      request.done(function (films) {
        console.log(films);
        caricaFilm(films);
      });
    } else if (
      _listBoxGeneri.val() == "Tutti" &&
      chkFree.prop("checked") == true
    ) {
      let request = inviaRichiesta("get", "/film?prezzo=free");
      request.fail(errore);
      request.done(function (films) {
        caricaFilm(films);
      });
    } else {
      let request = inviaRichiesta(
        "get",
        `/film?genere=${
          _listBoxGeneri.children("option:selected").prop("genere").id
        }`
      );
      request.fail(errore);
      request.done(function (films) {
        caricaFilm(films);
      });
    }
  });

  //******FUNCTIONS */
  function caricaListBox() {
    let request = inviaRichiesta("get", "/generi");
    request.fail(errore);
    request.done(function (generi) {
      let option = $("<option>");
      option.appendTo(_listBoxGeneri);
      option.text("Tutti");
      option.prop("genere", 0);
      for (const genere of generi) {
        option = $("<option>");
        option.appendTo(_listBoxGeneri);
        option.text(genere.nome);
        option.prop("genere", genere);
      }
    });
  }
  function caricaFilm(films) {
    divElencoFilm.empty();
    for (const film of films) {
      let divImg = $("<div>");
      divImg.appendTo(divElencoFilm);
      let img = $("<img>");
      img.appendTo(divImg);
      img.prop("src", "img/" + film.titolo + ".png");
      img.prop("currentFilm", film);
      img.click(function () {
        _divFilm.hide();
        _divDettagli.show();
        let request = inviaRichiesta(
          "get",
          `/film/${$(this).prop("currentFilm").id}`
        );
        request.fail(errore);
        request.done(function (currentFilm) {
          titolo.text(currentFilm.titolo);
          prezzo.text(currentFilm.prezzo);
          descrizione.text(currentFilm.descrizione);
          Nviasual.text(
            "Numero di visualizzazioni:" + currentFilm.nVisualizzazioni
          );
          imgDetails.prop("src", "img/" + film.titolo + ".png");
          //utilizzo 3 variabili glibali per salvarmi i soli 3 valori necessari al posto dell intero film
          globalid = currentFilm.id;
          globalTitle = currentFilm.titolo;
          globalvisual = currentFilm.nVisualizzazioni;
        });
      });
    }
  }
});
