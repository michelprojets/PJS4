<?php

	function getUsers(){
		require("connect.php");
		$r=array();
		$reponse = $bdd->query('SELECT * FROM utilisateur');
		while ($donnees = $reponse->fetch())
		{
			$r[]=$donnees;
		}
		$reponse->closeCursor();
		return $r;

	}
/*
	function verif_user($login, $mdp){
		require ("connect.php");
		$reponseE = $bdd->prepare("SELECT * FROM utilisateur WHERE pseudo = :log and password = :pass");
		$reponseE->execute(array('log' => $login , 'pass' => $mdp));

		$donneesE = $reponseE->fetch();
		if($donneesE == 0 ){
			return 0;
		}
		else{
			return $donneesE['IdUtilisateur'] ;
		}
	}

	*/

	// test qui marche (base de mysql)
	function verif_user($pseudo,$mdp){ // verifie qu'un utilisateur exise renvoie 0 si non, 1 si oui

		require("connect.php");

		$reponseE = $bdd->prepare("SELECT * FROM utilisateur WHERE Pseudo = :pseudo and Password = :mdp");
		$reponseE->execute(array('pseudo' => $pseudo , 'mdp' => $mdp));

		$donneesE = $reponseE->fetch();
		if($donneesE == 0 ){
			return 0;
		}
		else{
			return $donneesE['IdUtilisateur'] ;
		}
	}

	function getUtilisateurById($Id){
		require("connect.php");
		$reponse = $bdd->prepare("SELECT * FROM Utilisateur WHERE IdUtilisateur =:Id");
		$reponse->execute(array('Id' => $Id));
		return $donnees = $reponse->fetch();

	}

	function getNbrUtilisateur(){
		require("connect.php");
		$reponse = $bdd->query("SELECT COUNT(*) as nb FROM Utilisateur");
		return $donnees = $reponse->fetch();

	}
	function setUtilisateur($nom,$prenom,$mail,$sexe,$pseudo,$date_naissance,$mdp){
		require("connect.php");
		$reponse = $bdd->prepare("INSERT INTO Utilisateur (NomU, PrenomU, MailU, Sexe, Pseudo, DateNaissance, password) VALUES (:NomU, :PrenomU, :MailU, :Sexe, :Pseudo, :DateNaissance, :Password)");
		$reponse->execute(array('NomU' => $nom,'PrenomU' => $prenom ,'MailU' => $mail ,'Sexe'=>$sexe  ,'Pseudo'=>$pseudo,'DateNaissance'=>$date_naissance,'Password'=>$mdp));

	}
?>
