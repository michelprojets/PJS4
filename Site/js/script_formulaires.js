/* script js */

/* POUR LES FORMULAIRES */

// fonction anonyme qui permet de vérifier les champs saisis

(function(){
	
	function reset(){ // pour reinitialiser l'état du formulaire
		var infobulles = document.querySelectorAll(".info-bulle");
		var controles = document.querySelectorAll(".controle");
		for (var i=0; i<infobulles.length; ++i){
			infobulles[i].style.display="none";
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
		var regex = /^[a-zA-Z0-9_]{5,15}$/; // ajout de "doit avoir au moins une lettre et un chiffre"
		return modification_interactif(champ,regex.test(champ.value));
	};
	
	fonctions_controle['confirmation_mdp'] = function(){
		var champ = document.getElementsByName("confirmation_mdp")[0];
		var champModele = document.getElementsByName("mdp")[0];
		var etatChamp = (champ.value == champModele.value) && (champ.value != "");
		return modification_interactif(champ,etatChamp);
	};
	
	fonctions_controle['nom'] = function(){
		var champ = document.getElementsByName("nom")[0];
		var regex = /^[a-zA-Zéèùîà]{2,35}$/;
		return modification_interactif(champ,regex.test(champ.value));
	};
	
	fonctions_controle['prenom'] = function(){
		var champ = document.getElementsByName("prenom")[0];
		var regex = /^[a-zA-Zéèùîà]{2,35}$/;
		return modification_interactif(champ,regex.test(champ.value));
	};
	
	fonctions_controle['mail'] = function(){
		var champ = document.getElementsByName("mail")[0];
		var regex = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
		return modification_interactif(champ,regex.test(champ.value));
	};
	
	fonctions_controle['date_naissance'] = function(){
		var champ = document.getElementsByName("date_naissance")[0];
		var date = new Date(champ.value);
		var annee = parseInt(date.getFullYear());
		var etatChamp = (!isNaN(annee)) && (annee >= annee_min_naissance) && (annee <= annee_max_naissance);
		return modification_interactif(champ,etatChamp);
	};
	
	fonctions_controle['sexe'] = function(){
		var champ = document.getElementById("sexe");
		var etatChamp = !(champ.options[champ.selectedIndex].innerHTML=="Sélectionner votre sexe");
		return modification_interactif(champ,etatChamp);
	};
	
	// fonction principale 
	
	(function() {
		
		var formulaire = document.getElementById("formulaire").firstElementChild;
		var champsSaisie = document.querySelectorAll("input[type=text], input[type=password], input[type=date]");
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
		//	submitButton.disabled = etatForm?"false":"true"; // le bouton est désactivé si c'est mal rempli
			if (etatForm) { alert("formulaire bien rempli"); }; // à enlever plus tard
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