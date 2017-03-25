/* script js */

/* PAGE ACCUEIL */

var listeLans =[];
var listeTournois=[];
var listeJeux =[];

// var listeLansParNomJeu =[];

var listeNomLans =[];
var listeNomJeux =[];
var tags;


$(function() {
	getJeux();
	getLans();
	getTournoi();
//  getLansParJeu();
});

function startAuto(){
	if(tags == null){
		getNomAuto();
		ajoutNomJeuTags();
		autocompletion();
		rechercheMot();
	}
}

function getLans(){

	$.getJSON("index.php?controle=start&action=getNomLans", function(data){
		listeLans = data;
	});

}

function getTournoi(){

	$.getJSON("index.php?controle=start&action=getTourns", function(data){
		listeTournois = data;
	});
}

function getJeux(){
	$.getJSON("index.php?controle=start&action=getJx", function(data){
		listeJeux = data;
	});
}

/*
function getLansParJeu(){

	$.getJSON("index.php?controle=start&action=getLansParNomJeu", function(data){
		listeLansParNomJeu = data;
	});
}
*/

function getNomAuto(){
	$.each(listeLans, function(i){
		listeNomLans.push(listeLans[i].NomL);
	});
	$.each(listeJeux, function(i){
		listeNomJeux.push(listeJeux[i].NomJeu);
	});
}

function ajoutNomJeuTags(){
	tags = listeNomLans.concat(listeNomJeux);
}

function autocompletion(){

	$('#barre_recherche input').autocomplete({
		source: tags
	});

}

function rechercheMot(){
	var carousel = document.getElementById('carousel-example-generic');
	var barreRecherche = document.querySelector('#barre_recherche input');
	var boutonRecherche = document.querySelector('#barre_recherche button');
	
	barreRecherche.addEventListener('keypress', function(e){
		if (e.keyCode == 13){ // touche entrée
			boutonRecherche.click();
		}
	});
			

	boutonRecherche.addEventListener('click', function(e){
		e.preventDefault();
		removeAllCases();
		var mot = barreRecherche.value;
		var listeidLanTr =[] ;
		var idJeuduTag;
		var valide = false;
		for (tag of listeNomLans){
			if (tag == mot){
				valide = true;
				carousel.style.display = 'none';
				for (lan of listeLans){
					if (lan.NomL == mot){
						creationCase(lan.IdLan);
						break;
					}
				}
			}
		}

		for (tag of listeJeux){
			if (tag.NomJeu == mot){
				valide = true;
				idJeuduTag =tag.IdJeu ;

				carousel.style.display = 'none';

				$.each(listeTournois,function(i){
					if(listeTournois[i].IdJeu ==idJeuduTag ){
						listeidLanTr.push(listeTournois[i].IdLan);
					}
				});
				$.each(listeidLanTr,function(i){
					creationCase(listeidLanTr[i]);
				});
			}
		}
		if (!valide){ // si le mot rentré dans la barre de recherche n'est pas un mot de tag
			carousel.style.display = 'none';
			var divLan = document.createElement('div');
			divLan.id = 'aucun_resultat';
			divLan.classList.add('lan');
			divLan.classList.add('row');
			var info = document.createElement('span');
			info.classList.add('col-sm-offset-4');
			info.classList.add('col-sm-4');;
			info.appendChild(document.createTextNode("Aucune LAN ne correspond à votre recherche"));
			divLan.appendChild(info);
			document.getElementById('lans_recherche').appendChild(divLan);
		}
	});
}

function removeAllCases(){
	divLans = document.getElementById('lans_recherche');
	var divLan;
	if (divLans.hasChildNodes()){
		while (divLan = divLans.firstElementChild.nextElementSibling){
			divLans.removeChild(divLan);
		}
		divLans.removeChild(divLans.firstElementChild);
	}
}

function creationCase(idLan){

	for (lan of listeLans){
		if (lan.IdLan == idLan){
			var divLan = document.createElement('div');
			divLan.classList.add('lan');
			divLan.classList.add('row');


			var titre = document.createElement('span');
			titre.classList.add("col-sm-offset-1")
			titre.classList.add("col-sm-4");
			titre.appendChild(document.createTextNode("Nom : " + lan.NomL));

			var dateLan = document.createElement('span');
			dateLan.classList.add('col-sm-offset-1');
			dateLan.classList.add('col-sm-2');
			var tabDate = lan.DateDebut.split("-");
			var date_normalisee = tabDate[2] + "/" + tabDate[1] + "/" + tabDate[0];
			dateLan.appendChild(document.createTextNode("Date : " + date_normalisee));

			var adresse = document.createElement('span');
			adresse.classList.add('col-sm-offset-1');
			adresse.classList.add('col-sm-2');
			adresse.appendChild(document.createTextNode("Adresse : " + lan.VilleLAN));

			var debutDescription = document.createElement('blockquote');
			var italique = document.createElement('em');
			debutDescription.id = "description";
			debutDescription.classList.add('col-sm-offset-1');
			debutDescription.classList.add('col-sm-10');
			italique.appendChild(document.createTextNode("Description : " + ((lan.Description.length>200)?(lan.Description.substring(0,200)+"..."):lan.Description)));
			debutDescription.appendChild(italique);
			
			divLan.appendChild(titre);
			divLan.appendChild(dateLan);
			divLan.appendChild(adresse);
			divLan.appendChild(debutDescription);
			
			divLan.addEventListener('mouseover', function(){
				divLan.classList.add('mouse-over');
			});
			divLan.addEventListener('mouseout', function(){
				divLan.classList.remove('mouse-over');
			});
			divLan.addEventListener('click', function(){
				document.location.href="index.php?controle=lan&action=afficherLan&param="+idLan;
			});

			document.getElementById('lans_recherche').appendChild(divLan);
		}
	}
	
}
