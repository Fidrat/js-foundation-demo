"use strict";

// constants
const consonant = ['b', 'd', 'f', 'g', 'k', 't', 'p', 'z'];
const vowel = ['a', 'e', 'i', 'o', 'u', 'y'];
const armySize = 3;

/************** utils ***************/

// Return a random integer between min (included) & max (excluded)
function getRandomInt(max, min=0){
    return Math.floor(Math.random() * (max - min)) + min;
};

// Return a concatenated pair of consonant-vowel
function getConsonantVowelPair(){
    return consonant[ getRandomInt(consonant.length) ] + vowel[ getRandomInt(vowel.length) ];
};