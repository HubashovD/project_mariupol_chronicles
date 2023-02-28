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


        // d3.select("#step-" + element.step)
        //     .append('h5')
        //     .text(element.step)

        // d3.select("#step-" + element.step)
        //     .append('div')
        //     .attr("class", "date")
        //     .text(element.date)

        d3.select("#step-" + element.step)
            .append('p')
            .text(element.text)
    });
})