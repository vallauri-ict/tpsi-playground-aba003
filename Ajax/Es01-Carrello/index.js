"use strict";

$(document).ready(function () {
  $.ajax({
    url: "http://localhost:3000/fotocamere",
    timeout: 5000,
    success: visualizza,
    error: errore, //puntatore a funzione
  });

  function visualizza(data) {
    let _wrapper = $("#elencoArticoli");
    let articoli = data;
    let divDettagli = $(".details");
    divDettagli.hide();
    console.log(articoli);
    for (let i = 0; i < articoli.length; i++) {
      let divArticolo = $("<div>");
      divArticolo.appendTo(_wrapper);
      divArticolo.prop("id", `article-${i}`);
      divArticolo.addClass("article");
      let img = $("<img>");
      img.prop("src", `img/${articoli[i].src}.jpg`);
      img.prop("title", "aggiungi al carrello");
      img.addClass("image");
      img.appendTo(divArticolo);
      let divSottotitolo = $("<div>");
      divSottotitolo.addClass("name");
      divSottotitolo.appendTo(divArticolo);
    }

    _wrapper.on("mouseover", "img", visualizzaNome);
    _wrapper.on("mouseout", "img", toglinome);
    _wrapper.on("click", "img", visualizzaArticolo);

    function visualizzaNome() {
      let pos = $("img").index($(this));
      let nome = $(".name").eq(pos);
      nome.html(articoli[pos].nome);
    }
    function toglinome() {
      let pos = $("img").index($(this));
      let nome = $(".name").eq(pos);
      nome.html("");
    }
    function visualizzaArticolo() {
      let pos = $("img").index($(this));

      divDettagli.slideDown(1000);
      divDettagli.empty();
      divDettagli.css({ display: "block" });

      let divChiusura = $("<div>");
      divChiusura.addClass("detail-close");
      divChiusura.appendTo(divDettagli);
      let span = $("<span>");
      span.appendTo(divChiusura);
      span.html("X");
      span.on("click", function () {
        divDettagli.slideUp(1000);
      });

      let divImg = $("<div>");
      divImg.addClass("detail-img");
      divImg.appendTo(divDettagli);
      let img = $("<img>");
      img.appendTo(divImg);
      img.prop("src", `img/${articoli[pos].src}.jpg`);

      let divInfo = $("<div>");
      divInfo.addClass("detail-info");
      divInfo.appendTo(divDettagli);
      let h4 = $("<h4>");
      h4.appendTo(divInfo);
      h4.addClass("item-tile");
      h4.html(articoli[pos].nome);
      let p = $("<p>");
      p.appendTo(divInfo);
      p.html(articoli[pos].descrizione);
      let p1 = $("<p>");
      p1.appendTo(divInfo);
      p1.html(articoli[pos].prezzo + "£");
      let button = $("<button>");
      button.addClass("item-add");
      button.html("Aggiungi al carrello");
      button.appendTo(divDettagli);
      button.prop("nome", articoli[pos].nome);
      button.prop("prezzo", articoli[pos].prezzo);
      button.on("click", aggiungiAlCarrello);
    }

    let btnCarrello = $("#btnCarrello");
    let carrello = $("#carrello");
    let chiuso = true;
    btnCarrello.on("click", function () {
      if (chiuso) {
        btnCarrello.html(" &#708 CHIUDI CARRELLO");
        carrello.slideDown(1000);
      } else {
        btnCarrello.html(" &#709 APRI CARRELLO");
        carrello.slideUp(1000);
      }
      chiuso = !chiuso;
    });
    function aggiungiAlCarrello() {
      let table = $("#carrello table tbody ");
      let nome = $(this).prop("nome");
      let prezzo = $(this).prop("prezzo");
      carrello.slideDown(1000);
      let trovato = false;
      table.find("tr").each(function (i, ref) {
        if ($(ref).children("td").eq(0).html() == nome) {
          let qt = parseInt($(ref).children("td").eq(2).html());
          qt++;
          $(ref).children("td").eq(2).html(qt);
          trovato = true;
        }
      });
      if (trovato == false) {
        let tr = $("<tr>");
        tr.appendTo(table);

        let tdNome = $("<td>");
        tdNome.appendTo(tr);
        tdNome.html(nome);

        let tdPrezzo = $("<td>");
        tdPrezzo.appendTo(tr);
        tdPrezzo.html(prezzo);

        let tdQta = $("<td>");
        tdQta.appendTo(tr);
        tdQta.html("1");

        let td = $("<td>");
        td.appendTo(tr);
        let img = $("<img>");
        img.appendTo(td);
        img.prop("src", "img/_cestino.png");
        img.prop("univoco", 1);
        img.on("click", function () {
          let tr = $(this).parent().parent();
          tr.remove();
        });
      }
    }
  }

  function errore(jqXHR, textStatus, str_error) {
    if (jqXHR.status == 0) alert("connection refused or server timeout");
    else if (jqXHR.status == 200)
      alert("Errore Formattazione dati\n" + jqXHR.responseText);
    else alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
  }
});
