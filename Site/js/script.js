/* script js */

// fonction anonyme qui permet d'aggrandir les options du menu onmouseover
window.onload = function(){
	var boutonMenus = document.querySelectorAll("header nav .container-fluid ul li a");
	for (var i=0; i<boutonMenus.length; ++i){
		boutonMenus[i].addEventListener('mouseover', grandir);
		boutonMenus[i].addEventListener('mouseleave', retrecir);
	}
				
	function grandir(e){
		e.target.style.fontSize="125%";
	}
				
	function retrecir(e){
		e.target.style.fontSize="";
	}
}