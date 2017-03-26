			<div id="formulaire" class="row"> <!--- formulaire --->
				<form class="well col-sm-offset-1 col-sm-10" action="index.php?controle=gestion&action=tournois" method="post">
					<legend>
						<p class="col-sm-offset-1">Organiser les tournois</p>
					</legend>
					<?php for ($i = 0; $i < $nbTournois; $i++) { ?>
						<fieldset>
							<div class="form-group">
								<label class="col-sm-offset-1 col-sm-3" for="nomLan">Nom :</label>
								<div class="controle col-sm-7">
									<input class="form-control" type="text" name="nomLan" placeholder="Nom de la LAN">
								</div>
								<span class="col-sm-offset-4 col-sm-7 info-bulle">Entre 2 et 35 caractères, peut comporter lettres (é/è/ù/î/à/ô possibles), chiffres et espaces</span>
							</div>
							<div class="form-group">
								<label class="col-sm-offset-1 col-sm-3" for="adresseLan">Adresse :</label>
								<div class="controle col-sm-7">
									<input class="form-control" type="text" name="adresseLan" placeholder="Adresse de la LAN">
								</div>
								<span class="col-sm-offset-4 col-sm-7 info-bulle">Entre 8 et 35 caractères, comporte uniquement lettres (minuscules ou majuscules, é/è/ù/î/à/ô possibles), chiffres et espaces</span>
							</div>
							<div class="form-group">
								<label class="col-sm-offset-1 col-sm-3" for="villeLan">Ville :</label>
								<div class="controle col-sm-7">
									<input class="form-control" type="text" name="villeLan" placeholder="Ville de la LAN">
								</div>
								<span class="col-sm-offset-4 col-sm-7 info-bulle">Entre 2 et 20 caractères, comporte uniquement lettres (premier lettre en majuscule, les autres en minuscules, é/è/ù/î/à/ô possibles)</span>
							</div>
							<div class="boutons">
								<button class="col-sm-offset-2 col-sm-4 btn btn-primary" type="submit">Valider</button>
								<button class="col-sm-offset-1 col-sm-3 btn btn-primary" type="reset">Réinitialiser</button>
							</div>
						 </fieldset>
					<?php } ?>
				</form>
			</div> <!--- fin formulaire --->
			
			<!--- javascript jquery --->
			<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
			<!--- javascript personnalisé --->
			<script src="vue/js/script_tournois.js"></script>