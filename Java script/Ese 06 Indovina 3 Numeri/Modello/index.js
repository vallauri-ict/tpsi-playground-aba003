"use strict"

let vet=[];
let _txt;
let _chk; // si può accedere al dom solo dopo il caricamento di body
let _btnInvia;

window.onload=function(){
	_txt=document.getElementsByName("txtNumero");
	_chk=document.getElementsByName("chkNumero");
	_btnInvia=document.getElementsByTagName("button")[0];
	for(let i=0;i<3;i++)
	{
		let n;
		do
		{
			n=generaNumero(1,9);
		}
		while(vet.includes(n));
		vet[i]=n;	
		/*_chk[i].disabled=true;
		/*_chk[i].checked=false;*/
	}
	console.log(vet);
}

function controlla(){
	let cont=0;
	
	
	for(let i=0;i<3;i++)
	{
		_chk[i].checked=false;
	}
	
	if(controllaInput()) 
	{
		for(let i=0;i<3;i++)
		{
			if(vet.includes(parseInt(_txt[i].value)))
			{
				_chk[cont].checked=true;
				cont++;
			}
		}
		
		if(cont==3)
		{
			alert("Bravo! Hai vinto");
			_btnInvia.disabled=true;
		}
	}
	else
	{
		alert("Numeri inseriti non validi");
	}
	
	
}

function controllaInput(){
	let trovato=false;
	//CONTROLLA INPUT 1
	/*let i=0,j;
	do
	{
		j=0;
		do
		{
			if(i!=j)
			{
				if(_txt[i].value==_txt[j].value) 
				{
					trovato=true;
				}
			}
			j++;
		}
		while((!trovato)&&(j<3));
		i++;
	}
	while((!trovato)&&(i<3));*/
	
	// CONTROLLO INPUT 2
	for(let i=0;(i<_txt.length)&&(!trovato);i++)
	{
		for(let j=0;(j<i)&&(!trovato);j++)
		{
			if(_txt[i].value==_txt[j].value)
			{
				trovato=true;
			} 
		}
	}
	
	/*let i=0;
	do
	{
		let j=0;
		// ciclo while perchè entra anche se 0
		//do
		//{
		//	if(_txt[i].value==_txt[j].value)
		//	{
		//		trovato=true;
		//	}
		//	j++;
		//}
		//while((j<i)&&(!trovato));
		while((j<i)&&(!trovato))
		{
			if(_txt[i].value==_txt[j].value)
			{
				trovato=true;
			}
			j++;
		}	
		i++;
	}
	while((i<_txt.length)&&(!trovato));*/
	alert(trovato);
	return !trovato;
}



function generaNumero(min,max){
	let n=Math.floor((max-min+1)*Math.random()+min);
	return n;
}