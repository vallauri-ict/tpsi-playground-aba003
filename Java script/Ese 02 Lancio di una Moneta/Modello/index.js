"use strict"

let cntTesta=0;
let cntCroce=0;
let _txtLanci,_lblCroce,_lblTesta;

function init(){
	/*Underscore x i puntatori*/		  
	_txtLanci=document.getElementById("txtLanci");
	_lblTesta=document.getElementById("lblTesta");
	_lblCroce=document.getElementById("lblCroce");
}

function lanciaMoneta(){
	let nLanci=parseInt(_txtLanci.value);
	/*Messaggio del contenuto, in questo caso di nLanci*/
	alert(nLanci);
	for(let i=0;i<nLanci;i++)
	{
		let n=generaNumero(0,1);
	}
}

function generaNumero(min,max){
	let n=Math.floor((max-min+1)*Math.random()+min);
	return n;
}






