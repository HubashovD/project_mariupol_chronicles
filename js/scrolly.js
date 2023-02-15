 // instantiate the scrollama
 const scroller = scrollama();

 // setup the instance, pass callback functions
 scroller
     .setup({
         step: ".step",
     })
     .onStepEnter((response) => {
         console.log(response.index)
         console.log(response.element.attributes[1].nodeValue)
         d3.select("#test-text").text(response.index + ' ' + response.element.attributes[1].nodeValue)
     })
     .onStepExit((response) => {
         // { element, index, direction }
     });