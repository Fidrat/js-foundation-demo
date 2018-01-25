"use strict";
// init foundation stuff
$(document).foundation();

// instantiate global variables
var content = "";

// Orc object simple constructor
function Orc(lastName){  
    var firstName = setOrcName();
    var lastName = lastName ? lastName : setOrcName();
    
    // ! Arrow syntax 1 : Shorter syntax
    this.getFullName = () => firstName + ' ' + lastName; // getter for the Orc full name
    // Non arrow equivalent
    // this.getFullName = function(){
    //     return this.firstName + ' ' + this.lastName;
    // };    
};

/**
 * ! Functions and variables are hoisted : 
 * Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution.
 * ! In this case it means that even if setOrcName() is declared after its use in the script, it is interpreted before because it is hoisted.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Hoisting
 */
// ! arrow expression that return a random name
var setOrcName = (rand = getRandomInt(5,2)) => {
    var name = '';
    for(let i=0; i < rand; i++){
        name += getConsonantVowelPair();
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
};
// ! Non arrow equivalent
//function setOrcName(){
//    let rand = getRandomInt(5,2);
//    var name = '';
//    for(let i=0; i < rand; i++){
//        name += getConsonantVowelPair();
//    }
//    return name.charAt(0).toUpperCase() + name.slice(1);
//};


// MAIN
function main(){
    // orc oject array
    var orcArmy = [];

    for(let i=0; i < armySize; i++){
        orcArmy[i] = new Orc(); 
    }
    
    // Instantiating the variable "orc" with let
    let orc = orcArmy[0];
    
    // ! Reusing the same let variable "orc" to loop through orcs -- let limits this "orc" variable scope's to this block
    // ! for ... of simple loop : The for...of statement creates a loop iterating over iterable objects 
    for(let orc of orcArmy){
        content += orcCardHtmlBegin + '<p>' + orc.getFullName() + '</p>' + orcCardHtmlEnd;
    }

    // Write content to the browser
    // ! The orc variable is still containing the first orc of the orcArmy array.
    document.getElementById('first-orc').innerHTML = orc.getFullName();
    document.getElementById('content').innerHTML = content;
}

// Equivalent to jQuery $(document).ready() in vanilla js
document.addEventListener("DOMContentLoaded", function() {
     main();
});