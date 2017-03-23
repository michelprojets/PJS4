<?php

	function connexion(){

		$pseudo = isset($_POST['login'])?($_POST['login']):'';
		$mdp = isset($_POST['mdp'])?($_POST['mdp']):'';

		$_SESSION['profil'] = array();
		//on doit verifier si la personne est dans la base
		if (count($_POST)==0){
			require("./vue/layout/layout.tpl") ;
		}
		else{ // vérification d'abord s'il y a erreur de syntaxe
			if (!verif_syntax_connexion($pseudo, $mdp)){
				require("vue/layout/layout.tpl");
			}
			else { // on regarde s'il existe dans la base
				require("./modele/utilisateur.php");
				$res = verif_user($pseudo,$mdp);

				if ($res == 0) {
					require("vue/layout/layout.tpl");
				}
				else {
					$_SESSION['profil'] = $res;
					$controle = "start";
					$action = "accueil";
					$nexturl = "index.php?controle=" . $controle . "&action=" . $action;
					header ("Location:" . $nexturl);
				}

			}
		}
	}

	function inscription(){

		$pseudo = isset($_POST['login'])?($_POST['login']):'';
		$mdp = isset($_POST['mdp'])?($_POST['mdp']):'';
		$confirmation_mdp = isset($_POST['confirmation_mdp'])?($_POST['confirmation_mdp']):'';
		$nom = isset($_POST['nom'])?($_POST['nom']):'';
		$prenom = isset($_POST['prenom'])?($_POST['prenom']):'';
		$mail = isset($_POST['mail'])?($_POST['mail']):'';
		$date_naissance = isset($_POST['date_naissance'])?($_POST['date_naissance']):'';
		$sexe = isset($_POST['sexe'])?($_POST['sexe']):'';

		if (count($_POST)==0){
			require("./vue/layout/layout.tpl");
		}
		else{ // vérification d'abord s'il y a erreur de syntaxe
			if (!verif_syntax_inscription($pseudo, $mdp, $confirmation_mdp, $nom, $prenom, $mail, $date_naissance, $sexe)){
				require("vue/layout/layout.tpl");
			}
			else { // on regarde s'il existe dans la base
				require("./modele/utilisateur.php");
				$res = inscription($nom,$prenom,$mail,$sexe,$pseudo,$date_naissance,$mdp);
				if ($res == 0) {
					require("vue/layout/layout.tpl");
				}
				else {
					$_SESSION['profil'] = $res;
					$controle = "start";
					$action = "accueil";
					$nexturl = "index.php?controle=" . $controle . "&action=" . $action;
					header ("Location:" . $nexturl);
				}

			}
		}
	}


	function verif_syntax_connexion($pseudo, $mdp){
		if (!preg_match("#^[a-zA-Z0-9_]{3,15}$#", $pseudo)) {
			return false;
		}
		if (!preg_match("#^[a-zA-Z0-9]{5,15}$#", $mdp)) {
			return false;
		}
		return true;
	}

	function verif_syntax_inscription($pseudo, $mdp, $confirmation_mdp, $nom, $prenom, $mail, $date_naissance, $sexe){
		if (!preg_match("#^[a-zA-Z0-9_]{3,15}$#", $pseudo)) {
			return false;
		}
		if (!preg_match("#^[a-zA-Z0-9]{5,15}$#", $mdp)) {
			return false;
		}
		if (strcmp($mdp, $confirmation_mdp) <> 0) {
			return false;
		}
		if (!preg_match("#^[a-zA-Zéèùîàô]{2,35}$#", $nom)) {
			return false;
		}
		if (!preg_match("#^[a-zA-Zéèùîàô]{2,35}$#", $prenom)) {
			return false;
		}
		if (!preg_match("#^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$#", $mail)) {
			return false;
		}
		if ((!preg_match("#^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$#", $date_naissance)) || (!check_date($date_naissance))) {
			return false;
		}
		if (strcmp($sexe, "Sélectionner votre sexe") == 0) {
			return false;
		}
		return true;
	}

	function check_date($date) {
		$date_naissance = preg_split("/", $date);
		return checkdate($date_naissance[1], $date_naissance[0], $date_naissance[2]);
	}
?>
