const svg = d3.select("svg");

const width = 800;
const height = 500;
const duration = 500;

let count = 0;
const maxCircles = 10;

svg.on("click", function(event) {
    if (count >= maxCircles) return;

    const [x, y] = d3.pointer(event);

    const circle = svg.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 0)
        .attr("fill", "pink");

    
    circle.transition()
        .duration(duration)
        .attr("r", 20);

    count++;
});