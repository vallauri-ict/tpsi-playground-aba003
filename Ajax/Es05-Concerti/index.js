"option strict";

const URL = "http://localhost:3000";

$(document).ready(function () {
  const _lstCitta = $("#lstCitta");
  const _lstGeneri = $("#lstGeneri");
  const _btnFiltro = $("#btnFiltro");
  const _tbody = $("table tbody");
  const _divDettagli = $("#divDettagli");
  let tuttiIGeneri;
  let tutteLecittà;
  let tuttiIConcerti;
  let ultimoURL;

  _divDettagli.hide();

  _lstGeneri.prop("selectedIndex", -1).val("Tutti");

  let url = URL + "/citta";
  let request = inviaRichiesta("get", url);
  request.fail(errore);
  request.done(function (cities) {
    tutteLecittà = cities;
    let opt = $("<option>");
    opt.appendTo(_lstCitta);
    opt.prop("city", 0);
    opt.html("All");
    for (const city of cities) {
      opt = $("<option>");
      opt.appendTo(_lstCitta);
      opt.prop("city", city);
      opt.html(city.citta);
    }
  });

  url = URL + "/generi";
  request = inviaRichiesta("get", url);
  request.fail(errore);
  request.done(function (genders) {
    tuttiIGeneri = genders;
    console.log(tuttiIGeneri);
    let opt = $("<option>");
    opt.appendTo(_lstGeneri);
    opt.prop("gender", 0);
    opt.html("All");
    for (const gender of genders) {
      opt = $("<option>");
      opt.appendTo(_lstGeneri);
      opt.prop("gender", gender);
      opt.html(gender.genere);
    }
  });
  ultimoURL=URL + "/concerti"
  creaTabella(ultimoURL);
  _btnFiltro.on("click", function () {
    let cittaSelezionata = _lstCitta.prop("selectedIndex");
    let genereSelezionato = _lstGeneri.prop("selectedIndex");

    if (cittaSelezionata == 0 && genereSelezionato == 0) {
      ultimoURL=URL + "/concerti"
      creaTabella(ultimoURL);
    } else if (genereSelezionato == 0) {
      ultimoURL=URL + "/concerti?codCitta=" + cittaSelezionata
      creaTabella(ultimoURL);
    } else if (cittaSelezionata == 0) {
      ultimoURL=URL + "/concerti?codGenere=" + genereSelezionato
      creaTabella(ultimoURL);
    } else {
      ultimoURL=  URL + "/concerti?codCitta=" +   cittaSelezionata +  "&codGenere=" +  genereSelezionato
      creaTabella(ultimoURL);
    }
  });

  function creaTabella(urlino) {
    _tbody.empty();
    request = inviaRichiesta("get", urlino);
    request.fail(errore);
    request.done(function (concerts) {
      tuttiIConcerti = concerts;
      for (const concert of concerts) {
        let tr = $("<tr>");
        tr.appendTo(_tbody);

        let td = $("<td>");
        td.appendTo(tr);
        td.text(concert.id);

        td = $("<td>");
        td.appendTo(tr);
        td.text(concert.cantante);

        td = $("<td>");
        td.appendTo(tr);
        td.text(concert.data);

        td = $("<td>");
        td.appendTo(tr);
        td.text(tuttiIGeneri[concert.codGenere - 1].genere);

        td = $("<td>");
        td.appendTo(tr);
        td.text(tutteLecittà[concert.codCitta - 1].citta);

        td = $("<td>");

        td.appendTo(tr);
        td.text(tutteLecittà[concert.codCitta - 1].struttura);

        td = $("<td>");
        td.appendTo(tr);
        td.text(tutteLecittà[concert.codCitta - 1].nPosti);

        td = $("<td>");
        td.appendTo(tr);
        let button = $("<button>");
        button.text("Dettagli");
        button.css("background-color", "blue");
        button.on("click", function () {
          _divDettagli.slideDown(1000);
          $(".form-control").text(concert.dettagli);
        });
        button.appendTo(td);

        td = $("<td>");
        td.appendTo(tr);
        button = $("<button>");
        button.text("Prenota");
        button.css("background-color", "green");
        button.prop("prenotazione", concert.codCitta); //parseInt(tutteLecittà[concert.codCitta - 1])
        button.on("click", function () {
          url = URL + "/citta/" + $(this).prop("prenotazione"); 
          request = inviaRichiesta("Patch", url, {"nPosti":(tutteLecittà[$(this).prop("prenotazione")].nPosti)-1 });
          console.log((tutteLecittà[$(this).prop("prenotazione")].nPosti));
          request.done(function () {
            creaTabella(ultimoURL);
          })
          request.fail(errore);
          /*setTimeout(function() { alert("Prenotazione effetuata correttamente"); }, 1000);*/
        });
        button.appendTo(td);
      }
    });
  }
});
