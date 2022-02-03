/* global d3, topojson */
/* eslint-disable max-len */

// eslint-disable-next-line no-unused-vars
const projectName = 'choropleth';

// coded by @paycoguy & @ChristianPaul (github)

// Define body
var body = d3.select('body');

// Define svg
var svg = d3.select('svg');

// Define the div for the tooltip
var tooltip = body
  .append('div')
  .attr('class', 'tooltip')
  .attr('id', 'tooltip')
  .style('opacity', 0);

/*
https://github.com/d3/d3-geo/blob/v3.0.1/README.md#geoPath
Creates a new geographic path generator with the default settings. If projection is specified, sets 
the current projection. If context is specified, sets the current context.
*/
var path = d3.geoPath();

// could use d3.extent to calculate the domain if we had the data

var x = d3.scaleLinear().domain([2.6, 75.1]).rangeRound([600, 860]);

/*
Threshold scales are similar to quantize scales, except they allow you to map arbitrary subsets of the 
domain to discrete values in the range. The input domain is still continuous, and divided into slices 
based on a set of threshold values.

Quantize scales are similar to linear scales, except they use a discrete rather than continuous range. 
The continuous input domain is divided into uniform segments based on the number of values in (i.e., the cardinality of) 
the output range. Each range value y can be expressed as a quantized linear function of the domain 
value x: y = m round(x) + b. See this choropleth for an example.

d3.range(start, end, step) returns Array
d3.range(2.6, 75.1, (75.1 - 2.6) / 8) returns 8 values
[2.6, 11.6625, 20.725, 29.7875, 38.85, 47.9125, 56.975, 66.0375]
d3.schemeGreens[9] returns nine green hex values
["#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"]
*/
var color = d3
  .scaleThreshold()
  .domain(d3.range(2.6, 75.1, (75.1 - 2.6) / 8))
  .range(d3.schemeGreens[9]);

/*
building the legend

create a group as a container for the legend

*/

var g = svg
  .append('g')
  .attr('class', 'key')
  .attr('id', 'legend')
  .attr('transform', 'translate(0,40)');

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
g.selectAll('rect')
  .data(
    color.range().map(function (d) {
      d = color.invertExtent(d);
      if (d[0] === null) {
        // this looks like it's supposed to set the undefined
        // part of the first extent to the first value of x domain
        // however...
        // before: [undefined, 2.6]
        d[0] = x.domain()[0];      
        // after: [undefined, 2.6]
        // because this is checking for null, but the value is undefined 🐜?
      }
      if (d[1] === null) {
        // this looks like it's supposed to set the undefined
        // part of the last extent to the first value of x domain
        // however...
        d[1] = x.domain()[1];
        // after: [66.0375, undefined]
        // because this is checking for null, but the value is undefined 🐜?
      }
      return d;
    })
  )
  .enter()
  .append('rect')
  .attr('height', 8)
  .attr('x', function (d) {
    return x(d[0]);
  })
  .attr('width', function (d) {
    // if both values are present, then give this rect a width
    return d[0] && d[1] ? x(d[1]) - x(d[0]) : x(null);
  })
  .attr('fill', function (d) {
    return color(d[0]);
  });

// this code seems to be useless
// g.append('text')
//   .attr('class', 'caption')
//   .attr('x', x.range()[0])
//   .attr('y', -6)
//   .attr('fill', '#000')
//   .attr('text-anchor', 'start')
//   .attr('font-weight', 'bold');

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
    .axisBottom(x)
    .tickSize(13)
    .tickFormat(function (x) {
      return Math.round(x) + '%';
    })
    .tickValues(color.domain())
)
  .select('.domain')
  .remove();

const EDUCATION_FILE =
  'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json';
const COUNTY_FILE =
  'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json';

/*
Promise.all waits for all promises to be resolved, or for any to be rejected.

If the returned promise resolves, it is resolved with an aggregating array of the values from the resolved promises, in the same order as defined in the iterable of multiple promises.

If it rejects, it is rejected with the reason from the first promise in the iterable that was rejected.
*/

Promise.all([d3.json(COUNTY_FILE), d3.json(EDUCATION_FILE)])
  .then((data) => ready(data[0], data[1]))
  .catch((err) => console.log(err));

function ready(us, education) {
  //console.log(d3.extent(education.map(d => d.bachelorsOrHigher)));
  svg 
    .append('g')
    .attr('class', 'counties')
    .selectAll('path')
    .data(topojson.feature(us, us.objects.counties).features)
    .enter()
    .append('path')
    .attr('class', 'county')
    .attr('data-fips', function (d) {
      return d.id;
    })
    .attr('data-education', function (d) {
      var result = education.filter(function (obj) {
        return obj.fips === d.id;
      });
      if (result[0]) {
        return result[0].bachelorsOrHigher;
      }
      // could not find a matching fips id in the data
      console.log('could find data for: ', d.id);
      return 0;
    })
    .attr('fill', function (d) {
      var result = education.filter(function (obj) {
        return obj.fips === d.id;
      });
      if (result[0]) {
        return color(result[0].bachelorsOrHigher);
      }
      // could not find a matching fips id in the data
      return color(0);
    })
    .attr('d', path)
    .on('mouseover', function (event, d) {
      tooltip.style('opacity', 0.9);
      tooltip
        .html(function () {
          var result = education.filter(function (obj) {
            return obj.fips === d.id;
          });
          if (result[0]) {
            return (
              result[0]['area_name'] +
              ', ' +
              result[0]['state'] +
              ': ' +
              result[0].bachelorsOrHigher +
              '%'
            );
          }
          // could not find a matching fips id in the data
          return 0;
        })
        .attr('data-education', function () {
          var result = education.filter(function (obj) {
            return obj.fips === d.id;
          });
          if (result[0]) {
            return result[0].bachelorsOrHigher;
          }
          // could not find a matching fips id in the data
          return 0;
        })
        .style('left', event.pageX + 10 + 'px')
        .style('top', event.pageY - 28 + 'px');
    })
    .on('mouseout', function () {
      tooltip.style('opacity', 0);
    });

  svg
    .append('path')
    .datum(
      topojson.mesh(us, us.objects.states, function (a, b) {
        return a !== b;
      })
    )
    .attr('class', 'states')
    .attr('d', path);
}
