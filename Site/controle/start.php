<?php

	function accueil(){
		require("vue/layout/layout.tpl");

	}

	function getNomLans(){
		require("modele/lan.php");
		print json_encode(getLans());

	}
	function getJx(){
		require("modele/jeu.php");
		print json_encode(getJeux());
	}
	function getTourns(){
		require("modele/tournois.php");
		print json_encode(getTournois());
	}

/* fonctionne pas
	function getLansParNomJeu(){
		require("modele/jeu.php");
		require("modele/lan.php");

		$nbJeux = getNbrJeu();
		$jeux = array();
		$jeux = getJeux();
		$LansParNomJeu = array();

		// on récupère les noms de tous les jeux
		for ($i=0; $i<$nbJeux; $i++) {
			//$idLansParNomJeu[i]['nomJeu'] = $jeux[i]['NomJeu'];
			$LansParNomJeu[i] = $jeux[i]['NomJeu'];
		}

		// on récupère les lans pour chaque nom de jeu
		for ($i=0; $i<$nbJeux; $i++) {
			$lans =  array();
			$lans = getLansJeu($LansParNomJeu[i]);
			//$idsLan =  array();
			for ($j=0; $j< count($lans) ; $i++) {
				$LansParNomJeu[i][j] = $lans[j];
			}
		foreach ($lans as $lan) {
				$idsLan[] = $lan['IdLan'];
			}
			//$idLansParNomJeu[i]['idLans'] = $idsLan;
		}
		print json_encode($LansParNomJeu);
	}
*/
?>
