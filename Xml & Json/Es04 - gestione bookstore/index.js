"use strict";
window.onload = function () {
  let json = this.localStorage.getItem("bookstore_json");
  this.console.log(json);
  let jsonVet = this.JSON.parse(json);
  let _table = this.document.createElement("table");
  let _bodies = this.document.getElementsByTagName("body");
  let _body = _bodies[0];
  //appendo la table al body
  _body.appendChild(_table);

  //creazione dell' intestazione
  creaIntestazioni();

  //lettura e caricamento dati
  caricaDati();

  //creazione dei dettagli
  let _divDettagli = this.document.createElement("div");
  _body.appendChild(_divDettagli);
  _divDettagli.setAttribute("class", "dettagli");

  let indiceLibroCorrente = 0;
  visualizzaDettagli();
  creaPulsanti();


  function creaIntestazioni() {
    let _tr = document.createElement("tr");
    _table.appendChild(_tr);
    let intestazioni = ["title", "authors", "category", "price",""];
    for (let i = 0; i < intestazioni.length; i++) {
      let _th = document.createElement("th");
      _th.innerHTML = intestazioni[i];
      _tr.appendChild(_th);
    }
  }

  function caricaDati() {
    for (let i=0;i<jsonVet.length;i++) {
      let item=jsonVet[i];
      let _tr = document.createElement("tr");
      _table.appendChild(_tr);
      let _td;

      _td = document.createElement("td");
      _td.innerHTML = item.title;
      _tr.appendChild(_td);

      _td = document.createElement("td");
      //authors è un vettore enumerativo
      //il metodo join restituisce una stringa contenete tutte le
      // voci del vettore separate da una virgola funziona SOLO coi vettori enumerativi non associativi
      //_td.innerHTML=item.authors.join(",");
      //serializzazzione viene fatta in automatico nel caso dei vettori enumerativi
      _td.innerHTML = item.authors;
      _tr.appendChild(_td);

      _td = document.createElement("td");
      _td.innerHTML = item.category;
      _tr.appendChild(_td);

      _td = document.createElement("td");
      _td.innerHTML = item.price;
      _tr.appendChild(_td);

      //creazione pulsante elimina
      _td = document.createElement("td");
      let _button=document.createElement("button");
      _button.innerHTML = "elimina";
      _td.appendChild(_button)
      _tr.appendChild(_td);
      _button.addEventListener("click", eliminaRecord);
      _button.recordDaEliminare=i;
    }
  }
  function eliminaRecord () {
    let pos=this.recordDaEliminare;
    jsonVet.splice(pos,1);
    localStorage.setItem("bookstore_json",JSON.stringify(jsonVet));
    window.location.reload();
    
  }

  function visualizzaDettagli() {
    _divDettagli.innerHTML = "";
    let libroCorrente = jsonVet[indiceLibroCorrente];
    for (const key in libroCorrente) {
      //creo l intestazione e la appendo
      let _p1 = document.createElement("p");
      _p1.innerHTML = key + ": ";
      _p1.style.textAlign = "right";
      _p1.style.fontWeight = "bold";
      _divDettagli.appendChild(_p1);

      //creo il contenuto e lo appendo
      let _p2 = document.createElement("p");
      _p2.innerHTML = libroCorrente[key];
      _divDettagli.appendChild(_p2);
    }
  }

  function creaPulsanti() {
    let _divPulsantiNavigazione = document.createElement("div");
    _divPulsantiNavigazione.setAttribute("class", "contenitorePulsantiNavigazione");
    _body.appendChild(_divPulsantiNavigazione);
    let nomiPulsanti = ["primo", "indietro", "avanti", "ultimo", "aggiungi", "elimina per categoria"];
    for (const item of nomiPulsanti) {
      let _button = document.createElement("button");
      //assegno come id il nome stesso del pulsante in modo che -
      // sia accessibile alle altre procedure
      _button.id = item;
      _button.setAttribute("class", "pulsantiNavigazione");
      _button.addEventListener("click", gestionePulsanti);
      _button.innerHTML = item;
      _divPulsantiNavigazione.appendChild(_button);

    }
    document.getElementById("indietro").disabled = true;
  }

  function gestionePulsanti() {
    let _indietro = document.getElementById("indietro");
    let _avanti = document.getElementById("avanti");
    switch (this.innerHTML) {
      case "primo":
        indiceLibroCorrente = 0;
        _indietro.disabled = true;
        _avanti.disabled = false;
        break;
      case "indietro":
        indiceLibroCorrente--;
        if (indiceLibroCorrente == 0) {
          _indietro.disabled = true;
        }
        _avanti.disabled = false;
        break;
      case "avanti":
        indiceLibroCorrente++;
        if (indiceLibroCorrente == jsonVet.length - 1) {
          _avanti.disabled = true;
        }
        _indietro.disabled = false;
        break;
      case "ultimo":
        indiceLibroCorrente = jsonVet.length - 1;
        _avanti.disabled = true;
        _indietro.disabled = false;
        break;
      case "aggiungi":
        //window.location.href="pagina2.html";
        window.open("pagina2.html");
        break;
      case "elimina per categoria":
        let categoria=prompt("inserisci la categoria da cancellare:");
        //console.log(_categoria);
        let qta=0;
        for (let i = jsonVet.length-1; i >=0; i--) {
          if (jsonVet[i].category == categoria) {
            jsonVet.splice(i,1);
            qta++;
          }
        }
        if (qta>0) {
          alert("Cancellati: "+qta+" record");
          localStorage.setItem("bookstore_json",JSON.stringify(jsonVet));
          window.location.reload();
        }else{
          alert("Nessun record trovato");
        }

        break;
      default:
        break;
    }
    visualizzaDettagli();
  }
};
