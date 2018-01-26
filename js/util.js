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

/**
 * Infinite id generator
 * @returns int auto incremented
 */ 
function* idMaker() {
    var index = 1;
    while(true){
        yield index++;
    }
}
/**
 * Orcish speech generator
 * @returns string an orc speech sentence
 */ 
function* orcSpeech(orc){
    yield "Ur house will burn in the name of the " + orc.getLastName() + " clan.";
    yield "Hungry! Lunch yet?";
    yield orc.getFirstName() + " will chew ur eyeballs!";
}
