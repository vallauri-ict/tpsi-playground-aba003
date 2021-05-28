<?php    
    header('Content-type: application/json; charset=utf-8');
    require("php-mysqli.php");

    // step 1: lettura parametri
    if(isset($_REQUEST["autore"])) 
    {
        $autore = $_REQUEST["autore"];
    }
    else 
    {
        http_response_code(400);
        die("parametro mancande: autore");
    }

    if(isset($_REQUEST["titolo"])) 
    {
        $titolo = $_REQUEST["titolo"];
    }
    else 
    {
        http_response_code(400);
        die("parametro mancande: titolo");
    }

    if(isset($_REQUEST["anno"])) 
    {
        $anno = $_REQUEST["anno"];
    }
    else 
    {
        http_response_code(400);
        die("parametro mancande: anno");
    }

    // step 2: apertura connessione
   $con=_connection();

   $sql="INSERT INTO dischi (autore, titolo, anno)
   VALUES ('$autore', '$titolo', $anno)";

   $rs=_execute($con,$sql);

   if ($rs) {
      echo('{"ris":"ok"}');
   }else{
       http_response_code(400);
       $con->close();
       die("Erroe nell' esecuzione della query");
   }


    // step 5: chiusura della connessione
    $con -> close();
?>