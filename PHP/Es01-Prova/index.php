<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="index.js"></script>
    <link rel="stylesheet" href="index.css">
    <title>PHP</title>
</head>
<body>
    <h1>Modello</h1>
    
    <?php
        $nome = "pippo";
        echo ("Il mio nome è $nome ");
     
      
        visualizza ($nome);
        function visualizza($nome) {
        echo ("<p style='font-weight:bold'>Il mio nome è $nome </p>");
      
    }
   ?>
   <h1>contenuto della variabile globale $_server</h1>
   <?php
   foreach($_SERVER as $key=> $valore){
       echo("$key : $valore <br>\n");
   }
   ?>
   
  
</body>
</html>