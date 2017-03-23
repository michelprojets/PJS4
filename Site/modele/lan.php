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


	function setLan($nom,$dated,$datef,$adres,$nbt,$nbv,$prixv,$adressS,$desc){
		require("connect.php");
		$idLAN = getNbrlAN()+1 ;
		$reponse = $bdd->prepare("INSERT INTO LAN (IdLan, NomL, DateDebut, DateFin, AdresseLan, NbTournois, Nbvisiteurs, PrixVisite, AdresseSite, Description)
		VALUES (:IdLan, :NomL, :DateDebut, :DateFin, :AdresseLan, :NbTournois, :Nbvisiteurs, :PrixVisite, :AdresseSite, :Description)");
		$reponse->execute(array('IdLan' => $idLAN ,'NomL' => $nom,'DateDebut' => $dated ,'DateFin' => $datef ,'AdresseLan'=>$adres  ,'NbTournois'=>$nbt,'Nbvisiteurs'=>$nbv,'PrixVisite'=>$prixv,'AdresseSite'=>$adressS,' Description'=>$desc));

	}

	function getNbrLan(){
		require("connect.php");
		$reponse = $bdd->query("SELECT COUNT(*) as nb FROM LAN");
		return $donnees = $reponse->fetch();

	}






?>
