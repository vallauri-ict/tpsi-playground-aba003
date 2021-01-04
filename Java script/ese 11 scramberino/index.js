let _divShow;
let _txtOra;
let _txtDopo;
let _btnScram;
let _btnDiscram;
let i;
let n=65;
let ora="";
let dopo="";
let rnd;
let _divShow1;
window.onload=function(){
	_divShow=this.document.getElementById("divShow");
	_txtOra=this.document.getElementById("txtOra");
	_txtDopo=this.document.getElementById("txtDopo");
	_btnScram=this.document.getElementById("btnScram");
	_btnDiscram=this.document.getElementById("btnDiscram");
	_divShow1=this.document.getElementById("divShow1");
	_btnDiscram.disabled=false;
	_btnScram.disabled=false;
for (let i = 0; i < 2; i++) {
	for (let j = 0; j < 24; j++) {
		if(!i){
			ora+=this.String.fromCharCode(n);
			n++;
			_divShow.innerHTML+=ora[j]+" ";
		}else
		{
			
			do {
				rnd=this.generaNumero(0,ora.length-1)
			} while (dopo.includes(ora[rnd]))
			dopo+=ora[rnd];
			_divShow1.innerHTML+=dopo[j]+" ";
		}
	}
}
	this.console-console.log((ora));
	this.console-console.log((dopo));
}
function scram(){
	_txtDopo.value='';
	let vuoto=true;

	this.console-console.log((_txtOra.value.length));
	for (let i = 0; i < _txtOra.value.length; i++) {
		vuoto=true;
		for (let j = 0; j < ora.length; j++) {

				if (_txtOra.value[i]==' ') 
				{
					while(vuoto){
						_txtDopo.value+=' ';
						vuoto=false;
					}
				}else if(_txtOra.value[i].toUpperCase()==ora.charAt(j))
				_txtDopo.value+=dopo.charAt(j);
		}
		
	}
	
}
function discram(){
	_txtDopo.value='';
	let vuoto=true;
	
	for (let i = 0; i < _txtOra.value.length; i++) {
		vuoto=true;
		for (let j = 0; j < ora.length; j++) {
			if (_txtOra.value[i]==' ') {
				while(vuoto){
					_txtDopo.value+=' ';
					vuoto=false;
				}
				
			}else if(_txtOra.value[i].toUpperCase()==dopo.charAt(j))
			_txtDopo.value+=ora.charAt(j);
		}
		
	}
}


function generaNumero(min,max){
	let n=Math.floor((max-min+1)*Math.random()+min);
	return n;
}