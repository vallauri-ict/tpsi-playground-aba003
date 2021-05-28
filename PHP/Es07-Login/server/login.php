<?php
	header("content-type:application/json; charset=utf-8");
	require("php-mysqli.php");
	
	if(isset($_REQUEST["username"]))
	{
		$username = $_REQUEST["username"];
	}
	else
	{
		http_response_code(400);
		$con->close();
		die("Parametro mancante: username");
	}
	
	if(isset($_REQUEST["password"]))
	{
		$password = $_REQUEST["password"];
	}
	else
	{
		http_response_code(400);
		$con->close();
		die("Parametro mancante: password");
	}
	
	$con = _connection();
	
    $sql = "SELECT * FROM correntisti WHERE Nome = '$username'"; //case usensitive
    
	$rs = _execute($con,$sql);
    
	// count conta il numero di valori in un vettore enumerativo va a vedere se il record set restituito è 0
	if (!count($rs))   
	{
		http_response_code(401);
	    $con->close();
        die("Credenziali non valide");
    }
	else
	{
		if($rs[0]["Pwd"] != $password) {
			http_response_code(401);
			$con->close();
			die("Credenziali non valide");
		} else {
			// andiamo a creare un oggetto session relativo all'utente corrente
			
			// accedo all'oggetto session di sistema
			session_start();
			// dentro la sessione relativa all'utente corrente creo un campo cCorrentista
			// all'interno del quale mi salvo l'id del correntista
			$_SESSION["cCorrentista"] = $rs[0]["cCorrentista"];
			$_SESSION["scadenza"] = time() + SCADENZA;
			
			//vado a salvare il session name che hanno un session name e un session id che non sono visibili
			//e salvo il tutto all interno del cookie stesso nome del sessioon name e ha come valore l' id della sessione utente
			setcookie(session_name(), session_id(), time() + SCADENZA, "/");
			
			//la cosa importante è che riceve il codice della risposta se riceve 200 ok se no non va bene e se riceve 200 restituisce una promise
			//che è dotata di 2 eventi fail e done se è 200 passa nel done se no nel fail 
			http_response_code(200);
			echo('{"ris": "ok"}');
		}
	}
    
	$con->close();
?>