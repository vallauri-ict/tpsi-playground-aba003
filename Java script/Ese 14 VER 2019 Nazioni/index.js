"use strict"

let _txtNazioni;
let _optNazioni;
let _txtCitta;
let _optCitta;
let _txtRisposte;

window.onload = function(){
    _txtNazioni=document.getElementsByName("txtNazioni");
    _optNazioni=document.getElementsByName("optNazioni");
    _txtCitta=document.getElementsByName("txtCitta");
    _optCitta=document.getElementsByName("optCitta");
	_txtRisposte=document.getElementsByName("txtRisposte");
	
	let nazioni=[];
	
	for(let i=0;i<_txtCitta.length;i++)
	{
		// per accedere ai campi nascosti bisogna usare .getAttribute
		console.log(_txtCitta[i].value+" "+_txtCitta[i].getAttribute("nazione"));
		_txtCitta[i].readOnly=true;
		_txtNazioni[i].readOnly=true;
		_txtRisposte[i].readOnly=true;
		_optCitta[i].disabled=true;
		nazioni[i]=_txtCitta[i].getAttribute("nazione"); // elenco nazioni
	}
	
	for(let i=0;i<_txtNazioni.length;i++)
	{
		let n=generaNumero(0,nazioni.length-1);
		_txtNazioni[i].value=nazioni[n];
		nazioni.splice(n,1);
	}
}

function seleziona(){
	let n
	do
	{
		n=generaNumero(0,_optCitta.length-1);
	}
	while(_txtCitta[n].value=='');
	_optCitta[n].checked=true;	
}

function controlla(){
	let selezionato=0;
	let posCitta,posNazione; 
	for(let i=0;(i<_optNazioni.length)&&(selezionato<2);i++)
	{
		if(_optCitta[i].checked==true)
		{
			selezionato++;
			posCitta=i;
		}
		if(_optNazioni[i].checked==true)
		{
			selezionato++;
			posNazione=i;
		}
	}
	if(selezionato==2)
	{
		if(_txtCitta[posCitta].getAttribute("nazione")==_txtNazioni[posNazione].value)
		{
			_txtRisposte[posNazione].value=_txtCitta[posCitta].value;
			_txtCitta[posCitta].value='';
		}
		else
		{
			alert("Risposta sbagliata");
		}
	}
	else
	{
		alert("Mancano le selezioni");
	}
}

function generaNumero(min,max){
    // formula per generare numeri tra min e max, estremi inclusi
    // math.floor tronca il numero con la virgola all'intero più basso (approssimo per difetto)
    let n = Math.floor((max-min+1)*Math.random())+min  
    return n;
}

