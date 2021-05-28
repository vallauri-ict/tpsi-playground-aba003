"use strict";

$(function () {
	let _wrapper=$("#wrapper");
	let _divTitolo = $("#divTitolo");
    let _divFiliali = $("#divFiliali");
    let _divMovimenti = $("#divMovimenti");
	_wrapper.hide();
	
	let _btnLogout = $("#btnLogout");
	
	let _richiestaFiliali = inviaRichiesta("get", "server/elencoFiliali.php");
	
	_richiestaFiliali.fail(errore);
	
	_richiestaFiliali.done(function (data) {
		console.log(data)
		_wrapper.show();
		_divMovimenti.hide();
		_divTitolo.append($("<p>").text(data["Nome"]).css("text-align","right"));
		_divFiliali.css("text-align", "center");

		for(let filiale of data["Filiali"]) {
			let opt = $("<input type='radio' name='optFiliali'>");
			opt.appendTo(_divFiliali);
			opt.val(filiale.cFiliale);
			
			let span = $("<span>");
			span.appendTo(_divFiliali);
			span.text(filiale.Nome);
			
			$("<br>").appendTo(_divFiliali);
		}
		
		let btn = $("<button class='btn btn-primary'>");
		btn.appendTo(_divFiliali);
		btn.text("Visualizza movimenti");
		btn.on("click",function(){
			let cFiliale =$("input[type=radio]:checked").val();
			let request=inviaRichiesta("get","server/elencoMovimenti.php",{"cFiliale":cFiliale});
			request.fail(errore);
			request.done(function name(data) {
				console.log(data);
				_divMovimenti.show();
				for (const iterator of data) {
					let tr=$("<tr>");
					tr.appendTo($("#pipi"));
					 
					let td=$("<td>");
					td.appendTo(tr);
					td.text(iterator.cMov);

					 td=$("<td>");
					td.appendTo(tr);
					td.text(iterator.descrizione);

					td=$("<td>");
					td.appendTo(tr);
					td.text(iterator.Data);

					 td=$("<td>");
					td.appendTo(tr);
					td.text(iterator.Importo);

				}
			})
		})
    });
	
	_btnLogout.on("click", function(){
		let request = inviaRichiesta("post", "server/logout.php");
		request.fail(errore);
		request.done(function(){
			alert("Sei stato disconnesso correttamente");
			window.location.href = "login.html";
		});
	});
	
});
