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
     "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9",
     "T": "10", "J": "jack", "Q": "queen", "K": "king", "A": "ace" 
  };
  var suitNames = {
     "H": "hearts", "C": "clubs", "S": "spades", "D": "diamonds"
  };
  return "img/" + rankNames[rank] + "_of_" + suitNames[suit] + ".png";
}


//
// The Deck Object manages a deck of cards.
//
function Deck() {
  this.initializeDeck = function() {
    // Fill the deck with a sorted list of cards.
    this.cards = new Array();
    for (var suit in suits) {
      for (var rank in ranks) {
        this.cards.push(ranks[rank] + suits[suit]);
      }
    }
  };

  // Get a random card position from this deck
  this.pickRandomCard = function () {
    return Math.floor(Math.random() * this.cards.length);
  };

  // Function to initialize and sort the deck.
  this.shuffle = function() {
    // Create a new deck, and fill it with random cards from the current deck.
    var deck = new Array();
    while (this.cards.length > 0) {
      // 1. Pick a random card from deck
      // 2. Remove that card from deck
      // 3. Insert that card into the new deck
      var card = this.cards.splice(this.pickRandomCard(), 1)[0];
      deck.push(card);
    }
    this.cards = deck;
  };

  this.drawOneCard = function() {
    return this.cards.pop();
  };

  // Return the number of cards in the deck.
  this.numberOfCards = function() {
    return this.cards.length;
  }

  this.initializeDeck();
};


var deck = new Deck();
deck.shuffle();
for (var i = 0; i < 10; i++) {
  var myCard = deck.drawOneCard();
  var cardImage = cardToImgName(myCard);
  var elementName = "randomcard" + (i+1);
  document.getElementById(elementName).src = cardImage;
}
print(deck.numberOfCards());
