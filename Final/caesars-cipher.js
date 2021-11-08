/*

One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. In a shift cipher the meanings of the letters are shifted by some set amount.

A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus A ↔ N, B ↔ O and so on.

Write a function which takes a ROT13 encoded string as input and returns a decoded string.

All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.

*/

function rot13(str) {
  let alphabet = {};
  let factor = 0;
  for (let i = 65; i < 91; i++) {
    let code = (i + 13) > 90 ? i - 13 : i + 13;
    alphabet[String.fromCharCode(code)] = String.fromCharCode(i);
  }
  let decoded = str.split('').map(item => /\w/.test(item) ? alphabet[item] : item).join('');
  return decoded;
}

let x = rot13("SERR PBQR PNZC");
console.log(x, x === "FREE CODE CAMP");
x = rot13("SERR CVMMN!");
console.log(x, x === "FREE PIZZA!");
x = rot13("SERR YBIR?");
console.log(x, x === "FREE LOVE?");
x = rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.");
console.log(x, x === "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.");

/*
rot13("SERR PBQR PNZC") should decode to the string FREE CODE CAMP

rot13("SERR CVMMN!") should decode to the string FREE PIZZA!

rot13("SERR YBIR?") should decode to the string FREE LOVE?

rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.") should decode to the string THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.
*/
