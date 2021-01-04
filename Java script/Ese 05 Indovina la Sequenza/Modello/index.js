"use strict"

let _inputs=[];
let _checkboxes=[];

function init(){
	_inputs=document.getElementsByClassName("number");
	_checkboxes=document.getElementsByClassName("checkbox");
	for(let i=0;i<5;i++)
	{
		_checkboxes[i].enabled=false;
	}

}

function controllaNumeri(){
	// al click di Gioca disattiva il checked ai checkbox
	for(let i=0;i<5;i++)
	{
		_checkboxes[i].checked=false;
	}


	// label risultato inizializzata con una stringa alla quale verrà unita un'altra stringa con il risultato
	let risultato=document.getElementById("risultato");
	risultato.innerHTML="Risultato: ";

	// inizializza il vettore ausiliario inserendogli i numeri da rimuovere in seguito
	let aus=new Array(1,2,3,4,5); 
	// indice per fare in modo di generare un numero casuale che vada da 1 fino alla lunghezza del vettore aus che ridimensioniamo man mano
	let ausLenght=5; 

	// inizializzazione del vettore casuale, inserendogli numeri casuali estratti dal vettore aus
	let cas=new Array(0,0,0,0,0);
	for(let i=0;i<5;i++)
	{
		let n=generaNumero(1,ausLenght);
		cas[i]=aus[n-1]; // n-1 perchè i vettori partono da 0!
		aus.splice(n-1,1); 
		ausLenght--;
	}

	let nInput=new Array(0,0,0,0,0);
	for(let i=0;i<5;i++)
	{
		nInput[i]=parseInt(_inputs[i].value);
	}

	let cont=0;
	for(let i=0;i<5;i++)
	{
		if(nInput[i]==cas[i])
		{
			_checkboxes[i].checked=true;
			cont++;
		}
	}
	
	risultato.innerHTML+=cont;
}



function generaNumero(min,max){
	let n=Math.floor((max-min+1)*Math.random()+min); 
	return n;
}