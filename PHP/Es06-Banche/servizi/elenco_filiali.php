<?php

header("content-type:application/json; charset=utf-8");//dichiaro a browser che sto mandando un json utf
    require("php-mysqli.php");

    //lettura dei parametri
    if(isset($_REQUEST["piedi"])){ //è il parametro che gli passo con il json param
        $cBanca=$_REQUEST["piedi"];
    }else{
        http_response_code(400);
        die("parametro mancante codice della banca");
    }

    //connessione
    $con=_connection();

    //query
    $sql="SELECT * FROM filiali WHERE cBanca=$cBanca";
    $rs=_execute($con,$sql);
    if ($rs) {
         echo(json_encode($rs)); //devo serializzarlo 
    }else{
        http_response_code(500);
        die("Erroe esecuzione query");
        $con->close();
    }
    $con->close();






?>