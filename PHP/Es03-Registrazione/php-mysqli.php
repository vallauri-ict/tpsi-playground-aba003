<?php
function _connection($dbName)
{

    define('DBHOST', 'localhost');
    define('DBUSER', 'root');
    define('DBPASS', '');

    //questa riga fa in modo che in caso di errore venga generato una eccezione
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    try {
        $con = new mysqli(DBHOST, DBUSER, DBPASS, $dbName);
        return $con;
    } catch (mysqli_sql_exception $ex) {
        die("Errore connessione db: <br>" . $ex->getMessage());
    }
}

function execute($con, $sql)
{
    //query di tipo dml restituiscono true o false
    //query record set con dati
    try {
        $rs = $con->query($sql);
    } catch (mysqli_sql_exception $ex) {
        die("Errore connessione db: <br>" . $ex->getMessage());
    }

    //il comando  era una query di tipo select
    //convertiamo il record set in un vettore json
    //i comandi non ti tipo select restituiscono un booleano che lasciamo cosi com è
    //altrimenti lo lasciamo così
    if (!is_bool($rs)) {
        $data = $rs->fetch_all(MYSQLI_ASSOC); //gli dice di convertirlo in un vettore enumerativo di json
    } else {
        $data = $rs;
    }
    return $data;
}
