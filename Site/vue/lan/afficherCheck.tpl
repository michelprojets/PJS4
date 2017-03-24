<div id="formulaire" class="row"> <!--- formulaire --->
  <form class="well col-sm-offset-1 col-sm-10" action="index.php?controle=lan&action=recevoirNotif&param=<?php echo($idlan);?>" method="post">
    <fieldset>
      <label class="checkbox-inline col-sm-8"><input type="checkbox" name="notif" value="ok">Recevoir des notifications sur la Lan</label>
      <div class="boutons">
        <button class="col-sm-offset-2 col-sm-2 btn btn-primary" type="submit">Valider</button>
      </div>
    </fieldset>
  </form>
</div> <!--- fin formulaire --->
