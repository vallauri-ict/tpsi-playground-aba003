"use strict";

$(document).ready(function () {
  let wrapper = $("#elencoArticoli");
  let details = $(".details");

  let btnApriCarrello = $("#btnCarrello");
  let divCarrello = $("#carrello");

  btnApriCarrello.on("click", showCarrello);

  creaPreview();
  details.hide();
  wrapper.on("click", "img", mostra);

  btnApriCarrello.on("click");
  function creaPreview() {
    let i = 0;
    for (const item of articoli) {
      let divArticolo = $("<div>");
      divArticolo.addClass("article");
      divArticolo.prop("id", `article-${i}`);
      console.log(divArticolo.prop("id"));
      divArticolo.appendTo(wrapper);

      let img = $("<img>");
      img.prop("src", `img/${item.src}.jpg`);
      img.appendTo(divArticolo);
      img.addClass("image");
      img.prop("img", item.src);
      img.prop("nome", item.nome);
      img.prop("descrizione", item.descrizione);
      img.prop("prezzo", item.prezzo);
      img.prop("title", "aggiungi al carrello");
      let divnome = $("<div>");
      divnome.addClass("name");
      img.hover(
        function () {
          divnome.text(item.nome);
        },
        function () {
          divnome.text("");
        }
      );
      divnome.appendTo(divArticolo);
      i++; //incremento dell' id di ogni div
    }
  }

  function mostra() {
    details.slideDown(1000);
    details.empty(); //utilizzo empty per pulire il div corrente al click
    creadetails($(this));
  }

  function creadetails(_this) {
    details.css({ display: "block" });
    let divSpan = $("<div>");
    divSpan.addClass("detail-close");
    divSpan.appendTo(details);
    let span = $("<span>");
    span.appendTo(divSpan);
    span.text("X");
    span.on("click", function () {
      details.slideUp(1000);
    });

    let divImg = $("<div>");
    divImg.addClass("detail-img");
    divImg.appendTo(details);
    let img = $("<img>");
    img.appendTo(divImg);
    img.prop("src", `img/${_this.prop("img")}.jpg`);

    let divInfo = $("<div>");
    divInfo.addClass("detail-info");
    divInfo.appendTo(details);
    let h4 = $("<h4>");
    h4.addClass("item-title");
    h4.appendTo(divInfo);
    h4.text(_this.prop("nome"));
    let pDettagli = $("<p>");
    pDettagli.text("si");
    pDettagli.appendTo(divInfo);
    pDettagli.text(_this.prop("descrizione"));

    let prezzo = $("<p>");
    prezzo.appendTo(details);
    prezzo.text("$ " + _this.prop("prezzo"));
    prezzo.css({ textAlign: "center" });

    let btn = $("<input>");
    btn.prop({ type: "button", value: "Aggiungi al carrello" });
    btn.addClass("item-add");
    btn.appendTo(details);
    btn.on("click", aggiungiCarrello($(this)));
  }

  function showCarrello() {
    if (btnApriCarrello.text() == "chiudi carrello") {
      divCarrello.slideUp(1000);
      btnApriCarrello.text("Apri carrello");
    } else {
      divCarrello.slideDown(1000);
      btnApriCarrello.text("chiudi carrello");
    }
  }

  function aggiungiCarrello(_this) {
    let articolo = new Array(3);
  }
});
