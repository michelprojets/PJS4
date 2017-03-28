/* script js */

/* PAGE ORGANISATION */
///////////////////////////// Tournoi ////////////////////////
var listeJeux =[]
var listedesTournois =[]

var nomlan
var adresselan
var villelan
var editor1
var datedebutlan
var datefinlan
var nbvisiteur
var prixvisitelan
var adressesite
var adressewidget
var nbTournois

function tournoi(idjeu,nbslot,prix) {
    this.idjeu = idjeu;
    this.nbslot = nbslot;
    this.prix = prix;
}

$( function() {
  getJeux();


} );

function getJeux(){
	$.getJSON("index.php?controle=start&action=getJx", function(data){
		listeJeux = data;
    insererJeux();
	});
}

function insererJeux(){

  $('#jeuxselec option').remove() ;
  var select = $('#jeuxselec');
  if(select.prop) {
    var options = select.prop('options');
  }
  else {
    var options = select.attr('options');
  }

  $.each(listeJeux, function(i) {
    options[options.length] = new Option(listeJeux[i].NomJeu, listeJeux[i].IdJeu);
  });

}

function ajoutTn(){

  var tn = new tournoi($("#jeuxselec").val(),$("#nbslot").val(),$("#prixtournoi").val());
  listedesTournois.push(tn);
  afficherTn()
}

function afficherTn(){
  var msg = "";
  msg = $("#afficherTn").html()+" "+$("#jeuxselec").val()+" "+$("#nbslot").val()+" "+$("#prixtournoi").val()+"</br>" ;
  $("#afficherTn").html(msg) ;


}

function enregistrerLan(){
	console.log("enrelan");
	nomlan = $("#nomlan").val();
	adresselan = $("#adresselan").val();
	villelan = $("#villelan").val();
	editor1 = $("#editor1").val();
	datedebutlan = $("#datedebutlan").val();
	datefinlan= $("#datefinlan").val();
	nbvisiteur = $("#nbvisiteur").val();
	prixvisitelan = $("#prixvisitelan").val();
	adressesite = $("#adressesite").val();
	adressewidget =$("#adressewidget").val();
	nbTournois = listedesTournois.length;
	console.log( nomlan);
    console.log(villelan);
    console.log(datefinlan);
    console.log(prixvisitelan);
    console.log(villelan);
	console.log(nbTournois);


	var dataObje={
		nomlan : nomlan,
		adresselan : adresselan,
		villelan : villelan,
		editor1 : editor1,
		datedebutlan :   datedebutlan,
		datefinlan : datefinlan,
		nbvisiteur :nbvisiteur,
		prixvisitelan :   prixvisitelan,
		adressesite : adressesite,
		adressewidget : adressewidget,
		nbTournois : nbTournois
	};
  console.log("postenrelan");
$.post("index.php?controle=gestion&action=enregLan", dataObje ,retourlan);

}

  function enregistrertournois(){

    var tetetet = $("#nomlan").val();
    console.log("azeazzarzrar");


    $.each(listedesTournois,function(i){
			//var json = JSON.stringify( tabEmplacementEnregistre[i] );
      console.log("listetlan");
			var dataObject={
				idjeu : listedesTournois[i].idjeu,
				nbslot : listedesTournois[i].nbslot,
				prix : listedesTournois[i].prix,
        nomlan : nomlan,
        adresselan : adresselan,
        villelan : villelan,
        editor1 : editor1,
        datedebutlan :   datedebutlan,
        datefinlan : datefinlan,
        nbvisiteur :nbvisiteur,
        prixvisitelan :   prixvisitelan,
        adressesite : adressesite,
        adressewidget : adressewidget

			};
      console.log("postlistetlan");
		$.post("index.php?controle=gestion&action=tournois", dataObject ,retourfonct);
	});
}

function retourlan(){

  enregistrertournois();
}

function retourfonct(){

	console.log("NICE");
}



