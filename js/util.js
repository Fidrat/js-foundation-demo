"use strict";

// constants
const consonant = ['b', 'd', 'f', 'g', 'k', 't', 'p', 'z'];
const vowel = ['a', 'e', 'i', 'o', 'u', 'y'];
const armySize = 3;

const orcCardHtmlBegin = '<div class="cell text-center large-3 medium-6"><div class="card"><div class="card-section"><img src="img/grunt.png"></div>';
const orcCardHtmlEnd = '</div></div>';

/************** utils ***************/

/**
 * Return a random integer between min (included) & max (excluded)
 * @param max int
 * @param min  int
 * @returns int
 */ 
function getRandomInt(max, min=0){
    return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * Return a random value from array
 * @param arr array
 * @returns mixed array value
 */
function getRandomArrayValue(arr){
    return (arr.constructor === Array) ? arr[Math.floor(Math.random() * arr.length)] : false;
}

/**
 * Return a concatenated pair of consonant-vowel
 * @returns {String}
 */ 
function getConsonantVowelPair(){
    return consonant[ getRandomInt(consonant.length) ] + vowel[ getRandomInt(vowel.length) ];
};


/**
 * Return a random Orc name
 * @param rand int
 * @returns {String}
 */ 
var setOrcName = (rand = getRandomInt(5,2)) => {
    var name = '';
    for(let i=0; i < rand; i++){
        name += getConsonantVowelPair();
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
};