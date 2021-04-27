   <!DOCTYPE html>
   <html lang="it">

   <head>
       <meta charset="UTF-8" />
       <title>PHP</title>
   </head>

   <body>


       <?php
        //questa è una pagina php non html perchè c è una  elaborazione da fare prima di essere restituita
        //al contrario di una pagina html che viene restituita così com' è
        // step 1: lettura e controllo dei parametri
        require("php-mysqli.php"); //richiede di utilizzare la page come libreria
        echo (" <h1>Dati arrrivati</h1> ");
        if (isset($_REQUEST["txtNome"]))
            $nome =    $_REQUEST["txtNome"];
        else
            die("nome mancante");

        if (isset($_REQUEST["optIndirizzo"]))
            $indirizzo = $_REQUEST["optIndirizzo"];
        else
            die("indirizzo mancante");

        if (isset($_REQUEST["chkHobbies"])) {
            $hobbies = $_REQUEST["chkHobbies"];
            echo '<pre>';
            print_r($hobbies);
            echo '</pre>';
            $hobbies = implode(',', $hobbies); //mette da vettore a stringa in js sta funzione si chiama join
            echo ("<p>hobbies: $hobbies</p>");
        } else
            $hobbies = "";

        if (isset($_REQUEST["lstCitta"])) {
            $citta = $_REQUEST["lstCitta"];
        } else
            die("indirizzo mancante");
        if (isset($_REQUEST["txtSegni"])) {

            $segni = $_REQUEST["txtSegni"];
        } else
            $segni = "";

        if (isset($_REQUEST["lstScoperta"])) {

            $scoperta = $_REQUEST["lstScoperta"]; //il name nel html è indicato come array nome[]
            $scoperta = implode(',', $scoperta);
        } else
            $scoperta = "";

        //fine lettura e controllod dei parametri
        //connessione al database
        $con = _connection("registrazione");
        //con è un object in php per accedere alle proprietà di un oggetto bisogna usare una freccina
        //protegge la variabile dalle sql injection
        $nome = $con->real_escape_string($nome);
        $indirizzo = $con->real_escape_string($indirizzo);
        $hobbies = $con->real_escape_string($hobbies);
        $citta = $con->real_escape_string($citta);
        $segni = $con->real_escape_string($segni);
        $scoperta = $con->real_escape_string($scoperta);

        //step 3 inserire i valori nei database
        $sql = "INSERT INTO studenti( nome,settore, hobbies,residenza, segni, media) VALUES ('$nome','$indirizzo','$hobbies',$citta,'$segni','$scoperta')";
        $ris = execute($con, $sql);
        echo ("<p>inserimento avvenuto con successo!</p>");







        ?>
   </body>

   </html>