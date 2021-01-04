"use strict"

let _txtDataInizio;
let _txtDataFine;
let _txtPartecipanti;
let _divRisultato;
let _imgSconto;
let dataInizio;
let dataFine;

window.onload = function(){
    _txtDataInizio=document.getElementById("txtDataInizio");
	_txtDataFine=document.getElementById("txtDataFine");
	_txtPartecipanti=document.getElementById("txtNPartecipanti");
	_imgSconto=document.getElementById("imgSconto");
	_divRisultato=document.getElementById("risultato");
}

function calcola(){
	let ok=true;
	if((_txtPartecipanti.value=="")||(_txtPartecipanti.value>9)||(_txtPartecipanti.value<0))
	{
		ok=false;
		alert("Numero partecipanti non valido");
		_txtPartecipanti.focus();
	}
	else if(_txtDataInizio.value=="")
	{
		ok=false;
		alert("Data di inizio non valida");
		_txtDataInizio.focus();
	}	
	else if(_txtDataFine.value=="")
	{
		ok=false;
		alert("Data di fine non valida");
		_txtDataFine.focus();
	}
	else
	{
		dataInizio=new Date(_txtDataInizio.value);
		dataFine=new Date(_txtDataFine.value);
		if(dataFine<=dataInizio)
		{
			ok=false;
			alert("Data fine deve essere maggiore di data inizio");
			_txtDataFine.focus();
		}
	}
	
	if(ok)
	{
		let giorni=Math.floor((dataFine-dataInizio)/(1000*60*60*24));
		console.log(giorni);
		let mese=dataInizio.getMonth()+1;
		alert(mese);
		let sconto=0;
		switch(mese)
		{
			case 6:
				_imgSconto.src="img/sconto10.jpg";
				sconto=10;
				break;
			case 7:
				_imgSconto.src="img/sconto15.jpg";
				sconto=15;
				break;
			case 8:
				_imgSconto.src="img/sconto20.jpg";
				sconto=20;
				break;
		}
	}
}

function generaNumero(min,max){
    // formula per generare numeri tra min e max, estremi inclusi
    // math.floor tronca il numero con la virgola all'intero più basso (approssimo per difetto)
    let n = Math.floor((max-min+1)*Math.random())+min  
    return n;
}

