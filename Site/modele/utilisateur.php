<?php 
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
	function verif_user($loogg,$pass){ // verifie qu'un utilisateur exise renvoie 0 si non, 1 si oui

		require("connect.php");

		$reponseE = $bdd->prepare("SELECT * FROM utilisateur WHERE login = :loogg and pass = :pass");
		$reponseE->execute(array('loogg' => $loogg , 'pass' => $pass));

		$donneesE = $reponseE->fetch();
		if($donneesE == 0 ){

			return 0;

		}
		else{

			return $donneesE['id_uti'] ;
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
	function setUtilisateur($nom,$prenom,$mail,$sexe,$pseudo,$age,$mdp){
		require("connect.php");
		$idu = getNbrUtilisateur()+1 ;
		$reponse = $bdd->prepare("INSERT INTO Utilisateur (IdUtilisateur, NomU, PrenomU, MailU, Sexe, Pseudo, Age, password) VALUES (:IdUtilisateur, :NomU, :PrenomU, :MailU, :Sexe, :Pseudo, :Age, :password)");
		$reponse->execute(array('IdUtilisateur' => $idu ,'NomU' => $nom,'PrenomU' => $prenom ,'MailU' => $mail ,'Sexe'=>$sexe  ,'Pseudo'=>$pseudo,'Age'=>$age,'password'=>$mdp));
		
	}
?>