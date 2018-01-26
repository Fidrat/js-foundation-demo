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
    const id = idGenerator.next().value;
 
    this.getFullName = () => firstName + ' ' + lastName; // getter for the Orc full name
    this.getFamily = () => family; // getter for the Orc family object
    this.getFirstName = () => firstName; // getter for the Orc first name
    this.getLastName = () => orcFamily ? family.getName() : ''; // getter for the Orc last name
    this.getId = () => id; // getter for "private" Orc id
    this.getCard = () => card; // getter for "private" Orc card
    
    this.getCardWithWrapper = () => {
        let wrapper = buildWrapperForOrcCard();
        wrapper.firstChild.appendChild(card);
        return wrapper;
    }; 
    
    this.isTalking = () => isTalking;
    this.setIsTalking = (b) => { isTalking = b; };
    

    var speechGenerator = orcSpeech(this);
    var firstName = setOrcName();
    var lastName = orcFamily ? orcFamily.getName() : ''; 
    var family = orcFamily;
    var card = buildCard(this);
    var speechTarget = document.createElement('div');
    speechTarget.classList.add('cell', 'large-3', 'text-left');
    
    var isTalking = false;

    // Orcish talking management
    this.talk = (target, next = speechGenerator.next()) =>{
        this.setIsTalking(true);
        card.parentNode.parentNode.insertBefore(speechTarget, card.parentNode.nextSibling);

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
            target.remove();
            this.setIsTalking(false);
            speechGenerator = orcSpeech(this);
        }
    };
 
    // Orcish speech event listener
    this.setTalkListener = (domSrc = card ) => {        
        domSrc.addEventListener('click', () => {
            if(!this.isTalking())
                this.talk(speechTarget);
        });
    };
    
};
/**** end of Orc object constructor ****/

/**
 * ! Render an Orc's card with vanilla js 
 * 
 * @returns DOM tree of a Foundation card wrapped in a grid
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
    //wrapperHtml.appendChild(cardHtml);

    return cardHtml; // wrapperHtml;
};

var buildWrapperForOrcCard = () => {
    let wrapperHtml = document.createElement('div');
    wrapperHtml.classList.add('grid-x', 'grid-margin-x', 'text-center');
    let wrappedWrapperHtml = document.createElement('div');
    wrappedWrapperHtml.classList.add('large-3', 'medium-6', 'orc-wrapper', 'cell');
    wrapperHtml.appendChild(wrappedWrapperHtml);
    
    return wrapperHtml;
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
