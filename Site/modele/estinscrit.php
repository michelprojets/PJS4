<?php

	function getEstInscrit(){
		require("connect.php");
		$r=array();
		$reponse = $bdd->query('SELECT * FROM estinscrit');
		while ($donnees = $reponse->fetch())
		{
			$r[]=$donnees;
		}
		$reponse->closeCursor();
		return $r;

	}



	function setEstInscrit($IdUser, $idLan){
		require("connect.php");
		$reponse = $bdd->prepare("INSERT INTO estinscrit(IdUtilisateur, IdLan) VALUES (:IdU, :IdL)");
		$reponse->execute(array('IdU' => $IdUser,'IdL' => $idLan));
	}

  function getNbestinscrit(){
    require("connect.php");
    $reponse = $bdd->query("SELECT COUNT(*) as nb FROM  estinscrit");
    return $donnees = $reponse->fetch();

  }




?>
