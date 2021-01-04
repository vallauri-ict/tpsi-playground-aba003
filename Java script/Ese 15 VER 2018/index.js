"use strict"
let _voci;
let value;
let vet=[];
let n;
let _txtNum;
let _txtAscii;
let _btnControlla;
let _chkRis;
window.onload=function(){
	_voci=this.document.getElementById("voci");
	_txtNum=this.document.getElementsByName("txtNum");
	_btnControlla=this.document.getElementById("btnControlla");
	_txtAscii=this.document.getElementsByName("txtAscii");
	_chkRis=this.document.getElementsByName("chkRis");


	_voci.selectedIndex=-1;
	_btnControlla.disabled=true;
	
	
}
function  genera(){
	value=_voci.value;
	for(let i=0;i<_txtNum.length;i++){
		_txtAscii[i].value='';
		_chkRis[i].checked=false;
	}
	if (value=="65-90") {
		for(let i=0;i<_txtNum.length;i++){
			do {
				n=generaNumero(65,90);
			} while (vet.includes(n));
			vet[i]=n;
			_txtNum[i].value=vet[i];
			
		}	
	}else if(value=="97-122"){
		for(let i=0;i<_txtNum.length;i++){
			do {
				n=generaNumero(97,122);
			} while (vet.includes(n));
			vet[i]=n;
			_txtNum[i].value=vet[i];
		}
		
	}else if (value=="48-57") {
		for(let i=0;i<_txtNum.length;i++){
			do {
				n=generaNumero(48,57);
			} while (vet.includes(n));
			vet[i]=n;
			_txtNum[i].value=vet[i];
			
		}
		
	} 
		
		
	
}
function check(){
	let tutti=true;
	for(let i=0;i<_chkRis.length;i++){
		if (_txtAscii[i].value=='') {
			tutti=false;
		}
	}
	if (tutti==false) {
		alert("non tutti i campi sono stati compilati");
	}else{
		_btnControlla.disabled=false;
	}
}
function controllaN(){
	let cont=0;
	for(let i=0;i<_chkRis.length;i++){
		if (_txtAscii[i].value==String.fromCharCode(_txtNum[i].value) ) {
			_chkRis[i].checked=true;
			cont++;
		}
	}
	if (!cont) {
		alert("sei una sega");
	}else if (cont==6) {
		alert("sei fortissimo foco");
	}
}



function generaNumero(min,max){
	let n=Math.floor((max-min+1)*Math.random()+min);
	return n;
}