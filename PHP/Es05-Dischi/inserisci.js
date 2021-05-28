"use strict"

$(document).ready(function(){
    $("#btnInvia").on("click",function(){
        let anno = $("#txtAnno");
        let titolo = $("#txtTitolo");
        let autore = $("#txtInterprete");
        if(titolo.val() != "" && autore!="" && anno!="")
        {
            let param={
                anno:anno.val(),
                titolo:titolo.val(),
                autore:autore.val(),
            }
            let request=inviaRichiesta("post", "servizi/inserisci.php",param);
            request.fail(errore);
            request.done(function(){
                alert("Dai Inseriti correttamente");
                window.location.href = "index.html";
            })
        }
    })
})