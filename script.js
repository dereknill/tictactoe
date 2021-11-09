const gameBoardDiv = document.querySelector("#game-board");
const menuContentDiv = document.querySelector("#menu-content");
const gameContentDiv = document.querySelector("#game-content");

var resizeGameboard = () => {
  var width = gameBoardDiv.offsetWidth;
  width = width + "px";
  gameBoardDiv.style.height = width;
};

window.addEventListener("resize", resizeGameboard);

// GameBoard module function
var gameBoard = (() => {
  // Get reference to all of the tiles on game board
  var tileNodeList = document.querySelectorAll(".tile");

  // Get array from the nodeList of tiles
  var tileArray = Array.from(tileNodeList);

  var resizeAllTileFonts = () => {
    tileArray.forEach(
      (tile) => (tile.style.fontSize = gameBoardDiv.offsetWidth / 3.2 + "px")
    );
  };

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
    resizeAllTileFonts,
    resetBoard,
  };
})();

window.addEventListener("resize", gameBoard.resizeAllTileFonts);
gameBoard.setTile(0, "O");
gameBoard.setTile(1, "X");

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
    resizeGameboard();
    gameBoard.resetBoard();
    gameBoard.resizeAllTileFonts();
  };

  return {
    clickHandler,
    startGameButtonHandler,
    backButtonHandler,
    resetButtonHandler,
  };
})();
