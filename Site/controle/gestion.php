<?php

	function organiser(){
		$nomLan = isset($_POST['nomLan'])?($_POST['nomLan']):'';
		$dateDebut = isset($_POST['dateDebut'])?($_POST['dateDebut']):'';
		$dateFin = isset($_POST['dateFin'])?($_POST['dateFin']):'';
		$adresseLan = isset($_POST['adresseLan'])?($_POST['adresseLan']):'';
		$villeLan = isset($_POST['villeLan'])?($_POST['villeLan']):'';
		$nbTournois = isset($_POST['nbTournois'])?($_POST['nbTournois']):'';
		$nbVisiteurs = isset($_POST['nbVisiteurs'])?($_POST['nbVisiteurs']):'';
		$prixVisite = isset($_POST['prixVisite'])?($_POST['prixVisite']):'';
		$adresseSite = isset($_POST['adresseSite'])?($_POST['adresseSite']):'';
		$description = isset($_POST['description'])?($_POST['description']):'';
		$adresseWidget = isset($_POST['adresseWidget'])?($_POST['adresseWidget']):'';
		
		if (!isset($_SESSION['profil']['Pseudo'])){
			$controle = "compte";
			$action = "connexion";
			$nexturl = "index.php?controle=" . $controle . "&action=" . $action;
			header ("Location:" . $nexturl);
		}
		else {
			if (count($_POST)==0){
				require("./vue/layout/layout.tpl") ;
			}
			else{ // vérification d'abord s'il y a erreur de syntaxe
				if (!verif_syntax_organisation($nomLan,$dateDebut,$dateFin,$adresseLan,$villeLan,$nbTournois,$nbVisiteurs,$prixVisite,$adresseSite,$description,$adresseWidget)){
					require("vue/layout/layout.tpl");
				}
				else {
					/*
					$controle = "gestion";
					$action = "tournois";
					*/
					$param = array($nomLan,$dateDebut,$dateFin,$adresseLan,$villeLan,$nbTournois,$nbVisiteurs,$prixVisite,$adresseSite,$description,$adresseWidget);
					/*
					$nexturl = "index.php?controle=" . $controle . "&action=" . $action . "&param=" . $param;
					header ("Location:" . $nexturl); // on passe au contrôle tournois
					*/
					tournois($param);
				}
			}
		}
	}
	
	function tournois($infosLan){ // on va créer nbTournois fois les formulaires
		// A AFFICHER DANS LE TPL :
		// PrixTournois
		// NbEquipe
		// IdJeu (liste déroulante avec accès base pour avoir la liste des jeux)
		
		$prixTournois = isset($_POST['prixTournois'])?($_POST['prixTournois']):'';
		$nbEquipe = isset($_POST['nbEquipe'])?($_POST['nbEquipe']):'';
		$jeuSelectionne = isset($_POST['jeuSelectionne'])?($_POST['jeuSelectionne']):'';
		
		require("./modele/jeu.php");
					
		$nbTournois = intval($infosLan[5]);
		$listeJeux = getJeux();
		
		if (!isset($_SESSION['profil']['Pseudo'])){
			$controle = "compte";
			$action = "connexion";
			$nexturl = "index.php?controle=" . $controle . "&action=" . $action;
			header ("Location:" . $nexturl);
		}
		else {
			if (count($_POST)==0){
				require("./vue/layout/layout.tpl") ;
			}
			else{ // vérification d'abord s'il y a erreur de syntaxe
				if (!verif_syntax_organisation($nomLan,$dateDebut,$dateFin,$adresseLan,$villeLan,$nbTournois,$nbVisiteurs,$prixVisite,$adresseSite,$description)){
					require("vue/layout/layout.tpl");
				}
				else {
					require("./modele/lan.php");
					require("./modele/tournois.php");
					
					setLan($infosLan[0],$infosLan[1],$infosLan[2],$infosLan[3],$infosLan[4],$infosLan[5],$infosLan[6],$infosLan[7],$infosLan[8],$infosLan[9]);
					$idLan = getIdLan($infosLan[0],$infosLan[1],$infosLan[2],$infosLan[3],$infosLan[4],$infosLan[5],$infosLan[6],$infosLan[7],$infosLan[8],$infosLan[9]);
					$idJeu = getIdJeu($jeuSelectionne);
					setTournois($prixTournois, $nbEquipe, $IdLan, $IdJeu);	
					
					$controle = "start";
					$action = "accueil";
					$nexturl = "index.php?controle=" . $controle . "&action=" . $action;
					header ("Location:" . $nexturl); // on passe au contrôle tournois
				}
			}
		}
	}
	
	function verif_syntax_organisation($nomLan,$dateDebut,$dateFin,$adresseLan,$villeLan,$nbTournois,$nbVisiteurs,$prixVisite,$adresseSite,$description,$adresseWidget){
		if (!preg_match("#^[\sa-zA-Z0-9éèùîàô]{2,35}$#", $nomLan)) {
			return false;
		}
		if (!preg_match("#^[\sa-zA-Z0-9éèùîàô]{8,35}$#", $adresseLan)) {
			return false;
		}
		if (!preg_match("#^[A-Z]{1}[a-zéèùîàô]{1,20}$#", $villeLan)) {
			return false;
		}
		if (strlen($description) < 10 || strlen($description) > 1000) {
			return false;
		}
		if (!check_date($dateDebut)) {
			return false;
		}
		if (!check_date($dateFin)) {
			return false;
		}
		/*
		$dateDebutTime = new DateTime($dateDebut);
		$dateFinTime = new DateTime($dateFin);
		if (date_diff($dateDebutTime, $dateFinTime) < 0){
			return false;
		}
		*/
		if (intval($nbVisiteurs) < 10 || intval($nbVisiteurs) > 1000){
			return false;
		}
		if (!preg_match("#^[0-9]+[.]{1}[0-9]{2}$#", $prixVisite)) {
			return false;
		}
		if (!preg_match("#^((http|https):\/\/){1}(www[.])?([a-zA-Z0-9]|-)+([.][a-zA-Z0-9(-|\/|=|?)?]+)+$#", $adresseSite)) {
			return false;
		}
		if (!preg_match("#^((http|https):\/\/){1}(www[.])?([a-zA-Z0-9]|-)+([.][a-zA-Z0-9(-|\/|=|?)?]+)+$#", $adresseWidget)) {
			return false;
		}
		return true;
	}

	function check_date($date) {
		if (strpos($date, "/")){
			$date_naissance = preg_split("#/#", $date);
			return checkdate($date_naissance[1], $date_naissance[0], $date_naissance[2]);
		}
		if (strpos($date, "-")){
			$date_naissance = preg_split("#-#", $date);
			return checkdate($date_naissance[1], $date_naissance[2], $date_naissance[0]);
		}
		return false;
	}
?>