// Ashley's Card Shuffler

// These are sorted from lowest to highest suit & rank.
var suits = ["C", "D", "H", "S"];
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
  this.initialize = function() {
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

  this.initialize();
};

//
// A Hand Object is a hand of cards
//
function Hand(deck) {
  this.handSize = 5;

  this.deck = deck;
  this.cards = [];

  // Initialize the hand with some cards from a deck
  this.initialize = function () {
    for (var index = 0; index < this.handSize; ++index) {
      this.cards.push(this.deck.drawOneCard());
    }
  };

  // Sort our cards
  this.sort = function () {
    this.cards.sort(function(card1, card2) {
      var rank1 = ranks.findIndex(function(rank) { return rank == card1[0]; });
      var rank2 = ranks.findIndex(function(rank) { return rank == card2[0]; });

      // First, look at the card rank.  'A' is always sorted higher than 'K'.
      if (rank1 != rank2) {
        return rank2 - rank1;
      }

      // It was the same rank.  Instead compare by suit.
      var suit1 = suits.findIndex(function(suit) { return suit == card1[1]; });
      var suit2 = suits.findIndex(function(suit) { return suit == card2[1]; });
      return suit2 - suit1;
    });
  };

  // Draw a new card for the card at position |index| in our hand.
  this.draw = function(index) {
    this.cards[index] = this.deck.drawOneCard();
    return this.cards[index];
  };

  this.initialize();
  this.sort();
};


var deck;
var hand;

function shuffleDeck() {
  deck = new Deck();
  deck.shuffle();
}

// On startup, hide the action button.
$("#actionbutton").hide();

$(document).ready(function() {
  $("#actionbutton").click(function() {
    var selectedCards = $(".selectedcard");
    for (var index = 0; index < selectedCards.length; ++index) {
      console.log(selectedCards[index].id);
      var newCard = hand.draw(index);
      var cardImage = cardToImgName(newCard);
      selectedCards[index].src = cardImage;
    }
  });

  $("#dealbutton").click(function() {

    // Clear the current hand
    $("#playerHand").html("");
    shuffleDeck();

    // Display the action button
    $("#actionbutton").show();

    hand = new Hand(deck);

    hand.cards.forEach(function(card, index) {
      var cardImage = cardToImgName(card);
      var newImg = document.createElement("img");
      newImg.src = cardImage;
      newImg.id = index;
      newImg.className = "smallcard";
      $("#playerHand").append(newImg);

      $(newImg).click(function() {
        if ($(this).hasClass("selectedcard")) {
          $(this).removeClass("selectedcard");
        } else {
          $(this).addClass("selectedcard");
        }
      });
    });
  });

});
