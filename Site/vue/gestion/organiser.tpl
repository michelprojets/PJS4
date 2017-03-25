			<div id="formulaire" class="row"> <!--- formulaire --->
				<form class="well col-sm-offset-1 col-sm-10" action="index.php?controle=compte&action=inscription" method="post">
					<legend>
						<p class="col-sm-offset-1">Organiser</p>
					</legend>
					<fieldset>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3" for="nomLan">Nom :</label>
							<div class="controle col-sm-7">
								<input class="form-control" type="text" name="nomLan" placeholder="Nom de la LAN">
							</div>
							<span class="col-sm-offset-4 col-sm-7 info-bulle">Entre 3 et 15 caractères, comporte uniquement lettres (minuscules ou majuscules mais sans accents), chiffres, ou "_"</span>
						</div>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3" for="adresseLan">Adresse :</label>
							<div class="controle col-sm-7">
								<input class="form-control" type="text" name="adresseLan" placeholder="Adresse de la LAN">
							</div>
							<span class="col-sm-offset-4 col-sm-7 info-bulle">Entre 3 et 15 caractères, comporte uniquement lettres (minuscules ou majuscules mais sans accents), chiffres, ou "_"</span>
						</div>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3" for="villeLan">Ville :</label>
							<div class="controle col-sm-7">
								<input class="form-control" type="text" name="villeLan" placeholder="Ville de la LAN">
							</div>
							<span class="col-sm-offset-4 col-sm-7 info-bulle">Entre 3 et 15 caractères, comporte uniquement lettres (minuscules ou majuscules mais sans accents), chiffres, ou "_"</span>
						</div>
						<label class="col-sm-offset-1 col-sm-3" for="description">Description :</label>
						<div id="description" class="form-group col-sm-offset-1 col-sm-10">
							<script type="text/javascript" src="vue/ckeditor/ckeditor.js"></script>
							<form>
								<textarea name="editor1" id="editor1" rows="10" cols="80" placeholder="Description de la LAN">
								</textarea>
								<script type="text/javascript" >
									// Replace the <textarea id="editor1"> with a CKEditor
									// instance, using default configuration.
									CKEDITOR.replace( 'editor1' );
								</script>
							</form>
						</div>
						<span class="col-sm-offset-4 col-sm-7 info-bulle">Entre 3 et 15 caractères, comporte uniquement lettres (minuscules ou majuscules mais sans accents), chiffres, ou "_"</span>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3" for="dateDebut">Date de début :</label>
							<div class="controle col-sm-7">
								<input class="form-control" type="date" name="dateDebut" id="date" placeholder="Date de début">
							</div>
							<span class="col-sm-offset-4 col-sm-7 info-bulle">Respecter le format jj/mm/aaaa, et l'année doit être compris entre</span>
						</div>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3" for="dateFin">Date de fin :</label>
							<div class="controle col-sm-7">
								<input class="form-control" type="date" name="dateFin" id="date" placeholder="Date de fin">
							</div>
							<span class="col-sm-offset-4 col-sm-7 info-bulle">Respecter le format jj/mm/aaaa, et l'année doit être compris entre</span>
						</div>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3" for="nbTournois">Nombre de tournois :</label>
							<div class="controle col-sm-7">
								<input class="form-control" type="text" name="nbTournois" placeholder="Nombre de tournois">
							</div>
							<span class="col-sm-offset-4 col-sm-7 info-bulle">Entre 2 et 35 caractères, comporte uniquement des lettres (é/è/ù/î/à/ô possibles)</span>
						</div>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3" for="nbVisiteurs">Nombre de visiteurs :</label>
							<div class="controle col-sm-7">
								<input class="form-control" type="text" name="nbVisiteurs" placeholder="Nombre de visiteurs">
							</div>
							<span class="col-sm-offset-4 col-sm-7 info-bulle">Entre 2 et 35 caractères, comporte uniquement des lettres (é/è/ù/î/à/ô possibles)</span>
						</div>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3" for="prixVisite">Prix de la visite :</label>
							<div class="controle col-sm-7">
								<input class="form-control" type="text" name="prixVisite" placeholder="Prix de la visite">
							</div>
							<span class="col-sm-offset-4 col-sm-7 info-bulle">Entre 2 et 35 caractères, comporte uniquement des lettres (é/è/ù/î/à/ô possibles)</span>
						</div>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3" for="adresseSite">Adresse du site internet :</label>
							<div class="controle col-sm-7">
								<input class="form-control" type="text" name="adresseSite" placeholder="Adresse du site internet">
							</div>
							<span class="col-sm-offset-4 col-sm-7 info-bulle">Entre 2 et 35 caractères, comporte uniquement des lettres (é/è/ù/î/à/ô possibles)</span>
						</div>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3" for="adresseWidget">Adresse widget réservation :</label>
							<div class="controle col-sm-7">
								<input class="form-control" type="text" name="adresseWidget" placeholder="Adresse widget réservation">
							</div>
							<span class="col-sm-offset-4 col-sm-7 info-bulle">Entre 2 et 35 caractères, comporte uniquement des lettres (é/è/ù/î/à/ô possibles)</span>
						</div>
						<div class="boutons">
							<button class="col-sm-offset-2 col-sm-4 btn btn-primary" type="submit">Valider</button>
							<button class="col-sm-offset-1 col-sm-3 btn btn-primary" type="reset">Réinitialiser</button>
						</div>
					 </fieldset>
				</form>
			</div> <!--- fin formulaire --->
			
			<!--- javascript jquery --->
			<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
			<!--- javascript personnalisé --->
			<script src="vue/js/script_inscription.js"></script>