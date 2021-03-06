/* script js */

/* PAGE CONNEXION */

var listeUtilisateurs = [];

// fonction anonyme qui permet de vérifier les champs saisis

(function(){
	$.getJSON("index.php?controle=compte&action=getUtilisateurs", function(data){
		listeUtilisateurs = data;
	});
})();

(function(){
	
	function reset(){ // pour reinitialiser l'état du formulaire
		var infobulles = document.querySelectorAll(".info-bulle");
		var controles = document.querySelectorAll(".controle");
		for (var i=0; i<infobulles.length; ++i){
			infobulles[i].style.display="none";
		}
		for (var i=0; i<controles.length; ++i){
			controles[i].style.marginBottom="3%"; // car le margin des infos bulles disparaissent après le none
		}
	}
			
	var fonctions_controle = {}; // tableau qui va stocker toutes les fonctions de contrôle
	
	function getInfoBulle(noeud){ // pour obtenir l'info-bulle correspondant au champ de saisi
		while (noeud = noeud.nextElementSibling){
			if (noeud.classList.contains("info-bulle")){
				return noeud;
			}
		}
	}	
	
	function modification_interactif(champ, etat_test) { // pour factoriser le code qui va suivre
		if (etat_test){ // si true, champ valide
			getInfoBulle(champ.parentNode).style.display = "none";
			champ.classList.remove("problem");
			champ.classList.add("correct");
			champ.parentNode.style.marginBottom="3%"; // car le margin des infos bulles disparaissent après le none
			return true;
		}
		else { // sinon, champ invalide
			getInfoBulle(champ.parentNode).style.display = "block";
			champ.classList.remove("correct");
			champ.classList.add("problem");
			champ.parentNode.style.marginBottom="0%"; // car le margin des infos bulles apparaissent après le block
			return false;
		}
	}
	
	// l'ensemble des fonctions de contrôle
	
	fonctions_controle['login'] = function(){
		var champ = document.getElementsByName("login")[0];
		var regex = /^[a-zA-Z0-9_]{3,15}$/;
		return modification_interactif(champ,regex.test(champ.value));
	};
	
	fonctions_controle['mdp'] = function(){
		var champ = document.getElementsByName("mdp")[0];
		var regex = /^[a-zA-Z0-9]{5,15}$/; // ajout de "doit avoir au moins une lettre et un chiffre"
		return modification_interactif(champ,regex.test(champ.value));
	};
	
	// fonction principale 
	
	(function() {
		
		var formulaire = document.getElementById("formulaire").firstElementChild;
		var champsSaisie = document.querySelectorAll("input[type=text], input[type=password]");
		for (var i=0; i<champsSaisie.length; ++i){ // on ajoute un événement à chaque saisi des zones de saisie
			champsSaisie[i].addEventListener("keyup",function(e){
				fonctions_controle[e.target.name]();
			});
		}
		
		formulaire.addEventListener("submit",function(e){ // si on valide le formulaire
			e.preventDefault(); // pour désactiver l'envoi (par défaut) du formulaire
			var etatForm = true;
		//	var submitButton = document.querySelector("button[type=submit]");
			for (var nameIndex in fonctions_controle){
				etatForm = fonctions_controle[nameIndex]() && etatForm; // on lance toutes les fonctions (et on modifie éventuellement etatForm)
			}
			if (etatForm){
				etatForm = verif_ident() && etatForm;
			}
		//	submitButton.disabled = etatForm?"false":"true"; // le bouton est désactivé si c'est mal rempli
			if (etatForm) { 
				formulaire.submit();
			}
		});

		formulaire.addEventListener("reset",function(){ // si on reset le formulaire
			for (var i=0; i<champsSaisie.length; ++i){
				champsSaisie[i].classList.remove("problem"); // on reinitialise tous les états graphiques
			}
			reset();
		});
		
	})();
	
	reset(); // on enlève toutes les info-bulles au début
	
})();

function verif_ident(){
	var champLogin = document.getElementsByName("login")[0];
	var champMdp = document.getElementsByName("mdp")[0];
	var etatChamp = false;
	$.each(listeUtilisateurs, function(i){
		if (listeUtilisateurs[i].Pseudo == champLogin.value && listeUtilisateurs[i].Password == champMdp.value){
			etatChamp = true;
		}
	});
	if (etatChamp){ // si true, champ valide
		document.getElementById("loginMdpIncorrect").style.display = "none";
		champLogin.classList.remove("problem");
		champLogin.classList.add("correct");
		return true;
	}
	else { // sinon, champ invalide
		document.getElementById("loginMdpIncorrect").style.display = "block";
		champLogin.classList.remove("correct");
		champLogin.classList.add("problem");
		champLogin.parentNode.style.marginBottom="0%";
		return false;
	}
}