"use strict";
$(document).foundation();

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
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Hoisting
 */

// Return a random name
function setOrcName(){
    let rand = getRandomInt(5,2);
    let name = '';
    for(let i=0; i < rand; i++){
        name += getConsonantVowelPair();
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
};


// MAIN
function main(){
    // global array to contain orcs
    var orcArmy = [];

    content += "<p> Let's create some orcs </p>";
    for(let i=0; i < armySize; i++){
        orcArmy[i] = new Orc(); 
    }
    
    // Instantiating the variable "orc" with let
    let orc = orcArmy[0];
    
    // Reusing the same let variable "orc" to loop through orcs -- let limits this "orc" variable scope's to this block
    // for ... of simple loop : The for...of statement creates a loop iterating over iterable objects 
    for(let orc of orcArmy){
        content +=  '<div class="card" style="width: 300px;"><div class="card">Orc</div>' 
            + '<img src="img/grunt.png" style="max-width: 100%;"><div class="card-section">'
            + '<h4>' + orc.getFullName() + '</h4></div></div>';
    }

    // The orc variable is still containing the first orc of the orcArmy array.
    content += "<p> The first orc is : " + orc.getFullName() + "</p>";

    // Write content to the browser
    document.getElementById('content').innerHTML = content;
}

// Equivalent to jQuery $(document).ready() in vanilla js
document.addEventListener("DOMContentLoaded", function() {
     main();
});