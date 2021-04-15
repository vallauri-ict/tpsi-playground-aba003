$(document).ready(function(){
    $("#btnInvia").on("click",function(){
        $("select[name=lstCittà]").prop("selectedIndex",-1)
        let msg = "";
        if($("#txtNome").val() == "")
        {
            msg +="Nome mancante </br>";
        }
        if($("input[name=optIndirizzo]:checked").length == 0)
        {
            msg+="Indirizzo di studio non selezionato </br>";
        }
        if ( $("select[name=lstCittà]").prop("selectedIndex")==-1) {
            msg+=" non selezionato </br>";
        }
        if(msg != "")
        {
            $("#msg").html(msg);
        }
        else
        {
            $("#msg").html("");
        }
    });
})