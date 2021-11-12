const gameBoardDiv = document.querySelector("#game-board");
const menuContentDiv = document.querySelector("#menu-content");
const gameContentDiv = document.querySelector("#game-content");
const resultMessageDiv = document.querySelector("#result-message");
const playerNameDiv = document.querySelector("#name-screen");

const playerFactory = (playerName, playerSymbol) => {
  let isMyTurn = false;
  let setTurn = (isTurn) => {
    isMyTurn = isTurn;
  };

  let getPlayerSymbol = () => playerSymbol;
  let getTurn = () => isMyTurn;
  let getPlayerName = () => playerName;

  return {
    setTurn,
    getTurn,
    getPlayerSymbol,
    getPlayerName,
  };
};

// GameBoard module function
var gameBoard = (() => {
  let TileFactory = (tileDivRef) => {
    let isOpen = true;
    let value = null;
    let playerOwnerName;
    let getPlayerOwnerName = () => playerOwnerName;
    let setValue = (newValue, newOwnerName) => {
      if (!isOpen) {
        return false;
      }
      if (newValue === "X") {
        tileDivRef.style.color = "red";
      } else if (newValue === "O") {
        tileDivRef.style.color = "green";
      } else {
        return false;
      }
      playerOwnerName = newOwnerName;
      tileDivRef.innerHTML = newValue;
      value = newValue;
      isOpen = false;
      return true;
    };

    let getValue = () => value;

    let reset = () => {
      value = null;
      tileDivRef.innerHTML = value;
      isOpen = true;
      tileDivRef.style.backgroundColor = "#c5c6c7";
    };

    let winBackground = () => {
      tileDivRef.style.backgroundColor = "white";
    };
    return {
      setValue,
      getValue,
      reset,
      getPlayerOwnerName,
      winBackground,
    };
  };

  // Get reference to all of the tiles on game board
  var tileNodeList = document.querySelectorAll(".tile");

  var tileArray = [];
  // Populate the tileArray with tile objects using the nodeList of references
  tileNodeList.forEach((divRef) => {
    tileArray.push(TileFactory(divRef));
  });

  var resetBoard = () => {
    tileArray.forEach((tile) => tile.reset());
  };

  var setTile = (tileIndex, playerSymbol, newName) => {
    return tileArray[tileIndex].setValue(playerSymbol, newName);
  };

  // Check to see if a player has won
  let checkForWinner = () => {
    if (
      tileArray[0].getValue() === tileArray[1].getValue() &&
      tileArray[1].getValue() === tileArray[2].getValue() &&
      tileArray[0].getValue() != null
    ) {
      tileArray[0].winBackground();
      tileArray[1].winBackground();
      tileArray[2].winBackground();
      return tileArray[0].getPlayerOwnerName();
    }

    if (
      tileArray[3].getValue() === tileArray[4].getValue() &&
      tileArray[4].getValue() === tileArray[5].getValue() &&
      tileArray[3].getValue() != null
    ) {
      tileArray[3].winBackground();
      tileArray[4].winBackground();
      tileArray[5].winBackground();
      return tileArray[3].getPlayerOwnerName();
    }

    if (
      tileArray[6].getValue() === tileArray[7].getValue() &&
      tileArray[7].getValue() === tileArray[8].getValue() &&
      tileArray[6].getValue() != null
    ) {
      tileArray[6].winBackground();
      tileArray[7].winBackground();
      tileArray[8].winBackground();
      return tileArray[6].getPlayerOwnerName();
    }

    if (
      tileArray[0].getValue() === tileArray[3].getValue() &&
      tileArray[3].getValue() === tileArray[6].getValue() &&
      tileArray[0].getValue() != null
    ) {
      tileArray[0].winBackground();
      tileArray[3].winBackground();
      tileArray[6].winBackground();
      return tileArray[0].getPlayerOwnerName();
    }

    if (
      tileArray[1].getValue() === tileArray[4].getValue() &&
      tileArray[4].getValue() === tileArray[7].getValue() &&
      tileArray[1].getValue() != null
    ) {
      tileArray[1].winBackground();
      tileArray[4].winBackground();
      tileArray[7].winBackground();
      return tileArray[1].getPlayerOwnerName();
    }

    if (
      tileArray[2].getValue() === tileArray[5].getValue() &&
      tileArray[5].getValue() === tileArray[8].getValue() &&
      tileArray[2].getValue() != null
    ) {
      tileArray[2].winBackground();
      tileArray[5].winBackground();
      tileArray[8].winBackground();
      return tileArray[2].getPlayerOwnerName();
    }

    if (
      tileArray[0].getValue() === tileArray[4].getValue() &&
      tileArray[4].getValue() === tileArray[8].getValue() &&
      tileArray[0].getValue() != null
    ) {
      tileArray[0].winBackground();
      tileArray[4].winBackground();
      tileArray[8].winBackground();
      return tileArray[0].getPlayerOwnerName();
    }

    if (
      tileArray[2].getValue() === tileArray[4].getValue() &&
      tileArray[4].getValue() === tileArray[6].getValue() &&
      tileArray[2].getValue() != null
    ) {
      tileArray[2].winBackground();
      tileArray[4].winBackground();
      tileArray[6].winBackground();
      return tileArray[2].getPlayerOwnerName();
    }

    // Return null if there is no winner;
    return null;
  };
  return {
    setTile,
    resetBoard,
    checkForWinner,
  };
})();

