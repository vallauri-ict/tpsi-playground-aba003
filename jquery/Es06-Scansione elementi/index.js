"use strict";
let _wrapper;
$(document).ready(function () {
  _wrapper = $("#wrapper");
  $("#btn1").on("click", function () {
    alert($("#wrapper").children().length);
  });

  $("#btn2").on("click", function () {
    //soluzione 1 eq vado aprendere la collezione di tutti gli elementi
    let list = $("#wrapper").children(); //list collezione jquery lunga 9
    let msg = "";
    for (let i = 0; i < list.length; i++) {
      // msg+=list[i].innerHTML+" ";
      //msg += $(list[i]).html()+" ";
      // msg+=list.eq(i).html();
    }
    for (const item of list) {
      // msg+=$(item).html();            //item è un js e devo traformarlo i jquery
    }
    list.each(function (i, ref) {
      //msg+=$(ref).html(); //$(ref) mi restituisce uno per uno tutti gli emlementi della collezzione
      //msg+=list.eq(i).html();
      //msg += $(this).html(); //this l elemento corrente
    });
    for (let i = 0; i < list.length; i++) {
      msg+=list.eq(i).html();
      
    }
    alert(msg);
  });
  $("#btn3").on("click", function () {
    //$("#wrapper li:nth-of-type(even)").css({"backgroundColor":"yellow"})
    let aus=$("#wrapper").children(":nth-of-type(odd)");
    //aus.filter(":last").css({"backgroundColor":"blue"})
    aus.each(function(i,ref){
        $(ref).css({"backgroundColor":"blue"})
    })

    //$("#wrapper").children().filter(":nth-of-type(even)").css({"backgroundColor":"yellow"})
});
$("#btn4").on("click", function () {
    let pari=$("#wrapper").children(":nth-of-type(even)");
    pari.each(function (i,ref) {
        let colore=50*(i+1); //uso la posizione di iper incrementare 50 di 50 ogni volta
        $(ref).css({"backgroundColor":`rgb(0,${colore},0)`}) // virgolette significa che uso variabile dentro stringa

    })
  });
  

});
function evidenzia(selector) {
  _wrapper.children().css("backgroundColor", "");
  _wrapper.children(selector).css("backgroundColor", "yellow");
}
