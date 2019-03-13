
window.onload = function () {
  window.addEventListener("keydown", doguess);


  var wins = document.getElementById("number-wins");
  var currentword = document.getElementById("word");
  var livesDisplay = document.getElementById("number-guesses");
  var letteralreadyexists = document.getElementById("guessed-letters");

  var guess = "";
  var guesses;
  var correct;
  var guessedword = ["lexus","toyota","honda", "mercedes"];
  var current = 0;
  var correctGuesses;
  var numberofwins = 0;
  // For each guessed letter:
  //   if letter is in guessedWord
  //     add letter to correctGuesses

  var numberofguesses;

  showResult = function () {
    var results = "";
    var secretWord = guessedword[current];
    for (var i = 0; i < secretWord.length; i++) {
      // For each i:
      //  if guessedword[i] is in correctGuesses
      //    append guessedword[i]
      //  else 
      //    append underscore
      if (correctGuesses.has(secretWord[i])) {
        results += secretWord[i] + " ";
      }
      else {
        results += "_ ";
      }

    }
    currentword.innerHTML = results;
  }

  // the main loop, whenyo upress the button the calculation happens
  function doguess(e) {
    var secretWord = guessedword[current];
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

  function showLives() {
    livesDisplay.innerHTML = numberofguesses;

  }

  function winorlose() {
    var iswin = true;
    var secretWord = guessedword[current];
    if (numberofguesses === 0) {
      reset();
      //setting modulo to handle the last word
      current = (current+1) % guessedword.length;
      console.log(current);
    }
    for (var i = 0; i < secretWord.length; i++) {
      if (!correctGuesses.has(secretWord[i])) {
        iswin = false;
      }

    }
    if(iswin){
      numberofwins++; 
      current = (current+1) % guessedword.length;
      console.log(current);
      reset();
    }
  }

  function showWins() {
    wins.innerHTML = numberofwins;
  }

  function reset() {
    correctGuesses =new Set();
    guesses = new Set();
    showGuesses();
    numberofguesses = 15;
    showResult();
    showLives();
    showWins();
  }

  reset();
}
