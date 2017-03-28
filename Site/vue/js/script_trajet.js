
var listeblablacar = []
var listeGareDep=[]
var listeGareArr=[]
var listeTrain =[]
var goDep = false
var goArr = false
var booll = true
var res = true

$( function() {
  $( "#tabs" ).tabs();
  $("#choixgare").hide();
} );
/*
$( function() {

  while(booll){
    if(goDep == true && goArr == true){
      console.log("Sucess");
      booll = false;
    }
  }
} );
*/
/*
$(function() {
	  getTrajetBlablacar("Paris","Poitier","2017-03-27",14);
});
*/
function getTrajetBlablacar(vDep,vArr,dateDep,hdep){
	$.getJSON("https://public-api.blablacar.com/api/v2/trips?fn="+vDep+"&tn="+vArr+"&db="+dateDep+"&hb="+hdep+"&limit=6&locale=fr_FR&radius=20&key=248339f0b4c646aabde3f6b9ecfd1270", function(data){
		listeblablacar = data;
    afficherRes();
	});
}

function getGareDep(gareDep){

  $.getJSON("https://api.sandbox.amadeus.com/v1.2/rail-stations/autocomplete?apikey=NuUZ93jhWCOQ0ZPBXYhj7Dy9i27w9sXh&term="+gareDep, function(data){
    listeGareDep = data;
    //console.log(listeGareDep[0].label);
    goDep = true ;
    if( goArr == true){
      verif();
    }

  });

}

function getGareArr(gareArr){

  $.getJSON("https://api.sandbox.amadeus.com/v1.2/rail-stations/autocomplete?apikey=NuUZ93jhWCOQ0ZPBXYhj7Dy9i27w9sXh&term="+gareArr, function(data){
    listeGareArr = data;
  //  console.log(listeGareArr[0].label);
    goArr = true ;
    if( goDep == true){
      verif();
    }
  });

}

function getTrain(){

  $.getJSON("https://api.sandbox.amadeus.com/v1.2/trains/extensive-search?apikey=NuUZ93jhWCOQ0ZPBXYhj7Dy9i27w9sXh&origin="+$("#gareDepart").val()+"&destination="+$("#gareArrive").val()+"&departure_date="+$("#dateDep").val(), function(data){
    listeTrain = data;

    try {
      if(listeTrain.errors[0].message == "NOTHING FOUND FOR REQUESTED CRITERIA"){
          res = false;
      }

    }catch(e){

      //  console.log("catch");
        res = true;
		afficherResTrain();
    }
  //  console.log(" en dehors catch");
    afficherResTrain();
  });

}

function verif(){
      $('#gareDepart option').remove() ;
      var select = $('#gareDepart');
    if(select.prop) {
      var options = select.prop('options');
    }
    else {
      var options = select.attr('options');
    }

  $.each(listeGareDep, function(i) {
      options[options.length] = new Option(listeGareDep[i].label, listeGareDep[i].value);
  });
  $('#gareArrive option').remove() ;
    var sel = $('#gareArrive');
      if(sel.prop) {
        var opt = sel.prop('options');
      }
      else {
        var opt = sel.attr('options');
      }

  $.each(listeGareArr, function(i) {
  opt[opt.length] = new Option(listeGareArr[i].label, listeGareArr[i].value);
  });

}

function chercherTrajet(){
  //console.log($("#adre").html());
  var villedepart = $("#adre").html().split(", ");
  //  console.log(villedepart[1]);
  $("#choixgare").show();
  document.getElementById('resultatTrain').innerHTML ="";
  getGareDep($("#villeDep").val()) ;
  getGareArr(villedepart[1]) ;
  getTrajetBlablacar($("#villeDep").val(),villedepart[1],$("#dateDep").val(),$("#hDep").val());

}

