"use strict";

let _form1;

$(document).ready(function () {
  _form1 = $("#form1");
});

function visualizza(codice) {
  let msg = "";
  let _chks;
  let _opts;
  switch (codice) {
    case 1:
      msg = $("#form1").find("input[type=text]:first-of-type").val();
      break;

    case 2:
      msg = $("#form1").children("label").eq(1).children("select").val();
      break;
    case 3:
      _chks = _form1
        .children("fieldset")
        .eq(0)
        .find("input[type=checkbox]");
      for (let i = 0; i < _chks.length; i++) {
        msg += _chks.eq(i).prop("name") + " - " + _chks.eq(i).val() + "\n";
      }
      break;
      case 4:
         _chks=_form1.children("fieldset").eq(0).find("input[type=checkbox]:checked");
          for (let i = 0; i < _chks.length; i++) {
            msg += _chks.eq(i).prop("name") + " - " + _chks.eq(i).val() + "\n";
          }
        /*_chk.each(function(i,ref){
            msg += $(ref).prop("name") + " - " + _chk.eq(i).val() + "\n";
        */   
      break;
      case 5:
          _chks=_form1.children("fieldset").eq(0).find("input[type=checkbox]").not(":checked");
          _chks.each(function(i,ref){
                msg+=$(ref).prop("name")+" - "+ _chks.eq(i).val()+"\n";
          })
        case 6:
            _opts=_form1.children("fieldset").eq(1).find("input[type=radio]:checked")
            for (let i = 0; i < _opts.length; i++) {
                msg += _opts.eq(i).prop("name") + " - " + _opts.eq(i).val() + "\n";
              }
          break;
          case 7:
            _opts=_form1.children("fieldset").eq(1).find("input[type=radio]").not(":checked")
            _opts.each(function(i,ref){
                msg+=$(ref).prop("name")+" "+ _opts.eq(i).val()+" \n"; 
            })
              break;
              case 8:
                  let _selected =_form1.children("select").last().children("option").filter(":selected");
                  for (let i = 0; i < _selected.length; i++) {
                    msg+=_selected.eq(i).val();
                    
                  }
                /* for (let i = 0; i < _selected.length; i++) {

                  msg+=   _selected.val()+" ";
                 }*/
               
                  break;
    

    
     
     
  }
  alert(msg);
  
  function imposta(codice) {
    switch (codice) {
        case 1:
            _form1.find("input[type=text]").first().val("Nuovo valore");
            break;
        case 2:
            // prop parte sempre da base 0
            // _form1.find("select").first().prop("slectedIndex", 1);
            _form1.find("select").first().children().eq(2).prop("selected", true);
            break;
        case 3:
            // .eq(0) --> in questo caso equivale a .first() perchè prende il primo
            let chks = _form1.children("fieldset").eq(0).find("input[type=checkbox]")
            chks.first().prop("checked", true) //oppure
            chks.eq(1).prop("checked", true); //oppure
            // scrivo il value di quelli che voglio selezionare
            // chks.val(["opzione 1", "opzione 3"])
            break;
        case 4:
            _form1.children("fieldset").eq(1).find("input[type=radio]").eq(1).prop("checked", true)
            break;
        case 5:
            let select = _form1.children("select").last();
            select.children("option").eq(1).prop("selected", true)
            select.children("option").eq(2).prop("selected", true)
            break;
    }
}
}
