'use strict';

let totalNumberOfPicsInImgDir = 12;
let maximumDurationInSeconds = 80000;

let containerTitleArray = [
    'Welcome to the Nexus!',
    'Roles',
    'Battlegrounds',
    'Modes',
    'Media',
    'Storm League'
];

let containerSubtitleArray = [
    'In this realm between realms, anything is possible! Choose from dozens of legendary Heroes from across the Blizzard pantheon.',
    'Take charge, take aim, or take one for the team. Heroes fall into the following categories so you can easily find a role that best fits your playstyle!',
    'Experience over a dozen unique Battlegrounds with wildly diverse objectives, layouts, and themes. Here are just a few examples of what you might find within the Nexus’s many realms',
    'Find the game mode that’s right for you. There’s no wrong way to play!',
    'Dig into what makes the Nexus tick with these Heroes of the Storm videos.',
    'Customize their talents and abilities on the fly, and battle it out on a myriad of genre-redefining Battlegrounds. This isn’t your average MOBA - this is Heroes of the Storm!'
];

let cardTitlesArray = [
    'Tank Heroes are formidable juggernauts that protect their team by absorbing attacks from the enemy and blocking their advance.',
    'Bruiser Heroes are tough fighters that can also dish out moderate amounts of damage.',
    'Support Heroes primarily provide boosts, buffs, and other benefits.',
    'Healer Heroes primarily focus on healing their allies and mitigating damage, as well as supporting the team.',
    'Melee Assassin Heroes are high-octane, in-your-face damage dealers that get up close and personal with their targets.',
    'Ranged Assassin Heroes are fragile characters with high damage capabilities that attack from a distance.',
];

let typesArray = [
    'Video',
    'E-learning',
    'Playlist',
    'Learning Plan'
];

let cardinalityArray = [
    'single',
    'collection'
];

// function that converts a string/number to HH:MM:SS format
function durationToHHMMSS(duration) {
    duration = Number(duration);

    let h = Math.floor(duration / 3600);
    let m = Math.floor(duration % 3600 / 60);
    let s = Math.floor(duration % 3600 % 60);

    // 0 -> 00; between 1 and 9 (incl) - prepend '0'; fm 10 to 59 (incl) - digit itself
    let hDisplay = (h > 0 ? (h < 10 ? '0' + h : h) : '00') + ':';
    let mDisplay = (m > 0 ? (m < 10 ? '0' + m : m) : '00') + ':';
    let sDisplay = s > 0 ? (s < 10 ? '0' + s : s) : '00';

    return hDisplay + mDisplay + sDisplay;
}

// function to get a rng from a list of digits
function getRandomNumber(maxNum) {
    return Math.floor(Math.random() * Math.floor(maxNum));
}

// randomized cards
function getRandomCards(limit) {
    let cardsObj = {};
    for (let key = 0; key < limit; key++) {
        cardsObj[key] = {
            image: 'img/' + getRandomNumber(totalNumberOfPicsInImgDir) + '.jpg',
            type: typesArray[getRandomNumber(typesArray.length)],
            duration: durationToHHMMSS(getRandomNumber(maximumDurationInSeconds)),
            title: cardTitlesArray[getRandomNumber(cardTitlesArray.length)],
            cardinality: cardinalityArray[getRandomNumber(cardinalityArray.length)]
        }
    }
    return cardsObj;
}