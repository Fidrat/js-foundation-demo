"use strict";

// constants
const consonant = ['b', 'd', 'f', 'g', 'k', 't', 'p', 'z'];
const vowel = ['a', 'e', 'i', 'o', 'u', 'y'];
const armySize = 3;

const orcCardHtmlBegin = '<div class="cell text-center large-3 medium-6"><div class="card"><div class="card-section"><img src="img/grunt.png"></div>';
const orcCardHtmlEnd = '</div></div>';

/************** utils ***************/

// Return a random integer between min (included) & max (excluded)
function getRandomInt(max, min=0){
    return Math.floor(Math.random() * (max - min)) + min;
};

// Return a concatenated pair of consonant-vowel
function getConsonantVowelPair(){
    return consonant[ getRandomInt(consonant.length) ] + vowel[ getRandomInt(vowel.length) ];
};