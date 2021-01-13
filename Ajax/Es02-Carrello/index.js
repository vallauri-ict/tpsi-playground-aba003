"use strict";

let elencoArticoli;
$(document).ready(function () {
  let wrapper = $("#elencoArticoli");
  let details = $(".details");

  $.ajax({
    url: "http://localhost:3000/fotocamere",
    timeout: 500,
    success: visualizza,
    error: errore,
  });
  details.hide();

  /********************************************** */
  function visualizza(data) {
    console.log(data);
    elencoArticoli = data; //salvo i dati in una cariabile globale
    let i = 0;
    for (const item of elencoArticoli) {
      let article = $("<div>");
      article.prop("id", `article-${i}`);
      i++;
      article.addClass("article");
      article.appendTo(wrapper);
      let img = $("<img>");
      img.prop("src", "img/" + item["src"] + ".jpg");
      img.appendTo(article);
      img.prop("title", "Aggiungi al carrello");
      img.prop("name", item.nome);
      img.addClass("image");
      let nome = $("<div>");
      nome.addClass("name");
      nome.appendTo(article);
    }
  }

  wrapper.on("mouseover", "img", function () {
    $(this).next().text($(this).prop("name"));
  });

  wrapper.on("mouseout", "img", function () {
    $(this).next().text("");
  });

  wrapper.on("click", "article", function () {
    details.empty();
    details.slidedown(1000);
    let id = $(this).prop("id").split("-")[1]; //splitto l' id

    let div = $("div");
    div.addClass("details-close");
    div.appendTo(details);
    let span = $("<span>");
    span.text("X");
    span.appendTo(div);
    span.on("click", function () {
      details.slideup(1000);
    });

    let divImg = $("<div>");
    divImg.addClass("detail-img");
    divImg.appendTo(details);
    let img = $("<img>");
    img.appendTo(divImg);
    img.prop("src", "img/" + elencoArticoli[id].src + ".jpg");

    let divinfo = $("<div>");
    divinfo.addClass("detail-info");
    divinfo.appendTo(details);
    let h4 = $("<h4>");
    h4.appendTo(divinfo);
    h4.addClass("item-title");
    h4.text(elencoArticoli[id].nome);

    let p = $("<p>");
    p.appendTo(divinfo);
    p.text(elencoArticoli[id].descrizione);
    let prezzo = $("<p>");
    p.appendTo(divinfo);
    p.text(elencoArticoli[id].prezzo);
    let button = $("<button>");
    button.appendTo(divinfo);
    button.addClass("item-add");
    button.html("AGGIUNGI AL CARRELLO");
    button.prop("nome", elencoArticoli[id].nome);
    button.prop("prezzo", elencoArticoli[id].prezzo);
    button.on("click", aggiungi);
  });
  let carrello = false;
  $("#btnCarrello").on("click", function () {
    if (carrello == false) {
      $("#carrello").slidedown(1000);
      $(this).html("&#708 chiusi carrello");
    } else {
      $("#carrello").slideup(1000);
      $(this).html("&#709 apri carrello");
    }
    aperto = !aperto;
  });

  function aggiungi() {
    let table = $("carrello table");
    let nome = $(this).prop(nome);
    let prezzo = $(this).prop(prezzo);

    let trovato = false;
    //controllo se  l'elemento è gia esistente
    table.children("tr").each(function (i, ref) {
      if ($(ref).children("td").eq(0).html() == nome) {
        //punatore jquey alla riga
        let qta = parseInt($(ref).children("td").eq(2).html());
        qta++;
        $(ref).children("td").eq(2).html(qta);
        trovato = true;
        
      }
    });
    if (!trovato) {
      let tr = $("<tr>");
      tr.appendTo(table);

      let tdNome = $("<td>");
      tdNome.appendTo(tr);
      tdNome.html(nome);

      let tdPrezzo = $("<td>");
      tdPrezzo.appendTo(tr);
      tdPrezzo.html(prezzo);

      let tdQuantita = $("<td>");
      tdQuantita.appendTo(tr);
      tdQuantita.html("1");

      let tdImg = $("<td>");
      tdImg.appendTo(tr);
      let img = $("<img>");
      img.prop("src", "img/_cestino.png");
      img.appendTo(tdImg);
      img.on("click", function (params) {
        $(this).parent().parent().remove();
      });
    }
	}
});

/* **************************************************** */

function errore(jqXHR, textStatus, str_error) {
  if (jqXHR.status == 0) alert("connection refused or server timeout");
  else if (jqXHR.status == 200)
    alert("Errore Formattazione dati\n" + jqXHR.responseText);
  else alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
}
