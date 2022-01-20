const w = 900;
const h = 600;
const padding = 50;
const parseDate = d3.timeParse("%Y-%m-%d");
const stringifyDate = d3.timeFormat("%Y-%m-%d");
fetch(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"
)
  .then((response) => response.json())
  .then((data) => {
    const dataset = data.data.map((d) => {
      const date = parseDate(d[0]);
      const qtr = ((date.getMonth() + 3) / 12) * 4;
      return [date, qtr, d[1]];
    });
    const barWidth = w / dataset.length;
    // The extent method takes an array as an argument and returns a new array containing only the minimum and maximum elements
    const minmaxX = d3.extent(dataset.map((d) => d[0]));
    const maxY = d3.max(dataset, (d) => d[2]);
    // we create a temporal scaling function using d3.scaleTime
    const xScale = d3
      .scaleTime()
      .domain(minmaxX)
      .range([padding, w - padding]);

    const yScale = d3
      .scaleLinear()
      .domain([0, maxY])
      .range([h - padding, padding]);

    const xAxis = d3.axisBottom(xScale);

    const yAxis = d3.axisLeft(yScale);

    const tooltip = d3
      .select("#chart-container")
      .append("div")
      .attr("id", "tooltip")
      .attr("class", "d-none");

    const svg = d3
      .select("#chart-container")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .style("background-color", "rgba(48, 122, 255, .25)");

    svg
      .append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0,${h - padding})`)
      .call(xAxis);

    svg
      .append("g")
      .attr("id", "y-axis")
      .attr("transform", `translate(${padding}, 0)`)
      .call(yAxis);

    svg
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("data-date", (d) => stringifyDate(d[0]))
      .attr("data-gdp", (d) => d[2])
      .attr("data-index", (d, i) => i)
      .attr("x", (d) => xScale(d[0]))
      .attr("y", (d) => yScale(d[2]))
      .attr("width", barWidth)
      .attr("height", (d) => h - yScale(d[2]) - padding)
      .attr("fill", "rgba(48, 122, 255, .50)")
      .on("mouseover", function (e, d) {
        var left = e.pageX + 50;
        tooltip
          .attr("class", "d-flex align-items-center justify-content-center")
          .html(`<strong>Q${d[1]}<br>${d[2]}<br>${e.pageX}</strong>`)
          .attr("data-date", stringifyDate(d[0]))
          .style("left", `${left}px`)
          .style("top", `${h - 100}px`);
      })
      .on("mouseout", () => tooltip.attr("class", "d-none"));
  });
