<head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /></head>
<div id="Unelan" class ="container">
  <h1 id="NomLan"><?php echo($lanPage['NomL']) ?></h1>
  <h2 id="adre"> Adresse : <?php echo($lanPage['AdresseLan'] . " " . $lanPage['VilleLAN']) ?></h2> <!-- rajouter pays-->
  Du<div id="datedebut"><?php echo($lanPage['DateDebut']) ?></div>
  Au <div id="datefin"><?php echo($lanPage['DateFin']) ?></div>
  <article class="well">
    <?php   require("vue/lan/afficherDescription.tpl");  ?>
  </article>

  <article class="well">
    <?php   require("vue/lan/afficherCarte.tpl");  ?>
  </article>

  <article class="well">
    <?php   require("vue/lan/afficherReservation.tpl");  ?>
  </article>
</div>

<!--- javascript Map--->
<script src="http://maps.google.com/maps/api/js?key=AIzaSyBU4KybSRiCfeyVWXyWBeZxWbEHzpNupyU&language=fr&libraries=places" type="text/javascript"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script  type="text/javascript" src="vue/js/script_Map.js"> </script>