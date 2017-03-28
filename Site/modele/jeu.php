<?php

	function getIdJeu($jeu){
		require("connect.php");
		$reponse = $bdd->prepare("SELECT IdJeu FROM Jeu WHERE NomJeu = :nom");
		$reponse->execute(array('nom' => $jeu));
		return $donnees = $reponse->fetch();
	}
	function getJeu($idJ){
		require("connect.php");
		$reponse = $bdd->prepare("SELECT * FROM Jeu WHERE IdJeu = :idj");
		$reponse->execute(array('idj' => $idJ));
		return $donnees = $reponse->fetch();
	}
	function getJeux(){
		require("connect.php");
		$r=array();
		$reponse = $bdd->query('SELECT * FROM jeu');
		while ($donnees = $reponse->fetch())
		{
			$r[]=$donnees;
		}
		$reponse->closeCursor();
		return $r;

	}

	function getNbrJeu(){
		require("connect.php");
		$reponse = $bdd->query("SELECT COUNT(*) as nb FROM Jeu");
		return $donnees = $reponse->fetch();

	}

	function setJeu( $NomJeu, $NbJoueurEquipe){
		require("connect.php");
		$idJ = getNbrJeu()+1 ;
		$reponse = $bdd->prepare("INSERT INTO Jeu (IdJeu, NomJeu, NbJoueurEquipe) VALUES (:IdJeu, :NomJeu, :NbJoueurEquipe)");
		$reponse->execute(array('IdJeu' => $idJ ,'NomJeu' => $NomJeu,'NbJoueurEquipe' => $NbJoueurEquipe));

	}

?>
