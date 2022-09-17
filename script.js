/* Sequence of game
- Welcome to "Beat That!" 
- Kindly enter the number of dices and players you want to proceed with
- What's your name?
- Roll the dices and store the numbers in a currentDice array
- Output the numbers and ask the player what order they want it in 
- Store the combined number in a listOfNumbers array
- Repeat rolling of dice, storing the numbers, outputting the numbers and asking the player what order they way, storing the combined number in the listOfNumber array
- Until all players have given their choices
- Reveal who won + update leaderboard
*/

//Code to make button appear once stage is reached
const submit = document.getElementById("submit-button");
submit.addEventListener("click", () => {
  if (gameStage == "chooseOrder") {
    document.getElementById("auto-button").disabled = false;
  }
  if (gameStage != "chooseOrder") {
    document.getElementById("auto-button").disabled = true;
  }
  if (gameStage != "selectDiceAndPlayers" || gameStage != "getPlayer1Name") {
    document.getElementById("normal-button").disabled = true;
    document.getElementById("knockout-button").disabled = true;
    document.getElementById("highest-button").disabled = true;
    document.getElementById("lowest-button").disabled = true;
    document.getElementById("players-field").disabled = true;
    document.getElementById("floatingInputGrid").disabled = true;
  }
  if (
    gameStage == "getPlayer1Name" ||
    gameStage == "getName" ||
    gameStage == "chooseOrder"
  ) {
    document.getElementById("input-field").disabled = false;
  } else {
    document.getElementById("input-field").disabled = true;
  }
});

// Global Variables
var gameStage = "selectDiceAndPlayers";
var gameMode = "highest"; // or "lowest"
var gameDifficulty = "normal"; //or "knockout"
var numberOfDice = 2;
var numberOfPlayers = 2;
var currentDice = 1;
var currentPlayer = 1;
var listOfPlayerNames = [];
var diceRolls = [];
var chosenNumber = "";
var listOfNumbers = [];
var scoreboard = [];
var scoreboardMessage = "";
var loser = "";
var losingIndex = 0;
var winner = "";

// Messages
var oopsMessage =
  "<b>Oops!</b> I think you forgot something. Kindly input both the number of dice and players!";
var getNameMessage = "";

var changeMode = function (input) {
  gameMode = input;
  if (gameMode == "highest") {
    myOutputValue =
      "You have chosen <b>Highest</b> mode!</br></br>In this mode, the player with the highest number in a round wins!";
  } else if (gameMode == "lowest") {
    myOutputValue =
      "You have chosen <b>Lowest</b> mode!</br></br>In this mode, the player with the lowest number in a round wins!";
  }
  return myOutputValue;
};

var changeDifficulty = function (input) {
  gameDifficulty = input;
  if (gameDifficulty == "normal") {
    myOutputValue =
      "You have chosen <b>Normal</b> difficulty!</br></br>Everybody gets to stay for the next round!";
  } else if (gameDifficulty == "knockout") {
    myOutputValue =
      "You have chosen <b>Knockout</b> difficulty!</br></br>The person with the lowest number in a round gets kicked out!";
  }
  return myOutputValue;
};

// Dice number generator
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var generateAndStoreDiceRoll = function () {
  while (currentDice <= numberOfDice) {
    diceRolls.push(rollDice());
    currentDice++;
  }
};

var resetDiceRoll = function () {
  diceRolls = [];
  currentDice = 1;
};

// Scoreboard functions
var assignZeroToEveryone = function (numberOfPlayers) {
  var counter = 0;
  while (counter < numberOfPlayers) {
    scoreboard[counter] = 0;
    counter++;
  }
}; // run this at the start of each mode change OR each mode-button click

var logScoreboardMax = function () {
  var winningNumber = Math.max(...listOfNumbers);
  var winningIndex = Number(listOfNumbers.indexOf(winningNumber));
  var currentScore = scoreboard[Number(winningIndex)]; // scoreboard is a global variable to keep track of scores across rounds
  currentScore += 1;
  scoreboard[Number(winningIndex)] = currentScore;
};

var logScoreboardMin = function () {
  var winningNumber = Math.min(...listOfNumbers);
  var winningIndex = Number(listOfNumbers.indexOf(winningNumber));
  var currentScore = scoreboard[Number(winningIndex)]; // scoreboard is a global variable to keep track of scores across rounds
  currentScore += 1;
  scoreboard[Number(winningIndex)] = currentScore;
};

