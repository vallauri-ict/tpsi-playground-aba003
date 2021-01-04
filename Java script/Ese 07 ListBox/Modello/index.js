"use strict"

let _lstVoci;

window.onload=function(){
	_lstVoci=document.getElementById("lstVoci");
	_lstVoci.selectedIndex=-1;
}

function visualizza(){
	// value della voce selezionata
	let value=_lstVoci.value;
	//window.location.href=value;
	// per default _blanck, apre in una nuova scheda
	window.open(value); 
}

function generaNumero(min,max){
	let n=Math.floor((max-min+1)*Math.random()+min);
	return n;
}