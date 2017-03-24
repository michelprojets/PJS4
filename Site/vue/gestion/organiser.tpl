		<div id="formulaire" class="row"> <!--- formulaire --->
			<form class="well col-sm-offset-1 col-sm-10" action="index.php?controle=compte&action=connexion" method="post">
				<legend>
					<p class="col-sm-offset-1">Se connecter</p>
				</legend>
				<fieldset>
					<div class="form-group">
						<label class="col-sm-offset-1 col-sm-3" for="login">Login :</label>
						<div class="controle col-sm-7">
							<input class="form-control" type="text" name="login" placeholder="Votre login">
						</div>
						<span class="col-sm-offset-4 col-sm-7 info-bulle">Entre 3 et 15 cactères, comporte uniquement lettres (minuscules ou majuscules mais sans accents), chiffres, ou "_"</span>
					</div>
					<div class="form-group">
						<label class="col-sm-offset-1 col-sm-3" for="mdp">Mot de passe :</label>
						<div class="controle col-sm-7">
							<input class="form-control" type="password" name="mdp" placeholder="Votre mot de passe">
						</div>
						<span class="col-sm-offset-4 col-sm-7 info-bulle">Entre 5 et 15 caractères, comporte uniquement lettres (minuscules ou majuscules mais sans accents), chiffres, (et au moins une lettre et un chiffre?)</span>
					</div>		
					<div class="boutons">
						<button class="col-sm-offset-2 col-sm-4 btn btn-primary" type="submit">Valider</button>
						<button class="col-sm-offset-1 col-sm-3 btn btn-primary" type="reset">Réinitialiser</button>
					</div>
				 </fieldset>
			</form>
		</div> <!--- fin formulaire --->
		
		<!--- javascript personnalisé --->
		<script src="vue/js/script_organisation.js"></script>