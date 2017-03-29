<h2 class="display-4">Hotel et trajet</h2>
<h4> Cliquez le lieu de la LAN pour afficher les 10 hôtels les plus proches ainsi que le trajet (activez la geolocalisation) </h4>
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
		  <option value="TRANSIT">en train</option>
		  <option value="WALKING">en marchant</option>
	  </optgroup>
</select>
<div id="distance"></div>

<!--- Trajet --->
<h3>Trajets</h3>
<div class="row" id="trajet">
  <div class="form-group col-sm-4">
    <label for="villeDe">Ville de depart</label>
    <input type="text" class="form-control" id="villeDep"  placeholder="Ville">
  </div>
  <div class="form-group col-sm-4">
    <label for="JourDep">Jour de depart</label>
    <input class="form-control" type="date" name="JourDep" id="dateDep" placeholder="Date Depart">
  </div>
  <div class="form-group col-sm-4">
    <label for="hDepart">Heure de Depart</label>
    <select class="form-control" id="hDep">
      <option>0</option>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
      <option>6</option>
      <option>7</option>
      <option>8</option>
      <option>9</option>
      <option>10</option>
      <option>11</option>
      <option>12</option>
      <option>13</option>
      <option>14</option>
      <option>15</option>
      <option>16</option>
      <option>17</option>
      <option>18</option>
      <option>19</option>
      <option>20</option>
      <option>21</option>
      <option>22</option>
      <option>23</option>
    </select>
  </div>
    <button  class="btn btn-primary col-sm-offset-5 col-sm-2 col-sm-offset-5" onclick="chercherTrajet()">Voir les Trajets</button>
</div>


  <div id="tabs" class="row">
    <ul>
      <li><a href="#tabs-1">Covoiturage</a></li>
      <li><a href="#tabs-2">Train</a></li>
    </ul>
    <div id="tabs-1" class="row ">
      Aucun trajet pour le moment
    </div>
    <div id="tabs-2" class="row">
      <p id="messageErreur">Aucun trajet pour le moment</p>
      <div id="resultatTrain"></div>
      <div id="choixgare">
        <div class="form-group col-sm-4 col-sm-offset-2">
          <label for="hDepart">Gare de Depart</label>
          <select class="form-control" id="gareDepart">
          </select>
        </div>
        <div class="form-group col-sm-4">
          <label for="hDepart">Gare d'arrivée</label>
          <select class="form-control" id="gareArrive">
          </select>
        </div>
        <button  class="btn btn-primary col-sm-offset-5 col-sm-2 col-sm-offset-5" onclick="getTrain()">Valider Gare</button>
      </div>

    </div>
 </div>