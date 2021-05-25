<?php
header("content-type:application/json; charset=utf-8");
    require("php-mysqli.php");

    if (isset($_REQUEST["cFiliale"])) {
        $cod_filiale=$_REQUEST["cFiliale"];
    }else{
        http_response_code(400);
        die("Erroe nella ricezione dei dati");
    }

    $con=_connection();

    $sql="SELECT * FROM conti,correntisti WHERE conti.cCorrentista=correntisti.cCorrentista AND conti.cFiliale=$cod_filiale";
     
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