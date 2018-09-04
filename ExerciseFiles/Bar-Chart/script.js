"use strict";

window.addEventListener("DOMContentLoaded", init);

let bar;
let barsArray;
let bars;

//array which creates random height 
const dataArray = [];
let counter;

function init() {
    console.log("init");

    bar = document.querySelectorAll(".bar");

    // barsArray = Array.from(bar);
    //console.log(barsArray);

    // start the loop
    setTimeout(loop, 500);

    //create data which can be loop through math random later  
    //make a for loop that creates different values for the array
    for (counter = 0; counter < 40; counter++) {
        dataArray.push(Math.random() * 100);
    }
    displayAllBars();

    // display the bars 
    function displayAllBars() {
        //forEach to loop through all bars and then display the bars  
        document.querySelectorAll(".bar").forEach(displayOneBar);

    }
    // give the bars a hight - this should not change, therefore it should be in the init, and not loop through it. 
    //make new data
    function displayOneBar(div, index, nodelist) {
        div.style.height = dataArray[index] + "px";

    }
}


//loop through data 
function loop() {
    //add array in end 
    //barsArray.push(barsArray[0]);
    // console.log(barsArray);

    //take one piece of the array
    //barsArray = barsArray.slice(1);

    //join the new array with the old array
    // document.querySelectorAll(".bar") = barsArray.join();

    //function for moving the array
    bar = document.querySelectorAll(".bar");
    bars = document.querySelector(".bars");
    bars.appendChild(bar[0]);

    //function for displaying the function


    // loop the loop
    setTimeout(loop, 500);

}
