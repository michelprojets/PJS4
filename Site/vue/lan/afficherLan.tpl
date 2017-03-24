

<div id="Unelan" class ="container">
  <h1 id="NomLan"><?php echo($lanPage['NomL']) ?></h1>

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
<script src="vue/js/script_Map.js"> </script>
