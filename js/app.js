"use strict";
// init foundation stuff
$(document).foundation();

// instantiate global variables and constants
var content = "";
var someoneIsTalking = false;

const idGenerator = idMaker();


// ! infinite generator exemple
// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator
function* idMaker() {
    var index = 1;
    while(true){
        yield index++;
    }
}




/*** Orc object constructor ****/
function Orc(lastName){
    var me = this;
    const id = idGenerator.next().value; // ! Using const inside the Orc object "id" become like a private immutable variable
    var speechGenerator = orcSpeech();


    var firstName = setOrcName();
    var lastName = lastName ? lastName : setOrcName();

    this.getFullName = () => firstName + ' ' + lastName; // getter for the Orc full name
    this.getFirstName = () => firstName; // getter for the Orc first name
    this.getLastName = () => lastName; // getter for the Orc last name
    this.getId = () => id; // getter for "private" Orc id

    // ! Generator function, finite generator exemple
    function* orcSpeech(){
        yield "Ur house will burn in the name of the " + me.getLastName() + " clan.";
        yield "Hungry! Lunch yet?";
        yield me.getFirstName() + " will chew ur eyes!";
    }

    // ! Recursive member function using the above generator
    this.talk = function(target, next = speechGenerator.next()){
        //console.log(next);
        someoneIsTalking = true;

        if(!next.done){
            target.innerHTML = me.getFullName() + " say:<br>- " + next.value;

            setTimeout( function(){
                me.talk(target, speechGenerator.next());
            }, 2000 );
        }else{
            target.innerHTML = '';
            someoneIsTalking = false;
            speechGenerator = orcSpeech(); // Reinstantiate generator so we can have the same orc talk again
        }

    };
};
/**** end of Orc object constructor ****/



// MAIN
function main(){
    // orc oject array
    var orcArmy = [];

    // generate some orcs
    for(let i=0; i < armySize; i++){
        orcArmy[i] = new Orc();
    }
    // render orcs in foundation cards
    for(let orc of orcArmy){
        content += orcCardHtmlBegin + '<p>' + '#' + orc.getId() + ' ' + orc.getFullName() + '</p>' + orcCardHtmlEnd;
    }

    // Write content to the browser
    document.getElementById('content').innerHTML = content;


    /************** events ***************/
    var btn = document.getElementById('talk-trigger');
    btn.addEventListener('click', function() {
        if(someoneIsTalking){
            return;
        }
        orcArmy[getRandomInt(orcArmy.length,1)].talk( document.getElementById('talk-target') );
    });

};

// Equivalent to jQuery $(document).ready() in vanilla js
document.addEventListener("DOMContentLoaded", function() {
     main();
});
