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
			else{ // v?rification d'abord s'il y a erreur de syntaxe
				if (!verif_syntax_organisation($nomLan,$dateDebut,$dateFin,$adresseLan,$villeLan,$nbTournois,$nbVisiteurs,$prixVisite,$adresseSite,$description,$adresseWidget)){
					require("vue/layout/layout.tpl");
				}
				else {
					$controle = "start";
					$action = "accueil";
					$nexturl = "index.php?controle=" . $controle . "&action=" . $action;
					header ("Location:" . $nexturl);
				}
			}
		}
	}

	function enregLan(){
		require("modele/lan.php");
		require("modele/tournois.php");
		
		setLan($_POST["nomlan"],$_POST["datedebutlan"],$_POST["datefinlan"],$_POST["adresselan"],$_POST["villelan"],$_POST["editor1"],$_POST["nbvisiteur"],$_POST["prixvisitelan"],$_POST["adressesite"],$_POST["adressewidget"],$_POST["nbTournois"],$_SESSION['profil']['IdUtilisateur']);
	}

	function tournois(){
		require("modele/lan.php");
		require("modele/tournois.php");
		
		$idLan = getIdLan($_POST["nomlan"],$_POST["datedebutlan"],$_POST["datefinlan"],$_POST["villelan"]);
		setTournois($_POST["prix"], $_POST["nbslot"],$idLan["IdLan"], $_POST["idjeu"]);
	}

	function verif_syntax_organisation($nomLan,$dateDebut,$dateFin,$adresseLan,$villeLan,$nbTournois,$nbVisiteurs,$prixVisite,$adresseSite,$description,$adresseWidget){
		if (!preg_match("#^[\sa-zA-Z0-9??????]{2,35}$#", $nomLan)) {
			return false;
		}
		if (!preg_match("#^[\sa-zA-Z0-9??????]{8,35}$#", $adresseLan)) {
			return false;
		}
		if (!preg_match("#^[A-Z]{1}[a-z??????]{1,20}$#", $villeLan)) {
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
	
	function reserver(){
		require("vue/layout/layout.tpl");
	}
?>
