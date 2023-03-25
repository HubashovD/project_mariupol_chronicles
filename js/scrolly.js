 // instantiate the scrollama
 const scroller = scrollama();

 var TopolayerGroupPoly = L.layerGroup().addTo(map);
 var TopolayerGroupLine = L.layerGroup().addTo(map);
 var TopolayerGroupPoint = L.layerGroup().addTo(map);
 var FrontlayerGroup = L.layerGroup().addTo(map);
 // setup the instance, pass callback functions
 scroller
     .setup({
         step: ".step",
     })
     .onStepEnter((response) => {

         var date = response.element.attributes.date.nodeValue

         var prev_date = parseInt(date.slice(-2, )) - 1

         //  console.log(date)
         //  console.log('.frontline' + date.slice(0, -2) + prev_date.toString())

         try {
             d3.selectAll('.frontline' + date.slice(0, -2) + prev_date.toString())
                 .transition()
                 .duration(500)
                 .remove()
         } catch {}





         map.flyTo([47.11, 37.57], 12);
         //  console.log("enter: " + response.index)
         //  console.log(response.element.attributes)

         d3.select("#date-placeholder").text(response.element.attributes[3].nodeValue)

         if (response.element.attributes[2].nodeValue == 'war') {
             d3.select("#war-date")
                 .style('opacity', '1')
             d3.select("#civic-date")
                 .style('opacity', '0.2')
         } else {
             d3.select("#war-date")
                 .style('opacity', '0.2')
             d3.select("#civic-date")
                 .style('opacity', '1')
         }

         //  console.log([response.element.attributes[4].nodeValue.split(",")[0], response.element.attributes[4].nodeValue.split(",")[1]])
         if (response.element.attributes[4].nodeValue != "") {
             //  map.flyTo([response.element.attributes[4].nodeValue.split(",")[0], response.element.attributes[4].nodeValue.split(",")[1]], 15);

             var circle = L.circle([response.element.attributes[4].nodeValue.split(",")[0], response.element.attributes[4].nodeValue.split(",")[1]], {
                 color: 'red',
                 fillColor: '#f03',
                 fillOpacity: 0.5,
                 radius: 100,
             })
             circle.setStyle({ 'className': 'point' })
             circle.addTo(map);

             var frontLineStyles = {
                 "color": "#f3a6b2",
                 "fillColor": "#f3a6b2",
                 "stroke-width": 10
             };

             var LineStyles = {
                 "stroke-width": 10,
                 "color": "red"
             }

             try {
                 fetch("./maps/" + response.element.attributes[3].nodeValue + ".geojson")
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

             circle.bindPopup(response.element.attributes[5].nodeValue, { closeButton: false }).openPopup()

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
                                 style: frontLineStyles,
                             })
                             //  geoData.setStyle({ 'className': 'topo-elements' + response.element.attributes.date.nodeValue })
                         geoData.addTo(TopolayerGroupPoly);
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
                     TopolayerGroupPoint.eachLayer(function(layer) {
                         TopolayerGroupPoint.removeLayer(layer);
                     });
                     geoData = L.geoJSON(data, {
                         style: frontLineStyles,
                     })
                     geoData.setStyle({ 'className': 'topo-elements' + response.element.attributes.date.nodeValue })
                     geoData.addTo(TopolayerGroupPoint);
                 });
             } catch {}
         }
     })
     .onStepExit((response) => {

         //  console.log("exit: " + response.index)
         //  console.log('frontline' + response.element.attributes.date.nodeValue)
         map.flyTo([47.11, 37.57], 12);

         //  d3.selectAll('.topo-elements' + response.element.attributes.date.nodeValue)
         //      .transition()
         //      .duration(500)
         //      .attr('opacity', '0')

         //   .remove()


         //  if (response.element.attributes.map_poly.nodeValue != "") {
         //      try {
         //          TopolayerGroupPoly.eachLayer(function(layer) {
         //              TopolayerGroupPoly.removeLayer(layer);
         //          });
         //      } catch {}
         //  }

         //  if (response.element.attributes.map_lines.nodeValue != "") {
         //      try {
         //          TopolayerGroupLine.eachLayer(function(layer) {
         //              TopolayerGroupLine.removeLayer(layer);
         //          });
         //      } catch {}
         //  }

         //  if (response.element.attributes.map_points.nodeValue != "") {
         //      try {
         //          TopolayerGroupPoint.eachLayer(function(layer) {
         //              TopolayerGroupPoint.removeLayer(layer);
         //          });
         //      } catch {}
         //  }

         //  d3.selectAll('.frontline' + response.element.attributes.date.nodeValue)
         //      .transition()
         //      .duration(500)
         //      .attr('opacity', '0')
         //      //  .remove()


         d3.selectAll('.point')
             .attr('opacity', '0')
             //  .transition()
             //  .duration(500)
             //  .remove()
     });