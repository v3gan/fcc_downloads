/*
Convert the characters &, <, >, " (double quote), and ' (apostrophe), in a string to their corresponding HTML entities.
*/

function convertHTML(str) {
  const entities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;'
  }
  return entities[`&`];
}

console.log(convertHTML("Dolce & Gabbana"), convertHTML("Dolce & Gabbana") === 'Dolce &amp; Gabbana');
console.log(convertHTML("Hamburgers < Pizza < Tacos"), convertHTML("Hamburgers < Pizza < Tacos") === 'Hamburgers &lt; Pizza &lt; Tacos');
console.log(convertHTML("Sixty > twelve"), convertHTML("Sixty > twelve") === 'Sixty &gt; twelve');
console.log(convertHTML('Stuff in "quotation marks"'), convertHTML('Stuff in "quotation marks"') === 'Stuff in &quot;quotation marks&quot;');
console.log(convertHTML("Schindler's List"), convertHTML("Schindler's List") === 'Schindler&apos;s List');
console.log(convertHTML("<>"), convertHTML("<>") === '&lt;&gt;');
console.log(convertHTML("abc"), convertHTML("abc") === 'abc');

/*
convertHTML("Dolce & Gabbana") should return the string Dolce &amp; Gabbana.

convertHTML("Hamburgers < Pizza < Tacos") should return the string Hamburgers &lt; Pizza &lt; Tacos.

convertHTML("Sixty > twelve") should return the string Sixty &gt; twelve.

convertHTML('Stuff in "quotation marks"') should return the string Stuff in &quot;quotation marks&quot;.

convertHTML("Schindler's List") should return the string Schindler&apos;s List.

convertHTML("<>") should return the string &lt;&gt;.

convertHTML("abc") should return the string abc.
*/
