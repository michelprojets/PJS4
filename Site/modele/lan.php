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
	
	function getIdLan($nom,$dated,$datef,$adres,$nbt,$nbv,$prixv,$adressS,$desc,$adressW){
		require("connect.php");
		$reponse = $bdd->prepare("SELECT IdLan FROM LAN WHERE NomL = :NomL and DateDebut =:DateDebut and DateFin =:DateFin and AdresseLan =:AdresseLan and NbTournois =:NbTournois and Nbvisiteurs =:Nbvisiteurs and PrixVisite =:PrixVisite and AdresseSite =:AdresseSite and Description =:Description and AdresseWidget =:AdresseWidget");
		$reponse->execute(array('NomL' => $nom,'DateDebut' => $dated ,'DateFin' => $datef ,'AdresseLan'=>$adres  ,'NbTournois'=>$nbt,'Nbvisiteurs'=>$nbv,'PrixVisite'=>$prixv,'AdresseSite'=>$adressS,'Description'=>$desc, 'AdresseWidget'=>$adressW));
		return $donnees = $reponse->fetch();
	}

	function setLan($nom,$dated,$datef,$adres,$nbt,$nbv,$prixv,$adressS,$desc,$adressW){
		require("connect.php");
		$reponse = $bdd->prepare("INSERT INTO LAN (NomL, DateDebut, DateFin, AdresseLan, NbTournois, Nbvisiteurs, PrixVisite, AdresseSite, Description, AdresseWidget)
		VALUES (:NomL, :DateDebut, :DateFin, :AdresseLan, :NbTournois, :Nbvisiteurs, :PrixVisite, :AdresseSite, :Description, :AdresseWidget)");
		$reponse->execute(array('NomL' => $nom,'DateDebut' => $dated ,'DateFin' => $datef ,'AdresseLan'=>$adres  ,'NbTournois'=>$nbt,'Nbvisiteurs'=>$nbv,'PrixVisite'=>$prixv,'AdresseSite'=>$adressS,'Description'=>$desc, 'AdresseWidget'=>$adressW));

	}

	function getNbrLan(){
		require("connect.php");
		$reponse = $bdd->query("SELECT COUNT(*) as nb FROM LAN");
		return $donnees = $reponse->fetch();

	}






?>
