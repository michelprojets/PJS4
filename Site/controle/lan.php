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



?>
