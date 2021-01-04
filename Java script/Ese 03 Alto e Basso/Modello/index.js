"use strict"

let _txtNumero;
let _btnGioca;
let _divMsg;
let nSegreto;
let cont=0;

function inizializza(){
	_txtNumero=document.getElementById("txtNumero");
	/*Per disabilitare il bottone quando l'utente ha indovinato o esaurito i tentativi*/
	_btnGioca=document.getElementById("btnGioca"); 
	_divMsg=document.getElementById("divMessaggio");
	
	nSegreto=generaNumero(1,100);
}

function gioca(){
	console.log("Numero Segreto = "+nSegreto);
	/* .value per leggere il contenuto di un tag input*/
	/*parseInt converte una stringa in numero*/
	let nUtente=parseInt(_txtNumero.value);
	if(nUtente==nSegreto)
	{
		alert("Bravissimo! Hai vinto.");
		_btnGioca.disabled=true;
	}
	else
	{
		if(nUtente<nSegreto)
		{
			_divMsg.innerHTML+="Il numero "+nUtente+" è troppo piccolo. ";
		}
		else
		{
			_divMsg.innerHTML+="Il numero "+nUtente+" è troppo grande. ";
		}
		cont++;
		/*innerHTML accetta al suo interno qualsiasi tag html*/
		_divMsg.innerHTML+="Tentativi rimanenti: "+(10-cont)+"<br/>";
		if(cont==10)
		{
			alert("Tentativi esauriti!");
			_btnGioca.disabled=true;
		}
	}
}

function generaNumero(min,max){
	let n=Math.floor((max-min+1)*Math.random()+min);
	return n;
}

