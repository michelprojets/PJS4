<h2 class="display-4">Hotel et trajet</h2>
<h4> (Cliquer le lieu de la LAN pour afficher les 10 hôtels les plus proches) </h4>
<div id ="hotel" class="row ">
  <div id="idMap" class="col-md-7 well "></div>
  <div id="infoMap"class="col-md-5 well" style='overflow-y:scroll' color='white'></div>
</div>
<h4>Choisissez votre mode de transport :</h4>
<select id="modeDeTransport" class="form-control" >
	  <optgroup label = "Mode de transport :">
		  <option selected=selected disabled=disabled>Je veux m'y rendre ...</option>
		  <option value="DRIVING">en voiture</option>
		  <option value="BICYCLING">en vélo</option>
		  <option value="TRANSIT">en transit</option>
		  <option value="WALKING">en marchant</option>
	  </optgroup>
</select>
<div id="distance"></div>
