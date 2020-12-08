"use strict"

let _form1;

$(document).ready( function(){
    _form1 = $("#form1");
})

function visualizza(codice){
    let msg= "";
    let _chk;
    let _opts;
    switch(codice)
    {
        case 1:
            msg = $("#form1").find("input[type=text]:first-of-type").val();
            break;

        case 2:
            msg= $("#form1").children("label").eq(1).children("select").val();
            break;

        
        case 3:
         _chk = _form1.children("fieldset").eq(0).find("input[type=checkbox]");
        for(let i=0;i<_chk.length;i++) { 
            msg += _chk.eq(i).prop("name") + " - " + _chk.eq(i).val() + "\n";
        }
        break;
        case 4:
        _chk = _form1.children("fieldset").eq(0).find("input[type=checkbox]:checked");
        _chk.each(function(i,ref){
            msg += $(ref).prop("name") + " - " + _chk.eq(i).val() + "\n";
        })
        break;
        case 5:
        _chk = _form1.children("fieldset").eq(0).find("input[type=checkbox]").not(":checked");
        for(let i=0;i<_chk.length;i++) { 
             msg += _chk.eq(i).prop("name") + " - " + _chk.eq(i).val() + "\n";
        }
        break;
        case 6:
        _opts = _form1.children("fieldset:nth-of-type(2)").find("input[type=radio]");
        if(_opts.is(":checked"))
            msg = _opts.filter(":checked").val();
        else
            msg = "Nessun radio button selezionato";
        break;
        case 7:
        _opts = _form1.children("fieldset:nth-of-type(2)").find("input[type=radio]").not(":checked");
        _opts.each(function(i,ref){
            msg += $(ref).val() + "\n";
        })
        break;
        case 8:
        //let _select = _form1.children("select:last-of-type")
        let _select = _form1.find("select").last(); // restituisce l'ultimo figlio diretto del form select
        _select.children("option:selected").each(function(i,ref){
            msg += $(ref).val() + " - ";
        })
        msg += "\n";
        for (let item of _select.val()) {
            msg += item + " - ";
        }
        
    }
    alert(msg);
}

