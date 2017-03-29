// Nearby Search --> API hotels FAIT
// ajouter reversed geocode pour avoir coordonnees des lans et les placer sur la carte a partir de leurs adresses FAIT
// Faire div "detail" contenant la description de l'hotel/Lan ||| bloque pour photo, utiliser google sreet view

//https://developers.google.com/maps/documentation/streetview/intro?hl=fr

var geocoder = new google.maps.Geocoder(); // pour geocoding
var adrLan;  // Par defaut Paris, va permettre de placer toutes les lans
var address; // va contenir l'adresse des lan
var adrMaison; //va contenir adr de depart (geoloc)

var adrtest;
var infoWindow = new google.maps.InfoWindow;

var map = new google.maps.Map(document.getElementById('idMap'), {
	zoom:15,  //zoom ideal = 3 ou 2
	center : adrLan	
});
 
var directionsService = new google.maps.DirectionsService;
var directionsDisplay = new google.maps.DirectionsRenderer;
 

  
window.onload = function() {
	var adr = document.getElementById('adre');
	geoloc();
	initMap();
}

function initMap() {
    directionsDisplay.setMap(map);
    var onChangeHandler = function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay, address);
    };
    document.getElementById('modeDeTransport').addEventListener('change', onChangeHandler);
  
	// pour convertir adresse en coordonnees ( et eventuellement poser un marqueur)
	//faire boucle avec adresses lans BD
	//codeAddress('avenue kleber Trappes FR'); // rue ville pays
	codeAddress(adre.innerText);
	//geoloc();
}



function codeAddress(adr) {
    address = adr;//'1 rue hedouin Meudon, FR'; //document.getElementById("address").value; //1 rue hedouin Meudon, FR [sous cette forme]
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
		
		 //google.maps.event.addListener(marker, 'click', loshotelosAvecAmadeus(results[0].geometry.location));		 
		
		google.maps.event.addListener(marker, 'click', function(){
			removeAllCases();
			loshotelosAvecAmadeus(results[0].geometry.location)
			geoloc(); // pour connaitre la position de l'utilisateur
			console.log(address + " dans addclicklistener");
			calculateAndDisplayRoute(directionsService, directionsDisplay, address);
		
		});		
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
}

function geoloc(){
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
		  var pos = {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		  };

		  infoWindow.setPosition(pos);
		  infoWindow.setContent('Vous etes ici.');
		  //map.setCenter(pos);
		  adrMaison = pos;
		  console.log(adrMaison.lat);
		}, function() {
		  handleLocationError(true, infoWindow, map.getCenter());
		});
	  } else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	  }
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}


// ----------------------------------------------------------------------------------------------------------- Trajet -----------------------------------------------------------------------

