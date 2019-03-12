
window.onload = function () {
  window.addEventListener("keydown", doguess);


  var wins = document.getElementById("number-wins");
  var currentword = document.getElementById("word");
  var livesDisplay = document.getElementById("number-guesses");
  var letteralreadyexists = document.getElementById("guessed-letters");

  var guess = "";
  var guesses;
  var correct;
  var guessedword = "evgenia";
  var correctGuesses;
  var numberofwins = 0;
  // For each guessed letter:
  //   if letter is in guessedWord
  //     add letter to correctGuesses

  var numberofguesses;
  console.log("message this is running");
  // showResult = function () {
  //   currentword = document.getElementById('word');
  //   correct = document.createElement('ul');

  // for (var i = 0; i < guessedword.length; i++) {
  //   correct.setAttribute('id', 'my-word');
  //   guess = document.createElement('li');
  //   guess.setAttribute('class', 'guess');
  //   guess.innerHTML = "_";
  //   console.log("to see");


  //     currentword.appendChild(correct);
  //     correct.appendChild(guess);
  //   }
  // }

  showResult = function () {
    var results = "";

    for (var i = 0; i < guessedword.length; i++) {
      // For each i:
      //  if guessedword[i] is in correctGuesses
      //    append guessedword[i]
      //  else 
      //    append underscore
      if (correctGuesses.has(guessedword[i])) {
        results += guessedword[i] + " ";
      }
      else {
        results += "_ ";
      }

    }
    currentword.innerHTML = results;
  }

  // the main loop, whenyo upress the button the calculation happens
  function doguess(e) {
    console.log(e.key);
    if (!guesses.has(e.key) && guessedword.indexOf(e.key) === -1) {
      numberofguesses--;
    }
    guesses.add(e.key);

    if (guessedword.indexOf(e.key) !== -1) {
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
    if (numberofguesses === 0) {
      reset();
      console.log("you lose");
    }
    for (var i = 0; i < guessedword.length; i++) {
      if (!correctGuesses.has(guessedword[i])) {
        iswin = false;
      }

    }
    if(iswin){
      numberofwins++; 
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
