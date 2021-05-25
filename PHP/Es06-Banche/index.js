"use strict";

$(function () {
  let _wFiliali = $("#wrapFiliali");
  let _wCorrentisti = $("#wrapCorrentisti");
  let _lstBanche = $("#lstBanche");
  let _lstFiliali = $("#lstFiliali");
  let _tbody=$("#tbody");

  //_wFiliali.css("display", "none");


  _lstBanche.prop("selectedIndex", -1);
  _lstBanche.on("change", function () {
    _lstFiliali.empty();

    console.log(_lstBanche.val());
    let param = { piedi: _lstBanche.val() }; //mi da il value della voce selezionata
    let request = inviaRichiesta("get", "servizi/elenco_filiali.php", param);
    request.fail(errore);
    request.done(function (filiali) {
      for (const filiale of filiali) {
        let option = $("<option>");
        option.appendTo(_lstFiliali);
        option.val(filiale.cFiliale);
        option.text(filiale.Nome);
      }

      _lstFiliali.prop("selectedIndex", -1);
    });
  });

  _lstFiliali.on("change", function () {
    let param = { cFiliale: _lstFiliali.val() }; //mi da il value della voce selezionata
    let request = inviaRichiesta(
      "get",
      "servizi/elenco_correntisti.php",
      param
    );
    request.fail(errore);
    request.done(function (correntisti) {
		_tbody.empty();
      for (const correntista of correntisti) {
		  console.log(correntisti);
		let tr=$("<tr>");
		tr.appendTo(_tbody);
		let td=$("<td>");
		td.appendTo(tr);
		td.text(correntista.cCorrentista);
		td=$("<td>");
		td.appendTo(tr);
		td.text(correntista.Nome)
		td=$("<td>");
		td.appendTo(tr);
		td.text(correntista.cComune);
		td=$("<td>");
		td.appendTo(tr);
		td.text(correntista.Telefono)
		td=$("<td>");
		td.appendTo(tr);
		td.text(correntista.cConto)
		td=$("<td>");
		td.appendTo(tr);
		td.text(correntista.Saldo);
      }
    });
  });
});
