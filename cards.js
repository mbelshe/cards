// Ashley's Card Shuffler

var suits = ["H", "S", "D", "C"];
var ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];

function print(str) {
  document.getElementById("outputdiv").innerHTML += str + "<br>";
}

// Take something like "2H" and convert to "two_of_hearts.png"
function cardToImgName(card) {
  var rank = card[0];
  var suit = card[1];
  var rankNames = {
     "2": "2",
     "3": "3",
     "4": "4",
     "5": "5",
     "6": "6",
     "7": "7",
     "8": "8",
     "9": "9",
     "T": "10",
     "J": "jack",
     "Q": "queen",
     "K": "king",
     "A": "ace" 
  };
  var suitNames = {
     "H": "hearts",
     "C": "clubs",
     "S": "spades",
     "D": "diamonds"
  };

  return "img/" + rankNames[rank] + "_of_" + suitNames[suit] + ".png";
}

function newDeck() {
  var deck = new Array();
  for (var suit in suits) {
    for (var rank in ranks) {
      //
      // ranks[rank] == "2"
      // suits[suit] == "H"
      // ranks[rank] + suits[suit] == "2H"
      //
      // deck.push()  <----- this will add an item into the array "deck"
      // 
      deck.push(ranks[rank] + suits[suit]);
      
    }
  }
  return deck;
}

function pickRandomCard(deck) {
  return Math.floor(Math.random() * deck.length);
}

// Ashley --- your job is to randomly sort the deck!
//    argument "deck" is a deck of cards.
//    return the deck in some randomized order
//    each time you call this function, it should change
//    the order of the cards in the deck.
function shuffleDeck(deckToSort) {

  // HINTS:
  //    There is a function called "Math.random()" -- returns a FLOAT
  //        FLOAT means something like "3.14151692"
  //    There is another function called "Math.floor()" -- return an INT
  //        INT means something like 1, 1000, 301239, etc
  //    You can pick a random card with 
  //          pickRandomCard();

  var newDeck = new Array();

  // You should loop through the old deck, called "deck"
  // On each iteration, pick a random card.
  // Insert that random card into the newDeck.
  // To understand arrays better, and what you can do with them - read this:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

  while (deckToSort.length > 0) {
     // 1. Pick a random card from deckToSort
     // 2. Remove that card from deckToSort
     // 3. Insert that card into newDeck
     var card = deckToSort.splice(pickRandomCard(deckToSort), 1)[0];
     newDeck.push(card);
     
       
  }
  //newDeck.push(deckToSort[pickRandomCard()]);
  //newDeck.push("1H");
    //newDeck.push("3H");
  return newDeck;
}

var deck = newDeck();
deck = shuffleDeck(deck);
var myCard = deck[pickRandomCard(deck)];
print(myCard);
var cardImage = cardToImgName(myCard);
print(cardImage);

for (var i = 0; i < 5; i++) {
  var myCard = deck[pickRandomCard(deck)];
  var cardImage = cardToImgName(myCard);
  var elementName = "randomcard" + (i+1);
  document.getElementById(elementName).src = cardImage;
}

