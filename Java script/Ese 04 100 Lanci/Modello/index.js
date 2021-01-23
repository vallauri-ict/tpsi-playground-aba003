"use strict"

let _divs=[];

function inizializza(){
	/*Restituirà un vettore di elementi, in questo caso puntatori*/
	
	_divs=document.getElementsByName("msg");
	console.log(_divs);
}

function gioca(){
	/*Dichiarazione di un vettore, crea le celle automaticamente al momento 
	dell'utilizzo*/
	let cont=[];
	alert("pipi");
	
	/*Prima soluzione di inizializzazione*/
	for(let i=0;i<6;i++)
		cont[i]=0;
	
	/*Seconda soluzione di inizializzazione*/
	/*let cont=new Array(0,0,0,0,0,0);*/

	for(let i=0;i<100;i++)
	{
		let n=generaNumero(1,6);
		cont[n-1]++;
	}
	
	for(let i=0;i<6;i++)
	{
		_divs[i].innerHTML="Il numero "+(i+1)+" è uscito "+cont[i]+" volte";
	}
}



function generaNumero(min,max){
	let n=Math.floor((max-min+1)*Math.random()+min);
	return n;
}