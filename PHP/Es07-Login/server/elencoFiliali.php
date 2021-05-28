<?php
	header("content-type:application/json; charset=utf-8");
	require("php-mysqli.php");
	
	// step 0 controllo session
	_checkSession("cCorrentista");
	
	$cCorrentista = $_SESSION["cCorrentista"]; //viene settato nel log in
	
	$con = _connection();
	
    $sql = "SELECT filiali.Nome, filiali.cFiliale FROM conti, filiali WHERE conti.cFiliale = filiali.cFiliale AND conti.cCorrentista = $cCorrentista";
    
	$rs = _execute($con,$sql); //vettore enumerativo di filiali
    
	$sql2 = "SELECT Nome FROM correntisti where correntisti.cCorrentista=$cCorrentista";
	// count conta il numero di valori in un vettore enumerativo
	$rs2=_execute($con,$sql2);
    
	if ($rs && $rs2)
	{
		/*let ris={};
		ris.nome=$rs2[0]["Nome"] //vettore enumerativo lungo 1 con 1 campo
		ris.filiali=$rs //assegno un enumerativo ad un json
		echo(json_encode($rs).json_encode($rs2));*/
		$ris = [];
		$ris["Nome"]=$rs2[0]["Nome"];
		$ris["Filiali"]=$rs;
		echo(json_encode($ris));

    }
	else
	{
		http_response_code(500);
	    $con->close();
        die("Errore esecuzione query");
	}
    
	$con->close();
?>