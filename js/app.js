/*
 * Create a list that holds all of your cards
 */

//listOfCards is a NodeList holding all the html code with the cards
var listOfCards = document.querySelectorAll('.card');

//allCards is an Array holding the conetent of the cards
var allCards = [];

//TODO: deck can be deleted
var deck = document.querySelectorAll('.deck');

//Intializes an ID pairs of li and i elements
const PAIRS = [
  ["c01", "i01"],
  ["c02", "i02"],
  ["c03", "i03"],
  ["c04", "i04"],
  ["c05", "i05"],
  ["c06", "i06"],
  ["c07", "i07"],
  ["c08", "i08"],
  ["c09", "i09"],
  ["c10", "i10"],
  ["c11", "i11"],
  ["c12", "i12"],
  ["c13", "i13"],
  ["c14", "i14"],
  ["c15", "i15"],
  ["c16", "i16"]
]

//Global variables for card matching
var match = [false, 16];
var cardPos1 = -1;
var cardPos2 = -1;

//Global variables for number of moves and star rating
var moves = 0;
var movesHTML = document.querySelector('.moves');
var stars = 3;
var starsHTML = document.querySelector('.stars');

//Wait variable via Promise feature declared -
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

// This function will copy the cards "picture" from NodeList into the Array
function cardInit() {
  for (let i = 0; i <= 15; i++) {
    allCards[i]=listOfCards[i].children[0].classList[1];

    //initialize of cards no match or open show
    listOfCards[i].classList.remove('open');
    listOfCards[i].classList.remove('match');
    listOfCards[i].classList.remove('show');
  }

  // Now we can shullfle the Array
  shuffle(allCards);

  //Based on the new Array we will update NodeList and thus html
  for (let i = 0; i <= 15; i++) {
    listOfCards[i].children[0].classList.remove(listOfCards[i].children[0].classList[1]);
    listOfCards[i].children[0].classList.add(allCards[i]);
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Add listners on cards
function addCardListener() {
  for (var i = 0; i <= 15; i++) {
    listOfCards[i].addEventListener('click', respondToTheClick);
  }
}

//Remove listeners from cards
function removeCardListener() {
  for (var i = 0; i <= 15; i++) {
    listOfCards[i].removeEventListener('click', respondToTheClick);
  }
}

//Set-up a function which is going to identify a card which has been clicked
function respondToTheClick(evt) {
  //get card position
  var cardPosition = getCardPosition (evt);
  //TODO: remove afterwards
  console.log("Card position:",cardPosition);

  //TODO:switch based on matched, turned, not turned
  switch (turnCard(cardPosition)) {
    case "matched" :
      break;
    case "front" :
      break;
    case "back" :
      if (match[0] === false) {
        match[0] = true;
        cardPos1 = cardPosition;
      } else {
        //comparing two cards
        cardPos2 = cardPosition;
        removeCardListener();
        wait(2000).then(() => decision(final)).catch(compare(cardPos1, cardPos2));
        //update moves
        moves += 1;
        updateMove();
        //update stars
        if (moves % 20 === 0) {
          removeStar();
        }
      }
      break;
  }
}

function getCardPosition (evt) {
  if (evt.target.tagName === 'LI') {
    let i = 0;
    while ( !(PAIRS[i][0] === evt.target.id)){
      i++;
    }
    return i;
  } else if (evt.target.tagName === 'I') {
    let i = 0;
    while ( !(PAIRS[i][1] === evt.target.id)){
      i++;
    }
    return i;
  }
}

//Set-up a function which turns the card
function turnCard(position) {
  if (listOfCards[position].classList.contains('match')) {
    //TODO:remove afterwards
    console.log('contains');
    return "matched";
  } else if (listOfCards[position].classList.contains('open')) {
      //TODO:remove afterwards
      console.log('front');
      return "front";
  } else {
      listOfCards[position].classList.add('open');
      listOfCards[position].classList.add('show');
      //TODO:remove afterwards
      console.log('back');
      return "back";
  }
}

//Function closes both cards
function closeCards(pos1, pos2) {
  listOfCards[pos1].classList.remove('open');
  listOfCards[pos1].classList.remove('show');
  listOfCards[pos2].classList.remove('open');
  listOfCards[pos2].classList.remove('show');
}

var final = false;

function compare (pos1, pos2) {
  // console.log(listOfCards[pos1].children[0].classList[1]);
  // console.log(listOfCards[pos2].children[0].classList[1]);
  if (listOfCards[pos1].children[0].classList[1] === listOfCards[pos2].children[0].classList[1]) {
    final = true;
    return true;
  } else {
      final = false;
      return false;
  }
}

//Marks cards as matched
function matchCards (pos1, pos2) {
  listOfCards[pos1].classList.add('match');
  listOfCards[pos2].classList.add('match');
}

//Executes the decision based on math or mis-match
function decision(dec) {
  if (dec === true) {
    console.log("Decision:",dec,"...Cards are same");
    //Cards are same - match them
    matchCards(cardPos1, cardPos2);
    match[0] = false;
    match[1] -= 2;
    addCardListener();
    //Check if game ended - all cards are matched
    if (match[1] <= 0) {
      gameWon();
    }

  } else {
      console.log("Decision:",dec,"...Cards are different");
      //Cards are different - turn them back
      closeCards(cardPos1, cardPos2);
      match[0] = false;
      addCardListener();
    }
}

function gameWon() {
  alert('CONGRATULATIONS! You have WON the game within '+ moves+ " moves");
  gameInit();
}

function gameInit(){
  cardInit ();
  stars = 3;
  updateStars();
  moves = 0;
  updateMove();
}

function updateMove() {
    movesHTML.textContent = moves;
}

function getStars() {
  return stars;
}

function removeStar() {
  stars -= 1;
  switch (stars) {

  }

  //starsHTML.
}

function updateStar() {
  //starsHTML.
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//Code which will fire during the page load
cardInit ();
addCardListener();
