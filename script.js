const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let currentTurnCharacter = "X";
const gameState = [];
const winIsPresentInGame = (gameState, playerCell) => {
  const playerPositions = getPlayerPositions(gameState, playerCell);
  const playerHasWon = winningConditions.some((winningCells) =>
    playerPositionContainsWin(playerPositions, winningCells)
  );
  return playerHasWon;
};

const getPlayerPositions = (gameState, playerCell) => {
  const playerPositions = [];
  for (let i = 0; i < gameState.length; i++) {
    if (gameState[i] == playerCell) {
      playerPositions.push(i);
    }
  }
  return playerPositions;
};

const playerPositionContainsWin = (playerPositions, winningPositions) => {
  return winningPositions.every((position) =>
    playerPositions.includes(position)
  );
};

const cells = document.querySelectorAll(".tic-tac-toe__cell");
cells.forEach((cell) =>
  cell.addEventListener("click", function (clickedCell) {
    if (cell.dataset.clicked !== "true") {
      const indexOfCellClicked = parseInt(cell.id) - 1;
      cell.innerText = currentTurnCharacter;
      cell.style.cursor = "not-allowed";
      cell.dataset.clicked = "true";
      gameState[indexOfCellClicked] = currentTurnCharacter;
      const backgroundColorToAdd =
        currentTurnCharacter == "X"
          ? "tic-tac-toe__cell--red"
          : "tic-tac-toe__cell--blue";
      cell.classList.add(backgroundColorToAdd);
      const playerHasWonGame = winIsPresentInGame(
        gameState,
        currentTurnCharacter
      );
      if (playerHasWonGame) {
        makeAllCellsUnclickable();
        deliverPlayerHasWonMessage();
      }
      toggleTurn();
    }
  })
);

const toggleTurn = () => {
  currentTurnCharacter = currentTurnCharacter === "X" ? "O" : "X";
};
const makeAllCellsUnclickable = () => {
  cells.forEach((cell) => {
    cell.style.cursor = "not-allowed";
    cell.dataset.clicked = "true";
  });
};
const deliverPlayerHasWonMessage = () => {
  document.querySelector(
    ".victory-message"
  ).innerText = `${currentTurnCharacter} has won the game!`;
};
const reset = () => {
  document.querySelector(".victory-message").innerText = "";
  gameState.length = 0;
  cells.forEach((cell) => {
    cell.innerText = "";
    cell.dataset.clicked = false;
    cell.style.cursor = "pointer";
    const classList = cell.classList;
    classList.remove("tic-tac-toe__cell--red");
    classList.remove("tic-tac-toe__cell--blue");
    console.log({ classList });
  });
};

document.querySelector(".reset-button").addEventListener("click", reset);

class TicTacToe {
  constructor() {
    this.game = [];
    this.cells = document.querySelectorAll(".tic-tac-toe__cell");
    this.currentTurnCharacter = "X";
  }
}
