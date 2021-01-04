"use strict";

let intestazioni = ["idMeal", "strMeal", "img", "", ""];
let larghezze = ["50px", "310px", "60px", "40px", "40px"];

window.onload = function () {
  let _radioWrapper = document.getElementById("radioWrapper");
  let _table = document.getElementById("table");
  let Selezionato="Breakfast";
  caricaRadio();
  caricaTabella();
fumolamerda()
function fumolamerda(){
  let _json=details.meals;
  console.log(_json);
  for (const item of _json) {
    for (const iterator of item.meals) {
      console.log(iterator.idMeal);
    }
    
  }
 
}
  /******************************************* */

  function caricaRadio() {
    for (const item in categoryList) {
      let radiobox = document.createElement("input");
      radiobox.type = "radio";
      //radiobox.setAttribute("category", item);
      radiobox.name = "category";
      radiobox.value = item;
      radiobox.addEventListener("click",caricaDati);
      if (radiobox.value == "Breakfast") {
        radiobox.checked = true;
      }
      let _span = document.createElement("span");
      let _br = document.createElement("br");
      _span.innerHTML = item;
      //console.log(_span);

      _radioWrapper.appendChild(radiobox);
      _radioWrapper.appendChild(_span);
      _radioWrapper.appendChild(_br);
    }
  }

  function caricaDati(){
    Selezionato = this.value;
    caricaTabella();
  }

  function caricaTabella() {
    _table.innerHTML="";
    caricaIntestazione();
    
    for (const item of categoryList[Selezionato]) {

        let _tr=document.createElement("tr");

        //creo id
        let _td=document.createElement("td");
        _td.innerHTML=item.idMeal
        _tr.appendChild(_td);

        //creo il nome del piatto
         _td=document.createElement("td");
         _tr.appendChild(_td);
        _td.innerHTML=item.strMeal;

         //creo iimg
         _td=document.createElement("td");
         let _img=document.createElement("img");
         _img.src=item.strMealThumb;
         _img.style.width="55px";
         _td.appendChild(_img);
         _tr.appendChild(_td);

         //creo img per il visualizza dettagli;
         _td=document.createElement("td");
          _img=document.createElement("img");
         _img.src="img/lente.jpg";
         _img.style.width="30px";
         _td.appendChild(_img);
         _tr.appendChild(_td);

         //creo img per elimina
         _td=document.createElement("td");
         _img=document.createElement("img");
         _img.src="img/delete.png";
         _img.style.width="30px";
         _td.appendChild(_img);
         _tr.appendChild(_td);
         

         //appendo l intera riga alla tabella
         _table.appendChild(_tr);
     
    }

  }

  function caricaIntestazione() {
    let _tr = document.createElement("tr");
    _table.appendChild(_tr);
    for (let i = 0; i < 5; i++) {
      let _th = document.createElement("th");
      _th.innerHTML = intestazioni[i];
      _th.style.width = larghezze[i];
      _tr.appendChild(_th);
    }
  }
};
