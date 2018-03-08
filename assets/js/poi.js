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

/* removed for new schede embedded in iframes, uncommento to go back
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

*/




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

function loadScheda(nomeScheda){
     //            src  : '' // Source of the content
     //            type : '' // Content type: image|inline|ajax|iframe|html (optional)
     //            opts : {} // Object containing item options (optional)
     
    widthW = "60%";
    heightH = "60%";

    if(isSmallScreen()){
         widthW = "90%";
         heightH = "90%";
    }


    $.fancybox.open({
                src  : '../../schede/'+nomeScheda+'.html',
                type : 'iframe',
                iframe : {
                    smallBtn : 'auto',
                    attr : {scrolling : 'yes'},
                    css : { width : widthW,  
                            height : heightH}
                }  
            });
}

function hideTitle(){
     $(".hotspot-title").hide( "slow", function() {
        $(".hotspot-title-hidden").show( "fast", function() {
        });
     });
}


function showTitle(){

      $(".hotspot-title-hidden").hide( "fast", function() {
        $(".hotspot-title").show( "slow", function() {
        });
     });
}



function isSmallScreen(){
    if (getWidth()<800)
        return true;
    else
        return false;
}


function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}



// shorter jQuery version 
$(function(){
    var isMobileApple = navigator.userAgent.toLowerCase().match(/(ipad|iphone)/); //TODO not sure
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari && isMobileApple==null) {
        //Do the following only for safari desktop
        if ($('#videolink').length){ //This POI has a video
            var POIID = $( "#videolink" ).data("poi");
            var videoID = videomap[POIID];
            //Note, if you change the following line also update the code on index.htm
            var contentString = "<a href='https://youtu.be/"+videoID+"' target='_blank' > <img src='../../assets/images/open_video.png' style='width: 20px; vertical-align: middle'>&nbsp;Watch video</a>";
            $("#videolink").html(contentString);
        }
    }
    
});


var videomap= {
    "1":"rnkVxplgEWc",
    "2":"jRDzSQ212t8",
    "3":"7zN4maNyrN0",
    "6":"MMzSxgmRV5g",
    "8":"TxBR2V3JqA0",
    "9":"3OtdWxAf-Ug",
    "10":"m6zMxXJw9qw",
    "11":"6IgfMwDtrfU",
    "12":"FLePlqWvL6c",
    "13":"-SOQR31FytY",
    "15":"Vr8rjtqeNTw",
    "17":"sEBYeH2Fde4",
    "18":"P7124Yo9zVs",
    "19":"2Op_uO5AcSg"
};



