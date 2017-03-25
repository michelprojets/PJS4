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
				else { // on regarde s'il existe dans la base
					require("./modele/lan.php");
					$idUser = setLan($nomLan,$dateDebut,$dateFin,$adresseLan,$nbTournois,$nbVisiteurs,$prixVisite,$adresseSite,$description);

					$controle = "start";
					$action = "accueil";
					$nexturl = "index.php?controle=" . $controle . "&action=" . $action;
					header ("Location:" . $nexturl);
				}
			}
		}
	}
	
	function tournois(){
		
	}
	
	function verif_syntax_organisation($nomLan,$dateDebut,$dateFin,$adresseLan,$villeLan,$nbTournois,$nbVisiteurs,$prixVisite,$adresseSite,$description){
		return true;
	}
?>