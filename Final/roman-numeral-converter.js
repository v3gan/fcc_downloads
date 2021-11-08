/*

Convert the given number into a roman numeral.

All roman numerals answers should be provided in upper-case.

*/

function convertToRoman(num) {
  const numeralMap = {
    1: 'I',
    2: 'II',
    3: 'III',
    4: 'IV',
    5: 'V',
    6: 'VI',
    7: 'VII',
    8: 'VIII',
    9: 'IX',
    10: 'X',
    20: 'XX',
    30: 'XXX',
    40: 'XL',
    50: 'L',
    60: 'LX',
    70: 'LXX',
    80: 'LXXX',
    90: 'XC',
    100: 'C',
    200: 'CC',
    300: 'CCC',
    400: 'CD',
    500: 'D',
    600: 'DC',
    700: 'DCC',
    800: 'DCCC',
    900: 'CM',
    1000: 'M',
    2000: 'MM',
    3000: 'MMM',
  };
  
  let places = num.toString().split('').reverse().map((digit, index) => {
    let zeros = '';
    for (let i = 0; i < index; i++){
      zeros += '0'
    }
    return parseInt(digit + zeros);
  }).reverse();

  let romans = places.map(placeValue => {
    if(placeValue > 0){
      let roman = Object.entries(numeralMap)
        .sort((entry1, entry2) => parseInt(entry2) - parseInt(entry1))
        .find(entry => parseInt(entry[0]) <= placeValue)[1];
      return roman;      
    }
    return 0;
  })

  return romans.filter(r => r != 0).join('');
 }
 
 
let x = convertToRoman(2);
console.log(x, x === 'II');
x = convertToRoman(3);
console.log(x, x === 'III');
x = convertToRoman(4);
console.log(x, x === 'IV');
x = convertToRoman(5);
console.log(x, x === 'V');
x = convertToRoman(9);
console.log(x, x === 'IX');
x = convertToRoman(12);
console.log(x, x === 'XII');
x = convertToRoman(16);
console.log(x, x === 'XVI');
x = convertToRoman(29);
console.log(x, x === 'XXIX');
x = convertToRoman(44);
console.log(x, x === 'XLIV');
x = convertToRoman(45);
console.log(x, x === 'XLV');
x = convertToRoman(68);
console.log(x, x === 'LXVIII');
x = convertToRoman(83);
console.log(x, x === 'LXXXIII');
x = convertToRoman(97);
console.log(x, x === 'XCVII');
x = convertToRoman(99);
console.log(x, x === 'XCIX');
x = convertToRoman(400);
console.log(x, x === 'CD');
x = convertToRoman(500);
console.log(x, x === 'D');
x = convertToRoman(501);
console.log(x, x === 'DI');
x = convertToRoman(649);
console.log(x, x === 'DCXLIX');
x = convertToRoman(798);
console.log(x, x === 'DCCXCVIII');
x = convertToRoman(891);
console.log(x, x === 'DCCCXCI');
x = convertToRoman(1000);
console.log(x, x === 'M');
x = convertToRoman(1004);
console.log(x, x === 'MIV');
x = convertToRoman(1006);
console.log(x, x === 'MVI');
x = convertToRoman(1023);
console.log(x, x === 'MXXIII');
x = convertToRoman(2014);
console.log(x, x === 'MMXIV');
x = convertToRoman(3999);
console.log(x, x === 'MMMCMXCIX');

/*
convertToRoman(2) should return the string II.

convertToRoman(3) should return the string III.

convertToRoman(4) should return the string IV.

convertToRoman(5) should return the string V.

convertToRoman(9) should return the string IX.

convertToRoman(12) should return the string XII.

convertToRoman(16) should return the string XVI.

convertToRoman(29) should return the string XXIX.

convertToRoman(44) should return the string XLIV.

convertToRoman(45) should return the string XLV.

convertToRoman(68) should return the string LXVIII

convertToRoman(83) should return the string LXXXIII

convertToRoman(97) should return the string XCVII

convertToRoman(99) should return the string XCIX

convertToRoman(400) should return the string CD

convertToRoman(500) should return the string D

convertToRoman(501) should return the string DI

convertToRoman(649) should return the string DCXLIX

convertToRoman(798) should return the string DCCXCVIII

convertToRoman(891) should return the string DCCCXCI

convertToRoman(1000) should return the string M

convertToRoman(1004) should return the string MIV

convertToRoman(1006) should return the string MVI

convertToRoman(1023) should return the string MXXIII

convertToRoman(2014) should return the string MMXIV

convertToRoman(3999) should return the string MMMCMXCIX
*/
