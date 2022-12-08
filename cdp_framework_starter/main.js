"use strict"

let svgWidth = 1200
let svgHeight = 900

let margin = {
    top: 10,
    right: 30,
    bottom: 30,
    left: 80
}

let vizWidth = svgWidth - (margin.left + margin.right)
let vizHeight = svgHeight - (margin.top + margin.bottom)

let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)

svg.append("rect")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("fill", "none")
    .attr("stroke", "black")

let viz = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)

let data, xAxis, yAxis, xScale, yScale

(async function () {
    data = await d3.json("city_temperatures.json").then(buildVisualization)
})();

function buildVisualization(data) {
    let renderData = organizeData(data)
    buildScales(renderData)
    drawVisualization(renderData, viz)
    return renderData
}

function buildScales(data) {
    xScale = d3.scaleLinear()
        .domain([0, d3.max(data, function (value) {
            return value.temps[1]
        })])
        .nice()
        .range([25, vizWidth - 25])

    yScale = d3.scalePoint()
        .range([25, vizHeight - 25])
        .domain(data.map(function (value) {
            return value.city
        }))
}

function organizeData(data) {
    return data
}

function drawVisualization(data, drawing) {
    xAxis = drawing.append("g")
        .attr("transform", `translate(0, ${vizHeight})`)
        .call(d3.axisBottom(xScale))

    yAxis = drawing.append("g")
        .call(d3.axisLeft(yScale))

    plotPoints(data, viz)
}

function plotPoints(data, drawing) {

    drawing.selectAll("circle.low")
        .data(data)
        .join("circle")
        .classed("low", true)
        .attr("cx", function (value) {
            return xScale(value.temps[0])
        })
        .attr("cy", function (value) {
            return yScale(value.city)
        })
        .attr("r", 6)
        .style("fill", "blue")

    drawing.selectAll("circle.high")
        .data(data)
        .join("circle")
        .classed("high", true)
        .attr("cx", function (value) {
            return xScale(value.temps[1])
        })
        .attr("cy", function (value) {
            return yScale(value.city)
        })
        .attr("r", 6)
        .style("fill", "red")
}

function clearPoints(drawing) {
    drawing.selectAll("line.stems").remove()
    drawing.selectAll("circle.low").remove()
    drawing.selectAll("circle.high").remove()
}

let monthPicker = document.getElementById("month")
monthPicker.addEventListener("change", filterAndRedraw)

function filterAndRedraw(event) {
    let monthChoice = event.target.value;
    let filtered = []

    clearPoints(viz)
    plotPoints(filtered, viz);
}