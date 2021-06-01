<?php 
	// DARE IL NOME DEL DATABASE AL QUALE CI VOGLIAMO COLLEGARE
	define('DBNAME', 'db_borsa');
	define('SCADENZA', 60);

	function _connection()
	{
		define('DBHOST', 'localhost');
		define('DBUSER', 'root');
		define('DBPASS', '');
		
		mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
		try
		{
			$con = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);
			$con -> set_charset("utf8");
			return $con;
		}
		catch (mysqli_sql_exception $ex)
		{
			http_response_code(503);
			die ("Errore connessione db: <br>" . $ex->getMessage());
		}
	}

	function _execute($con, $sql)
	{
		try
		{
			$rs = $con -> query($sql);
		}
		catch (mysqli_sql_exception $ex)
		{
			$con -> close();
			http_response_code(500);
			die("Errore nella query sql: <br>" . $ex -> getMessage());
		}
		
		if(!is_bool($rs))
		{
			$data = $rs -> fetch_all(MYSQLI_ASSOC);
		}
		else
		{
			$data = $rs;
		}
		
		return $data;
	}
	
	function _checkSession($key)
	{
		session_start();
		if(!isset($_SESSION[$key]))
		{
			http_response_code(403);
			die("Sessione inesistente o scaduta");
		}
		else if(!isset($_SESSION["scadenza"]) || $_SESSION["scadenza"] < time())
		{
			http_response_code(403);
			die("Sessione scaduta");
		}
		else
		{
			$_SESSION["scadenza"] = time() + SCADENZA;
			setcookie(session_name(), session_id(), time() + SCADENZA, "/");
		}
	}
?>