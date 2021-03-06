<?php
	global $controle;
	global $action;
?>

<!doctype html>

<html lang="fr">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Let's LAN</title>
		<!--- css bootstrap --->
		<link rel="stylesheet" href="vue/css/bootstrap.min.css">
		<!--- css google  		<link href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/themes/ui-darkness/jquery-ui.min.css" rel="stylesheet"> --->

		<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1/themes/overcast/jquery-ui.css" type="text/css" rel="stylesheet" />
		
		<!--- css personnalisé --->
		<link rel="stylesheet" href="vue/css/style.css">
	</head>
	<body>
		<div id="page" class="container"> <!--- container général --->
			<header class=""> <!--- header --->
				<nav class="navbar navbar-default navbar-fixed-top">
					<div class="container"> <!--- container du menu --->
						<div class="container-fluid">
							<div class="navbar-header">
								<img class="img-responsive" src="vue/images/logo.png" alt="Let's Lan">
							</div>
							<ul class="nav navbar-nav">
								<li><a href="index.php?controle=start&action=accueil"><span class="glyphicon glyphicon-home"></span>Accueil</a></li>
								<li><a href="index.php?controle=gestion&action=organiser"><span class="glyphicon glyphicon-calendar"></span>Organiser une LAN</a></li>
								<li><a href="index.php?controle=gestion&action=reserver"><span class="glyphicon glyphicon-calendar"></span>Réserver une LAN</a></li>
								<li><a href="index.php?controle=contacts&action=contacter"><span class="glyphicon glyphicon-envelope"></span>Contacts</a></li>
							</ul>
							<ul class="nav navbar-nav navbar-right">
								<?php if (!isset($_SESSION['profil']['IdUtilisateur'])){ ?>
									<li><a href="index.php?controle=compte&action=inscription"><span class="glyphicon glyphicon-user"></span>S'inscrire</a></li>
									<li><a href="index.php?controle=compte&action=connexion"><span class="glyphicon glyphicon-log-in"></span>Se connecter</a></li>
								<?php } else { ?>
									<li><a id="login"><span class="glyphicon glyphicon-user"><?php echo(" Bonjour " . $_SESSION['profil']['Pseudo'] . " !");?></span></a></li>
									<li><a href="index.php?controle=compte&action=deconnexion"><span class="glyphicon glyphicon-log-out"></span>Se déconnecter</a></li>
								<?php } ?>
							</ul>
						</div>
					</div> <!--- fin container --->
				</nav> <!--- fin nav --->
			</header> <!--- fin header --->
		
		
			<?php require("./vue/" . $controle . "/" . $action . ".tpl"); ?>
		
		</div> <!--- fin container général --->
		
		<!--- javascript jquery --->
		<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
		<!--- javascript personnalisé --->
		<script src="vue/js/script.js"></script>
		
		<footer> <!--- footer --->
			<nav class="navbar navbar-default navbar-fixed-bottom">
				<li>
					<p>© Copyright 2017 | IUT Paris Descartes</p>
				</li>
			</nav>
		</footer> <!--- fin footer --->
		
	</body>
</html>