function calculateAndDisplayRoute(directionsService, directionsDisplay,adrDeLaLanConcernee) {
    if (document.getElementById('modeDeTransport').value == "BICYCLING") {
        var modeDeTransport = google.maps.TravelMode.BICYCLING;
    } else if (document.getElementById('modeDeTransport').value == "WALKING") {
        var modeDeTransport = google.maps.TravelMode.WALKING;
    } else if (document.getElementById('modeDeTransport').value == "TRANSIT") {
        var modeDeTransport = google.maps.TravelMode.TRANSIT;
    } else {
        var modeDeTransport = google.maps.TravelMode.DRIVING;
    }
    console.log(modeDeTransport);
	console.log(adrDeLaLanConcernee);
	getDistanceEntreDeuxPoints(adrMaison.lat + ',' + adrMaison.lng,adrDeLaLanConcernee,modeDeTransport);
    directionsService.route({
        origin: adrMaison.lat + ',' + adrMaison.lng,
        destination: adrDeLaLanConcernee,
        travelMode: modeDeTransport
    }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function getDistanceEntreDeuxPoints(origin,destination,modeDeTransport){
	var moyenDeTransport;
	if (modeDeTransport == "BICYCLING") {
        moyenDeTransport = "vélo";
    } else if (modeDeTransport == "WALKING") {
        moyenDeTransport = "marchant";
    } else if (modeDeTransport == "TRANSIT") {
        moyenDeTransport = "train";
    } else {
		moyenDeTransport = "voiture";
	}
	var dist;
	var ArrayO = [origin];
	console.log(ArrayO[0]);
	var ArrayD = [destination];
	 var service = new google.maps.DistanceMatrixService;
  service.getDistanceMatrix({
    origins: ArrayO,
    destinations: ArrayD,
    travelMode: modeDeTransport,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false
  }, function(response, status) {
    if (status !== google.maps.DistanceMatrixStatus.OK) {
      alert('Error was: ' + status);
    } else {
		console.log(response);
		console.log(response.rows[0].elements[0].duration.text);
/*	document.getElementById('distance').innerHTML = "La distance est de " + response.rows[0].elements[0].distance.text + ". ";
	document.getElementById('distance').innerHTML += "Le temps de trajet est d'environ " +  response.rows[0].elements[0].duration.text + ".";*/
		var divDistance = document.getElementById('distance');
		if (divDistance.hasChildNodes()){
			while (sousDiv = divDistance.firstElementChild.nextElementSibling){
				divDistance.removeChild(sousDiv);
			}
			divDistance.removeChild(divDistance.firstElementChild);
		}
		var distance = document.createElement('p');
		distance.appendChild(document.createTextNode("La distance entre votre position actuelle et la LAN est d'environ : " + response.rows[0].elements[0].distance.text));
		var tempsTrajet = document.createElement('p');
		tempsTrajet.appendChild(document.createTextNode("Le temps de trajet en " + moyenDeTransport + " est d'environ : " + response.rows[0].elements[0].duration.text));
		divDistance.appendChild(distance);
		divDistance.appendChild(tempsTrajet);
		
	}
	}
);
}
// ------------------------------------------------------------------------------------------------------ Fin trajet -----------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------------ Debut Amadeus --------------------------------------------------------------------------
// les hotels (api amadeus) 
// radius en km

function convertDate(date){
	var tabChamp = date.split("/");
	date_normalisee = tabChamp[2] + "-" + tabChamp[1] + "-" + tabChamp[0];
	return date_normalisee;
}

function loshotelosAvecAmadeus(e){
	var description = document.getElementById('infoMap');
	var v = document.getElementById('datedebut');
	var datedebut = convertDate(v.innerText);
	v = document.getElementById('datefin');
	var datefin = convertDate(v.innerText);
	//console.log("YEAAAAAAAAAAA" + datedebut +" "+ datefin);
	$.ajax({
	dataType: "json",
	url: "http://api.sandbox.amadeus.com/v1.2/hotels/search-circle?latitude="+e.lat()+"&longitude="+e.lng()+"&radius=12&check_in="+datedebut+"&check_out="+datefin+"&currency=EUR&chain=RT&cy=EUR&number_of_results=50&apikey=NuUZ93jhWCOQ0ZPBXYhj7Dy9i27w9sXh",
	success: function(data) {
		//console.log(data.results[0]);
	//	description.innerHTML = "<h3 align='center'> Les hotels les plus proches : </h3>";
		var titrePartie = document.createElement('h3');
		titrePartie.appendChild(document.createTextNode("Les 10 hôtels les plus proche de la LAN : "));
		description.appendChild(titrePartie);
		
		for (var i = 0; i < data.results.length; i++) {
			createMarkerAmadeus(data.results[i]);
			if(i<=10){
			//	description.innerHTML += htmlDesc(data.results[i]);
				htmlDesc(data.results[i]);
			}
		}
		
	}
	}).error(function() {console.log("Probleme avec Amadeus" );});
}

// creer les marqueurs pour les hotels + infos (api amadeus)
function createMarkerAmadeus(place) {
  var infowindow = new google.maps.InfoWindow;
  var placeLoc = {lat: place.location.latitude, lng: place.location.longitude}
  console.log(placeLoc);
  var marker = new google.maps.Marker({
    map: map,
    position: placeLoc,
	icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'   // couleur marqueur
  });
  google.maps.event.addListener(marker, 'mouseover', function() {
	
	// détail hotel avec mouseover
	var detail = "<p>Nom : " + place.property_name;
	detail+="</br> Prix du séjour : " + place.total_price.amount + " " + place.total_price.currency;
	detail+="</br> Adresse de l'hôtel : " + place.address['line1'] + ', ' + place.address['city'];
	detail+="</br> Téléphone : " + place.contacts[0].detail;
	detail+="</br></p>";
	
    infowindow.setContent(detail);
    infowindow.open(map, this);
  });
 
	google.maps.event.addListener(marker, 'mouseout', function() {
		infowindow.close(map,this);
	});
	
}

function removeAllCases(){
	divHotels = document.getElementById('infoMap');
	var divHotels;
	if (divHotels.hasChildNodes()){
		while (div = divHotels.firstElementChild.nextElementSibling){
			divHotels.removeChild(div);
		}
		divHotels.removeChild(divHotels.firstElementChild);
	}
}

// pour la description des 10 premiers hotels
function htmlDesc(place)
{
	var description = document.getElementById('infoMap');
	
	var divHotel = document.createElement('div');
	divHotel.classList.add('caseTrajet');
	divHotel.classList.add('hotel');
	divHotel.classList.add('well');
	divHotel.classList.add('row');
	
	var titre = document.createElement('p');
	titre.classList.add("col-sm-offset-1");
	titre.classList.add("col-sm-10");
	titre.classList.add("titre");
	titre.appendChild(document.createTextNode("Nom : " + place.property_name));

	var prix = document.createElement('p');
	prix.classList.add("col-sm-offset-1");
	prix.classList.add("col-sm-10");
	prix.appendChild(document.createTextNode("Prix du séjour : " + place.total_price.amount + " " + place.total_price.currency));
	
	var adresse = document.createElement('p');
	adresse.classList.add("col-sm-offset-1");
	adresse.classList.add("col-sm-10");
	adresse.appendChild(document.createTextNode("Adresse de l'hôtel : " + place.address['line1'] + ", " + place.address['city']));
	
	var telephone = document.createElement('p');
	telephone.classList.add("col-sm-offset-1");
	telephone.classList.add("col-sm-10");
	telephone.appendChild(document.createTextNode("Téléphone : " + place.contacts[0].detail));
	
	divHotel.appendChild(titre);
	divHotel.appendChild(prix);
	divHotel.appendChild(adresse);
	divHotel.appendChild(telephone);
	
	description.appendChild(divHotel);
	
}


// ------------------------------------------------------------------------------------------------------ Fin Amadeus --------------------------------------------------------------------------


// pour mettre les popup des hotels (google maps)
function popHotels(){

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
		location: adrLan,
		radius: 500,
		types: ['lodging']  // type : hebergements
  }, callback);  // appeler callbacks pour utiliser services google
}
	
	

