"use strict"
const DIM= 26;
let mat=[];

let _divVet1
let _divVet2
let _txt1
let _txt2
let pos
window.onload=function(){
	_divVet1=document.getElementById("divVet1");
	_divVet2=document.getElementById("divVet2");
	_txt1=document.getElementById("txt1");
	_txt2=document.getElementById("txt2");
	mat[0]=new Array();
	mat[1]=new Array();
	for(let i=0;i<DIM;i++)
	{
		let c=String.fromCharCode(i+65);
		mat[0][i]=c;
		//seconda riga della matrice
		do {
			 pos=this.generaNumero(0,DIM-1);
		} while (mat[1][pos]!=this.undefined);
		mat[1][pos]=c;
	}
	for (let i = 0; i < 26; i++) {
		_divVet1.innerHTML+=mat[0][i]+"&nbsp;&nbsp";
		_divVet2.innerHTML+=mat[1][i]+"&nbsp;&nbsp";
		
	}
}
function scram(){
	for (let i = 0; i < _txt1.value.length; i++) {
		let c1=_txt1.value[i];
		let pos=mat[0].indexOf(c1);
		let c2=mat[1][pos];
		_txt2.value[i]+=c2;
	}
}



function generaNumero(min,max){
	let n=Math.floor((max-min+1)*Math.random()+min);
	return n;
}