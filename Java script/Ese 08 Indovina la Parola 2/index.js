"use strict"

const DIM=10;
let _txt;
let _chk;
let _txtPunti;
let _btnInvia;
let _btnRisposta;
let _txtLettera;
let _txtRisposta;

let vet=['italia','norvegia','lettonia','estonia','polonia','germania','argentina','brasile','messico','australia'];
let parolaSegreta;

window.onload=function(){
	_txt=document.getElementsByClassName("textbox");
	_chk=document.getElementsByClassName("checkbox");
	_txtPunti=document.getElementById("txtPunti");
	_btnInvia=document.getElementById("btnInvia");
	_btnRisposta=document.getElementById("btnRisposta");
	_txtLettera=document.getElementById("txtLettera");
	_txtRisposta=document.getElementById("rispo");
	
	for(let i=0;i<DIM;i++)
	{
		_txt[i].readOnly=true; 
		_chk[i].disabled=true;
	}
	
	_btnInvia.disabled=true;
	_btnRisposta.disabled=true;
}

function avvia(){
	let n=generaNumero(0,vet.length-1);
	parolaSegreta=vet[n].toUpperCase();
	console.log(parolaSegreta, parolaSegreta.length);
	
	_txtPunti.value=100;
	
	for(let i=0;i<DIM;i++)
	{
		if(i<parolaSegreta.length)
		{
			_txt[i].value='*';
		}
		else
		{
			_txt[i].value='';
		}
		_chk[i].checked=false;
	}
	
	_btnInvia.disabled=false;
	_btnRisposta.disabled=false;
}

function invia(){
	let lettera=_txtLettera.value.toUpperCase();
	_txtLettera.value=lettera.toUpperCase();
	
	let punti=parseInt(_txtPunti.value);
	punti-=5;
	_txtPunti.value=punti;
	
	for(let i=0;i<parolaSegreta.length;i++)
	{
		if(parolaSegreta[i]==lettera)
		{
			_txt[i].value=lettera;
			_chk[i].checked=true;
		}
	}
}

function inviaRisposta(){ 
	if (_txtRisposta.value.toUpperCase()==parolaSegreta) {
		_txtRisposta.disabled=true;
		setTimeout(() => {
			alert("BRAVO HAI VINTO!!!");
		}, 500);
	}else{
		setTimeout(() => {
			alert("SBAGLIATA!!!");
		}, 500);
	}
	
}


function generaNumero(min,max){
	let n=Math.floor((max-min+1)*Math.random()+min);
	return n;
}