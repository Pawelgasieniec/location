function initMap() {
    var map = L.map('map');

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    return map;
}

function setupMap(data) {
    var markerGroup = new L.featureGroup(data.markers);

    data.map.fitBounds(markerGroup.getBounds());
    watchId = navigator.geolocation.watchPosition(moveSecondMarker, error, geoLocationOptions);
}

function addMarker(map, lat, lon, title, markers) {
    var marker = L.marker([lat, lon])
        //.bindPopup(title)
        //.openPopup()
        .addTo(map);

    L.tooltip({ permanent: true })
        .setContent(title)
        .setLatLng([lat, lon])
        .addTo(map);
    markers.push(marker);
    return marker;
}

function addAdditionalMarker(pos){
    const crd = pos.coords;
    // addAdditionalMarker(map, 52.250509, 20.847786, "G", markers);
    // addAdditionalMarker(map, crd.latitude, crd.longitude, "G", markers);
    var icon = L.divIcon({
        className: 'additional-marker-div-icon',
        html: name
    });

    var m = L.marker([crd.latitude, crd.longitude], { icon: icon })
        .addTo(map);
    markers.push(m);
    console.log("Added second marker at " + markers[1].getLatLng());
    trasa = L.polyline([targetMarker.getLatLng(), m.getLatLng()], lineOptions).addTo(map);
    return m;
}


function moveSecondMarker(pos) {
    const crd = pos.coords;
    if (markers && markers.length > 1) {
        var marker2 = markers[1]
        var newPos = L.latLng(crd.latitude, crd.longitude)
        marker2.setLatLng(newPos);
        trasa.setLatLngs([markers[0].getLatLng(), markers[1].getLatLng()]).redraw();
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

target = {
    latitude: 52.25068,
    longitude: 20.84772,
};

geoLocationOptions = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0,
};

lineOptions = {
    color: '#ff0000'
}

var markers = [];
var trasa;
var watchId;
var map = initMap();
document.addEventListener("DOMContentLoaded", main);