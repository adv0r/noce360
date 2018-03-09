//TODO create an array with the DB
//Settings -------------------------------------
var assetsDir = "assets/"
var hotspotsDir = hotspots.hotspotsDir;

var nocemap;


//Settings -------------------------------------

$(document).ready(function() {
    //Load the Leaflet Map
    console.log("Document ready...");

    var isMobileApple = navigator.userAgent.toLowerCase().match(/(ipad|iphone)/); //TODO not sure
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari && isMobileApple==null) {
        //Do the following only for safari desktop
         $("#videolink-natura").html("<a href='https://youtu.be/v9JuKiJmag8'><img src='assets/images/under_tematic_video.jpg' alt='video'/></a>");
         $("#videolink-cultura").html("<a href='https://youtu.be/u5XlNICF_oY'><img src='assets/images/under_tematic_video.jpg' alt='video'/></a>");
    }

    initMap();
});


function initMap() {
    var MapBoxAccessToken = "pk.eyJ1Ijoid3JhcHBpbmdyZWFsaXR5IiwiYSI6ImNqOXloYmR6azE3em0zM21kMnJicnZjNXMifQ.nsgfJ8Nvo6DSpTfblbhKNQ"; //belongs to wrapping.reality@gmail.com

    var lat = hotspots.centerLat;
    var long = hotspots.centerLong;
    var boundsOffset = 0.8;

    var zoomLevel = 9.5;
    if (L.Browser.mobile) {
        zoomLevel = 8.5;
    }
    var bounds = new L.LatLngBounds(new L.LatLng(lat + boundsOffset, long + boundsOffset), new L.LatLng(lat - boundsOffset, long - boundsOffset));

    nocemap = new L.Map('mapdiv', {
        center: bounds.getCenter(),
        zoom: zoomLevel,
        maxBounds: bounds,
        maxBoundsViscosity: 0.75,
        attributionControl: false,
        closePopupOnClick: false
    });



    //nocemap.addControl(new L.Control.Fullscreen()); //Removed fullscreen because in fullscreen mode all divs are hidden otherwise and there is no solution
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 16,
        minZoom: 6,
        maxBounds: bounds,
        id: 'mapbox.streets',
        accessToken: MapBoxAccessToken
    }).addTo(nocemap);



    //Make it fullscreen
    //$(window).on("resize", function () { $("#mapdiv").height($(window).height()); nocemap.invalidateSize(); }).trigger("resize");

    //attach a listener
    nocemap.on('click', onMapClick);
    nocemap.on('popupclose', onPopUpClose);

    console.log("Map loaded ... Adding Markers");

    loadMarkersFromDb(nocemap);


    
    var noceArea = L.polygon([
        [lat+0.105, long+0.28],
        [lat-0.15, long+0.28],
        [lat-0.15, long-0.27],
        [lat+0.105, long-0.27]
        ],{
            fillOpacity : 0.27,
            fillColor : '#e0ecfc',
            stroke: true,
            color: '#63a5f9',
            weight: 6,
            opacity : 0.4
        }).addTo(nocemap);


    /*
    //add testCircle
    var testCircle = L.circle([lat-0.0023, long-0.033], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(nocemap);

    //add testPoligon
   
    

    //Add Markers 
    testCircle.bindPopup("I am a circle.");
    //testPolygon.bindPopup("I am a polygon.");

    //add Listeners
    testCircle.on('click', onCircleClick);
    //testPolygon.on('click', onPolyClick);
    */

    //Add special Porjola hotspot 46.373333, "long": 10.966667,

}


function onMapClick(e) {
    console.log("You clicked the map at " + e.latlng);
    //TODO reactivate after fixing issue #11
    console.log("Closing all popups..");
    nocemap.closePopup();
    //nocemap.unbindPopup();
    //event.popup._source.unbindPopup();

    nocemap.eachLayer(function(layer) {
        if (layer.options.alt === 'tricky') {
            console.log("Unbinding popup from marker")
            layer.unbindPopup();
        }
    });

}

