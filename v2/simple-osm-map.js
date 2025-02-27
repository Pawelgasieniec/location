function initMap() {
    var map = L.map('map');

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 30,
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
    markers.push(marker);
    return marker;
}

function addAdditionalMarker(pos) {
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
        if (newPos.latitude != lastLocation.latitude || newPos.longitude != lastLocation.longitude) {
            console.log("Moved from " + marker2.getLatLng() + " to: " + newPos);
            fitMapBounds({ map, markers });
        }
        var userPosParagraph = document.getElementById("userPosition");
        userPosParagraph.textContent = crd.latitude.toString() + "; " + crd.longitude.toString();
        lastLocation = newPos;
    } else {
        console.log("No second marker yet?");
    }
}

function error(err) {
    console.error(`ERROR(${err.code}): ${err.message}`);
}

function setTargetCoordinatesFromQuery(queryString) {
    const urlParams = new URLSearchParams(queryString);
    target.latitude = parseFloat(urlParams.get('latitude'));
    target.longitude = parseFloat(urlParams.get('longitude'));
    target.name = urlParams.get('name');
    targetMarker = addMarker(map, target.latitude, target.longitude, target.name, markers);
    console.log("Set target to " + target.latitude + ' - ' + target.longitude);
}

target = {
    latitude: 0,
    longitude: 0,
    name: ""
};
lastLocation = {
    latitude: 0,
    longitude: 0
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