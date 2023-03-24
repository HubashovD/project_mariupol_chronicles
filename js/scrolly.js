 // instantiate the scrollama
 const scroller = scrollama();

 // setup the instance, pass callback functions
 scroller
     .setup({
         step: ".step",
     })
     .onStepEnter((response) => {

         var date = response.element.attributes.date.nodeValue

         var prev_date = parseInt(date.slice(-2, )) - 1

         console.log(date)
         console.log('.frontline' + date.slice(0, -2) + prev_date.toString())

         try {
             d3.selectAll('.frontline' + date.slice(0, -2) + prev_date.toString())
                 .transition()
                 .duration(500)
                 .remove()
         } catch {}





         map.flyTo([47.11, 37.57], 12);
         console.log("enter: " + response.index)
         console.log(response.element.attributes)

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


             //  var svg = d3.select(map.getPanes().overlayPane).append("svg"),
             //      g = svg.append("g").attr("class", "leaflet-zoom-hide");

             //  console.log("https://raw.githubusercontent.com/HubashovD/project_mariupol_chronicles/main/maps/" + response.element.attributes[3].nodeValue + ".geojson")

             //  d3.json("/maps/" + response.element.attributes.date.nodeValue + ".geojson", function(data) {
             //      console.log(data)
             //  })

             //  d3.json("/maps/" + response.element.attributes.date.nodeValue + ".geojson", function(collection) {
             //      console.log(collection)


             //  function projectPoint(x, y) {
             //      var point = map.latLngToLayerPoint(new L.LatLng(y, x));
             //      this.stream.point(point.x, point.y);
             //  }

             //  var transform = d3.geo.transform({ point: projectPoint }),
             //      path = d3.geo.path().projection(transform);

             //  var feature = g.selectAll("path")
             //      .data(collection.features)
             //      .enter().append("path");

             //  feature.attr("d", path);

             //  var bounds = path.bounds(collection),
             //      topLeft = bounds[0],
             //      bottomRight = bounds[1];


             //  svg.attr("width", bottomRight[0] - topLeft[0])
             //      .attr("height", bottomRight[1] - topLeft[1])
             //      .style("left", topLeft[0] + "px")
             //      .style("top", topLeft[1] + "px");

             //  g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

             // code here
             //  });

             console.log(d3.selectAll('.frontline' + response.element.attributes.date.nodeValue))

             try {
                 fetch("./maps/" + response.element.attributes[3].nodeValue + ".geojson")
                     .then(function(response) {
                         return response.json();
                     })
                     .then(function(data) {
                         geoData = L.geoJSON(data, {
                             style: frontLineStyles,
                         })
                         geoData.setStyle({ 'className': 'frontline' + response.element.attributes.date.nodeValue })
                         geoData.addTo(map);
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
         console.log(response.element.attributes)
             //  map_poly
         if (response.element.attributes.map_poly.nodeValue != "") {
             try {
                 fetch("topo/" + response.element.attributes[6].nodeValue)
                     .then(function(response) {
                         return response.json();
                     })
                     .then(function(data) {
                         geoData = L.geoJSON(data, {
                             style: frontLineStyles,
                         })
                         geoData.setStyle({ 'className': 'topo-elements' + response.element.attributes.date.nodeValue })
                         geoData.addTo(map);
                     });
             } catch {}
         }





         //  map_lines
         if (response.element.attributes.map_lines.nodeValue != "") {
             try {
                 fetch("topo/" + response.element.attributes[6].nodeValue)
                     .then(function(response) {
                         return response.json();
                     })
                     .then(function(data) {
                         geoData = L.geoJSON(data, {
                             style: frontLineStyles,
                         })
                         geoData.setStyle({ 'className': 'topo-elements' + response.element.attributes.date.nodeValue })
                         geoData.addTo(map);
                     });
             } catch {}
         }



         //  map_points
         if (response.element.attributes.map_lines.nodeValue != "") {

             try {
                 fetch("topo/" + response.element.attributes[6].nodeValue)
                     .then(function(response) {
                         return response.json();
                     })
                     .then(function(data) {
                         geoData = L.geoJSON(data, {
                             style: frontLineStyles,
                         })
                         geoData.setStyle({ 'className': 'topo-elements' + response.element.attributes.date.nodeValue })
                         geoData.addTo(map);
                     });
             } catch {}
         }
     })
     .onStepExit((response) => {

         console.log("exit: " + response.index)
         console.log('frontline' + response.element.attributes.date.nodeValue)
         map.flyTo([47.11, 37.57], 12);

         d3.selectAll('.topo-elements' + response.element.attributes.date.nodeValue)
             .attr('opacity', '0')
             //  .transition()
             //  .duration(500)
             //  .remove()

         d3.selectAll('.frontline' + response.element.attributes.date.nodeValue)
             .attr('opacity', '0')
             //  .transition()
             //  .duration(500)
             //  .remove()


         d3.selectAll('.point')
             .attr('opacity', '0')
             //  .transition()
             //  .duration(500)
             //  .remove()
     });