<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <h1>Grazie della tua richiesta </h1>
    <h2>Il numero maggiore fra quellli che mi hai inviato è :</h2>
    <?php
    $n1 = 0;
    $n2 = 0;
    $n3 = 0;

    //****CONTROLLO DEI PARAMETRI ******/
    if (isset($_REQUEST["n1"]) && is_numeric($_REQUEST["n1"])) {

        $n1 = $_REQUEST["n1"];
    } else {
        die("primo numero non valido"); //il die interompe del tutto il codice
    }
    if (isset($_REQUEST["n2"]) && is_numeric($_REQUEST["n2"])) {

        $n2 = $_REQUEST["n2"];
    } else {
        die("secondo numero non valido");
    }
    if (isset($_REQUEST["n3"]) && is_numeric($_REQUEST["n3"])) {

        $n3 = $_REQUEST["n3"];
    } else {
        die("terzo numero non valido");
    }

    //*****CONTROLLO MAGGIORE ****/
    if ($n1 > $n2 && $n1 > $n3) {
        die("il valore piu alto è: $n1");
    } else if ($n2 > $n3) {
        die("il valore piu alto è: $n2");
    } else {
        die("il valore piu alto è: $n3");
    }



    ?>
</body>

</html>