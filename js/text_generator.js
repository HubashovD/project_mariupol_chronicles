d3.csv("./data/data.csv").then(function(data) {
    console.log(data)
    data.forEach(element => {
        // console.log(element)
        block = d3.select("#main-text-block").insert("div")

        // console.log(block)

        block
            .attr("class", "usual-text-block step " + element.type)
            .attr("id", "step-" + element.step)
            .attr("data_step", element.type)
            .attr("date", element.date)
            .attr('map', element.map)

        if (element.map == "") {
            block
                .attr("class", "usual-text-block step short-step " + element.type)
        } else {
            block
                .attr("class", "usual-text-block step long-step " + element.type)
        }

        d3.select("#step-" + element.step)
            .append('div')
            .attr("class", "step-grid")
            .attr("id", "grid-step-" + element.step)


        d3.select("#grid-step-" + element.step)
            .append('div')
            .attr("id", "inner-grid-step-" + element.step)
            .attr("class", "inner-grid-step-mask")

        d3.select("#inner-grid-step-" + element.step)
            .append('p')
            .attr("class", "inner-grid-step-header")
            .text(element.header)

        d3.select("#inner-grid-step-" + element.step)
            .append('p')
            .html(element.text)



        if (element.photo != "") {
            d3.select("#grid-step-" + element.step)
                .append("div")
                .attr("id", "div-img-step-" + element.step)
                .attr("class", "step-img")

            d3.select("#div-img-step-" + element.step)
                .append('img')
                .attr("class", "img")
                .attr("src", "./photo/" + element.photo)

        } else if (element.video != "") {
            d3.select("#grid-step-" + element.step)
                .append('div')
                .attr("id", "div-vid-step-" + element.step)
                .attr("class", "video")

            d3.select("#div-vid-step-" + element.step)
                .html('<video  id="vid-step-' + element.step + '" width="100%" muted autoplay controls><source src="./video/' + element.video + '" type="video/mp4"></video>')

        } else {
            // d3.select("#grid-step-" + element.step)
            //     .append('div')
        }
    });


    var maps = [
        "24_02_1",
        "24_02",
        "26_02",
        "27_02",
        "28_02",
        "14_03",
        "16_03"
    ]

    for (const value of maps) {

        if (window.screen.height > window.screen.width) {
            d3.select("#map_placeholder")
                .append("div")
                .attr("id", "map-step-" + value)

            d3.select("#map-step-" + value)
                .append('img')
                .attr("id", "map-step-map-" + value)
                .attr("class", "map-img-hidden")
                .attr("src", "./maps_raster/mob/" + value + ".png")
        } else {
            d3.select("#map_placeholder")
                .append("div")
                .attr("id", "map-step-" + value)

            d3.select("#map-step-" + value)
                .append('img')
                .attr("id", "map-step-map-" + value)
                .attr("class", "map-img-hidden")
                .attr("src", "./maps_raster/" + value + ".png")
        }

    }
    // instantiate the scrollama
    const scroller = scrollama();

    // setup the instance, pass callback functions
    scroller
        .setup({
            step: ".step",
        })
        .onStepEnter((response) => {

            // console.log(response.element.attributes)
            if (response.element.attributes.map.nodeValue != "") {
                console.log
                d3.select("#map-step-map-" + response.element.attributes.map.nodeValue)
                    .transition()
                    .duration(500)
                    .style('opacity', '1')
            } else {
                d3.selectAll('.map-img-hidden')
                    .transition()
                    .duration(500)
                    .style('opacity', '0')
            }


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


        })
        .onStepExit((response) => {
            // if (response.index == 0 && response.direction == 'up') {
            //     map.flyTo([47.11, 37.57], 12)
            //     d3.select('#mask')
            //         .transition()
            //         .duration(500)
            //         .style('opacity', '0.5')
            // }


        });
})