function onMarkerClick(e) {
    console.log("You clicked the marker at " + e.latlng);
    console.log("Marker name : " + this.name);
    var tempPopup = this.tempMarker.getPopup();

    if (tempPopup) {
        if (tempPopup.isOpen()) {
            if (this.href != "") {
                console.log("Opening specific hotspot  : " + this.href);
                window.location.href = hotspotsDir + this.href;
            }
        } else {
            this.tempMarker.openPopup();
        }
    } else {
        var appendStr = "";
        if (this.type!="choice"){
            appendStr = "<center><p> <img src='assets/images/enter_graph.png' style='width: 20px; vertical-align: middle'> <i>Entra</i></p></center>";
        }
        var popup = L.popup({
            closeButton: true,
            className: 'markerPopup'
        }).setContent("<b>" + this.name + "</b><br>" + this.description +
            appendStr);

        this.tempMarker.bindPopup(popup);
        console.log("Open Popup : " + this.href);
        this.tempMarker.openPopup();
        var tempPopup = this.tempMarker.getPopup();
        var link = this.href;
        if (this.href != "") {
            L.DomEvent.on(tempPopup._wrapper, 'click', function(e) {
                console.log("Opening specific hotspot  : " + link);
                window.location.href = hotspotsDir + link;
            });
        }

    }
}


function onMarkerNoMediaClick(e) {
    //console.log("You clicked the marker no media at " + e.latlng);
    //console.log("Marker name : " + this.name);

    nocemap.closePopup();

    if (this.scheda.titolo != "")
        showScheda(this.scheda.filename);
}

function onCircleClick(e) {
    console.log("You clicked the circle at " + e.latlng);
    window.location.href = hotspotsDir + 'test';
}

function onPolyClick(e) {
    console.log("You clicked the polygon at " + e.latlng);
}

function onPopUpClose(e) {
    console.log("PopupClose ");
    e.popup._source.unbindPopup();
}


function loadMarkersFromDb(map) {
    //Create custom marker for POIs with 360 media
    var poiMarker = L.icon({
        iconUrl: 'assets/images/poi.png',
        shadowUrl: 'assets/images/poi_shadow.png',
        iconSize: [30, 30],
        shadowSize: [30, 30],
        shadowAnchor: [2, 10],
        iconAnchor: [15, 15],
        popupAnchor: [-3, -20]
    });

    //Create custom marker for POIs without 360 media
    var poiNoMediaMarker = L.icon({
        iconUrl: 'assets/images/poinomedia.png',
        shadowUrl: 'assets/images/poi_shadow.png',
        iconSize: [30, 30],
        shadowSize: [30, 30],
        shadowAnchor: [2, 10],
        iconAnchor: [15, 15],
        popupAnchor: [-3, -20]
    });

    console.log("Loading markers from db");
    console.log("Number of markers with 360 media found :" + (hotspots.spotsWithMedia.length - 1));
    for (i in hotspots.spotsWithMedia) {
        var tempSpot = hotspots.spotsWithMedia[i];
        //console.log("Marker " + i + " : " + JSON.stringify(tempSpot));
        //Add to map
        var tempMarker = L.marker([tempSpot.lat, tempSpot.long], {
            alt: 'marker',
            icon: poiMarker
        }).addTo(map);
        tempSpot.tempMarker = tempMarker;
        tempMarker.on('click', onMarkerClick, tempSpot);
        if (tempSpot.bounce) {
            tempMarker.bounce(10);
        }
    }


    console.log("Number of markers without 360 media found :" + (hotspots.spotsNoMedia.length - 1));
    for (i in hotspots.spotsNoMedia) {
        var tempSpot = hotspots.spotsNoMedia[i];
        //console.log("Marker " + i + " : " + JSON.stringify(tempSpot));
        //Add to map
        var tempMarker = L.marker([tempSpot.lat, tempSpot.long], {
            alt: 'marker',
            icon: poiNoMediaMarker
        }).addTo(map);
        tempSpot.tempMarker = tempMarker;
        tempMarker.on('click', onMarkerNoMediaClick, tempSpot);
        if (tempSpot.bounce) {
            tempMarker.bounce(10);
        }
    }


    //Add special marker for porjola with custom tooltip
}



// Scheda Info su mappa ------- 

function showScheda(filename) {
    widthW = "60%";
    heightH = "60%";

    if(isSmallScreen()){
         widthW = "90%";
         heightH = "90%";
    }

    $.fancybox.open({
                src  : 'schede/'+filename+'.html',
                type : 'iframe',
                iframe : {
                    smallBtn : 'auto',
                    attr : {scrolling : 'yes'},
                    css : { width : widthW,  
                            height : heightH}
                }  
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



