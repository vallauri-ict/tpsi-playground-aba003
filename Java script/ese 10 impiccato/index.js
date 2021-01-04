"use strict";

const nomi =
        ["Italia", "Lavagna", "Pizza", "Lasagne", "Spiedino", "Ananas", "Gnocchi", "Gorgonzola", "Broccoli", "Mango", "Biscotti", 
		 "Giornale", "Carabina", "Affettati", "Lungimirante", "Affaticato", "Effervescente", "Ambulante", "Ambulanza", "Ostetricia"];
const MAX_TENTATIVI=5;

let parolaSegreta;

let _txtParola;
let _txtLettera;
let _img;
let _btn;

let errori;


window.onload = function() 
{
	_txtParola = this.document.getElementById("txtParola");
	_txtLettera = this.document.getElementById("txtLettera");
	_img = this.document.getElementsByTagName("img")[0];
	_btn = this.document.getElementsByTagName("button")[0];

	errori = 0;
	_btn.disabled = true;

	let n = generaNumero(0, nomi.length - 1);
    parolaSegreta = nomi[n];
	console.log(parolaSegreta);
	
	_txtParola.value="";
	
	for (let i=0; i<parolaSegreta.length; i++)
		_txtParola.value+="*"
}

function enableElabora() {
	if (_txtLettera.value != "") {
		_btn.disabled = false;
	} else {
		_btn.disabled = true;
	}
}

function elabora() {
	let aus = "";
	let trovato = false;
	for (let i = 0; i < parolaSegreta.length; i++) {
		const element = parolaSegreta[i];
		if (element.toUpperCase() == _txtLettera.value.toUpperCase()) {
			aus += _txtLettera.value.toUpperCase();
			trovato = true;
		} else {
			aus += _txtParola.value[i].toUpperCase();
		}
	}
	_txtParola.value = aus;

	if (trovato) {
		if (_txtParola.value.toUpperCase() == parolaSegreta.toUpperCase()) {
			_btn.disabled = true;
			setTimeout(() => {
				alert("BRAVO HAI VINTO!!!");
			}, 500);
		}
	} else {
		errori++;
		_img.src = "img/Fig" + errori + ".png";
		if (errori == MAX_TENTATIVI) {
			_btn.disabled = true;
			setTimeout(() => {
				alert("Hai perso! La parola segreta era: " + parolaSegreta);
			}, 500);
		}
	}

	_txtLettera.value = "";
	_btn.disabled = true;
}

function generaNumero(a, b){
	return Math.floor((b-a+1)*Math.random()) + a;
}

function reset() {
	window.location.reload();
}