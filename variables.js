"use strict"; //Have to be there - gives more errors in the console 

console.log("Variables");

if (true == true) {
    var oldStyle = "Peter"; //Var is created once, and is then defined through the whole document 
    let newStyle = "Also Peter"; //When creating a let function within an if statement - it only exist in that. If you then console.log outside, it will not show in the console

}

let newStyle = "Peter";

console.log(oldStyle);
console.log(newStyle);