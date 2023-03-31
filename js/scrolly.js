 // instantiate the scrollama
 const scroller = scrollama();

 var TopolayerGroupPoly = L.layerGroup().addTo(map);
 var TopolayerGroupLine = L.layerGroup().addTo(map);
 var TopolayerGroupPoint = L.layerGroup().addTo(map);
 var FrontlayerGroup = L.layerGroup().addTo(map);
 var IconlayerGroup = L.layerGroup().addTo(map);


 var frontLineStyles = {
     "color": "#000000",
     "fillColor": "#000000",
     'fillOpacity': 0.6,
     "stroke": false
 }

 var LineStyles = {
     "color": "#7DBCA5",
     "fillColor": "#7DBCA5",
 }

 var ukrpolyStyles = {
     "color": "#426357",
     "fillColor": "#7DBCA5",
     'fillOpacity': 0.6,
 }

 var pointStyles = {
     "fillColor": "#7DBCA5",
     "color": '#426357'

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

         if (response.index == 84 && response.direction == 'down') {
             console.log(response.index, response.direction)
             d3.select('#mask')
                 .transition()
                 .duration(1000)
                 .style('opacity', '0')
                 .style('background-color', 'black')

         }

         if (response.index == 84 && response.direction == 'up') {
             console.log(response.index, response.direction)
             d3.select('#mask')
                 .transition()
                 .duration(1000)
                 .style('opacity', '1')
                 .style('background-color', '#F6F6F4')

             d3.selectAll('.only-for-black')
                 .transition()
                 .duration(1000)
                 .style('background', '#F6F6F4')

         }

         if (response.index == 85 && response.direction == 'down') {
             console.log(response.index, response.direction)
             d3.select('#mask')
                 .transition()
                 .duration(1000)
                 .style('opacity', '1')
                 .style('background-color', 'black')

             d3.selectAll('.only-for-black')
                 .transition()
                 .duration(1000)
                 .style('background', 'black')


         }

         if (response.index == 85 && response.direction == 'up') {
             console.log(response.index, response.direction)
             d3.select('#mask')
                 .transition()
                 .duration(1000)
                 .style('opacity', '0')




         }

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
                     geoData.addTo(FrontlayerGroup);
                 });
         } catch {}


         map.flyTo([47.11, 37.57], 12);

         map.eachLayer(function(layer) {
             layer.closePopup();
         });

         d3.selectAll('.point')
             .attr('opacity', '0')

         if (response.element.hasAttribute("date")) {
             d3.select("#date-placeholder")
                 .transition()
                 .duration(500)
                 .text(response.element.attributes.date.nodeValue)
         }

         if (response.element.hasAttribute("data_step")) {
             if (response.element.attributes.data_step.nodeValue == 'war') {
                 d3.select('#type-placeholder')
                     .transition()
                     .duration(500)
                     .attr('class', 'date-type war')
                     .text("ВІЙСЬКОВИЙ ВИМІР")
             } else {
                 d3.select('#type-placeholder')
                     .transition()
                     .duration(500)
                     .attr('class', 'date-type')
                     .text("ЦИВІЛЬНИЙ ВИМІР")
             }
         }


         if (response.element.attributes.coords.nodeValue != "") {
             //  map.flyTo([response.element.attributes[4].nodeValue.split(",")[0], response.element.attributes[4].nodeValue.split(",")[1]], 15);

             var circle = L.circle([response.element.attributes[4].nodeValue.split(",")[0], response.element.attributes[4].nodeValue.split(",")[1]], {
                 color: '#426357',
                 fillColor: "#7DBCA5",
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
                 .duration(500)
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

         function polyFilter(feature, layer) {
             if (map_poly.includes(feature.properties.id_.toString()))


                 return true
         }

         if (response.element.attributes.map_poly.nodeValue != "") {
             d3.select('#mask')
                 .transition()
                 .duration(500)
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

                         console.log(data)
                             //  geoData = L.geoJSON(data, { filter: polyFilter }, {
                             //      style: ukrpolyStyles,
                             //  })

                         //  geoData = L.geoJSON(data, {
                         //      style: ukrpolyStyles,
                         //  })

                         //  geoData.addTo(TopolayerGroupPoly);

                         L.geoJson(data, {
                             onEachFeature: function(feature, layer) {
                                 if (map_poly.includes(feature.properties.id_.toString())) {
                                     var poly = L.geoJson(feature, { style: ukrpolyStyles })
                                         //  circle.setStyle({ 'className': 'point' })
                                     poly.addTo(TopolayerGroupPoly);

                                     //  circle.bindPopup(feature.properties.name, { closeButton: false, autoClose: false }).openPopup()
                                 } else {}

                             }
                         })





                         L.geoJson(data, {
                             onEachFeature: function(feature, layer) {
                                 if (map_poly.includes(feature.properties.id_.toString())) {
                                     var circle = L.circle(layer.getBounds().getCenter(), {
                                             color: 'None',
                                             fillColor: 'None',
                                             fillOpacity: 0,
                                             radius: 100,
                                         })
                                         //  circle.setStyle({ 'className': 'point' })
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
                 .duration(500)
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
                 .duration(500)
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
                                     color: '#426357',
                                     fillColor: "#7DBCA5",
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

             if (window.screen.height > window.screen.width) {
                 zoom = zoom - 2
             }
             map.flyTo([lat, lon], zoom);
         } else {
             map.flyTo([47.11, 37.57], 12);
         }

         var icons = response.element.attributes.icons.nodeValue.split(',')
         if (response.element.attributes.icons.nodeValue != "") {
             d3.select('#mask')
                 .transition()
                 .duration(500)
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
             map.flyTo([47.11, 37.57], 12)
             d3.select('#mask')
                 .transition()
                 .duration(500)
                 .style('opacity', '0.5')
         }


     });