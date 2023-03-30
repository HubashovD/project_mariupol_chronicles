 // instantiate the scrollama
 const scroller = scrollama();

 var TopolayerGroupPoly = L.layerGroup().addTo(map);
 var TopolayerGroupLine = L.layerGroup().addTo(map);
 var TopolayerGroupPoint = L.layerGroup().addTo(map);
 var FrontlayerGroup = L.layerGroup().addTo(map);
 var IconlayerGroup = L.layerGroup().addTo(map);


 var frontLineStyles = {
     "color": "#f3a6b2",
     "fillColor": "#f3a6b2",
     "width": 10
 }

 var LineStyles = {
     dashArray: "3,5,3",
     color: "red"
 }

 var polyStyles = {
     "opacity": 'none',
     "color": "	#808080",
     "fillColor": "#808080",
     "width": "0"
 }

 var pointStyles = {
     "color": '#000000'
 }


 var boomIcon = L.icon({
     iconUrl: 'icons/boom.svg',

     iconSize: [38, 95], // size of the icon
 });


 // setup the instance, pass callback functions
 scroller
     .setup({
         step: ".step",
     })
     .onStepEnter((response) => {

         try {

             fetch("./maps/" + response.element.attributes.date.nodeValue + ".geojson")
                 .then(function(response) {
                     return response.json();
                 })
                 .then(function(data) {

                     console.log(data)

                     FrontlayerGroup.eachLayer(function(layer) {
                         FrontlayerGroup.removeLayer(layer);
                     });
                     geoData = L.geoJSON(data, {
                             style: frontLineStyles,
                         })
                         //  geoData.setStyle({ 'className': 'frontline' + response.element.attributes.date.nodeValue })
                     geoData.addTo(FrontlayerGroup);
                 });
         } catch {}


         map.flyTo([47.11, 37.57], 12);

         map.eachLayer(function(layer) {
             layer.closePopup();
         });

         d3.selectAll('.point')
             .attr('opacity', '0')



         var date = response.element.attributes.date.nodeValue

         d3.select("#date-placeholder").text(response.element.attributes[3].nodeValue)

         if (response.element.attributes[2].nodeValue == 'war') {
             d3.select('#type-placeholder')
                 .transition()
                 .duration(100)
                 .attr('class', 'date-type war')
                 .text("ВІЙСЬКОВИЙ ВИМІР")
         } else {
             d3.select('#type-placeholder')
                 .transition()
                 .duration(100)
                 .attr('class', 'date-type')
                 .text("ЦИВІЛЬНИЙ ВИМІР")
         }


         if (response.element.attributes.coords.nodeValue != "") {
             //  map.flyTo([response.element.attributes[4].nodeValue.split(",")[0], response.element.attributes[4].nodeValue.split(",")[1]], 15);

             var circle = L.circle([response.element.attributes[4].nodeValue.split(",")[0], response.element.attributes[4].nodeValue.split(",")[1]], {
                 color: 'red',
                 fillColor: '#f03',
                 fillOpacity: 0.5,
                 radius: 100,
             })
             circle.setStyle({ 'className': 'point' })
             circle.addTo(map);

             circle.bindPopup(response.element.attributes[5].nodeValue, { closeButton: false, autoClose: false }).openPopup()

             //  circle.addClass('point');

             d3.select('#mask')
                 .transition()
                 .duration(500)
                 .style('opacity', '0')

         } else {

             //  map.flyTo([response.element.attributes[4].nodeValue.split(",")[0], response.element.attributes[4].nodeValue.split(",")[1]], 10);

             d3.select('#mask')
                 .transition()
                 .duration(100)
                 .style('opacity', '1')
         }

         if (response.element.attributes.map_poly.nodeValue == "") {
             try {
                 TopolayerGroupPoly.eachLayer(function(layer) {
                     TopolayerGroupPoly.removeLayer(layer);
                 });
             } catch {}
         }

         if (response.element.attributes.map_lines.nodeValue == "") {
             try {
                 TopolayerGroupLine.eachLayer(function(layer) {
                     TopolayerGroupLine.removeLayer(layer);
                 });
             } catch {}
         }

         if (response.element.attributes.map_points.nodeValue == "") {
             try {
                 TopolayerGroupPoint.eachLayer(function(layer) {
                     TopolayerGroupPoint.removeLayer(layer);
                 });
             } catch {}
         }

         //  try {
         //      var idToShow = response.element.attributes.idToShow.nodeValue.split(",")
         //  } catch { idToShow = [] }

         if (response.element.attributes.icons.nodeValue == "") {
             IconlayerGroup.eachLayer(function(layer) {
                 IconlayerGroup.removeLayer(layer);
             });
         }


         // polygons filter
         try {
             var map_poly = response.element.attributes.map_poly.nodeValue.split(",")
         } catch { map_poly = [] }

         function polyFilter(feature) {
             if (map_poly.includes(feature.properties.id_.toString())) return true
         }

         if (response.element.attributes.map_poly.nodeValue != "") {
             d3.select('#mask')
                 .transition()
                 .duration(100)
                 .style('opacity', '0')
             try {
                 fetch("topo/polys2.geojson")
                     .then(function(response) {
                         return response.json();
                     })
                     .then(function(data) {
                         TopolayerGroupPoly.eachLayer(function(layer) {
                             TopolayerGroupPoly.removeLayer(layer);
                         });
                         geoData = L.geoJSON(data, { filter: polyFilter }, {
                             style: polyStyles,
                         })
                         geoData.addTo(TopolayerGroupPoly);

                         L.geoJson(data, {
                             onEachFeature: function(feature, layer) {
                                 if (map_poly.includes(feature.properties.id_.toString())) {
                                     var circle = L.circle(layer.getBounds().getCenter(), {
                                         color: 'None',
                                         fillColor: 'None',
                                         fillOpacity: 0,
                                         radius: 100,
                                     })
                                     circle.setStyle({ 'className': 'point' })
                                     circle.addTo(map);

                                     circle.bindPopup(feature.properties.name, { closeButton: false, autoClose: false }).openPopup()
                                 } else {}

                             }
                         })


                     });
             } catch {}
         }


         // lines filter
         try {
             var map_lines = response.element.attributes.map_lines.nodeValue.split(",")
         } catch { map_lines = [] }

         function lineFilter(feature) {
             if (map_lines.includes(feature.properties.id_.toString())) return true
         }

         if (response.element.attributes.map_lines.nodeValue != "") {
             d3.select('#mask')
                 .transition()
                 .duration(100)
                 .style('opacity', '0')
             try {
                 fetch("topo/lines.geojson")
                     .then(function(response) {
                         return response.json();
                     })
                     .then(function(data) {
                         TopolayerGroupLine.eachLayer(function(layer) {
                             TopolayerGroupLine.removeLayer(layer);
                         });

                         geoData = L.geoJSON(data, { filter: lineFilter }, { "color": 'red' })
                             //  geoData.setStyle({ 'className': 'topo-elements' + response.element.attributes.date.nodeValue })
                         geoData.addTo(TopolayerGroupLine);

                     });
             } catch {}
         }



         // points filter
         try {
             var map_points = response.element.attributes.map_points.nodeValue.split(",")
         } catch { map_points = [] }

         if (response.element.attributes.map_points.nodeValue != "") {
             d3.select('#mask')
                 .transition()
                 .duration(100)
                 .style('opacity', '0')
             try {
                 fetch("topo/points.geojson")
                     .then(function(response) {
                         return response.json();
                     })
                     .then(function(data) {
                         TopolayerGroupPoint.eachLayer(function(layer) {
                             TopolayerGroupPoint.removeLayer(layer);
                         });
                         data.features.forEach(element => {
                             if (map_points.includes(element.properties.id_.toString())) {
                                 var circle = L.circle([element.geometry.coordinates[1], element.geometry.coordinates[0], ], {
                                     color: 'red',
                                     fillColor: '#f03',
                                     fillOpacity: 0.5,
                                     radius: 100,
                                 })
                                 circle.addTo(TopolayerGroupPoint);
                                 circle.bindPopup(element.properties.name, {
                                     closeButton: false,
                                     autoClose: false
                                 }).openPopup()
                             } else {}
                         });
                     });
             } catch {}
         }




         if (response.element.attributes.zoom.nodeValue != "") {
             var lat = response.element.attributes.focus_point.nodeValue.split(",")[0]
             var lon = response.element.attributes.focus_point.nodeValue.split(",")[1]
             var zoom = response.element.attributes.zoom.nodeValue
             map.flyTo([lat, lon], response.element.attributes.zoom.nodeValue);
         } else {
             map.flyTo([47.11, 37.57], 12);
         }

         var icons = response.element.attributes.icons.nodeValue.split(',')
         if (response.element.attributes.icons.nodeValue != "") {
             d3.select('#mask')
                 .transition()
                 .duration(100)
                 .style('opacity', '0')
             try {
                 fetch("topo/icons.geojson")
                     .then(function(response) {
                         return response.json();
                     })
                     .then(function(data) {
                         IconlayerGroup.eachLayer(function(layer) {
                             IconlayerGroup.removeLayer(layer);
                         });
                         L.geoJson(data, {
                             onEachFeature: function(feature, layer) {
                                 if (icons.includes(feature.properties.id.toString())) {
                                     var greenIcon = L.icon({
                                         iconUrl: './icons/' + feature.properties.icon,
                                         iconSize: [38, 95], // size of the icon
                                     });
                                     L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], { icon: greenIcon }).addTo(IconlayerGroup);
                                 } else {}
                             }
                         })


                     });
             } catch {}
         }


     })
     .onStepExit((response) => {
         if (response.index == 0 && response.direction == 'up') {
             map.flyTo([49.46236693239768, 32.04686624407093], 8)
             d3.select('#mask')
                 .transition()
                 .duration(100)
                 .style('opacity', '1')
         }


     });