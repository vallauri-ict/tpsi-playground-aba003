"use strict";

$(document).ready(function () {
  let table = $("#table>div");

  let request = inviaRichiesta("get", "servizi/elencoDischi.php");
  request.fail(errore);
  request.done(function (dischi) {
    for (const item of dischi) {
      let txt = $("<input type='text'>");
      txt.val(item.id);
      txt.prop("readonly", true);
      txt.appendTo(table);

      txt = $("<input type='text'>");
      txt.val(item.autore);
      txt.appendTo(table);

      txt = $("<input type='text'>");
      txt.val(item.titolo);
      txt.appendTo(table);

      txt = $("<input type='text'>");
      txt.val(item.anno);
      txt.appendTo(table);

      let button = $("<button class='btn btn-outline-dark'>");
      button.html("Salva");
      button.appendTo(table);
      button.prop("disabled", true);
      button.on("click", salva);
      button.prop("disco", item);

      button = $("<button class='btn btn-outline-dark'>");
      button.html("Annulla");
      button.appendTo(table);
      button.prop("disabled", true);
      button.on("click", annulla);

      button = $("<button class='btn btn-outline-dark'>");
      button.html("Elimina");
      button.appendTo(table);
      button.prop("id", item.id);
      button.on("click", elimina);
    }
  });

  table.on("input", "input[type=text]", function () {
    $(this).nextAll("button").eq(0).prop("disabled", false);
    $(this).nextAll("button").eq(1).prop("disabled", false);
  });

  function salva() {
    let param = {
      id: $(this).prop("disco").id,
      autore: $(this).prevAll("input").eq(2).val(), //uso questo perchè lo prende dopo averlo creati i valori
      titolo: $(this).prevAll("input").eq(1).val(),
      anno: $(this).prevAll("input").eq(0).val(),
    };
    console.log(param);

    let request = inviaRichiesta("post", "servizi/salva.php", param);
    request.fail(errore);
    request.done(function () {
      alert("Dati inseriti correttamente");
      window.location.reload();
    });
  }

  function annulla() {
    alert("Dati salvati coorretamente");
    window.location.reload();
  }

  function elimina() {
    let param = {
      id: $(this).prop("id"),
    };
    let request = inviaRichiesta("post", "servizi/elimina.php", param);
    request.fail(errore);
    request.done(function (data) {
      console.log(data);
      alert("dati eliminati correttamente");
      window.location.reload();
    });
  }
});
