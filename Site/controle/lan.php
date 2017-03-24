<?php

  function afficherLan($idlan){
    require("modele/lan.php");
    $lanPage= array();
    $lanPage=getLan($idlan);
    if(!empty($lanPage)){
      require("vue/layout/layout.tpl");
    }
    else{
      header('Location: index.php?controle=erreur&action=pasdeLan');
    }
  }

  function afficherTournois($idl){
    require("modele/tournois.php");
    require("modele/jeu.php");
    $jeu =array();
    $tournoisLan = array();
    $tournoisLan = getTournoisByLan($idl);

    foreach($tournoisLan as $element){
      $jeu = getJeu($element['IdJeu']);
      require("vue/lan/afficherTournoi.tpl");
    }
  }

  function afficherCheckNotif($idlan){
	require("modele/estinscrit.php");
	$listeInscriptions = array();
	$listeInscriptions = getEstInscrit();
	$existeDeja = false;
	foreach($listeInscriptions as $inscription){
		if ($inscription['IdUtilisateur'] == $_SESSION['profil']['IdUtilisateur'] && $inscription['IdLan'] == $idlan){
			$existeDeja = true;
		}
	}
    if(isset ($_SESSION['profil']['Pseudo']) && !$existeDeja){
      require("vue/lan/afficherCheck.tpl");
    }
  }

  function recevoirNotif(){
    require("modele/estinscrit.php");
    if($_POST['notif'] == "ok"){
      setEstInscrit($_SESSION['profil']['IdUtilisateur'], $_GET['param']);
	  header('Location: index.php?controle=start&action=accueil');
    }
	else {
		header('Location: index.php?controle=lan&action=afficherLan&param=' . $_GET['param']);
	}
  }

?>
