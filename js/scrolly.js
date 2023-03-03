 // instantiate the scrollama
 const scroller = scrollama();

 // setup the instance, pass callback functions
 scroller
     .setup({
         step: ".step",
     })
     .onStepEnter((response) => {
         map.flyTo([47.11, 37.57], 12);
         console.log(response.index)
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




             fetch("./maps/" + response.element.attributes[3].nodeValue + ".geojson")
                 .then(function(response) {
                     return response.json();
                 })
                 .then(function(data) {
                     geoData = L.geoJSON(data, {
                         style: frontLineStyles,
                     })
                     geoData.setStyle({ 'className': 'frontline' })
                     geoData.addTo(map);
                 });

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
     })
     .onStepExit((response) => {
         map.flyTo([47.11, 37.57], 12);


         d3.selectAll('.point')
             .transition()
             .duration(500)
             .remove()
     });