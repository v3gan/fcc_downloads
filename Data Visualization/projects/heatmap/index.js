const w = 1100;
const h = 600;
const padding = 60;
const rectWidth = 5;
const rectHeight = 5;
// this is where the data lives locally
const dataUrl = 'data.json';
// this is where the data lives on the internet
const fccDataUrl =
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';
// d3.timeParse('%Y') returns a function that parses a string rep of a 4 digit year into a Date
const formatMonth = d3.timeFormat('%B');
const formatYear = d3.timeFormat('%Y');
const formatYearMonth = d3.timeFormat('%Y-%B')
const baseDate = new Date(1970, 0, 1).getTime();

console.log(formatYearMonth(baseDate))

d3.json(dataUrl)
  .then((data) => {
    const domainX = data.monthlyVariance.map(d => d.year);
    const domainY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const minmaxData = d3.extent(data.monthlyVariance.map(d => data.baseTemperature + d.variance))    

    const xScale = d3
      .scaleBand()
      .domain(domainX)
      .range([padding, w - padding - 200])
      .padding(0);

    const yScale = d3
      .scaleBand()
      .domain(domainY)
      .rangeRound([h - padding, padding])
      .padding(0);

    const colorScale = d3
      .scaleQuantize()
      .domain(minmaxData)
      .range(['#74add1', '#89ccf7', '#e0f3f8', '#FEE090', '#ff9646', '#f46d43']);
  
    const xAxis = d3
      .axisBottom(xScale)
      .tickValues(xScale.domain().filter(year => year % 10 === 0))
      .tickFormat((d) => formatYear(new Date(d, 1, 1)));

    const yAxis = d3
      .axisLeft(yScale)
      .tickFormat((d) => formatMonth(new Date(1970, d, 1)));

    const legend = d3
      .legendColor()
      .scale(colorScale)
      .title('Legend')
 
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
      .attr('transform', `translate(${padding - 1})`)
      .call(yAxis);

    svg
      .append('g')
      .attr('id', 'legend')
      .attr('transform', 'translate(900, 300)')
      .call(legend);

    svg
      .selectAll()
      .data(data.monthlyVariance)
      .join('rect')
      .attr('class', 'cell')
      .attr('data-month', d => d.month - 1)
      .attr('data-year', d => d.year)
      .attr('data-temp', d => data.baseTemperature + d.variance)
      .attr('width', d => xScale.bandwidth())
      .attr('height', d => yScale.bandwidth())
      .attr('x', d => xScale(d.year))
      .attr('y', d => yScale(d.month - 1))
      .attr('fill', d => colorScale(data.baseTemperature + d.variance))
      .on('mouseover', function (e, d) {
        d3.select(this).style('stroke', 'black');
        tooltip
          .html(`<p>${formatYearMonth(new Date(d.year, d.month-1, 1))}, ${(data.baseTemperature + d.variance).toFixed(1)}&deg;C</p>`)
          .style('left', `${e.pageX + 20}px`)
          .style('top', `${e.pageY - 30}px`)
          .style('opacity', 1)
          .attr('data-year', d.year);
      })
      .on('mouseleave', function (e, d) {
        d3.select(this).style('stroke', 'none');
        tooltip.style('opacity', 0);
      })

    // svg
    //   .selectAll()
    //   .data(data)
    //   .join('circle')
    //   .attr('class', 'dot')
    //   .attr('data-xvalue', (d) => d.Year)
    //   .attr('data-yvalue', (d) => new Date(baseDate + d.Seconds * 1000))
    //   .attr('cx', (d) => xScale(parseDate(d.Year)))
    //   .attr('cy', (d) => yScale(d.Seconds))
    //   .attr('r', (d) => 5)
    //   .each((d, i, nodes) => {
    //     nodes[i].classList.add(colorScale(d.Doping === ''));
    //   });

  });