var generateScoreboardMessage = function (numberOfPlayers) {
  var counter = 0;
  while (counter < numberOfPlayers) {
    scoreboardMessage +=
      listOfPlayerNames[Number(counter)] +
      ": " +
      scoreboard[Number(counter)] +
      "</br>";
    counter++;
  }
}; // generate scoreboard message at the end of each round

var getScoreboardMessage = function () {
  return scoreboardMessage;
};

var numberDicePlayersMessage = function (numberOfDice, numberOfPlayers) {
  return (
    "You've chosen to play with <b>" +
    numberOfDice +
    "</b> dices and <b>" +
    numberOfPlayers +
    "</b> players. </br></br>Please click 'Submit' to proceed."
  );
};

var askNameMessage = function (counter) {
  return "Welcome Player <b>" + Number(counter) + "</b>, what's your name?";
};

var askRollDiceMessage = function () {
  return (
    "Welcome <b>" +
    listOfPlayerNames[Number(currentPlayer - 1)] +
    "</b>. Please roll your dices!"
  );
};

var youAreNextPlayerToRollMessage = function () {
  return (
    "<b>" +
    listOfPlayerNames[Number(currentPlayer - 1)] +
    "</b> you're next!. Click 'Submit' to roll your dices!"
  );
};

var bestCombinationMessage =
  "Are you sure that's the <b>best</b> combination?</br>Please click 'Submit' to try again.";

var allPlayersRolledMessage =
  "All players have now rolled their dice and chosen their numbers.</br>Click 'Submit' to see the winner!";

var getWinningIndex = function (gameMode) {
  if (gameMode == "highest") {
    var highestNumber = Math.max(...listOfNumbers);
  } else if (gameMode == "lowest") {
    var highestNumber = Math.min(...listOfNumbers);
  }
  return Number(listOfNumbers.indexOf(highestNumber));
};

var revealWinnerMessage = function (listOfNumbers, gameMode) {
  if (gameMode == "highest") {
    var highestNumber = Math.max(...listOfNumbers);
  } else if (gameMode == "lowest") {
    var highestNumber = Math.min(...listOfNumbers);
  }
  var index = listOfNumbers.indexOf(highestNumber);
  winner = listOfPlayerNames[Number(index)];
  myOutputValue =
    "The numbers recorded are: <b>" +
    listOfNumbers +
    "</b>. The winner for this round is <b>" +
    winner +
    "</b>!</br>Click 'Submit' to go another round!";
  return myOutputValue;
};

var revealKnockoutMessage = function (listOfNumbers, gameMode) {
  if (gameMode == "highest") {
    var highestNumber = Math.max(...listOfNumbers);
  } else if (gameMode == "lowest") {
    var highestNumber = Math.min(...listOfNumbers);
  }
  var index = listOfNumbers.indexOf(highestNumber);
  winner = listOfPlayerNames[Number(index)];
  myOutputValue = "The numbers recorded are: <b>" + listOfNumbers + "</b>.";
  return myOutputValue;
};

var sortAscending = function (input) {
  input.sort(function (a, b) {
    return a - b;
  });
};

var sortDescending = function (input) {
  input.sort(function (a, b) {
    return b - a;
  });
};

var generateNumber = function (diceRolls) {
  var chosenNumber = "";
  if (gameMode == "highest") {
    sortDescending(diceRolls);
    counter = 0;
    console.log(
      "diceRolls",
      diceRolls,
      "counter",
      counter,
      "numberOfDice",
      numberOfDice
    );
    while (counter < numberOfDice) {
      chosenNumber = chosenNumber + diceRolls[Number(counter)];
      console.log("chosenNumber:", chosenNumber);
      counter++;
    }
  } else if (gameMode == "lowest") {
    sortAscending(diceRolls);
    counter = 0;
    while (counter < numberOfDice) {
      chosenNumber = chosenNumber + "" + diceRolls[Number(counter)];
      counter++;
    }
  }
  return chosenNumber;
};

var identifyLoser = function () {
  if (gameMode == "highest") {
    var losingNumber = Math.min(...listOfNumbers);
  } else if (gameMode == "lowest") {
    var losingNumber = Math.max(...listOfNumbers);
  }
  {
    losingIndex = Number(listOfNumbers.indexOf(losingNumber));
    loser = listOfPlayerNames[losingIndex];
  }
};

var kickOutLoser = function () {
  listOfPlayerNames.splice(losingIndex, 1);
  scoreboard.splice(losingIndex, 1);
  console.log(
    "losingIndex",
    losingIndex,
    "list of players:",
    listOfPlayerNames,
    "scoreboard",
    scoreboard
  );
};

