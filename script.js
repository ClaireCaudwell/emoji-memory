// First section - define global variables
let flowerEmojis = ["🌹",  "🌻", "🌸", "🌷", "🌼", "💐"];
const flowerMap = [...flowerEmojis, ...flowerEmojis];

let foodEmojis = ["🍔", "🍕", "🥨", "🥙", "🥗", "🍣"];
const foodMap = [...foodEmojis, ...foodEmojis];

let petEmojis = ["🐘", "🐬", "🦩", "🦥", "🐪", "🐢"];
const petMap = [...petEmojis, ...petEmojis];

const emojiTypeMap = [[...flowerEmojis], [...foodEmojis], [...petEmojis]];
let finalEmojiGameSelection = [];

const gameNames = [
    "Flower emoji's 🌷",
    "Food emoji's 🥙",
    "Animal emoji's 🐬",
];

let symbolOne;
let symbolTwo;
let arrayIndex = 0;
let clicks = 0;
let points = 0;
let gameStarted = false;

let gameStatusText = null;
let restartButton = null;
let pointsText = undefined;

// --- Second section - define functions ---
// Everytime the user clicks the button the arrayIndex is incremented by 1
// The modulus operator checks if the number is equally divisible by 3, if not then it will return the original number e.g. 1, 2
// If the arrayIndex is 3 then it's equally divisible by itself and the remainder is 0. This sets the arrayIndex to back to 0    
// Using the modulus operator to assign the arrayIndex back to 0 when all emojiTypeMap (3 elements) elements have been looped through
const gameTypeRandomizer = () => {
    arrayIndex = (arrayIndex + 1) % 3;
    finalEmojiGameSelection = [...emojiTypeMap[arrayIndex], ...emojiTypeMap[arrayIndex]];
    document.getElementById("gameTypeTitle").innerHTML = `${gameNames[arrayIndex]}`;
};

const memoryRandomizer = () => {
    for(let i = finalEmojiGameSelection.length -1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temporaryBox = finalEmojiGameSelection[i];
        finalEmojiGameSelection[i] = finalEmojiGameSelection[j];
        finalEmojiGameSelection[j] = temporaryBox;
    }
};

const clearText = () => {
    symbolOne.innerText = "";
    symbolTwo.innerText= "";
    symbolOne.style.backgroundColor = "rgb(245, 245, 101)";
    symbolTwo.style.backgroundColor = "rgb(245, 245, 101)";
    setTimeout(playAgain, 1000);
    clicks = 0;
};

const handleReplay = () => {
    let contentOfCard = document.getElementById("memoryCardContainer");
    for(let i = 0; i < contentOfCard.children.length; i++) {
        contentOfCard.children[i].innerText = "";
        contentOfCard.children[i].style.backgroundColor = "rgb(245, 245, 101)";
    }
    gameStatusText.innerHTML = "Click two cards to find a match";
    points = 0;
    document.getElementById("points").innerHTML = pointsText + `${points}`;
    chooseGameButton.disabled = false;
    restartButton.disabled = true;
    memoryRandomizer();
    gameStarted = false;
};

const playAgain = () => {
    gameStatusText.innerHTML = "Click two cards to find a match";
    if(points === 6) {
        gameStatusText.innerHTML = "Well done you've completed the game!";
        restartButton.disabled = false;
        restartButton.addEventListener("click", handleReplay);
    }
};

// Function that checks if the strings are a match
// Called when clicks is === 2 in if statement below
const checkResult = () => { 
    if(symbolOne.innerText === symbolTwo.innerText) {
        gameStatusText.innerHTML = "It's a match 👌!";
        setTimeout(playAgain, 2000);       
        clicks = 0;
        points ++;
        document.getElementById("points").innerHTML = pointsText + `${points}`;
    } else {
        gameStatusText.innerHTML = "It's not a match 🤔";
        setTimeout(clearText, 2000);
    }
};

const showWord = () => {
    const p_tag = event.target;
    if(p_tag.innerText === "") {
        clicks +=1;
        if(clicks <= 2) {
            p_tag.innerHTML = finalEmojiGameSelection[p_tag.pindex];
            gameStarted = true;
            chooseGameButton.disabled = true;
            if(clicks === 1) {
                symbolOne = p_tag;
                symbolOne.style.backgroundColor = "rgb(230, 230, 62)";
            } else if (clicks === 2) {
                symbolTwo = p_tag;
                symbolTwo.style.backgroundColor = "rgb(230, 230, 62)";
                checkResult();
            }
        }
    }
};

// Things you want done when page is loaded
const initalise = () => {
    gameTypeRandomizer();
    for(let j = 0; j < finalEmojiGameSelection.length; j++) { 
        // Create a p tag for the length of the flowerNames array
        const cardTag = document.createElement("p");
        cardTag.className = "card-text"; 
        cardTag.id = "card";
        cardTag.addEventListener("click", showWord);       
        // variable that stores p tag is object so you can create a new property for that object (pindex in this case) and assign it the loops index j
        cardTag.pindex = j;
        // Then get the specific html id and add the p tag to it
        document.getElementById("memoryCardContainer").appendChild(cardTag);
    }

    gameStatusText = document.getElementById("gameStatus");
    pointsText = document.getElementById("points").innerHTML;
    chooseGameButton = document.getElementById("chooseGameButton");
    restartButton = document.getElementById("restartButton");
    restartButton.disabled = true;
    document.getElementById("gameTypeTitle").innerHTML = `${gameNames[arrayIndex]}`;
    memoryRandomizer();
};
// Calls the initalise function when the page is fully loaded
window.addEventListener("load", initalise);