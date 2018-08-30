"use strict"
/*
const n1 = 1;
const n2 = 2;

const s1 = "1";
const s2 = "2";

console.log(n1 + n2);
console.log(s1 + s2);

console.log(n1 + s2);
console.log(Number(s1) + n2);

console.log(n2 * 2);
console.log(s2 * 2) //converts our string to a number - cause it can't time with a sentense 

*/

/*
//Exercise, guess what answer will be
console.log("" + 1 + 0); //10
console.log("" - 1 + 0); //-1 the minus converts the string to a number first, then afterwards plusses 0
console.log(true + false); //1 false is 0 and true is one - so it becomes one
console.log(6 / "3"); //2 
console.log("2" * "3"); //6 
console.log(4 + 5 + "px"); //9px 
console.log("$" + 4 + 5); //$45 - adds the dollarsign to the four first and then adds the 5
console.log("4" - 2); //2
console.log("4px" - 2); //NaN
console.log(7 / 0); //Infinity 
console.log(" -9\n" + 5); //-9 and a line break and 5
console.log(" -9\n" - 5); //-14 because - converts it to a number 
console.log(null + 1);  //1
console.log(undefined + 1); //NaN

*/

const n1 = 12;
const n2 = 12;
const s1 = "12";

if (n1 == s1) {
    console.log("they are equal!");
}

if (n1 === n2) {
    console.log("They are REALLY equal");
}
