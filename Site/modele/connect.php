<?php



// Pour SQL server
/*
try {
    $bdd = new PDO("sqlsrv:server = tcp:srvpjs4.database.windows.net,1433; Database = pjs4", "julien", "*pjs4*pjs4*");
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch (PDOException $e) {
    print("Error connecting to SQL Server.");
    die(print_r($e));
}

*/
try
{
	$bdd = new PDO('mysql:host=localhost;dbname=pjs4;charset=utf8', 'root', 'root');
}
catch (Exception $e)
{
        die('Erreur : ' . $e->getMessage());
}


/*

// Pour mysql

try
{
	$bdd = new PDO('mysql:host=localhost;dbname=pweb2;charset=utf8', 'root', 'root');
}
catch (Exception $e)
{
        die('Erreur : ' . $e->getMessage());
}
*/

?>