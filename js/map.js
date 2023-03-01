var map = L.map('map').setView([47.11, 37.57], 12);
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// var controls = L.control.layers(baseLayers, overlays, options);
map.removeControl(map.zoomControl);