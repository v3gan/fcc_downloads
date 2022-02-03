const w = 1100;
const h = 600;
const edDataUrl =
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';
const countyDataUrl =
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';

const getData = async () => {
  const edData = await d3.json(edDataUrl);
  const countyData = await d3.json(countyDataUrl);

  return Promise.all([edData, countyData]);
};

let body = d3.select('body');
let svg = d3.select('svg');

// append an invisible tooltip div to the body
let tooltip = body
  .append('div')
  .attr('class', 'tooltip')
  .attr('id', 'tooltip')
  .style('opacity', 0);

// create a group as a container for the legend
var g = svg
  .append('g')
  .attr('class', 'key')
  .attr('id', 'legend')
  .attr('transform', 'translate(0,20)');


/*
https://github.com/d3/d3-geo/blob/v3.0.1/README.md#geoPath
Creates a new geographic path generator with the default settings. If projection is specified, sets 
the current projection. If context is specified, sets the current context.
*/
const path = d3.geoPath();

getData().then((data) => {
  const edData = data[0];

  const countyData = data[1];

  const bachelorsOrHigherExtent = d3.extent(
    edData.map((d) => d.bachelorsOrHigher)
  );
  
  const [minBachelorsOrHigher, maxBachelorsOrHigher] = bachelorsOrHigherExtent;

  const xScale = d3.scaleLinear().domain(bachelorsOrHigherExtent).range([h, w]);

  /*
  Threshold scales are similar to quantize scales, except they allow you to map arbitrary subsets of the 
  domain to discrete values in the range. The input domain is still continuous, and divided into slices 
  based on a set of threshold values.

  Quantize scales are similar to linear scales, except they use a discrete rather than continuous range. 
  The continuous input domain is divided into uniform segments based on the number of values in (i.e., the cardinality of) 
  the output range. Each range value y can be expressed as a quantized linear function of the domain 
  value x: y = m round(x) + b. See this choropleth for an example.

  d3.range(start, end, step) returns Array
  d3.range(minBachelorsOrHigher, maxBachelorsOrHigher, (maxBachelorsOrHigher - minBachelorsOrHigher) / 8) returns 8 values
  [2.6, 11.6625, 20.725, 29.7875, 38.85, 47.9125, 56.975, 66.0375]
  d3.schemeBlues[8] returns 8 blue hex values
  ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#084594']
  */
  const colorScale = d3
    .scaleThreshold()
    .domain(d3.range(minBachelorsOrHigher, maxBachelorsOrHigher, (maxBachelorsOrHigher - minBachelorsOrHigher) / 8))
    .range(d3.schemePurples[8]);

  /*
  building the legend

  select some rectangles
  apply an array of inverse extents for the color scale as data

  https://github.com/d3/d3-scale/blob/main/README.md#threshold_invertExtent
  invertExtent Returns the extent of values in the domain [x0, x1] for the corresponding value in the range, 
  representing the inverse mapping from range to domain. 
  Example:
  var color = d3.scaleThreshold()
      .domain([0, 1])
      .range(["red", "white", "green"]);

  color.invertExtent("red"); // [undefined, 0]
  color.invertExtent("white"); // [0, 1]
  color.invertExtent("green"); // [1, undefined]

  data will be:
  [[undefined,2.6],[2.6,11.6625],[11.6625,20.725],[20.725,29.7875],[29.7875,38.85],[38.85,47.9125],[47.9125,56.975],[56.975,66.0375],[66.0375,undefined]]
  */
  const colorData = colorScale
    .range()
    .map(r => {
      const colorInvertExtent = colorScale.invertExtent(r);
      if (colorInvertExtent[0] === undefined) {
        colorInvertExtent[0] = xScale.domain()[0];
      } 
      if (colorInvertExtent[1] === undefined) {
        colorInvertExtent[1] = xScale.domain()[1];
      }
      return colorInvertExtent;         
    });

  g.selectAll('rect')
    .data(colorData)
    .enter()
    .append('rect')
    .attr('height', 10)
    .attr('width', d => xScale(d[1]) - xScale(d[0]))
    .attr('x', d => xScale(d[0]))
    .attr('fill', d => colorScale(d[0]))

  /*
  the d3 call() function invokes the specified function exactly once, passing 
  in this selection along with any optional arguments. Returns this selection. 
  This is equivalent to invoking the function by hand but facilitates method chaining. 
  For example, to set several styles in a reusable function:

  function name(selection, first, last) {
    selection
        .attr("first-name", first)
        .attr("last-name", last);
  }

  Now say:

  d3.selectAll("div").call(name, "John", "Snow");

  This is roughly equivalent to:

  name(d3.selectAll("div"), "John", "Snow");

  The only difference is that selection.call always returns the selection 
  and not the return value of the called function, name.

  usually I define the axis as a variable and pass that to call()`

  The last two calls to select() then remove() remove the main axis path, leaving only the ticks
  */    
  g.call(
    d3
      .axisBottom(xScale)
      .tickSize(12)
      .tickFormat(x => Math.round(x) + '%')
      .tickValues(colorScale.domain())
  )
  .select('.domain')
  .remove();

  /*
   draw the map!

   https://en.wikipedia.org/wiki/FIPS_county_code
   The Federal Information Processing Standard Publication 6-4 (FIPS 6-4) is a five-digit 
   Federal Information Processing Standards code which uniquely identified counties and county 
   equivalents in the United States, certain U.S. possessions, and certain freely associated states.

   https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
   The <path> element is the most powerful element in the SVG library of basic shapes. 
   It can be used to create lines, curves, arcs, and more.
   The shape of a <path> element is defined by one parameter: d. 
   The d attribute contains a series of commands and parameters used by those commands.
  */ 
  svg
    .append('g')
    .selectAll('path')
    .data(topojson.feature(countyData, countyData.objects.counties).features)
    .enter()
    .append('path')
    .attr('class', 'county')
    .attr('data-fips', d => d.id)
    .attr('data-education', d => edData.filter(e => e.fips === d.id)[0].bachelorsOrHigher)
    .attr('fill', d => colorScale(edData.filter(e => e.fips === d.id)[0].bachelorsOrHigher))
    .attr('d', path)
    .on('mouseover', function(e, d) {
      tooltip
        .style('opacity', 0.9)
        .html(() => {
          const thisEd = edData.filter(ed => ed.fips === d.id)[0];
          return `${thisEd.area_name}, ${thisEd.state}: ${thisEd.bachelorsOrHigher}%`;
        })
        .attr('data-education', () => edData.filter(ed => ed.fips === d.id)[0].bachelorsOrHigher)
        .style('left', e.pageX + 10 + 'px')
        .style('top', e.pageY - 30 + 'px');
    })
    .on('mouseout', function () {
      tooltip.style('opacity', 0);
    });
})
.catch(err => console.error(err));
