<?php

	function connexion(){
		
		$pseudo= isset($_POST['login'])?($_POST['login']):'';
		$mdp= isset($_POST['mdp'])?($_POST['mdp']):'';	
		
		//$profil =array();
		//on doit verifier si la personne est dans la base
		if (count($_POST)==0){
			require("./vue/layout/layout.tpl") ;
		}
		else{ // vérification d'abord s'il y a erreur de syntaxe
			if (!verif_syntax($pseudo, $mdp)){
				require("vue/layout/layout.tpl");
				require("vue/compte/connexion.tpl") ;
			}
			else { // on regarde s'il existe dans la base
				require("./modele/utilisateur.php");
				$res = verif_user($pseudo,$mdp);
				
				if ($res == 0) {
					require("vue/layout/layout.tpl");
					require("vue/compte/connexion.tpl");
				}
				else { //on doit choisir entre afficher etudiant ou prof
				//	$_SESSION['profil'] = $profil;
					$controle = "start";
					$action = "accueil";
					$nexturl = "index.php?controle=" . $controle . "&action=" . $action;
					header ("Location:" . $nexturl);
				}
				
			}	
		}		
	}		
	
	function inscription(){
		// à remplir
		require("./vue/layout/layout.tpl");
	}
		

	function verif_syntax($pseudo, $mdp){
		if (!preg_match("#^[a-zA-Z0-9_]{3,15}$#", $pseudo)) {
			return false;
		}
		if (!preg_match("#^[a-zA-Z0-9]{5,15}$#", $mdp)) {
			return false;
		}
		return true;
	}	
	
	
?>