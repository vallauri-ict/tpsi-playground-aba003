<?php
    
    
    header('Content-type: application/json; charset=utf-8');
    require("php-mysqli.php");

    // step 1: lettura parametri
    // non ce ne sono
   if (isset($_REQUEST["id"])) {
       $id=$_REQUEST["id"];
   }else{
       http_response_code(400);
        die("Paramenro mancante id");
   }

    // step 2: apertura connessione
    $con=_connection();

    // step 3: esecuzione query
    // per prendere tutti i record omettere WHERE
    // qualunque istruzione di selezione inizia con SELECT
    $sql="DELETE FROM dischi WHERE id=$id";
    $rs=_execute($con,$sql);

    if ($rs) {
        echo('{"ris": "ok"}'); 
    }else{
        http_response_code(400);
        $con->close();
        die("Errore nella query");
    }
    // step 4: invio dei dati al client
   $con->close();

   
?>