//////////////////////////////////
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

	fonctions_controle['nomLan'] = function(){
		var champ = document.getElementsByName("nomLan")[0];
		var regex = /^[\sa-zA-Z0-9éèùîàô]{2,35}$/;
		return modification_interactif(champ,regex.test(champ.value));
	};

	fonctions_controle['adresseLan'] = function(){
		var champ = document.getElementsByName("adresseLan")[0];
		var regex = /^[\sa-zA-Z0-9éèùîàô]{8,35}$/;
		return modification_interactif(champ,regex.test(champ.value));
	};

	fonctions_controle['villeLan'] = function(){
		var champ = document.getElementsByName("villeLan")[0];
		var regex = /^[A-Z]{1}[a-zéèùîàô]{1,20}$/;
		return modification_interactif(champ,regex.test(champ.value));
	};

	fonctions_controle['description'] = function(){
		var champ = document.getElementsByName("description")[0];
		var etatChamp = true;
		if (champ.value.length < 10 || champ.value.length > 1000){
			etatChamp = false;
		}
		return modification_interactif(champ,etatChamp);
	};

	fonctions_controle['dateDebut'] = function(){
		var champ = document.getElementsByName("dateDebut")[0];
		var date_normalisee;
		var date_maintenant = new Date();
		var regexInit = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
		var regexFinal = /^[0-9]{4}-[0-9]{2}\-[0-9]{2}$/;
		if (regexInit.test(champ.value)){
			var tabChamp = champ.value.split("/");
			date_normalisee = tabChamp[2] + "-" + tabChamp[1] + "-" + tabChamp[0];
		}
		else{
			date_normalisee = champ.value;
		}
		var date = new Date(date_normalisee);
		var etatChamp = regexFinal.test(date_normalisee) && (date.getTime() > date_maintenant.getTime());
		return modification_interactif(champ,etatChamp);
	};

	fonctions_controle['dateFin'] = function(){
		var champ = document.getElementsByName("dateFin")[0];
		var date_normalisee;
		var date_maintenant = new Date();
		var regexInit = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
		var regexFinal = /^[0-9]{4}-[0-9]{2}\-[0-9]{2}$/;
		if (regexInit.test(champ.value)){
			var tabChamp = champ.value.split("/");
			date_normalisee = tabChamp[2] + "-" + tabChamp[1] + "-" + tabChamp[0];
		}
		else{
			date_normalisee = champ.value;
		}
		var date = new Date(date_normalisee);
		var etatChamp = regexFinal.test(date_normalisee) && (date.getTime() > date_maintenant.getTime());
		return modification_interactif(champ,etatChamp);
	};

	fonctions_controle['respectDebutFin'] = function(){
		var champDebut = document.getElementsByName("dateDebut")[0];
		var champFin = document.getElementsByName("dateFin")[0];

		if (fonctions_controle['dateDebut']() && fonctions_controle['dateFin']()){ // si on a renseigné correctement les deux dates
			var dateDebut = new Date(champDebut.value);
			var dateFin = new Date(champFin.value);
			if (dateDebut.getTime() <= dateFin.getTime()){
				document.getElementById("respectDebutFin").style.display = "none";
				champFin.classList.remove("problem");
				champFin.classList.add("correct");
				return true;
			}
			else {
				document.getElementById("respectDebutFin").style.display = "block";
				champFin.classList.remove("correct");
				champFin.classList.add("problem");
				champFin.parentNode.style.marginBottom="0%";
				return false;
			}
		}
		else {
			document.getElementById("respectDebutFin").style.display = "none";
			champFin.classList.remove("problem");
			champFin.classList.add("correct");
			return true; // pour ne pas afficher cette erreur s'il s'agit d'une erreur de syntaxe
		}
	};

	fonctions_controle['nbVisiteurs'] = function(){
		var champ = document.getElementsByName("nbVisiteurs")[0];
		var regex = /^[0-9]+$/;
		var etatChamp = false;
		if (regex.test(champ.value)){
			if (parseInt(champ.value) >= 10 && parseInt(champ.value) <= 10000){
				etatChamp = true;
			}
		}
		return modification_interactif(champ,etatChamp);
	};

	fonctions_controle['prixVisite'] = function(){
		var champ = document.getElementsByName("prixVisite")[0];
		var regex = /^[0-9]+[.]{1}[0-9]{2}$/;
		return modification_interactif(champ,regex.test(champ.value));
	};

	fonctions_controle['adresseSite'] = function(){
		var champ = document.getElementsByName('adresseSite')[0];
		var regex = /^((http|https):\/\/){1}(www[.])?([a-zA-Z0-9]|-)+([.][a-zA-Z0-9(-|\/|=|?)?]+)+$/;
		return modification_interactif(champ,regex.test(champ.value));
	};

	fonctions_controle['adresseWidget'] = function(){
		var champ = document.getElementsByName('adresseWidget')[0];
		var regex = /^((http|https):\/\/){1}(www[.])?([a-zA-Z0-9]|-)+([.][a-zA-Z0-9(-|\/|=|?)?]+)+$/;
		return modification_interactif(champ,regex.test(champ.value));
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

		document.getElementsByName('dateDebut')[0].addEventListener("keyup",function(e){
				fonctions_controle['respectDebutFin']();
		});

		document.getElementsByName('dateFin')[0].addEventListener("keyup",function(e){
				fonctions_controle['respectDebutFin']();
		});

		formulaire.addEventListener("submit",function(e){ // si on valide le formulaire
			e.preventDefault(); // pour désactiver l'envoi (par défaut) du formulaire
			var etatForm = true;
		//	var submitButton = document.querySelector("button[type=submit]");
			for (var nameIndex in fonctions_controle){
				etatForm = fonctions_controle[nameIndex]() && etatForm; // on lance toutes les fonctions (et on modifie éventuellement etatForm)
			}
		//	submitButton.disabled = etatForm?"false":"true"; // le bouton est désactivé si c'est mal rempli
			if (etatForm) {
				enregistrerLan();
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
