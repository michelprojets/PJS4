<?php

	function getTournois(){
		require("connect.php");
		$r=array();
		$reponse = $bdd->query('SELECT * FROM tournois');
		while ($donnees = $reponse->fetch())
		{
			$r[]=$donnees;
		}
		$reponse->closeCursor();
		return $r;
	}


	function getIdLansJeu($jeu){
		require("connect.php");
		require("jeu.php");
		$idJ = getIdJeu($jeu);
		$ListeLan=array();
		$reponse = $bdd->prepare("SELECT IdLan FROM Tournois WHERE IdJeu=:id");
		$reponse->execute(array('id' => $idJ));
		while ($donnees = $reponse->fetch())
		{
			$ListeLan[]=$donnees;
		}
		$reponse->closeCursor();
		return $ListeLan;
	}

	function getTournoisByLan($IdLan){
		require("connect.php");
		$r=array();
		$reponse = $bdd->prepare("SELECT * FROM Tournois WHERE IdLan=:id");
		$reponse->execute(array('id' => $IdLan));
		while ($donnees = $reponse->fetch())
		{
			$r[]=$donnees;
		}
		$reponse->closeCursor();
		return $r;

	}

	function getNbrTournois(){
		require("connect.php");
		$reponse = $bdd->query("SELECT COUNT(*) as nb FROM Tournois");
		return $donnees = $reponse->fetch();

	}
	function setTournois($PrixTournois, $NbEquipe, $IdLan, $IdJeu){
		require("connect.php");
		$idT = getNbrTournois()+1 ;
		$reponse = $bdd->prepare("INSERT INTO Tournois (IdTournois, PrixTournois, NbEquipe, IdLan, IdJeu) VALUES (:IdTournois, :PrixTournois, :NbEquipe, :IdLan, :IdJeu)");
		$reponse->execute(array('IdTournois' => $idT ,'PrixTournois' => $PrixTournois,'NbEquipe' => $NbEquipe ,'IdLan' => $IdLan ,'IdJeu'=>$IdJeu ));

	}





?>
