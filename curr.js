/*

Flatten a nested array. You must account for varying levels of nesting.

*/

function steamrollArray(arr) {
  return JSON.stringify(arr);
}

function getNonArrayValues(arr, flat) {
  if(Array.isArray(arr[0])){
    getNonArrayValues(arr[0], flat);
  } else {
    flat.push(arr[0]);
  }
}

let x = steamrollArray([[["a"]], [["b"]]]);
console.log(x, JSON.stringify(x) == JSON.stringify(["a", "b"]));

x = steamrollArray([1, [2], [3, [[4]]]]);
console.log(x, JSON.stringify(x) == JSON.stringify([1, 2, 3, 4]));

x = steamrollArray([1, [], [3, [[4]]]]);
console.log(x, JSON.stringify(x) == JSON.stringify([1, 3, 4]));

x = steamrollArray([1, {}, [3, [[4]]]]);
console.log(x, JSON.stringify(x) == JSON.stringify([1, {}, 3, 4]));

/*

steamrollArray([[["a"]], [["b"]]]) should return ["a", "b"].

steamrollArray([1, [2], [3, [[4]]]]) should return [1, 2, 3, 4].

steamrollArray([1, [], [3, [[4]]]]) should return [1, 3, 4].

steamrollArray([1, {}, [3, [[4]]]]) should return [1, {}, 3, 4].

Your solution should not use the Array.prototype.flat() or Array.prototype.flatMap() methods.

*/


