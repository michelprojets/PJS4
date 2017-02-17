/* script js */

/* GENERAL */

// fonction anonyme qui permet d'aggrandir les options du menu onmouseover

(function(){
	var boutonMenus = document.querySelectorAll("header nav .container-fluid ul li a");
	for (var i=0; i<boutonMenus.length; ++i){
		boutonMenus[i].addEventListener('mouseover', grandir);
		boutonMenus[i].addEventListener('mouseleave', retrecir);
	}
					
	function grandir(e){
		e.target.style.fontSize="115%";
	}
					
	function retrecir(e){
		e.target.style.fontSize="";
	}
})();


// fonction anonyme qui fait apparaître le menu (en dessous de 768px = xm) si on passe la souris sur la barre de menu en haut
// (NE FONCTIONNE PAS)
/*
(function(){
	var menu = document.querySelectorAll("header nav");
	var elemsMenu = document.querySelectorAll("header navul");
	menu.addEventListener('mouseover', function(){
		for (var i=0; i<elemsMenu.length; ++i){
			elemsMenu[i].style.display = "block";
		}
	});
})();
*/