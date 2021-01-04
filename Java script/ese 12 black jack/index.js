let nSegreto;
let _txtBanco
let _txtNum;
let _txtUser;
let _chkNum;
let punti=0;
let _btnConfronta;
let vet=[];
window.onload=function(){
    _txtBanco=this.document.getElementById("txtBanco");
    _txtNum=this.document.getElementsByName("txtNum");
    _txtUser=this.document.getElementById("txtUser");
    _chkNum=this.document.getElementsByName("chkNum");
    _btnConfronta=this.document.getElementById("btnConfronta");
    nSegreto=this.generaNumero(16,20);
    _txtBanco.value="*";
    for (let i = 0; i < _txtNum.length; i++) {
        vet[i]=this.generaNumero(1,5);
        _txtNum[i].value='*';
    }
    _txtUser.value=punti;

}
function visualizza(n){
    _chkNum[n].checked=true;
    _txtNum[n].value=vet[n];
    _chkNum[n].disabled=true;
    punti+=vet[n];
    _txtUser.value=punti;
    if (punti>21) {
        alert("hai sballato!!");
        for (let i = 0; i < _chkNum.length; i++) {
            _chkNum[i].disabled=true;
            
        }
        _btnConfronta.disabled=true;
        
    }

}
function confronta(){
    _txtBanco.value=nSegreto;
    if (punti>=nSegreto) {
        alert("hai vinto!!");
    }else
    alert("hai perso!!");

}

function generaNumero(min,max){
	let n=Math.floor((max-min+1)*Math.random()+min);
	return n;
}