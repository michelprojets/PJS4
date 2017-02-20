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
		<!--- css personnalisé --->
		<link rel="stylesheet" href="vue/css/style.css">
	</head>
	<body>
		<div class="container"> <!--- container général --->
			<header class=""> <!--- header --->
				<nav class="navbar navbar-inverse navbar-fixed-top">
					<div class="container"> <!--- container du menu --->
						<div class="container-fluid">
							<div class="navbar-header">
								<a class="navbar-brand" href="#">Let's LAN</a>
							</div>
							<ul class="nav navbar-nav">
								<li><a href="index.php?controle=start&action=accueil"><span class="glyphicon glyphicon-home"></span>Accueil</a></li>
								<li><a href="index.php?controle=organisation&action=organiser"><span class="glyphicon glyphicon-calendar"></span>Organiser une LAN</a></li>
								<li><a href="index.php?controle=reservation&action=reserver"><span class="glyphicon glyphicon-calendar"></span>Réserver une LAN</a></li>
								<li><a href="index.php?controle=contacts&action=contacter"><span class="glyphicon glyphicon-envelope"></span>Contacts</a></li>
							</ul>
							<ul class="nav navbar-nav navbar-right">
								<li><a href="index.php?controle=compte&action=inscription"><span class="glyphicon glyphicon-user"></span>S'inscrire</a></li>
								<li><a href="index.php?controle=compte&action=connexion"><span class="glyphicon glyphicon-log-in"></span>Se connecter</a></li>
							</ul>
						</div>
					</div> <!--- fin container --->
				</nav> <!--- fin nav --->
			</header> <!--- fin header --->
		
		
			<?php require("./vue/" . $controle . "/" . $action . ".tpl"); ?>
		
		</div> <!--- fin container général --->
		
		<footer> <!--- footer --->
			<nav class="navbar navbar-inverse navbar-fixed-bottom">
				<li>
					<p>© Copyright 2017 | IUT Paris Descartes</p>
				</li>
			</nav>
		</footer> <!--- fin footer --->
		
		<!--- javascript personnalisé --->
		<script src="js/script.js"></script>
		
	</body>
</html>