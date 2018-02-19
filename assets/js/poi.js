function backHome() {
    document.location.href = '../../'; //one level up;
}


function toggleScheda() {
    var schede = document.getElementsByClassName("schedaContenuto");
    var scheda = schede[0];
    var vis = scheda.style.visibility;

    if (vis == "visible")
        scheda.style.visibility = "hidden";
    else
        scheda.style.visibility = "visible";
}

function hideScheda(scheda) {
    document.getElementsByClassName("schedaContenuto")[0].style.visibility = "hidden";
}

function showScheda(scheda) {
    document.getElementsByClassName("schedaContenuto")[0].style.visibility = "visible";

}

function addSchedaToPano() {
    var krpano = document.getElementById("krpanoSWFObject");
    var layer = krpano.get("control.layer");
    layer.appendChild(scheda);
}


//Equivalent of jQuery onDocument ready thanks to https://stackoverflow.com/a/30319853
r(function() {
    addSchedaToPano();

    //Preventing the user from zooming while inside scheda
    document.getElementById('scheda')
        .addEventListener('mouseenter', function (event) {
            mouseEnteredScheda();
        });


    document.getElementById('scheda')
        .addEventListener('mouseout', function (event) {
            mouseOutScheda();
        });

});

function r(f) {
    /in/.test(document.readyState) ? setTimeout('r(' + f + ')', 9) : f()
}


function mouseEnteredScheda(){
    var krpano = document.getElementById("krpanoSWFObject");
    krpano.set("control.mousefovchange",0);
    console.log("blocked mousewheel");
}

function mouseOutScheda(){
    var krpano = document.getElementById("krpanoSWFObject");
    krpano.set("control.mousefovchange",1);
    console.log("released mousewheel");

}



