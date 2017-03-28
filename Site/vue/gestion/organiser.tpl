			
			<div id="formulaire" class="row"> <!--- formulaire   action="index.php?controle=gestion&action=organiser"--->
				<form class="well col-sm-offset-1 col-sm-10">
					<legend>
						<p class="col-sm-offset-1">Organiser la LAN</p>
					</legend>
					<fieldset>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3" for="nomLan">Nom :</label>
							<div class="controle col-sm-7">
								<input class="form-control" type="text" name="nomLan" placeholder="Nom de la LAN" id="nomlan">
							</div>
							<span class="col-sm-offset-4 col-sm-7 info-bulle">Entre 2 et 35 caractères, peut comporter lettres (é/è/ù/î/à/ô possibles), chiffres et espaces</span>
						</div>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3" for="adresseLan">Adresse :</label>
							<div class="controle col-sm-7">
								<input class="form-control" type="text" name="adresseLan" placeholder="Adresse de la LAN" id="adresselan">
							</div>
							<span class="col-sm-offset-4 col-sm-7 info-bulle">Entre 8 et 35 caractères, comporte uniquement lettres (minuscules ou majuscules, é/è/ù/î/à/ô possibles), chiffres et espaces</span>
						</div>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3" for="villeLan">Ville :</label>
							<div class="controle col-sm-7">
								<input class="form-control" type="text" name="villeLan" placeholder="Ville de la LAN"id="villelan">
							</div>
							<span class="col-sm-offset-4 col-sm-7 info-bulle">Entre 2 et 20 caractères, comporte uniquement lettres (premier lettre en majuscule, les autres en minuscules, é/è/ù/î/à/ô possibles)</span>
						</div>
						<label class="col-sm-offset-1 col-sm-3" for="description">Description :</label>
						<div id="description" class="form-group col-sm-offset-1 col-sm-10">
							<script type="text/javascript" src="vue/ckeditor/ckeditor.js"></script>
							<form>
								<textarea name="description" id="editor1" rows="10" cols="80" placeholder="Description de la LAN">
								</textarea>
								<script type="text/javascript" >
									// Replace the <textarea id="editor1"> with a CKEditor
									// instance, using default configuration.
									CKEDITOR.replace( 'editor1' );
								</script>
							</form>
						</div>
						<span class="col-sm-offset-4 col-sm-7 info-bulle">Entre 10 et 1000 caractères</span>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3" for="dateDebut">Date de début :</label>
							<div class="controle col-sm-7">
								<input class="form-control" type="date" name="dateDebut" id="datedebutlan" placeholder="Date de début">
							</div>
							<span class="col-sm-offset-4 col-sm-7 info-bulle">Respecter le format jj/mm/aaaa et la date doit être supérieure à la date d'aujourd'hui</span>
						</div>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3" for="dateFin">Date de fin :</label>
							<div class="controle col-sm-7">
								<input class="form-control" type="date" name="dateFin" id="datefinlan" placeholder="Date de fin">
							</div>
							<span class="col-sm-offset-4 col-sm-7 info-bulle">Respecter le format jj/mm/aaaa et la date doit être supérieure à la date d'aujourd'hui</span>
							<span id="respectDebutFin" class="col-sm-offset-4 col-sm-7 info-bulle">La date de fin doit être supérieure à la date de début</span>
						</div>
  <!--   ////////////////////////////  Tournois     ////////////////////////////                    -->
						<div class="form-group col-sm-3">
		          <label for="hDepart">Jeu</label>
		          <select class="form-control" id="jeuxselec">
		          </select>
		        </div>
						<div class="form-group col-sm-3">
							<label  for="nomLan">Nombre de slot</label>
							<div class="controle">
								<input class="form-control" type="text" name="nomLan" placeholder="Nombre de slot" id="nbslot">
							</div>
							<span class="col-sm-offset-4 col-sm-7 info-bulle">Entre 2 et 35 caractères, peut comporter lettres (é/è/ù/î/à/ô possibles), chiffres et espaces</span>
						</div>
						<div class="form-group col-sm-3">
							<label for="prixVisite">Prix du tournois (en euros) :</label>
							<div class="input-group controle">
								<input class="form-control" type="text" name="prixVisite" placeholder="Prix de la visite (en euros)" id="prixtournoi">
								<span class="input-group-addon glyphicon glyphicon-euro"></span>
							</div>
							<span class="info-bulle">Doit être un nombre avec deux chiffres après la "virgule" (représentée par un point)</span>
						</div>
						 <button  class="btn btn-primary col-sm-3" onclick="ajoutTn()">Ajouter</button>
						 <div class="col-sm-12" id="afficherTn">
							<table class="table table-striped">
								<thead>
								  <tr>
									<th>Jeux</th>
									<th>Nombre de Slots</th>
									<th>Prix du Tournois</th>
								  </tr>
								</thead>
								<tbody>
									
								</tbody>
							  </table>
						 </div>
  <!--   ////////////////////////////  ////////////////////:  ////////////////////////////    -->
						<div class="form-group col-sm-offset-1 col-sm-4">
							<label for="nbVisiteurs">Nombre de visiteurs autorisé :</label>
							<div class="controle">
								<input class="form-control" type="text" name="nbVisiteurs" placeholder="Nombre de visiteurs autorisé" id="nbvisiteur">
							</div>
							<span class="info-bulle">Doit être un nombre entre 10 et 10000</span>
						</div>
						<div class="form-group col-sm-offset-6 col-sm-4">
							<label for="prixVisite">Prix de la visite (en euros) :</label>
							<div class="input-group controle">
								<input class="form-control" type="text" name="prixVisite" placeholder="Prix de la visite (en euros)"id="prixvisitelan">
								<span class="input-group-addon glyphicon glyphicon-euro"></span>
							</div>
							<span class="info-bulle">Doit être un nombre avec deux chiffres après la "virgule" (représentée par un point)</span>
						</div>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3" for="adresseSite">Adresse du site internet :</label>
							<div class="controle col-sm-7">
								<input class="form-control" type="text" name="adresseSite" placeholder="Adresse du site internet" id="adressesite">
							</div>
							<span class="col-sm-offset-4 col-sm-7 info-bulle">Doit respecter le format d'une adresse de site web (ex: "http://[...].fr")</span>
						</div>
						<div class="form-group">
							<label class="col-sm-offset-1 col-sm-3" for="adresseWidget">Adresse widget réservation :</label>
							<div class="controle col-sm-7">
								<input class="form-control" type="text" name="adresseWidget" placeholder="Adresse widget réservation"id="adressewidget">
							</div>
							<span class="col-sm-offset-4 col-sm-7 info-bulle">Doit respecter le format d'une adresse de site web (ex: "http://[...].fr")</span>
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
			<script src="vue/js/script_organisation.js"></script>
