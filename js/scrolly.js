 // instantiate the scrollama
 const scroller = scrollama();

 var TopolayerGroupPoly = L.layerGroup().addTo(map);
 var TopolayerGroupLine = L.layerGroup().addTo(map);
 var TopolayerGroupPoint = L.layerGroup().addTo(map);
 var FrontlayerGroup = L.layerGroup().addTo(map);


 var frontLineStyles = {
     "color": "#f3a6b2",
     "fillColor": "#f3a6b2",
     "stroke-width": 10
 }

 var LineStyles = {
     "stroke-width": 10,
     "color": "red"
 }

 var polyStyles = {
     "color": "	#DCDCDC",
     "fillColor": "	#696969",
     "stroke-width": 10
 }

 var pointStyles = {
     "color": '#000000'
 }


 // setup the instance, pass callback functions
 scroller
     .setup({
         step: ".step",
     })
     .onStepEnter((response) => {

         var date = response.element.attributes.date.nodeValue

         map.flyTo([47.11, 37.57], 12);

         d3.select("#date-placeholder").text(response.element.attributes[3].nodeValue)

         if (response.element.attributes[2].nodeValue == 'war') {
             d3.select('#type-placeholder')
                 .transition()
                 .duration(100)
                 .text("Військовй погляд")
         } else {
             d3.select('#type-placeholder')
                 .transition()
                 .duration(100)
                 .text("Цивільний погляд")
         }


         //  if (response.element.attributes[2].nodeValue == 'war') {
         //      d3.select("#war-date")
         //          .style('opacity', '1')
         //      d3.select("#civic-date")
         //          .style('opacity', '0.2')
         //  } else {
         //      d3.select("#war-date")
         //          .style('opacity', '0.2')
         //      d3.select("#civic-date")
         //          .style('opacity', '1')
         //  }

         try {
             fetch("./maps/" + response.element.date.nodeValue + ".geojson")
                 .then(function(response) {
                     return response.json();
                 })
                 .then(function(data) {

                     FrontlayerGroup.eachLayer(function(layer) {
                         FrontlayerGroup.removeLayer(layer);
                     });
                     geoData = L.geoJSON(data, {
                         style: frontLineStyles,
                     })
                     geoData.setStyle({ 'className': 'frontline' + response.element.attributes.date.nodeValue })
                     geoData.addTo(FrontlayerGroup);
                 });
         } catch {}

         //  console.log([response.element.attributes[4].nodeValue.split(",")[0], response.element.attributes[4].nodeValue.split(",")[1]])
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
                 .style('opacity', '0.8')
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
         try {
             var idToShow = response.element.attributes.idToShow.nodeValue.split(",")
         } catch { idToShow = [] }

         console.log(idToShow)
         if (response.element.attributes.map_poly.nodeValue != "") {
             d3.select('#mask')
                 .transition()
                 .duration(100)
                 .style('opacity', '0')
             try {
                 fetch("topo/" + response.element.attributes[6].nodeValue)
                     .then(function(response) {
                         return response.json();
                     })
                     .then(function(data) {
                         TopolayerGroupPoly.eachLayer(function(layer) {
                             TopolayerGroupPoly.removeLayer(layer);
                         });
                         geoData = L.geoJSON(data, {
                             style: frontLineStyles
                         })
                         console.log(geoData)
                             //  geoData.setStyle({ 'className': 'topo-elements' + response.element.attributes.date.nodeValue })
                         geoData.addTo(TopolayerGroupPoly);

                         L.geoJson(data, {
                             onEachFeature: function(feature, layer) {
                                 console.log(feature.properties.id.toString())
                                 if (idToShow.includes(feature.properties.id.toString())) {
                                     var circle = L.circle(layer.getBounds().getCenter(), {
                                         color: 'red',
                                         fillColor: '#f03',
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

         if (response.element.attributes.map_lines.nodeValue != "") {
             d3.select('#mask')
                 .transition()
                 .duration(100)
                 .style('opacity', '0')
             console.log(response.element.attributes.map_lines.nodeValue)
             try {
                 fetch("topo/" + response.element.attributes.map_lines.nodeValue)
                     .then(function(response) {
                         return response.json();
                     })
                     .then(function(data) {
                         TopolayerGroupLine.eachLayer(function(layer) {
                             TopolayerGroupLine.removeLayer(layer);
                         });
                         geoData = L.geoJSON(data, {
                                 style: LineStyles,
                             })
                             //  geoData.setStyle({ 'className': 'topo-elements' + response.element.attributes.date.nodeValue })
                         geoData.addTo(TopolayerGroupLine);
                     });
             } catch {}
         }

         if (response.element.attributes.map_points.nodeValue != "") {
             d3.select('#mask')
                 .transition()
                 .duration(100)
                 .style('opacity', '0')
             try {
                 fetch("topo/" + response.element.attributes.map_points.nodeValue)
                     .then(function(response) {
                         return response.json();
                     })
                     .then(function(data) {
                         //  console.log(data)
                         TopolayerGroupPoint.eachLayer(function(layer) {
                             TopolayerGroupPoint.removeLayer(layer);
                         });
                         data.features.forEach(element => {
                             var circle = L.circle([element.geometry.coordinates[1], element.geometry.coordinates[0], ], {
                                 color: 'red',
                                 fillColor: '#f03',
                                 fillOpacity: 0.5,
                                 radius: 100,
                             })
                             circle.addTo(TopolayerGroupPoint);
                             circle.bindPopup(element.properties.Name, {
                                 closeButton: false,
                                 autoClose: false
                             }).openPopup()
                         });
                     });
             } catch {}
         }



         if (response.element.attributes.zoom.nodeValue != "") {
             var lat = response.element.attributes.focus_point.nodeValue.split(",")[0]
             var lon = response.element.attributes.focus_point.nodeValue.split(",")[1]
             var zoom = response.element.attributes.zoom.nodeValue
             console.log(lat, lon, zoom)
             map.flyTo([lat, lon], response.element.attributes.zoom.nodeValue);
         } else {
             map.flyTo([47.11, 37.57], 12);
         }



     })
     .onStepExit((response) => {
         if (response.index == 0 && response.direction == 'up') {
             map.flyTo([49.46236693239768, 32.04686624407093], 8)
             d3.select('#mask')
                 .transition()
                 .duration(100)
                 .style('opacity', '0.8')
         }

         map.flyTo([47.11, 37.57], 12);

         map.eachLayer(function(layer) {
             layer.closePopup();
         });

         d3.selectAll('.point')
             .attr('opacity', '0')
     });