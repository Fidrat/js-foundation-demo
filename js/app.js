"use strict";
// init foundation stuff
$(document).foundation();

// instantiate global variables and constants
var content = "";
var someoneIsTalking = false;

const idGenerator = idMaker();
const familyIdGenerator = idMaker();

/**
 * Orcish family manager
 */ 
function OrcFamily(){
    const id = familyIdGenerator.next().value;
    const name = setOrcName();

    this.getId = () => id; // getter for "private id"
    this.getName = () => name; // getter for "private name"
}; // end of OrcFamily


/**
 *  Orc object constructor
 *  @param orcFamily OrcFamily (optionnal)
 **/
function Orc(orcFamily = null){
    
    // getter and setters
    this.getFullName = () => firstName + ' ' + lastName; // getter for the Orc full name - not a property
    
    this.getFamily = () => family; // getter for the Orc family object
    this.getFirstName = () => firstName; // getter for the Orc first name
    this.getLastName = () => orcFamily ? family.getName() : ''; // getter for the Orc last name
    this.getId = () => id; // getter for "private" Orc id
    this.getCard = () => card; // getter for "private" Orc card
    
    this.getCardWithWrapper = () => { // getter for card wrappers : column -> cell
        rowWrapper.appendChild(cardCell);
        cardCell.appendChild(card);
        rowWrapper.appendChild(speechNode);
        
        return rowWrapper;
    }; 
    
    this.isTalking = () => isTalking; // getter for boolean isTalking
    this.setIsTalking = (talking) => { isTalking = talking === true ? true : false; }; // setter for isTalking
    
    
    // Orc object properties
    const id = idGenerator.next().value;
    var speechGenerator = orcSpeech(this);
    
    var firstName = setOrcName();
    var lastName = orcFamily ? orcFamily.getName() : ''; 
    var family = orcFamily;
    var isTalking = false;
    
    // DOM Node elements as properties
    var card = buildCard(this); // orc card 
    
    var cardCell = document.createElement('div'); // direct wrapper for orc card
    cardCell.classList.add('large-3', 'medium-6', 'orc-wrapper', 'cell');
    
    var rowWrapper =  document.createElement('div');
    rowWrapper.classList.add('grid-x', 'grid-margin-x', 'text-center');
    
    // ! NODE element that will be appended to the DOM as a temporary container when an Orc is talking
    var speechNode = document.createElement('div');
    speechNode.classList.add('cell', 'large-3', 'text-left');
    

    // Orcish talking management
    this.talk = (target = speechNode, next = speechGenerator.next()) =>{
        this.setIsTalking(true);

        if(!next.done){
            target.innerHTML = this.getFullName() + " say:<br>- ";
            let text = next.value;
            let timer = 0;

            // Print a char every 0.05 seconds
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
            this.setIsTalking(false);
            speechGenerator = orcSpeech(this);
        }
    };
 
    // Orcish speech event listener
    this.setTalkListener = (domSrc = card ) => {        
        domSrc.addEventListener('click', () => {
            if(!this.isTalking()){
                this.talk(speechNode);
            }
        });
    };
    
};
/**** end of Orc object constructor ****/

/**
 * ! Render an Orc's card with vanilla js 
 * 
 * @returns DOM tree of a Foundation card
 */ 
 var buildCard = function(orc){

    let cardHtml = document.createElement('div');
    cardHtml.setAttribute('data-id', 'orc-' + orc.getId() );
    cardHtml.classList.add('card', 'medium-3', 'orc-card');

    let cardSectionHtml = document.createElement('div');
    cardSectionHtml.classList.add('card-section');

    let orcImg = document.createElement('img');
    orcImg.setAttribute('src', 'img/grunt.png');

    let orcLabel = document.createElement('p');
    orcLabel.appendChild( document.createTextNode( orc.getFullName() ) );

    cardSectionHtml.appendChild(orcImg);
    cardSectionHtml.appendChild(orcLabel);
    cardHtml.appendChild(cardSectionHtml);

    return cardHtml;
};




// MAIN
function main(){
    // orc object array
    var orcArmy = [];
    var orcFamilies = []; 
    const cElement = document.getElementById('content');

    // generate some orcish families
    for(let i = 0; i < orcishFamilyNumber; i++ ){
        orcFamilies[i] = ( new OrcFamily() );
    }

    // generate some orcs with a random family
    for(let i=0; i < armySize; i++){
        orcArmy[i] = new Orc( getRandomArrayValue(orcFamilies) );
    }
    orcArmy[armySize] = new Orc(); // adding one orphan orc
    
    // render orcs in foundation cards
    for(let orc of orcArmy){
        cElement.appendChild( orc.getCardWithWrapper() );
        orc.setTalkListener( );
    }

};

// Equivalent to jQuery $(document).ready() in vanilla js
document.addEventListener("DOMContentLoaded", function() {
     main();
});
