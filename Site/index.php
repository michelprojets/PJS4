<?php 

session_start ();

if (isset($_GET['controle']) & isset($_GET['action'])) {
 	$controle = $_GET['controle'];
	$action= $_GET['action'];
	$param= ISSET($_GET['param'])?$_GET['param']:"";
}
else { //absence de paramètres : prévoir des valeurs par défaut
	$controle = "start";
	$action= "accueil";
	$param= "";
}
	
//inclure le fichier php de contrôle 
//et lancer la fonction-action issue de ce fichier.	

	require ('./controle/' . $controle . '.php');   
	$action ($param);
?>
