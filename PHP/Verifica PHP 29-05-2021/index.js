"use strict";
const key = "AIzaSyBZKYgxbiyRE7DknUpnRP2QHCBVjvLgH7g";

$(document).ready(function () {
  let _tbody = $("#tbody");
  let text = $("#txtRicerca");
  let buttonCerca = $("#ricerca");
  let _divDettagli = $("#divDettagli");

  _divDettagli.hide();
  let request = inviaRichiesta("get", "server/elencoTitoli.php");
  request.fail(errore);
  request.done(function (titoli) {
    console.log(titoli);
    creaTabella(titoli);
  });

  buttonCerca.on("click", function () {
    console.log(text.val());
    let param = { ricerca: text.val() };
    let request = inviaRichiesta("get", "server/ricerca.php", param);
    request.fail(errore);
    request.done(function (ricercati) {
      console.log(ricercati);
      creaTabella(ricercati);
    });
  });

  function creaTabella(dati) {
    _tbody.empty();

    for (const titolo of dati) {
      let tr = $("<tr>");
      tr.appendTo(_tbody);

      let td = $("<td>");
      td.appendTo(tr);
      td.text(titolo.id);

      td = $("<td>");
      td.appendTo(tr);
      td.text(titolo.titolo);

      td = $("<td>");
      td.appendTo(tr);
      td.text(titolo.ultimoContratto);

      td = $("<td>");
      td.appendTo(tr);
      td.text(titolo.volumi);

      td = $("<td>");
      td.appendTo(tr);
      let img = $("<img>");
      img.appendTo(td);
      img.prop("src", "lente.jpg");
      img.width("25px");
      img.prop("codDettagli", titolo.codDettagli);
      img.on("click", function visualizzaMappa(params) {
        _divDettagli.show();

        let param = {
          codDettagli: $(this).prop("codDettagli"),
        };
        let request = inviaRichiesta("get", "server/visualizza.php", param);
        request.fail(errore);
        request.done(function (data) {
          console.log(data);
          for (const iterator of data) {
            let h2 = $("<h2>");
            h2.appendTo(_divDettagli.children().eq(0));
            h2.text(iterator.nomeAzienda);
            h2.css("text-align", "center");

            let p = $("<p>");
            p.appendTo(_divDettagli.children().eq(0));
            p.text(iterator.descrizione);
            p.css("text-align", "center");
            creaMappa(iterator.indirizzo);
          }
        });
      });

      td = $("<td>");
      td.appendTo(tr);
      let text = $("<input>");
      text.appendTo(td);
      text.width("35px");

      let button = $("<button>");
      button.appendTo(td);
      button.text("acquista");
      button.width("45px");
      button.prop("id", titolo.id);
      button.on("click", function acquista() {
        let param = {
          volumi: $(this).prevAll().eq(0).val(),
          id: $(this).prop("id"),
        };
        let request = inviaRichiesta("get", "server/acquista.php", param);
        request.fail(errore);
        request.done(function (data) {
          alert("Acquisto andato a buon fine");
          window.location.reload();
        });
      });
    }
  }

  function creaMappa(indirizzo) {
   

    let address = indirizzo;
        if(address == "")
        {
            alert("Inserire un indirizzo");
        }
        else
        {
            let geocoder = new google.maps.Geocoder();
            geocoder.geocode( {'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK)
                    disegnaMappa(results[0]);
                else
                    alert("Stringa immessa non valida");
            });
        }
        function disegnaMappa(geocoderResult){
            let mapOpt = {
                "center" : geocoderResult.geometry.location,
                "zoom" : 16,
            }
            let mappa = new google.maps.Map(_divDettagli.children().eq(0), mapOpt);
    
            let marcatore = new google.maps.Marker({
                "map": mappa,
                "position": geocoderResult.geometry.location,
                
            });
    
            let infoWindow = new google.maps.InfoWindow({
                "content":
                `<div id="infoWindow">
                    <p>coordinate GPS: ${geocoderResult.geometry.location} </p>
                </div>`,
            });
    
            marcatore.addListener("click", function(){
                infoWindow.open(mappa, marcatore);
            });
        }






  }
});
