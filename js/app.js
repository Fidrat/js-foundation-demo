"use strict";
// init foundation stuff
$(document).foundation();

// instantiate global variables and constants
var content = "";
var someoneIsTalking = false;

const idGenerator = idMaker();


/*** Orc object constructor ****/
function Orc(lastName){
    const id = idGenerator.next().value;
    var speechGenerator = orcSpeech(this);

    var firstName = setOrcName();
    var lastName = lastName ? lastName : setOrcName();

    this.getFullName = () => firstName + ' ' + lastName; // getter for the Orc full name
    this.getFirstName = () => firstName; // getter for the Orc first name
    this.getLastName = () => lastName; // getter for the Orc last name
    this.getId = () => id; // getter for "private" Orc id

    // Orcish talking management
    this.talk = (target, next = speechGenerator.next()) =>{
        someoneIsTalking = true;

        if(!next.done){
            target.innerHTML = this.getFullName() + " say:<br>- ";
            let text = next.value;
            let timer = 0;

            //Print a char every 0.05 seconds
            for(let char of text){
                setTimeout( () => {
                   target.innerHTML += char;
                }, 50*(timer++) );
            }

            setTimeout( () => {
                this.talk(target, speechGenerator.next());
            }, 3000 );
        }else{
            target.innerHTML = '';
            someoneIsTalking = false;
            speechGenerator = orcSpeech(this);
        }
    };

};
/**** end of Orc object constructor ****/



// MAIN
function main(){
    // orc object array
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
        if (someoneIsTalking) {
            return;
        }
        getRandomArrayValue(orcArmy).talk( document.getElementById('talk-target') );
    });

};

// Equivalent to jQuery $(document).ready() in vanilla js
document.addEventListener("DOMContentLoaded", function() {
     main();
});
