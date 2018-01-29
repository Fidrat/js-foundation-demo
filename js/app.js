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
    const color = getRandomColor();

    this.getId = () => id; // getter for "private id"
    this.getName = () => name; // getter for "private name"
    this.getColor = () => color; // getter for "private color"
    
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
    this.getImg = () => orcImage; // getter for "private" 
    
    this.getCardWithWrapper = () => { // ! getter for card wrappers : row -> cell -> card & row -> speechCell
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
    
    // ! Building an img node 
    var orcImage = document.createElement('img');
    orcImage.setAttribute('src', 'img/grunt.png');
    
    // ! DOM Node elements as properties
    var card = buildCard(this); // orc card     
    
    var cardCell = document.createElement('div'); // direct wrapper for orc card - belong in a foundation's row
    cardCell.classList.add('large-3', 'medium-6', 'orc-wrapper', 'cell');
    
    var rowWrapper =  document.createElement('div'); // wrapper for cells. grid-x means its horizontal
    rowWrapper.classList.add('grid-x', 'grid-margin-x', 'text-center');
    
    // ! NODE element that will be appended to the DOM as a temporary container when an Orc is talking
    var speechNode = document.createElement('div');
    speechNode.classList.add('cell', 'large-3', 'text-left');

    

    // Orcish talking management
    this.talk = (target = speechNode, next = speechGenerator.next()) =>{
        this.setIsTalking(true); // Flag to ensure an orc can't talk multiple time at once
        this.getCard().classList.add('highlight'); // ! highlight an orc when he is talking

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
            this.getCard().classList.remove('highlight'); // ! remove highlight when talking action is finish
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
 var buildCard = (orc) =>{
    // ! quite self explaining
    let cardNode = document.createElement('div');
    cardNode.setAttribute('data-id', 'orc-' + orc.getId() );
    cardNode.classList.add('card', 'medium-3', 'orc-card');

    let cardSectionNode = document.createElement('div');
    cardSectionNode.classList.add('card-section');

    let orcLabel = document.createElement('p');
    orcLabel.appendChild( document.createTextNode( orc.getFullName() ) );


    cardSectionNode.appendChild(orc.getImg());
    cardSectionNode.appendChild(orcLabel);
    cardNode.appendChild(cardSectionNode);
    
    // ! Adding some css on the Node
    cardNode.style.cursor = 'pointer';
    cardNode.style.borderWidth = '4px';
    

    return cardNode;
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
        orc.setTalkListener();
        orc.getCard().style.borderColor = orc.getFamily() ? orc.getFamily().getColor() : '';
    }

};

// Equivalent to jQuery $(document).ready() in vanilla js
document.addEventListener("DOMContentLoaded", function() {
     main();
});
