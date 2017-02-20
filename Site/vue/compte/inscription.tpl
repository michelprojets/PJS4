			<div id="formulaire" class="row"> <!--- formulaire --->
				<form class="well col-sm-offset-1 col-sm-10" action="index.php?controle=compte&action=inscription" method="post">
					<legend>
						<p class="col-sm-offset-1">S'inscrire</p>
					</legend>
					<fieldset>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3" for="login">Login :</label>
							<div class="controle col-sm-7">
								<input class="form-control" type="text" name="login" placeholder="Votre login">
							</div>
							<span class="col-sm-offset-4 col-sm-7 info-bulle">Entre 3 et 15 caractères, comporte uniquement lettres (minuscules ou majuscules mais sans accents), chiffres, ou "_"</span>
						</div>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3" for="mdp">Mot de passe :</label>
							<div class="controle col-sm-7">
								<input class="form-control" type="password" name="mdp" placeholder="Votre mot de passe">
							</div>
							<span class="col-sm-offset-4 col-sm-7 info-bulle">Entre 5 et 15 caractères, comporte uniquement lettres (minuscules ou majuscules mais sans accents), chiffres, (et au moins une lettre et un chiffre?)</span>
						</div>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3" for="confirmation_mdp">Ressaisir votre mot de passe :</label>
							<div class="controle col-sm-7">
								<input class="form-control" type="password" name="confirmation_mdp" placeholder="Votre mot de passe">
							</div>
							<span class="col-sm-offset-4 col-sm-7 info-bulle">Doit être le même que le mot de passe ci-dessus</span>
						</div>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3" for="nom">Nom :</label>
							<div class="controle col-sm-7">
								<input class="form-control" type="text" name="nom" placeholder="Votre nom">
							</div>
							<span class="col-sm-offset-4 col-sm-7 info-bulle">Entre 2 et 35 caractères, comporte uniquement des lettres (é/è/ù/î/à/ô possibles)</span>
						</div>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3" for="prenom">Prénom :</label>
							<div class="controle col-sm-7">
								<input class="form-control" type="text" name="prenom" placeholder="Votre prénom">
							</div>
							<span class="col-sm-offset-4 col-sm-7 info-bulle">Entre 2 et 35 caractères, comporte uniquement des lettres (é/è/ù/î/à/ô possibles)</span>
						</div>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3" for="mail">Adresse mail :</label>
							<div class="controle col-sm-7">
								<input class="form-control" type="text" name="mail" placeholder="Votre adresse mail">
							</div>
							<span class="col-sm-offset-4 col-sm-7 info-bulle">Doit être sous la forme "x.....x@x...x.xxx"</span>
						</div>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3" for="date_naissance">Date de naissance :</label>
							<div class="controle col-sm-7">
								<input class="form-control" type="date" name="date_naissance" id="date" placeholder="Votre date de naissance">
							</div>
							<span class="col-sm-offset-4 col-sm-7 info-bulle">Respecter le format jj/mm/aaaa, et l'année doit être compris entre</span>
						</div>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3" for="sexe">Sexe :</label>
							<div class="controle col-sm-7">
								<select class="form-control" id="sexe">
									<option>Sélectionner votre sexe</option>
									<option>Homme</option>
									<option>Femme</option>
								</select>
							</div>
							<span class="col-sm-offset-4 col-sm-7 info-bulle">Vous devez sélectionner votre sexe</span>
						</div>
							
						<div class="boutons">
							<button class="col-sm-offset-2 col-sm-4 btn btn-primary" type="submit">Valider</button>
							<button class="col-sm-offset-1 col-sm-3 btn btn-primary" type="reset">Réinitialiser</button>
						</div>
					 </fieldset>
				</form>
			</div> <!--- fin formulaire --->
			
			<!--- javascript personnalisé --->
			<script src="vue/js/script_inscription.js"></script>