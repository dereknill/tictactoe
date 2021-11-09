const gameBoardDiv = document.querySelector("#game-board");
const menuContentDiv = document.querySelector("#menu-content");
const gameContentDiv = document.querySelector("#game-content");

// GameBoard module function
var gameBoard = (() => {
  // Get reference to all of the tiles on game board
  var tileNodeList = document.querySelectorAll(".tile");

  // Get array from the nodeList of tiles
  var tileArray = Array.from(tileNodeList);

  var resetBoard = () => {
    tileArray.forEach((tile) => (tile.innerHTML = ""));
  };

  var setTile = (tileIndex, playerSymbol) => {
    tileArray[tileIndex].innerHTML = playerSymbol;
    if (playerSymbol === "X") {
      tileArray[tileIndex].style.color = "red";
    } else if (playerSymbol === "O") {
      tileArray[tileIndex].style.color = "green";
    }
  };
  return {
    setTile,
    resetBoard,
  };
})();

// Game module function
var game = (() => {
  gameBoard.resetBoard();

  var clickHandler = (index) => {
    console.log("Clicked by " + index);
  };

  var startGameButtonHandler = () => {
    startGame();
  };

  var backButtonHandler = () => {
    gameContentDiv.style.display = "none";
    menuContentDiv.style.display = "flex";
  };

  var resetButtonHandler = () => {
    startGame();
  };
  var startGame = () => {
    menuContentDiv.style.display = "none";
    gameContentDiv.style.display = "flex";
    gameBoard.resetBoard();
    gameBoard.setTile(0, "O");
    gameBoard.setTile(1, "X");
  };

  return {
    clickHandler,
    startGameButtonHandler,
    backButtonHandler,
    resetButtonHandler,
  };
})();
