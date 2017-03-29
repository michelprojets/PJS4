<?php

	function getLans(){
		require("connect.php");
		$r=array();
		$reponse = $bdd->query('SELECT * FROM Lan');
		while ($donnees = $reponse->fetch())
		{
			$r[]=$donnees;
		}
		$reponse->closeCursor();
		return $r;

	}

	function getLansJeu($Jeu){
		require("connect.php");
		require("tournois.php");
		$ListeLan = getIdLansJeu($jeu);
		$r=array();

		while ($donnees = $ListeLan->fetch())
		{
			$r[]=getLan($donnees['IdLan']);
		}

		return $r;
	}

	function getLan($id){
		require("connect.php");
		$reponse = $bdd->prepare("SELECT * FROM LAN WHERE IdLan =:Id");
		$reponse->execute(array('Id' => $id));
		return $donnees = $reponse->fetch();
	}

	function getIdLan($nom,$dated,$datef,$ville){
		require("connect.php");
		$reponse = $bdd->prepare("SELECT IdLan FROM LAN WHERE NomL = :NomL and DateDebut =:DateDebut and DateFin =:DateFin and VilleLAN =:Ville ");
		$reponse->execute(array('NomL' => $nom,'DateDebut' => $dated ,'DateFin' => $datef ,'Ville'=>$ville));
		return $donnees = $reponse->fetch();
	}

	function setLan($nom,$dated,$datef,$adres,$ville,$desc,$nbv,$prixv,$adressS,$adressW,$nbTournois,$idOrganisateur){
		require("connect.php");
		$reponse = $bdd->prepare("INSERT INTO LAN (NomL, DateDebut, DateFin, AdresseLan,VilleLAN,NbTournois,NbVisiteurs, PrixVisite, AdresseSite, Description, AdresseWidget,IdOrganisateur)
		VALUES (:NomL, :DateDebut, :DateFin, :AdresseLan, :ville, :nbTournois, :NbVisiteurs, :PrixVisite, :AdresseSite, :Description, :AdresseWidget, :IdOrganisateur)");
		$reponse->execute(array('NomL' => $nom,'DateDebut' => $dated ,'DateFin' => $datef ,'AdresseLan'=>$adres  ,'ville'=>$ville,'nbTournois'=>$nbTournois,'NbVisiteurs'=>$nbv,'PrixVisite'=>$prixv,'AdresseSite'=>$adressS,'Description'=>$desc, 'AdresseWidget'=>$adressW, 'IdOrganisateur'=>$idOrganisateur));

	}

	function getNbrLan(){
		require("connect.php");
		$reponse = $bdd->query("SELECT COUNT(*) as nb FROM LAN");
		return $donnees = $reponse->fetch();

	}

?>
