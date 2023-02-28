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
     })
     .onStepExit((response) => {
         // { element, index, direction }
     });