function afficherResTrain(){

  document.getElementById('resultatTrain').innerHTML ="";
  document.getElementById('messageErreur').innerHTML ="";
  $("#choixgare").hide();


  if(  res == false ){
  //  typeof listeTrain.results == 'undefined'"NOTHING FOUND FOR REQUESTED CRITERIA"
    document.getElementById('messageErreur').innerText ="Aucun trajet correspondant";
    $("#choixgare").show();
    console.log("balbalabl");
  }
  else{

      $.each(listeTrain.results[0].itineraries, function(i){
		  
		var tabDate = listeTrain.results[0].itineraries[i].trains[0].departs_at.split("T");
		var tabDatecorrect = tabDate[0].split("-");
		var heureDep = tabDate[1].split(':');
		if(heureDep > $("#hDep").val()){
			
						
				
			  var divTrain = document.createElement('div');
			  divTrain.classList.add('caseTrajet');
			  divTrain.classList.add('col-sm-4');
			  divTrain.classList.add('well');

			  var titre = document.createElement('p');
			  titre.appendChild(document.createTextNode(listeTrain.results[0].itineraries[i].trains[0].departure_station.station_name +" --> "+ listeTrain.results[0].itineraries[i].trains[0].arrival_station.station_name));

			  var JDep = document.createElement('p');
			 
			  JDep.appendChild(document.createTextNode("Jour de Depart : "+ tabDatecorrect[2]+"/"+tabDatecorrect[1]+"/"+ tabDatecorrect[0]));

			  var hDep = document.createElement('p');
			  
			  hDep.appendChild(document.createTextNode("Heure de Depart : "+ heureDep[0]+"h"+heureDep[1]));

			  var hArr = document.createElement('p');
			  var tabDateArr = listeTrain.results[0].itineraries[i].trains[0].arrives_at.split("T");
			  var heureArr = tabDateArr[1].split(':')
			  hArr.appendChild(document.createTextNode("Heure d'Arrivé : "+ heureArr[0]+"h"+heureArr[1]));

			  var prix = document.createElement('p');
			  prix.appendChild(document.createTextNode("Prix : "+ listeTrain.results[0].itineraries[i].trains[0].prices[0].total_price.amount+"€"));

			  var bout = document.createElement('button');
			  bout.classList.add('btn');
			  bout.classList.add('btn-primary');
			  bout.appendChild(document.createTextNode("Site SNCF"));


				bout.addEventListener('click', function(){
				//document.location.href= listeblablacar.trips[i].links._front;
				window.open("https://www.voyages-sncf.com/");
			  });

			  divTrain.appendChild(titre);
			  divTrain.appendChild(JDep);
			  divTrain.appendChild(hDep);
			  divTrain.appendChild(hArr);
			  divTrain.appendChild(prix);
			  divTrain.appendChild(bout);
			  document.getElementById('resultatTrain').appendChild(divTrain);

	  }
  	});


  }

/*
console.log(listeTrain.results[0].itineraries[0].trains[0].departs_at);
console.log(listeTrain.results[0].itineraries[1].trains[0].departs_at);
console.log(listeTrain.results[0].itineraries[2].trains[0].departs_at);
*/
}


function afficherRes(){
  document.getElementById('tabs-1').innerHTML ="";

  if(listeblablacar.pager.total == 0){
    document.getElementById('tabs-1').innerHTML ="Auncun trajet correspondant";

  }
  else{

      $.each(listeblablacar.trips, function(i){
      var divCovoit = document.createElement('div');
      divCovoit.classList.add('caseTrajet');
      divCovoit.classList.add('col-sm-4');
      divCovoit.classList.add('well');

      var titre = document.createElement('p');
      titre.appendChild(document.createTextNode(listeblablacar.trips[i].departure_place.city_name +" --> "+ listeblablacar.trips[i].arrival_place.city_name));

      var JDep = document.createElement('p');
      var tabDate = listeblablacar.trips[i].departure_date.split(" ");
      var heure = tabDate[1].split(":");
      JDep.appendChild(document.createTextNode("Jour de Depart : "+ tabDate[0]));

      var hDep = document.createElement('p');
      hDep.appendChild(document.createTextNode("Heure de Depart : "+ heure[0]+"h"+heure[1]));

      var prix = document.createElement('p');
      prix.appendChild(document.createTextNode("Prix : "+ listeblablacar.trips[i].price_with_commission.string_value));

      var bout = document.createElement('button');
      bout.classList.add('boutBlabla');
      bout.classList.add('btn');
      bout.classList.add('btn-primary');
      bout.appendChild(document.createTextNode("Voir sur BlaBlaCar"));


        bout.addEventListener('click', function(){
        //document.location.href= listeblablacar.trips[i].links._front;
        window.open(listeblablacar.trips[i].links._front);
      });

      divCovoit.appendChild(titre);
      divCovoit.appendChild(JDep);
      divCovoit.appendChild(hDep);
      divCovoit.appendChild(prix);
      divCovoit.appendChild(bout);
      document.getElementById('tabs-1').appendChild(divCovoit);

  	});
  }


}
