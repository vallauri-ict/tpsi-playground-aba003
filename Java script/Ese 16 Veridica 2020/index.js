let vet1=["arco",  "binari", "roulette", "palla", "disco", "luci",  "pop corn",  "moto", "sci", "aperitivo"]; 
let vet2= ["freccia", "treno", "fiches", "canestro", "stereo", "discoteca", "cinema", "casco", "pista", "bar"]; 
let _img;
let _imgRisposta;
let n;
let _txt;
let _optRisposta;
let _txtRisposta;
let _txxCorrette;
let _txtErrate;
let punti1=0;
let punti2=0;
window.onload = function(){
    _img=this.document.getElementById("img");
    _imgRisposta=this.document.getElementsByClassName("imgRisposta");
    _optRisposta=this.document.getElementsByName("optRisposta");
    _txtRisposta=this.document.getElementsByClassName("txtRisposta");
    _txtCorrette=this.document.getElementById("txtCorrette");
    _txtErrate=this.document.getElementById("txtErrate");
    _txt=this.document.getElementById("txt");
    n=this.generaNumero(0,vet1.length-1);
    _img.src="img/img"+[n+1]+" "+vet1[n]+".jpg";
    _txt.value=vet1[n];
   for(let i=0;i<_imgRisposta.length;i++){
       _imgRisposta[i].src="img/img"+[i+1]+" "+vet2[i]+".jpg";
       
    } 
    
}           
       
function controlla(){
    
    let select=false;
    for(let i=0;i<_optRisposta.length;i++)
    {
        if (_optRisposta[i].checked==true) {
            select=true;
        }
    }
    if (!select) {
        setTimeout(() => {
            alert("nessuno opt è stato selezionato");
        }, 300); 
    }
    select=false
    for(let i=0;i<_optRisposta.length||select==true;i++){
        if ((_txtRisposta[i].value==vet2[n])&&(n==i)) {
            alert("SASSO")
            _optRisposta[i].checked=false;
            _txtRisposta[i].disabled=true;
            punti1++;
           _txtCorrette.innerHTML= "risposte errate: "+punti1;; 
           n=this.generaNumero(0,vet1.length-1);
           _img.src="img/img"+[n+1]+" "+vet1[n]+".jpg";
           _txt.value=vet1[n];
           select=true;
        }else{
            punti2++;
            _txtErrate.innerHTML="risposte errate: "+punti2;
            select=true; 
        }
    }
}


function generaNumero(min,max){
    // formula per generare numeri tra min e max, estremi inclusi
    // math.floor tronca il numero con la virgola all'intero più basso (approssimo per difetto)
    let n = Math.floor((max-min+1)*Math.random())+min  
    return n;
}
