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
    trasa = L.polyline([targetMarker.getLatLng(), m.getLatLng()], lineOptions).addTo(map);
    fitMapBounds({ map, markers });
    var element = document.getElementById("userPosition");
    element.textContent = crd.latitude.toString() + "; " + crd.longitude.toString();

    element = document.getElementById("targetPosition");
    element.textContent = target.latitude.toString() + "; " + target.longitude.toString();
    lastLocation = {
        latitude: crd.latitude,
        longitude: crd.longitude
    };
    element= document.getElementById("distance");
    element.textContent = distance();
    element= document.getElementById("maxDistance");
    element.textContent = maxDistance;
    element= document.getElementById("areYouCloseEnough");
    element.textContent = isClose();
    console.log("Added second marker at " + markers[1].getLatLng());
    return m;
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

function coords_to_meters(lat1, lon1, lat2, lon2) {  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return Math.round(d * 1000); // meters
}
function distance() {
    return coords_to_meters(target.latitude, target.longitude, lastLocation.latitude, lastLocation.longitude);
}
function isClose() {
    return distance <= maxDistance ? "TAK": "NIE";
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

const maxDistance = 10;
var markers = [];
var trasa;
var watchId;
var tooltip;
var map = initMap();

document.addEventListener("DOMContentLoaded", main);