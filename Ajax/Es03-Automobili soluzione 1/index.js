"use strict";

const URL = "http://localhost:3000";
let intestazione = [
  {
    tag: "th",
    text: "nome",
    width: "15%",
  },
  {
    tag: "th",
    text: "alimentazione",
    width: "15%",
  },
  {
    tag: "th",
    text: "colore",
    width: "15%",
  },
  {
    tag: "th",
    text: "anno",
    width: "10%",
  },
  {
    tag: "th",
    text: "img",
    width: "20%",
  },
  {
    tag: "th",
    text: "dettagli",
    width: "13%",
  },
  {
    tag: "th",
    text: "elimina",
    width: "12%",
  },
];

$(document).ready(function () {
  let _lstMarche = $("#lstMarche");
  let _lstModelli = $("#lstModelli");
  let _table = $("table");
  let _dettagli = $(".row").eq(2).children("div").eq(1);

  _dettagli.hide();
  let request = inviaRichiesta("get", URL + "/marche");
  request.fail(errore);
  request.done(function (marche) {
    for (const marca of marche) {
      let option = $("<option>");
      option.appendTo(_lstMarche);
      option.val(marca.id);
      option.text(marca.nome);
    }
    _lstMarche.prop("selectedIndex", -1);
  });

  _lstMarche.on("change", function () {
    _lstModelli.html("");
    let codMarca = _lstMarche.val();
    let request = inviaRichiesta("get", URL + "/modelli?codMarca=" + codMarca);
    request.fail(errore);
    request.done(function (modelli) {
      for (const modello of modelli) {
        let option = $("<option>");
        option.appendTo(_lstModelli);
        option.val(modello.id);
        option.text(modello.nome + " - " + modello.alimentazione);
        option.prop("modello", modello); //salvo dentro ogni opzione tutte le infromazioni relative al modello
      }
      _lstModelli.prop("selectedIndex", -1);
    });
  });

  _lstModelli.on("change", function () {
    _table.empty();
    let opzioneSelezionata = _lstModelli
      .children("option")
      .eq(_lstModelli.prop("selectedIndex"));
    /*_lstModelli.prop("nome", opzioneSelezionata.split(" - ")[0]);
    _lstModelli.prop("alimentazione", opzioneSelezionata.split(" - ")[1]);*/
    _lstModelli.prop("modello", opzioneSelezionata.prop("modello")); //salvo dentro il listbox le informazioni relative al modello selezionato

    let codModello = _lstModelli.val();
    let request = inviaRichiesta(
      "get",
      URL + "/automobili?codModello=" + codModello
    ); //contiene solo le automobili di quel modello
    request.fail(errore);
    request.done(function (automobili) {
      // riga di intestazione
      let thead = $("<thead>"); //piedi
      thead.appendTo(_table);
      let tr = $("<tr>");
      tr.appendTo(thead);
      for (let i = 0; i < intestazione.length; i++) {
        let th = $(`<${intestazione[i].tag}>`);
        th.appendTo(tr);
        th.text(intestazione[i].text);
        th.css({ width: intestazione[i].width });
      }

      // inserimento delle automobili
      let tbody = $("<tbody>");
      tbody.appendTo(_table);
      for (const auto of automobili) {
        let tr = $("<tr>");
        tr.appendTo(tbody);

        // creazione celle
        let td = $("<td>");
        td.appendTo(tr);
        td.text(_lstModelli.prop("modello").nome);

        td = $("<td>");
        td.appendTo(tr);
        td.text(_lstModelli.prop("modello").alimentazione);

        td = $("<td>");
        td.appendTo(tr);
        td.text(auto["colore"]);

        td = $("<td>");
        td.appendTo(tr);
        td.text(auto.anno);

        td = $("<td>");
        td.appendTo(tr);
        let img = $("<img>");
        img.css({ height: "65px" });
        img.appendTo(td);
        img.prop({ src: `img/${auto.img}` });

        td = $("<td>");
        td.appendTo(tr);
        let btn = $("<button>");
        btn.addClass("btn btn-xs btn-success");
        btn.appendTo(td);
        btn.text("dettagli");

        btn.on("click", dettagliClick);
        btn.prop("automobile", auto);

        td = $("<td>");
        td.appendTo(tr);
        btn = $("<button>");
        btn.addClass("btn btn-xs btn-secondary");
        btn.appendTo(td);
        btn.text("elimina");
        btn.prop("id", auto.id);
        btn.on("click", eliminaClick);
      }
    });
  });
  function dettagliClick() {
    _dettagli.show();
    $("#txtId").val($(this).prop("automobile").id);
    $("#txtNome").val(_lstModelli.prop("modello").nome);
    $("#txtAlimentazione").val(_lstModelli.prop("modello").alimentazione);
    $("#txtCilindrata").val(_lstModelli.prop("modello").cilindrata);
    $("#txtTarga").val($(this).prop("automobile").targa);
    $("#txtColore").val($(this).prop("automobile").colore);
    $("#txtAnno").val($(this).prop("automobile").anno);
    $("#txtKm").val($(this).prop("automobile").km);
    $("#txtPrezzo").val($(this).prop("automobile").prezzo);
  }

  let _salva = $("#btnSalva");
  _salva.on("click", function name(params) {
    let url = URL + "/automobili/" + $("#txtId").val();
    let request = inviaRichiesta("patch", url, { prezzo: $("#txtPrezzo").val(),});
     
    

    request.fail(errore);
    request.done(function name(params) {
      alert("Record aggiornato con successo");
      _lstModelli.trigger("change"); //vado a forzare l' evento change
    });
  });
  function eliminaClick() {
    let url = URL + "/automobili/" + $(this).prop("id");
    let request = inviaRichiesta("delete", url);
    request.fail(errore);
    request.done(function name(params) {
      alert("Eliminazione eseguita con successo");
      _lstModelli.trigger("change"); //vado a forzare l' evento change
    });
  }
});
