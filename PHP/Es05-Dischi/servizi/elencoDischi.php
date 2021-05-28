<?php
    
    
    header('Content-type: application/json; charset=utf-8');
    require("php-mysqli.php");

    // step 1: lettura parametri
    // non ce ne sono
   

    // step 2: apertura connessione
    $con=_connection();

    // step 3: esecuzione query
    // per prendere tutti i record omettere WHERE
    // qualunque istruzione di selezione inizia con SELECT
    $sql="SELECT id,autore,titolo,anno FROM dischi";
    $rs=_execute($con,$sql);

    if ($rs) {
        echo(json_encode($rs));
    }else{
        http_response_code(400);
        $con->close();
        die("Errore nella query");
    }




    // step 4: invio dei dati al client
   $con->close();

   
?>