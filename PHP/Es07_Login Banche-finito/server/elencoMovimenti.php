<?php
	header("content-type:application/json; charset=utf-8");
	require("php-mysqli.php");
	
	// step 0 controllo session
	_checkSession("cCorrentista");
	
	$cCorrentista = $_SESSION["cCorrentista"]; //viene settato nel log in
	if (isset($_REQUEST["cFiliale"])) {
       $cFiliale=$_REQUEST["cFiliale"];

    }else{
        http_response_code(400);
        die("Parametri mancanti: cFiliale");
    }
	$con = _connection();
	
    $sql = "SELECT movimenti.cMov, operazioni.descrizione, movimenti.Data, movimenti.Importo  FROM conti,movimenti,operazioni 
            WHERE movimenti.cOperazione = operazioni.cOperazione
            AND movimenti.cConto =conti.cConto 
            AND conti.cCorrentista=$cCorrentista AND conti.cFiliale =$cFiliale";
    
	$rs = _execute($con,$sql); //vettore enumerativo di filiali
    
	
    
	if (!$rs )
	{
        $con->close();
		die("Errore");

    }
	else
	{
		echo(json_encode($rs));
	}
    
	$con->close();
?>