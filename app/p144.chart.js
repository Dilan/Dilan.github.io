import * as d3 from 'd3';

var svg;
var d3line;
var xScale;
var yScale;

function SvgItem(path, dot, text) {
    this.path = path;
    this.dot = dot ;
    this.text = text;
    this.fadeOut = function(delay) {
        var path = this.path;
        var dot = this.dot;
        var text = this.text;

        setTimeout(function() {
            path.transition()
                .duration(1000)
                .style("fill-opacity", 0)
                .style("stroke-opacity", 0);

            dot.transition()
                .duration(1000)
                .style("fill-opacity", 0)
                .style("stroke-opacity", 0);

                text.transition()
                    .duration(1000)
                    .style("fill-opacity", 0)
                    .style("stroke-opacity", 0);

        }, delay);
    }
}

var drawBeam = function(point, nextPoint, text) {
    var dataset = [
        { x: point.x, y: point.y },
        { x: nextPoint.x, y: nextPoint.y }
    ];
    var path = svg.append("path")
        .datum(dataset)
        .attr("class", "line")
        .attr("d", d3line);

    var dot = svg.append("circle")
        .data(dataset)
        .attr("class", "dot")
        .attr("cx", function(d) {
            return xScale(d.x)
        })
        .attr("cy", function(d) {
            return yScale(d.y)
        })
        .attr("r", 5);

    var text = svg.append("text")
        .attr("x", xScale(point.x))
        .attr("y", yScale(point.y))
        .attr('font-family', 'sans-serif')
        .attr('font-size', '11')
        .text(text);

    return new SvgItem(path, dot, text);
};

const initChart = function() {
    var margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
    };
    var width = 250
    var height = 500
    var xDomain = [-10, 10];
    var yDomain = [-15, 15];

    xScale = d3.scaleLinear()
        .domain(xDomain)
        .range([0, width]);

    yScale = d3.scaleLinear()
        .domain([-15, 15])
        .range([height, 0]);

    d3line = d3.line()
        .x(function(d) {
            return xScale(d.x);
        })
        .y(function(d) {
            return yScale(d.y);
        })

    svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var ystep = yScale(yDomain[1] - 1) - yScale(yDomain[1]);
    var xstep = xScale(xDomain[0] + 1) - xScale(xDomain[0]);

    var scale = 1;
    var ellipse = svg.append("ellipse")
        .attr("stroke", "black")
        .style("fill", "tan")
        .attr("cx", xScale(0))
        .attr("cy", yScale(0))
        .attr("rx", xstep * 5)
        .attr("ry", ystep * 10);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale));
}

export { initChart, drawBeam };
