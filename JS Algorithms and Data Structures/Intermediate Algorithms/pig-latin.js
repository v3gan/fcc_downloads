/*
Pig Latin is a way of altering English Words. The rules are as follows:

- If a word begins with a consonant, take the first consonant or consonant cluster, move it to the end of the word, and add ay to it.

- If a word begins with a vowel, just add way at the end.

Translate the provided string to Pig Latin. Input strings are guaranteed to be English words in all lowercase.
*/

function translatePigLatin(str) {
  let reC = /^([^aeiou]+)([aeiou]\w+)/
  let reV = /^[aeiou]/
  if(reC.test(str)){
    return str.replace(reC, '$2$1ay')
  } else if (reV.test(str)) {
    return str + 'way';    
  } else {
    return str + 'ay';
  }
}

let pl = translatePigLatin("california");
console.log(pl, pl == 'aliforniacay');
pl = translatePigLatin("paragraphs");
console.log(pl, pl == 'aragraphspay');
pl = translatePigLatin("glove");
console.log(pl, pl == 'oveglay');
pl = translatePigLatin("algorithm");
console.log(pl, pl == 'algorithmway');
pl = translatePigLatin("eight");
console.log(pl, pl == 'eightway');
pl = translatePigLatin("schwartz");
console.log(pl, pl == 'artzschway');
pl = translatePigLatin("rhythm");
console.log(pl, pl == 'rhythmay');

/*
translatePigLatin("california") should return the string aliforniacay.

translatePigLatin("paragraphs") should return the string aragraphspay.

translatePigLatin("glove") should return the string oveglay.

translatePigLatin("algorithm") should return the string algorithmway.

translatePigLatin("eight") should return the string eightway.

Should handle words where the first vowel comes in the middle of the word. translatePigLatin("schwartz") should return the string artzschway.

Should handle words without vowels. translatePigLatin("rhythm") should return the string rhythmay.
*/