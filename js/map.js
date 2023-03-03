var map = L.map('map').setView([49.46236693239768, 32.04686624407093], 8);
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var frontLineStyles = {
    "color": "#f3a6b2",
    "fillColor": "#f3a6b2",
    "stroke-width": 10
};

fetch("./maps/occupied.geojson").then(function(response) {
    return response.json();
}).then(function(data) {
    geoData = L.geoJSON(data, {
        style: frontLineStyles,
    })
    geoData.setStyle({ 'className': 'occupied' })
    geoData.addTo(map);
});




// var controls = L.control.layers(baseLayers, overlays, options);
map.removeControl(map.zoomControl);