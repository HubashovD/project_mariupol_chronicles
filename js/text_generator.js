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
            // .attr("header", element.header)

        d3.select("#step-" + element.step)
            .append('div')
            .attr("class", "step-grid")
            .attr("id", "grid-step-" + element.step)


        if (element.type == 'war') {

            if (element.photo != "") {
                d3.select("#grid-step-" + element.step)
                    .append('img')
                    .attr("class", "war-step-img")
                    .attr("src", "./photo/" + element.photo)



            } else if (element.video != "") {
                d3.select("#grid-step-" + element.step)
                    .append('div')
                    .attr("id", "div-vid-step-" + element.step)

                d3.select("#div-vid-step-" + element.step)
                    .html('<video class =  "war-video" id="vid-step-' + element.step + '" width="80%" muted autoplay controls><source src="./video/' + element.video + '" type="video/mp4"></video>')

                // video
                //     .append('video')
                //     .attr("id", "vid-step-" + element.step)
                //     .attr("width", '320')
                //     .attr("height", '240')
                //     .attr("muted")


                // d3.select("#vid-step-" + element.step)
                //     .append('source')
                //     .attr("src", "./video/" + element.video)
                //     .attr("type", "video/mp4")

                // document.getElementById("vid-step-" + element.step).setAttribute("muted");

                // video
                //     .attr("autoplay")
                //     .attr("muted")
                //     .attr("controls")
            } else {
                d3.select("#grid-step-" + element.step)
                    .append('div')
            }

            // d3.select("#grid-step-" + element.step)
            //     .append('p')
            //     .text(element.text)


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


        } else {
            // d3.select("#grid-step-" + element.step)
            //     .append('p')
            //     .text(element.text)

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
                    .append('img')
                    .attr("class", "civil-step-img")
                    .attr("src", "./photo/" + element.photo)
            } else if (element.video != "") {
                d3.select("#grid-step-" + element.step)
                    .append('div')
                    .attr("id", "div-vid-step-" + element.step)

                d3.select("#div-vid-step-" + element.step)
                    .html('<video class =  "civil-video" id="vid-step-' + element.step + '" width="80%" muted autoplay controls><source src="./video/' + element.video + '" type="video/mp4"></video>')
                    // video = d3.select("#grid-step-" + element.step)

                // video
                //     .append('video')
                //     .attr("id", "vid-step-" + element.step)
                //     .attr("width", '320')
                //     .attr("height", '240')


                // d3.select("#vid-step-" + element.step)
                //     .append('source')
                //     .attr("src", "./video/" + element.video)
                //     .attr("type", "video/mp4")

                // video
                //     .attr("autoplay")
                //     .attr("muted")
                //     .attr("controls")

            } else {
                d3.select("#grid-step-" + element.step)
                    .append('div')
            }
        }




        // d3.select("#step-" + element.step)
        //     .append('h5')
        //     .text(element.step)

        // d3.select("#step-" + element.step)
        //     .append('div')
        //     .attr("class", "date")
        //     .text(element.date)




    });
})