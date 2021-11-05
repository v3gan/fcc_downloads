/*

Flatten a nested array. You must account for varying levels of nesting.

*/

function steamrollArray(arr) {  
let flattest = [];
for(let i = 0; i < arr.length; i++){
    if(Array.isArray(arr[i])){
      for(let j = 0; j < arr[i].length; j++){
        if(Array.isArray(arr[j])){
          // for...
        } else {
          // push...
        }
        // increment j
      }
    } else {
      flattest.push(arr[i])
    }
    // increment i
  }
}

// source array
// counter
// length
// dest array
let flattest = [];

function getNonArrayValues(source, counter) {
  
}

console.log(flattest);
console.log(getNonArrayValues([[["a"]], [["b"]]], []));

// let x = steamrollArray([[["a"]], [["b"]]]);
// console.log(x, JSON.stringify(x) == JSON.stringify(["a", "b"]));

// x = steamrollArray([1, [2], [3, [[4]]]]);
// console.log(x, JSON.stringify(x) == JSON.stringify([1, 2, 3, 4]));

// x = steamrollArray([1, [], [3, [[4]]]]);
// console.log(x, JSON.stringify(x) == JSON.stringify([1, 3, 4]));

// x = steamrollArray([1, {}, [3, [[4]]]]);
// console.log(x, JSON.stringify(x) == JSON.stringify([1, {}, 3, 4]));

/*

steamrollArray([[["a"]], [["b"]]]) should return ["a", "b"].

steamrollArray([1, [2], [3, [[4]]]]) should return [1, 2, 3, 4].

steamrollArray([1, [], [3, [[4]]]]) should return [1, 3, 4].

steamrollArray([1, {}, [3, [[4]]]]) should return [1, {}, 3, 4].

Your solution should not use the Array.prototype.flat() or Array.prototype.flatMap() methods.

*/
