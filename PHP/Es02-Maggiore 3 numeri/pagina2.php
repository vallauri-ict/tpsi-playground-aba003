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

	<body>
		<h1>Grazie della tua richiesta!</h1>
		<?php
			
				$n1;
				$n2;
				$n3;
				if (isset($_REQUEST["txt1"])&& is_numeric($_REQUEST["txt1"])) {
					$n1=$_REQUEST["txt1"];		
				}else{
					die("primo parametro mancante o non valido");
				}
				if (isset($_REQUEST["txt2"])&& is_numeric($_REQUEST["txt2"])) {
					$n2=$_REQUEST["txt2"];		
				}else{
					die("secodno parametro mancante o non valido");
				}
				if (isset($_REQUEST["txt3"])&& is_numeric($_REQUEST["txt3"])) {
					$n3=$_REQUEST["txt3"];		
				}else{
					die("terzo parametro mancante o non valido");
				}
				if ($n1>$n2&& $n1>$n3) {
					$ris=$n1;
				}else if($n2>$n1&& $n2>$n3){
					$ris=$n1;
				}else{
					$ris=$n3;
				}
				echo("<h1>Il numero più grande tra $n1 , $n2 , $n3 é : $ris </h1>");

			
		?>
		
       
	</body>
</html>