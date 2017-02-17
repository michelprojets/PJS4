/* script js */

/* PAGE INSCRIPTION */

// fonction anonyme qui permet d'écrire l'année maximum dans le champ date de naissance

var ageMin = 5;
var ageMax = 80;
var date = new Date();
var annee_min_naissance = date.getFullYear()-ageMax;
var annee_max_naissance = date.getFullYear()-ageMin; // minimum 5 ans

(function(){
	var span_naissance = document.getElementsByName("date_naissance")[0].parentNode.nextElementSibling;
	span_naissance.innerHTML += " " + annee_min_naissance + " et " + annee_max_naissance + " (vous devez avoir entre " + ageMin + " et " + ageMax + " ans)";
})();
