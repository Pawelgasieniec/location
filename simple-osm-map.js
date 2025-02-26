function initMap() {
    var map = L.map('map');

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    return map;
}

function fitMapBounds(data) {
    var markerGroup = new L.featureGroup(data.markers);
    data.map.fitBounds(markerGroup.getBounds());
}

function addMarker(map, lat, lon, title, markers) {
    var marker = L.marker([lat, lon])
        .addTo(map);
    tooltip = marker.bindTooltip(title, { permanent: true }).openTooltip();
    // L.tooltip({ permanent: true })
    //     .setContent(title)
    //     .setLatLng([lat, lon])
    //     .addTo(map);
    markers.push(marker);
    var latInput = document.getElementById("latitude");
    var lngInput = document.getElementById("longitude");
    latInput.value = target.latitude;
    lngInput.value = target.longitude;
    return marker;
}

function addAdditionalMarker(pos){
    const crd = pos.coords;
    var icon = L.divIcon({
        className: 'additional-marker-div-icon',
        html: 'A'
    });

    var m = L.marker([crd.latitude, crd.longitude], { icon: icon })
        .addTo(map);
    markers.push(m);
    watchId = navigator.geolocation.watchPosition(moveSecondMarker, error, geoLocationOptions);
    trasa = L.polyline([targetMarker.getLatLng(), m.getLatLng()], lineOptions).addTo(map);
    fitMapBounds({ map, markers });
    console.log("Added second marker at " + markers[1].getLatLng());
    return m;
}


function moveSecondMarker(pos) {
    const crd = pos.coords;
    if (markers && markers.length > 1) {
        var marker2 = markers[1]
        var newPos = L.latLng(crd.latitude, crd.longitude)
        marker2.setLatLng(newPos);
        trasa.setLatLngs([markers[0].getLatLng(), markers[1].getLatLng()]).redraw();
        fitMapBounds({ map, markers });
        var userPosParagraph = document.getElementById("userPosition");
        userPosParagraph.textContent = crd.latitude.toString() + "; " + crd.longitude.toString();
        console.log("Moved from " + marker2.getLatLng() + " to: " + newPos);
    } else {
        console.log("No second marker yet?");
    }
    if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
        console.log("Congratulations, you reached the target");
        navigator.geolocation.clearWatch(watchId);
    }
}

function error(err) {
    console.error(`ERROR(${err.code}): ${err.message}`);
}

function updateTargetCoordinates(){
    target.latitude = document.forms["targetCoordForm"]["latitude"].value;
    target.longitude = document.forms["targetCoordForm"]["longitude"].value;
    markers[0].setLatLng([target.latitude, target.longitude])
    trasa.setLatLngs([markers[0].getLatLng(), markers[1].getLatLng()]).redraw();
    fitMapBounds({ map, markers });
    console.log("Set target to " + target.latitude + ' - ' + target.longitude);
    return true;
}

target = {
    latitude: 52.25068,
    longitude: 20.84772,
};

geoLocationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

lineOptions = {
    color: '#000000'
}

var markers = [];
var trasa;
var watchId;
var tooltip;
var map = initMap();
document.addEventListener("DOMContentLoaded", main);