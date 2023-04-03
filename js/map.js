var map = L.map('map').setView([47.11, 37.57], 12);


// var map_margin = { top: 10, right: 10, bottom: 10, left: 10 },
//         map_width = d3.select("#map").node().getBoundingClientRect().width, //- margin.left - margin.right,
//         map_height = d3.select("#map").node().getBoundingClientRect().height - map_margin.top - map_margin.bottom;



L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var occupiedPolyStyles = {
    "color": "#000000",
    "fillColor": "#000000",
    "stroke-width": "0",
    "stroke-opacity": "0",
    "fillOpacity": 0.8,
    "stroke": false
}


var rusPolyStyles = {
    "color": "#000000",
    "fillColor": "#000000",
    "stroke-width": "0",
    "stroke-opacity": "0",
    "fillOpacity": 1,
    "stroke": false
}

fetch("./maps/occupied.geojson").then(function(response) {
    return response.json();
}).then(function(data) {
    geoData = L.geoJSON(data, {
        style: occupiedPolyStyles,
    })
    geoData.setStyle({ 'className': 'occupied' })
    geoData.addTo(map);
});

fetch("./maps/russia.geojson").then(function(response) {
    return response.json();
}).then(function(data) {
    geoData = L.geoJSON(data, {
        style: rusPolyStyles,
    })
    geoData.setStyle({ 'className': 'occupied' })
    geoData.addTo(map);
});





// var controls = L.control.layers(baseLayers, overlays, options);
map.removeControl(map.zoomControl);