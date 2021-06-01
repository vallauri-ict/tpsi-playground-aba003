<?php
	/* ERRORI:
	- 404, PAGINA NON TROVATA NEL DOMINIO
	- 401, CREDENZIALI NON VALIDE (PASSWORD O USERNAME ERRATI)
	- 403, SESSIONE O TOKEN SCADUTI
	- 500, ERRORE DURANTE LA CONNESSIONE AL DATABASE
	- 503, ERRORE NEL PASSAGGIO DEI PARAMETRI (SINTASSI ECC...)
	- 422, ERRORE SEMANTICO NEI PARAMETRI, PARAMETRO FUORI VALORE (ES. ETà < 18)
	- 200, OPERAZIONE ESEGUITA CON SUCCESSO
	*/

	header("content-type:application/json; charset=utf-8");
	require("php-mysqli.php");
	
    if (isset($_REQUEST["id"])) {
       $id=$_REQUEST["id"];
    }else{
        http_response_code(503);
        die("parametro mancante");
    }

	if (isset($_REQUEST["volumi"])) {
		$volumi=$_REQUEST["volumi"];
	 }else{
		 http_response_code(503);
		 die("parametro mancante");
	 }
    $con = _connection();

    $sql="UPDATE titoli
	SET volumi = volumi+ $volumi
	WHERE id=$id";
	$rs=_execute($con,$sql);
    
	if (!$rs)
	{
        http_response_code(500);
	    $con -> close();
        die("Errore nell'esecuzione della query");
    }
	else
	{
        echo('{"ris": "ok"}');
    }
    
	$con -> close();
?>