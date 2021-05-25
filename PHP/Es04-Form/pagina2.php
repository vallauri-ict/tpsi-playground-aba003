<!DOCTYPE html>
<html lang="it">

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title> PHP </title>
	<script>
		src = "https://code.jqeury.com/jquery-3.6.0.js"
		integrity = "sha256-H+K7U5CnX"
		crossorigin = "anonymus"
	</script>
	<link rel="stylesheet" href="index.css" />
	<script type="application/javascript" src="index.js"> </script>
</head>

<body>
	<?php
	require("php-mysqli.php");
	// step 1: lettura e controllo parametri
	if (isset($_REQUEST["lstSondaggi"])) { //$_request vede se è stato selezionato un valore
		$id = $_REQUEST["lstSondaggi"];
	
	} else die("Parametro mancante: id");

	// step 2: connessione
	$con = _openConnection("db_esercizio_4");

	// step 3: esecuzione query
	$sql = "SELECT * FROM sondaggi WHERE id=$id";
	$rs = _eseguiQuery($con, $sql)[0];
	print_r($rs);

	// controllo sui cookies
	if (isset($_COOKIE["sondaggio-$id"]) && $_COOKIE["sondaggio-$id"] == true) {
		die("Non puoi votare una seconda volta il sondaggio $rs[titolo]");
	}

	// step 4: visualizzazione dati
	echo($rs['titolo']);
	echo ("<h1> Sondaggio su : $rs[titolo] </h1>");
	echo ("<hr> <img margin='15px;' width='400px' src=img/$rs[img]>");
	echo ("<h3 style='margin:15px;'> Rispondi alla seguente domanda: </h3>");
	echo ("<p style='margin:15px;'> $rs[domanda] </p>");
	?>
	<form action="risultati.php" method="get">
		<div style='margin:15px;'>
			<input type="radio" name="optRisposta" value="nSi"> Si <br>
			<input type="radio" name="optRisposta" value="nNo"> No <br>
			<input type="radio" name="optRisposta" value="nNs"> Non so <br>
		</div>
		<?php
		echo ("<input type='hidden' name='id' value='$id'>") //per saòvarci l' id della odmanda corrente
		?>
		<input type='submit' value="Invia">
	</form>
	<?php
	// step 5: chiusura della connessione
	$con->close();
	?>
</body>

</html>