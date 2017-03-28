




// Nearby Search --> API hotels FAIT
// ajouter reversed geocode pour avoir coordonn�es des lans et les placer sur la carte � partir de leurs adresses FAIT
// Faire div "d�tail" contenant la description de l'h�tel/Lan ||| bloqu� pour photo, utiliser google sreet view

//https://developers.google.com/maps/documentation/streetview/intro?hl=fr



var listeLans = [];

var geocoder = new google.maps.Geocoder(); // pour geocoding
var adrLan;  // Par defaut Paris, va permettre de placer toutes les lans
var address; // va contenir l'adresse des lan
var adrMaison; //va contenir adr de depart (geoloc)

var adrtest;

var map = new google.maps.Map(document.getElementById('idMapTtesLesLans'), {
	zoom:10,  //zoom ideal = 3 ou 2
	center : adrLan
});

var directionsService = new google.maps.DirectionsService;
var directionsDisplay = new google.maps.DirectionsRenderer;



window.onload = function() {
				//var adr = document.getElementById('adre');
				
				geoloc();
				getLans(); // on r�cup�re toutes les lans

}



function initMap() {
	
	var j;
	var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);
    var onChangeHandler = function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    //document.getElementById('modeDeTransport').addEventListener('change', onChangeHandler);

	 // pour convertir adresse en coordonn�es ( et eventuellement poser un marqueur)
	 //faire boucle avec adresses lans BD
	 //codeAddress('avenue kleber Trappes FR'); // rue ville pays
	 console.log("debut for");
	 console.log(listeLans.length)
	 for(j=0;j<listeLans.length;j++){
		//codeAddress("" + listeLans[j].AdresseLan + " " +listeLans[j].VilleLAN + " " + listeLans[j].Pays, listeLans[j]  ); // on rajoute l objet au cas ou on utilise ses donnees
		//console.log("YOYOOYOYOYO ");// + listeLans[j]);
		console.log("" + listeLans[j].AdresseLan + " " +listeLans[j].VilleLAN + "        " +listeLans[j]);
		codeAddress("" + listeLans[j].AdresseLan + ", " +listeLans[j].VilleLAN, listeLans[j]  ); // on rajoute l objet au cas ou on utilise ses donnees
	 }
	 //geoloc();

}

// requete ajax pour recuperer les donnees des lans dans la base de donn�es
function getLans(){

	console.log("debut ajax");
	$.getJSON("index.php?controle=start&action=getNomLans", function(data){
		listeLans = data;
		console.log(listeLans);
		initMap();
	});


}

function codeAddress(adr, lan) {
	var inf = new google.maps.InfoWindow;
    address = adr;//'1 rue hedouin Meudon, FR'; //document.getElementById("address").value; //1 rue h�douin Meudon, FR [sous cette forme]
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);

		// sauvegarde de la nouvelle adresse
		adrLan = results[0].geometry.location;


		//apparition des hotels au clic
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location

        });

		//google.maps.event.addListener(marker, 'click', loshotelosAvecAmadeus(results[0].geometry.location));	on met pas les hotels

		/*google.maps.event.addListener(marker, 'click', function(){

			geoloc();
			calculateAndDisplayRoute(directionsService, directionsDisplay, address);

		});*/



		// d�tail hotel avec mouseover
		var detail = lan.NomL;
		detail+="<p> Adresse : " + lan.AdresseLan;
		detail+="</br>Du " + lan.DateDebut +" au " + lan.DateFin;
		detail+="</br>Prix : " + lan.PrixVisite + " </p>";


		var infowindow = new google.maps.InfoWindow({
			content: detail
		});
		google.maps.event.addListener(marker, 'mouseover', function() {
			var description = document.getElementById('infoMapTtesLesLans');
				if(description.innerHTML.indexOf(lan.NomL) == -1){
					var niveauGris = 144;
					
					infowindow.setContent(detail);
					infowindow.open(map, this);
					description.innerHTML = htmlDesc(lan);
					var r = niveauGris;
					var g = niveauGris;
					var b = niveauGris;
					
					var idTimer = setInterval(changeStyle, 10);
					var descente = false;
					function changeStyle(){
						
						if (!descente){
							r += 1;
							g += 1;
							b += 1;
							if (r == 200){
								descente = true;
							}
						}
						else {
							r -= 1;
							g -= 1;
							b -= 1;
							if (r == niveauGris+2){
								clearTimeout(idTimer);
							}
							
						}
						
						description.style.backgroundColor = "rgb("+r+","+g+","+b+")";
					}
					
				}
			
		});
		

		google.maps.event.addListener(marker, 'mouseout', function() {
			infowindow.close(map,this);
			var description = document.getElementById('infoMapTtesLesLans');
		});

      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
}
// remplissage info lan
function htmlDesc(lan)
{

		var q = lan.NomL;
		q+="</br> <a href= index.php?controle=lan&action=afficherLan&param=" + lan.IdLan + ">" + "Voir La Lan" + "</a>";
		q+="</br> Adresse : " + lan.AdresseLan+ " " + lan.VilleLan;
		q+="</br>Du " + lan.DateDebut +" au " + lan.DateFin;
		q+="</br>Prix : " + lan.PrixVisite;
		q+="</br>Site : ";
		q+= "<a href=https://"+lan.AdresseSite+">"+lan.AdresseSite+"</a>";
		q+= "</br>" + lan.Description;
		q+="</br>";

		return q;
}

function geoloc(){
	var inf = new google.maps.InfoWindow;
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
		  var pos = {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		  };

		  inf.setPosition(pos);
		  inf.setContent('Vous etes ici.');
		  map.setCenter(pos);
		  adrMaison = pos;
		  console.log(adrMaison.lat);
		}, function() {
		  handleLocationError(true, inf, map.getCenter());
		});
	  } else {
		// Browser doesn't support Geolocation
		handleLocationError(false, inf, map.getCenter());
	  }
}
function handleLocationError(browserHasGeolocation, inf, pos) {
  inf.setPosition(pos);
  inf.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}



// ------------------------------------------------------------------------------------------------------ Fin trajet -----------------------------------------------------------------------------
