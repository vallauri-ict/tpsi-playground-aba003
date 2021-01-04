"use strict"

let colori=['Argento','Oro','Nero','Marrone','Rosso','Arancio',
			'Giallo','Verde','Blu','Viola','Grigio','Bianco'];
let coloreTolleranza=['Argento','Oro','Marrone','Rosso',
					  'Verde','Blu','Viola'];
let valoreTolleranza=['10','5','1','2','0.5','0.25','0.1'];
			
let _lstCifra1;
let _lstCifra2;
let _lstFattore;
let _lstTolleranza;
let _divRisultato;

window.onload=function(){
	_lstCifra1=document.getElementById("lstCifra1");
	_lstCifra2=document.getElementById("lstCifra2");
	_lstFattore=document.getElementById("lstFattoreMoltiplicativo");
	_lstTolleranza=document.getElementById("lstTolleranza");
	_divRisultato=document.getElementById("risultato");
	
	for(let i=2;i<colori.length;i++)
	{
		_lstCifra1.innerHTML+="<option value='"+(i-2)+"'>"+colori[i]+"</option>";
		_lstCifra2.innerHTML+="<option value='"+(i-2)+"'>"+colori[i]+"</option>";
		_lstFattore.innerHTML+="<option value='"+(i-4)+"'>"+colori[i-2]+"</option>";
	}
	for(let i=0;i<coloreTolleranza.length;i++)
	{
		_lstTolleranza.innerHTML+="<option value='"+valoreTolleranza[i]+"'>"+coloreTolleranza[i]+"</option>";
	}
	
	// selectedIndex va settato dopo aver caricato i dati 
	_lstCifra1.selectedIndex=-1;
	_lstCifra2.selectedIndex=-1;
	_lstFattore.selectedIndex=-1;
	_lstTolleranza.selectedIndex=-1;
}

function calcola(){
	// value è una stringa
	let valoreResistenza=_lstCifra1.value+_lstCifra2.value;
	let fattoreMoltiplicativo=Math.pow(10,parseInt(_lstFattore.value));
	
	valoreResistenza=parseInt(valoreResistenza)*fattoreMoltiplicativo;
	
	_divRisultato.innerHTML="Il valore della resistenza è "+valoreResistenza+" &plusmn;"+_lstTolleranza.value+"%"; 
}

function generaNumero(min,max){
	let n=Math.floor((max-min+1)*Math.random()+min);
	return n;
}