var main = function (numberOfDiceInput, numberOfPlayersInput, input) {
  var myOutputValue = oopsMessage;
  numberOfDice = numberOfDiceInput;
  numberOfPlayers = numberOfPlayersInput;

  if (numberOfDice == "" || numberOfPlayers == "") {
    return oopsMessage;
  } else if (
    gameStage == "selectDiceAndPlayers" &&
    numberOfDice != "" &&
    numberOfPlayers != ""
  ) {
    assignZeroToEveryone(numberOfPlayers);
    gameStage = "getPlayer1Name";
    return numberDicePlayersMessage(numberOfDice, numberOfPlayers);
  } else if (gameStage == "getPlayer1Name") {
    gameStage = "getName";
    return askNameMessage(currentPlayer);
  } else if (gameStage == "getName") {
    console.log("gameStage:", gameStage, "currentPlayer:", currentPlayer);
    listOfPlayerNames.push(input);
    if (currentPlayer < numberOfPlayers) {
      currentPlayer++;
      return askNameMessage(currentPlayer);
    } else {
      gameStage = "chooseOrder";
      currentPlayer = 1;

      return askRollDiceMessage();
    }
  } else if (gameStage == "newRound") {
    currentPlayer = 1;
    listOfNumbers = [];
    gameStage = "chooseOrder";

    return askRollDiceMessage();
  } else if (gameStage == "chooseOrder") {
    generateAndStoreDiceRoll();
    myOutputValue =
      "<b>" +
      listOfPlayerNames[Number(currentPlayer - 1)] +
      "</b>, you rolled the following numbers: <b>" +
      diceRolls +
      "</b>.</br>" +
      "What combination of numbers do you want us to record?";
    gameStage = "recordOrder";
    chosenNumber = generateNumber(diceRolls);
    return myOutputValue;
  } else if (
    gameStage == "recordOrder" &&
    Number(input) != Number(chosenNumber)
  ) {
    gameStage = "chooseOrder";
    return bestCombinationMessage;
  } else if (
    gameStage == "recordOrder" &&
    Number(input) == Number(chosenNumber)
  ) {
    listOfNumbers.push(Number(input));
    resetDiceRoll();
    currentPlayer++;
    console.log("listOfPlayerNames.length", listOfPlayerNames.length);

    if (currentPlayer - 1 < listOfPlayerNames.length) {
      gameStage = "chooseOrder";
      return (
        "Okay we've recorded <b>" +
        listOfNumbers[Number(currentPlayer - 2)] +
        "</b> as your number.</br></br>" +
        youAreNextPlayerToRollMessage()
      );
    } else {
      gameStage = "revealWinner";
      myOutputValue =
        "Okay we've recorded <b>" +
        listOfNumbers[Number(currentPlayer - 2)] +
        "</b> as your number.</br></br>" +
        allPlayersRolledMessage;
    }
  } else if (gameStage == "revealWinner") {
    if (gameMode == "highest") {
      logScoreboardMax(Number(getWinningIndex(gameMode)));
    } else if (gameMode == "lowest") {
      logScoreboardMin(Number(getWinningIndex(gameMode)));
    }
    scoreboardMessage = "";
    generateScoreboardMessage(numberOfPlayers);
    gameStage = "newRound";
    if (gameDifficulty == "normal") {
      return revealWinnerMessage(listOfNumbers, gameMode);
    } else if (gameDifficulty == "knockout" && listOfPlayerNames.length > 2) {
      identifyLoser();
      myOutputValue =
        revealKnockoutMessage(listOfNumbers, gameMode) +
        "</br></br>Unfortunately, <b>" +
        loser +
        "</b> had the worst number and is knocked out of the game.</br>Click 'Submit' to proceed.";
      kickOutLoser();
      scoreboardMessage = "";
      generateScoreboardMessage(listOfPlayerNames.length);
      return myOutputValue;
    } else if (gameDifficulty == "knockout" && listOfPlayerNames.length <= 2) {
      identifyLoser();
      myOutputValue =
        revealKnockoutMessage(listOfNumbers, gameMode) +
        "</br></br>Unfortunately, <b>" +
        loser +
        "</b> had the worst number and is knocked out of the game - </br><b>" +
        winner +
        "<b> is the last player standing!";
      kickOutLoser();
      scoreboardMessage = "";
      generateScoreboardMessage(listOfPlayerNames.length);
      return myOutputValue;
    }
  }
  return myOutputValue;
};