// hotels a proximite (avec google api)
 function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

// on va faire apparaître les hotels autour de l'adresse (avec google api)
function createMarker(place) {
  var infowindow = new google.maps.InfoWindow;
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
	icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'   // couleur marqueur
  });
  google.maps.event.addListener(marker, 'mouseover', function() {
	
	// détail hotel avec mouseover
	var detail = place.name;
	if(place.rating != null)
		detail+="</br> avis des utilisateurs : " + place.rating + "/5";
	if(place.PriceLevel != null)
		detail+="</br> prix (sur une échelle de 0 à 4) : " + place.PriceLevel;
	if(place.formatted_address != null)
		detail+="</br> adresse : " + place.formatted_address;
	if(place.formatted_phone_number != null)
		detail+="</br> numéro : " + place.formatted_phone_number;
	if(place.text != null)
		detail+="</br>";
	
    infowindow.setContent(detail);
    infowindow.open(map, this);
  });
 
	google.maps.event.addListener(marker, 'mouseout', function() {
		infowindow.close(map,this);
	});
	google.maps.event.addListener(marker, 'click', function() {	
		description.innerHTML = htmlDesc(place);	
	});	
}

/*
function htmlDesc(place)
{
		
		var q;
		q="<div>";
		q += "<h3 align='center'> Description de " + place.name + " </h3>";
		q +="<ul style='list-style-type:none'>";
		if(place.rating != null)
			q += "<li> avis des utilisateurs :" + place.rating +"</li>";
		if(place.PriceLevel != null)
			q += "<li> prix (sur une échelle de 0 à 4) :" + place.PriceLevel +"</li>";
		if(place.formatted_address != null)
			q += "<li> adresse : " + place.formatted_address +"</li>";
		if(place.formatted_phone_number != null)
			q += "<li> numéro : " + place.formatted_phone_number +"</li>";
		if(place.text != null)
			q += "<li>" + place.text +"</li>";
		
		
		var latitude = place.lat;
		var longitude = place.lng;
		q+=latitude + " " + longitude;
		
		q+="<img src=\"https://maps.googleapis.com/maps/api/streetview?size=1600x1600&location="+latitude+","+ longitude+"&fov=90&heading=235&pitch=10&key=AIzaSyBU4KybSRiCfeyVWXyWBeZxWbEHzpNupyU\" width=500>";
		
		q+="</ul> </div>";
		
		return q;
}
	
*/

/*
function geoloc(){
	var pos;
	if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position) {
			pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			}, function() {
				handleLocationError(true, infoWindow, map.getCenter());
			});
			var marker = new google.maps.Marker({
				position:pos,
				map:map //,
				//title:"Votre position !"
		});
		marker.setMap(map);
	}
}*/

// geolocalisation + sauvegarde de la localisation qu'on utilise pour api driving

  
/*/ coordonnes to adresse, reverse geocoding probleme : ADRESSE UNDEFINED
function geocodeLatLng(geocoder, map, e) {

  var ret;
  var loc = e.geometry.location;
  geocoder.geocode({'location': loc}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        ret = results[1].formatted_address;
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
  return ret;
}*/



// pour marqueurs
/*var marker = new google.maps.Marker({
    position: myLatlng,
    title:"nom de l endroit, peut etre a completer!"
});

// To add the marker to the map, call setMap();
marker.setMap(map);*/