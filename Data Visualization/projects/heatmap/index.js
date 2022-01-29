const w = 900;
const h = 600;
const padding = 50;
// this is where the data lives locally
const dataUrl = 'data.json';
// this is where the data lives on the internet
const fccDataUrl =
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';
// d3.timeParse('%Y') returns a function that parses a string rep of a 4 digit year into a Date
const parseDate = d3.timeParse('%Y');
const parseTime = d3.timeParse('%M:%S');
const formatTime = d3.timeFormat('%M:%S');

const baseDate = new Date(1970, 0, 1).getTime();

fetch(dataUrl)
  .then((response) => response.json())
  .then((data) => {
    const minmaxX = d3.extent(data.map((d) => parseDate(d.Year)));

    const minmaxY = d3.extent(data, (d) => d.Seconds);

    const xScale = d3
      .scaleTime()
      .domain(minmaxX)
      .range([padding, w - padding]);

    const yScale = d3
      .scaleLinear()
      .domain(minmaxY)
      .range([h - padding, padding]);

    const xAxis = d3.axisBottom(xScale);

    const yAxis = d3
      .axisLeft(yScale)
      .ticks()
      .tickFormat((d) => formatTime(baseDate + d * 1000));

    const colorScale = d3
      .scaleQuantize()
      .domain([false, true])
      .range(['doping', 'no-doping']);

    const legend = d3
      .legendColor()
      .scale(colorScale)
      .title('Legend')
      .labels(['doping', 'no doping'])
      .useClass(true);

    let tooltip = d3
      .select('#chart-container')
      .append('div')
      .style('opacity', 0)
      .attr('class', 'tooltip')
      .attr('id', 'tooltip');

    const svg = d3
      .select('#chart-container')
      .append('svg')
      .attr('width', w)
      .attr('height', h)
      .style('background-color', 'rgba(48, 122, 255, .25)');

    svg
      .append('g')
      .attr('id', 'x-axis')
      .attr('transform', `translate(0, ${h - padding})`)
      .call(xAxis);

    svg
      .append('g')
      .attr('id', 'y-axis')
      .attr('transform', `translate(${padding})`)
      .call(yAxis);

    svg
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('data-xvalue', (d) => d.Year)
      .attr('data-yvalue', (d) => new Date(baseDate + d.Seconds * 1000))
      .attr('cx', (d) => xScale(parseDate(d.Year)))
      .attr('cy', (d) => yScale(d.Seconds))
      .attr('r', (d) => 5)
      .on('mouseover', function (e, d) {
        d3.select(this).style('stroke', 'black');
        tooltip
          .html(`<p>${d.Name}, ${d.Year}, ${d.Time}</p>`)
          .style('left', `${e.pageX + 20}px`)
          .style('top', `${e.pageY - 30}px`)
          .style('opacity', 1)
          .attr('data-year', d.Year);
      })
      .on('mouseleave', function (e, d) {
        d3.select(this).style('stroke', 'none');
        tooltip.style('opacity', 0);
      })
      .each((d, i, nodes) => {
        nodes[i].classList.add(colorScale(d.Doping === ''));
      });

    svg
      .append('g')
      .attr('id', 'legend')
      .attr('transform', 'translate(700, 300)')
      .call(legend);
  });
