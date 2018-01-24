function backHome(){
	document.location.href = '../../'; //one level up;
}

function playDroneVideo(){
	console.log("Play drone video");
	document.location.href = '../ossana-drone'; //one level up;
}



function toggleScheda(){
	var schede = document.getElementsByClassName("schedaContenuto");
	var scheda = schede[0];
	var vis = scheda.style.visibility;
	if(vis=="visible")
		scheda.style.visibility="hidden";
	else 
		scheda.style.visibility="visible";
}

function hideScheda(scheda){
	document.getElementsByClassName("schedaContenuto")[0].style.visibility = "hidden";
}

function showScheda(scheda){
	document.getElementsByClassName("schedaContenuto")[0].style.visibility = "visible";
}