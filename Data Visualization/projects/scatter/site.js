const w = 900;
const h = 600;
const padding = 50;
const dataUrl = 'data.json'
const fccDataUrl = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json'

fetch(
    dataUrl
)
.then((response) => response.json())
.then(data => {
    const minmaxX = d3.extent(data.map(d => d.Year));
    const maxY = d3.max(data, d => d.Time)
    const xScale = d3
        .scaleTime()
        .domain(minmaxX)
        .range([padding, w-padding]);
    const yScale = d3
        .scaleLinear()
        .domain(0, maxY)
        .range([h - padding, padding]);
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    const svg = d3
      .select("#chart-container")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .style("background-color", "rgba(48, 122, 255, .25)");
})