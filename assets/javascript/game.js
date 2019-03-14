
window.onload = function () {
  window.addEventListener("keydown", doguess);

  const validLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

  // declaring variables for the project
  var wins = document.getElementById("number-wins");
  var currentword = document.getElementById("word");
  var livesDisplay = document.getElementById("number-guesses");
  var letteralreadyexists = document.getElementById("guessed-letters");

  var guesses;
  // must contain only lower case letters
  var guessedword = ["lexus", "toyota", "honda", "mercedes"];
  var current = 0;
  var correctGuesses;
  var numberofwins = 0;
  var numberofguesses;

  // creating a function to show results
  showResult = function () {
    var results = "";
    var secretWord = guessedword[current];
    for (var i = 0; i < secretWord.length; i++) {
  
      if (correctGuesses.has(secretWord[i])) {
        results += secretWord[i] + " ";
      }
      else {
        results += "_ ";
      }

    }
    currentword.innerHTML = results;
  }

  // the main loop, when you press the button the calculation happens
  function doguess(e) {
    var secretWord = guessedword[current];
    if (validLetters.indexOf(e.key) === -1) {
      return;
    }
    if (!guesses.has(e.key) && secretWord.indexOf(e.key) === -1) {
      numberofguesses--;
    }
    guesses.add(e.key);

    if (secretWord.indexOf(e.key) !== -1) {
      correctGuesses.add(e.key);
    }
    winorlose();
    showGuesses();
    showResult();
    showWins();
    showLives();
  }
  // for rendering which letters are already been guessed
  function showGuesses() {
    var guessesArray = Array.from(guesses.values());
    letteralreadyexists.innerHTML = guessesArray.join(", ");
  }
  // creating a function to show lives
  function showLives() {
    livesDisplay.innerHTML = numberofguesses;

  }
  // creating a function win or lose
  function winorlose() {
    var iswin = true;
    var secretWord = guessedword[current];
    if (numberofguesses === 0) {
      reset();
      //setting modulo to handle the last word
      current = (current + 1) % guessedword.length;
      console.log(current);
    }
    for (var i = 0; i < secretWord.length; i++) {
      if (!correctGuesses.has(secretWord[i])) {
        iswin = false;
      }

    }
    if (iswin) {
      numberofwins++;
      //setting modulo to handle the last word
      current = (current + 1) % guessedword.length;
      console.log(current);
      reset();
    }
  }
  // creating a function to show wins
  function showWins() {
    wins.innerHTML = numberofwins;
  }
  // creating a reset function, so the game can keep going
  function reset() {
    correctGuesses = new Set();
    guesses = new Set();
    showGuesses();
    numberofguesses = 15;
    showResult();
    showLives();
    showWins();
  }

  reset();
}
