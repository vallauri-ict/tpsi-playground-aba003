"use strict"
function eseguiSomma(){
	/*_txtN1 ora contiene il puntatore all'elemento txtN1*/
	let _txtN1=document.getElementById("txtN1");
	let _txtN2=document.getElementById("txtN2");
	let _txtRis=document.getElementById("txtRisultato");
	
	/*.value è una proprietà che consente di leggere e scrivere 
	il contenuto di un tag input che viene restituito sempre come
	stringa*/
	let n1=parseInt(_txtN1.value);
	console.log(n1);
	
	let n2=parseInt(_txtN2.value);
	console.log(n2);
	
	let ris=n1+n2;
	_txtRis.value=ris;
}