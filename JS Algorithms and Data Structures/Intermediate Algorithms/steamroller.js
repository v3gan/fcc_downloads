/*

Flatten a nested array. You must account for varying levels of nesting.

*/

function steamrollArray(arr) {  
let flattest = [];
for(let i = 0; i < arr.length; i++){
    if(Array.isArray(arr[i])){
      flattest.push(...steamrollArray(arr[i]))
    } else {
      flattest.push(arr[i])
    }
  }
  return flattest;
}

function steamrollArray2(arr) {
  const flat = [].concat(...arr);
  return flat.some(Array.isArray) ? steamrollArray(flat) : flat;
}

function steamrollArray3(val,flatArr=[]) {
  val.forEach(item => {
    if (Array.isArray(item)) steamrollArray(item, flatArr);
    else flatArr.push(item);
  });
  return flatArr;
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
