<div id="Unelan" class ="container">
  <h1 id="NomLan"><?php echo($lanPage['NomL']) ?></h1>
  Adresse :<h2 id="adre">  <?php echo($lanPage['AdresseLan']) ?>,<?php echo($lanPage['VilleLAN']) ?></h2> <!-- rajouter pays-->
  Du<div id="datedebut"><?php echo($convertedDateDebut) ?></div>
  Au <div id="datefin"><?php echo($convertedDateFin) ?></div>

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
<!--- javascript Trajet--->
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="vue/js/script_Map.js"> </script>
<script src="vue/js/script_trajet.js"> </script>
