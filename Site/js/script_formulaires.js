/* script js */

/* POUR LES FORMULAIRES */

// fonction anonyme qui permet de v�rifier les champs saisis

(function(){
	
	function reset(){ // pour reinitialiser l'�tat du formulaire
		var infobulles = document.querySelectorAll(".info-bulle");
		var controles = document.querySelectorAll(".controle");
		for (var i=0; i<infobulles.length; ++i){
			infobulles[i].style.display="none";
			controles[i].style.marginBottom="3%"; // car le margin des infos bulles disparaissent apr�s le none
		}
	}
			
	var fonctions_controle = {}; // tableau qui va stocker toutes les fonctions de contr�le
	
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
			champ.parentNode.style.marginBottom="3%"; // car le margin des infos bulles disparaissent apr�s le none
			return true;
		}
		else { // sinon, champ invalide
			getInfoBulle(champ.parentNode).style.display = "block";
			champ.classList.remove("correct");
			champ.classList.add("problem");
			champ.parentNode.style.marginBottom="0%"; // car le margin des infos bulles apparaissent apr�s le block
			return false;
		}
	}
	
	// l'ensemble des fonctions de contr�le
	
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
		var regex = /^[a-zA-Z�����]{2,35}$/;
		return modification_interactif(champ,regex.test(champ.value));
	};
	
	fonctions_controle['prenom'] = function(){
		var champ = document.getElementsByName("prenom")[0];
		var regex = /^[a-zA-Z�����]{2,35}$/;
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
		var etatChamp = !(champ.options[champ.selectedIndex].innerHTML=="S�lectionner votre sexe");
		return modification_interactif(champ,etatChamp);
	};
	
	// fonction principale 
	
	(function() {
		
		var formulaire = document.getElementById("formulaire").firstElementChild;
		var champsSaisie = document.querySelectorAll("input[type=text], input[type=password], input[type=date]");
		for (var i=0; i<champsSaisie.length; ++i){ // on ajoute un �v�nement � chaque saisi des zones de saisie
			champsSaisie[i].addEventListener("keyup",function(e){
				fonctions_controle[e.target.name]();
			});
		}
		
		formulaire.addEventListener("submit",function(e){ // si on valide le formulaire
			e.preventDefault(); // pour d�sactiver l'envoi (par d�faut) du formulaire
			var etatForm = true;
		//	var submitButton = document.querySelector("button[type=submit]");
			for (var nameIndex in fonctions_controle){
				etatForm = fonctions_controle[nameIndex]() && etatForm; // on lance toutes les fonctions (et on modifie �ventuellement etatForm)
			}
		//	submitButton.disabled = etatForm?"false":"true"; // le bouton est d�sactiv� si c'est mal rempli
			if (etatForm) { alert("formulaire bien rempli"); }; // � enlever plus tard
		});
		
		formulaire.addEventListener("reset",function(){ // si on reset le formulaire
			for (var i=0; i<champsSaisie.length; ++i){
				champsSaisie[i].classList.remove("problem"); // on reinitialise tous les �tats graphiques
			}
			reset();
		});
		
		
	})();
	
	reset(); // on enl�ve toutes les info-bulles au d�but
	
})();