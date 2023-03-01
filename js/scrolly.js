 // instantiate the scrollama
 const scroller = scrollama();

 // setup the instance, pass callback functions
 scroller
     .setup({
         step: ".step",
     })
     .onStepEnter((response) => {
         console.log(response.index)
         console.log(response.element.attributes)

         d3.select("#date-placeholder").text("strp: " + response.index + ': ' + response.element.attributes[3].nodeValue)

         if (response.element.attributes[2].nodeValue == 'war') {
             d3.select("#war-date")
                 .style('opacity', '1')
             d3.select("#civic-date")
                 .style('opacity', '0.5')
         } else {
             d3.select("#war-date")
                 .style('opacity', '0.5')
             d3.select("#civic-date")
                 .style('opacity', '1')
         }

         //  console.log([response.element.attributes[4].nodeValue.split(",")[0], response.element.attributes[4].nodeValue.split(",")[1]])
         if (response.element.attributes[4].nodeValue != "") {
             map.flyTo([response.element.attributes[4].nodeValue.split(",")[0], response.element.attributes[4].nodeValue.split(",")[1]], 15);

             var circle = L.circle([response.element.attributes[4].nodeValue.split(",")[0], response.element.attributes[4].nodeValue.split(",")[1]], {
                 color: 'red',
                 fillColor: '#f03',
                 fillOpacity: 0.5,
                 radius: 100
             }).addTo(map);

             d3.select('#mask')
                 .transition()
                 .duration(3000)
                 .style('opacity', '0')

         } else {
             d3.select('#mask')
                 .transition()
                 .duration(3000)
                 .style('opacity', '1')

         }








     })
     .onStepExit((response) => {
         // { element, index, direction }
     });