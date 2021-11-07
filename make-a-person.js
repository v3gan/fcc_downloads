/*

Fill in the object constructor with the following methods below:

getFirstName()
getLastName()
getFullName()
setFirstName(first)
setLastName(last)
setFullName(firstAndLast)

Run the tests to see the expected output for each method. The methods that take an argument must accept only one argument and it has to be a string. These methods must be the only available means of interacting with the object.

*/


const Person = function(firstAndLast) {
  // Only change code below this line
  // Complete the method below and implement the others similarly  
  this.getFullName = function() {
    return firstAndLast;
  };
  this.getFirstName = () => firstAndLast.split(' ')[0];
  this.getLastName = () => firstAndLast.split(' ')[1];
  this.setFirstName = (name) => firstAndLast = firstAndLast.split(' ').map((val, index) => index == 0 ? name : val).join(' ');
  this.setLastName = (name) => firstAndLast = firstAndLast.split(' ').map((val, index) => index == 1 ? name : val).join(' ');
  this.setFullName = (name) => firstAndLast = name;
  return firstAndLast;
};

const bob = new Person('Bob Ross');
let x = bob instanceof Person;
console.log(x, x === true);
x = bob.getFullName();
console.log(x, x === 'Bob Ross');
x = bob.firstName;
console.log(x, x === undefined);
x = bob.lastName;
console.log(x, x === undefined);
x = bob.getFirstName();
console.log(x, x === 'Bob');
x = bob.getLastName();
console.log(x, x === 'Ross');
bob.setFirstName('Haskell')
x = bob.getFullName();
console.log(x, x === 'Haskell Ross');
bob.setLastName('Curry')
x = bob.getFullName();
console.log(x, x === 'Haskell Curry');
bob.setFullName('Haskell Curry');
x = bob.getFirstName();
console.log(x, x === 'Haskell');
bob.setFullName('Haskell Curry');
x = bob.getLastName();
console.log(x, x === 'Curry');

/*

No properties should be added. Object.keys(bob).length should always return 6.

bob instanceof Person should return true.

bob.firstName should return undefined.

bob.lastName should return undefined.

bob.getFirstName() should return the string Bob.

bob.getLastName() should return the string Ross.

bob.getFullName() should return the string Bob Ross.

bob.getFullName() should return the string Haskell Ross after bob.setFirstName("Haskell").

bob.getFullName() should return the string Haskell Curry after bob.setLastName("Curry").

bob.getFullName() should return the string Haskell Curry after bob.setFullName("Haskell Curry").

bob.getFirstName() should return the string Haskell after bob.setFullName("Haskell Curry").

bob.getLastName() should return the string Curry after bob.setFullName("Haskell Curry").

*/