// Game module function
var game = (() => {
  gameBoard.resetBoard();

  let setResultMessageVisibility = (visible) => {
    if (visible) {
      resultMessageDiv.style.display = "block";
    } else {
      resultMessageDiv.style.display = "none";
    }
  };
  // State
  let numTurns = 0;
  let gameInSession = false;

  // Create Player variables
  let player1;
  let player2;

  var startGame = () => {
    menuContentDiv.style.display = "none";
    gameContentDiv.style.display = "flex";
    setResultMessageVisibility(false);
    gameBoard.resetBoard();
    player1.setTurn(true);
    player2.setTurn(false);
    gameInSession = true;
    numTurns = 0;
  };

  // Click Handlers for Buttons
  var tileClickHandler = (index) => {
    if (!gameInSession) {
      return;
    }
    var playerSymbol;
    var playerName;
    if (player1.getTurn()) {
      playerSymbol = player1.getPlayerSymbol();
      playerName = player1.getPlayerName();
    } else if (player2.getTurn()) {
      playerSymbol = player2.getPlayerSymbol();
      playerName = player2.getPlayerName();
    }

    if (gameBoard.setTile(index, playerSymbol, playerName)) {
      player1.setTurn(!player1.getTurn());
      player2.setTurn(!player2.getTurn());
      numTurns++;
      let winner = gameBoard.checkForWinner();
      if (winner != null) {
        playerWon(winner);
        gameInSession = false;
      } else if (numTurns >= 9) {
        playerDraw();
        console.log("Draw!");
        gameInSession = false;
      }
    }
  };

  // Function to be called when a player has won
  let playerWon = (winner) => {
    setResultMessageVisibility(true);
    resultMessageDiv.innerHTML = `${winner} Won!`;
  };

  // Function to be called when the game is a draw

  let playerDraw = () => {
    setResultMessageVisibility(true);
    resultMessageDiv.innerHTML = "Draw";
  };

  function startGameButtonHandler() {
    playerNameDiv.style.display = "flex";
  }

  var backButtonHandler = () => {
    gameContentDiv.style.display = "none";
    menuContentDiv.style.display = "flex";
    setResultMessageVisibility(false);
  };

  var resetButtonHandler = () => {
    startGame();
  };

  var playerNameButtonHandler = () => {
    // Create players
    player1Name = document.getElementById("player1name").value;
    player2Name = document.getElementById("player2name").value;
    player1 = playerFactory(player1Name, "X");
    player2 = playerFactory(player2Name, "O");

    // Set div visibility
    menuContentDiv.style.display = "none";
    gameContentDiv.style.display = "flex";
    playerNameDiv.style.display = "none";

    startGame();
  };

  return {
    tileClickHandler,
    startGameButtonHandler,
    backButtonHandler,
    resetButtonHandler,
    playerNameButtonHandler,
  };
})();
