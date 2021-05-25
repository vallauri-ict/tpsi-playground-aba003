<!DOCTYPE html>
<html lang="it">
 <head>
 <meta charset="UTF-8"/>
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> PHP </title>
	<script> src="https://code.jqeury.com/jquery-3.6.0.js"
	integrity="sha256-H+K7U5CnX"
	crossorigin="anonymus"</script>
	<link rel="stylesheet" href="index.css"/>
	<script type="application/javascript" src="index.js"> </script>
</head>

	<body style="text-align:center; padding:10px;">
		

		<h1>Seleziona il sondaggio a cui desiderare partecipare</h1>
		<hr>
		<h3> Sondaggi disponibili </h3>

<?php
	require("php-mysqli.php");

	$con = _openConnection("db_esercizio_4");
	 
	//vado a richiedere la query
	$sql="SELECT id,titolo FROM sondaggi";
	
	$rs=_eseguiQuery($con,$sql);

	print_r($rs);

?>
		<form id="form1" action="pagina2.php" method="get">
			<select name="lstSondaggi">

			<?php
					//vado ad aprire la connessione con il database
					

					$con = _openConnection("db_esercizio_4");
					 
					//vado a richiedere la query
					$sql="SELECT id,titolo FROM sondaggi";
					
					$rs=_eseguiQuery($con,$sql);

					foreach ($rs as $item) {
						$value=$item["id"];
						$text=$item["titolo"];
						echo("<option value=$value>$text</option>");
					}
				
			?>
			
			</select>
			<input type="submit" value="invia">
		</form>
		<?php
			// step 5: chiusura della connessione
			$con->close();
		?>

	</body>
</html>