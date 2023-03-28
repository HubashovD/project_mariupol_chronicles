d3.csv("./data/data.csv").then(function(data) {
    console.log(data)
    data.forEach(element => {
        // console.log(element)
        block = d3.select("#main-text-block").insert("div")

        // console.log(block)

        block
            .attr("class", "usual-text-block step " + element.type)
            .attr("id", "step-" + element.step)
            .attr("data-step", element.type)
            .attr("date", element.date)
            .attr("coords", element.coordinates)
            .attr("coords-text", element.coordinates_text)
            .attr('map_poly', element.map_poly)
            .attr('map_lines', element.map_lines)
            .attr('map_points', element.map_points)
            .attr('zoom', element.zoom)
            .attr('focus_point', element.focus_point)
            .attr('idToShow', element.idToShow)

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
            .text(element.text)



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
})