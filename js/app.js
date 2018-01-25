"use strict";
// init foundation stuff
$(document).foundation();

// instantiate global variables and constants
var content = "";
var someoneIsTalking = false;

const idGenerator = idMaker();


/*** Orc object constructor ****/
function Orc(lastName){
    // ! Here we are using the arrow syntax to avoid holding the value of this as a property.
    // var me = this;
    const id = idGenerator.next().value;
    var speechGenerator = orcSpeech(this);

    var firstName = setOrcName();
    var lastName = lastName ? lastName : setOrcName();

    this.getFullName = () => firstName + ' ' + lastName; // getter for the Orc full name
    this.getFirstName = () => firstName; // getter for the Orc first name
    this.getLastName = () => lastName; // getter for the Orc last name
    this.getId = () => id; // getter for "private" Orc id

    // Orcish speech generator
    // ! we added an orc object parameter because we can't use the arrow annotation with generators
    function* orcSpeech(orc){
        yield "Ur house will burn in the name of the " + orc.getLastName() + " clan.";
        yield "Hungry! Lunch yet?";
        yield orc.getFirstName() + " will chew ur eyes!";
    }

    // ! With the arrow syntax, the this is not redefined and is still set to the parent Orc object
    this.talk = (target, next = speechGenerator.next()) =>{
        //console.log(next);
        someoneIsTalking = true;

        if(!next.done){
            target.innerHTML = this.getFullName() + " say:<br>- ";
            let text = next.value;
            let timer = 0;

            //! We can use for ... of loop on a string since it is an iterable object in js
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
    // orc oject array
    var orcArmy = [];

    for(let i=0; i < armySize; i++){
        orcArmy[i] = new Orc();
    }

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
        orcArmy[getRandomInt(orcArmy.length,1)].talk( document.getElementById('talk-target') );
    });

};

// Equivalent to jQuery $(document).ready() in vanilla js
document.addEventListener("DOMContentLoaded", function() {
     main();
});
