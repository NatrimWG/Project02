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

var match = false;

// This function will copy the cards "picture" from NodeList into the Array
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

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

//Set-up a listner on each card
for (var i = 0; i <= 15; i++) {
  listOfCards[i].addEventListener('click', respondToTheClick);
}

//Set-up a function which is going to identify a card which has been clicked
function respondToTheClick(evt) {
  //get card position
  var cardPosition = getCardPosition (evt);

  //TODO:switch based on matched, turned, not turned
  switch (turnCard(cardPosition)) {
    case "matched" :
      break;
    case "front" :
      break;
    case "back" :
      break;
  }
}

//Function returns the ID of li card tag
function getCardId (evt) {
  if (evt.target.tagName === 'LI') {
    return evt.target.id;
  } else if (evt.target.tagName === 'I') {
    let i = 0;
    while ( !(PAIRS[i][1] === evt.target.id)){
      i++;
    }
    return PAIRS[i][0];
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
    console.log('contains');
    return "matched";
  } else if (listOfCards[position].classList.contains('open')){
    return "front";
  } else {
    listOfCards[position].classList.toggle('open');
    listOfCards[position].classList.toggle('show');
    return "back";
  }
}

//Function closes both cards
function closeCard(pos1, pos2) {
  listOfCards[pos1].classList.remove('open');
  listOfCards[pos1].classList.remove('show');
  listOfCards[pos2].classList.remove('open');
  listOfCards[pos2].classList.remove('show');
}


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
