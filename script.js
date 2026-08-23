"use strict";

const EMPTY_FIELD = "";

const gameboard = (() => {
    const ROWS = 3;
    const COLUMNS = 3;
    const gameboard = [];

    const resetBoard = () => {
        for (let i = 0; i < ROWS; i++) {
            gameboard[i] = [];
            for (let j = 0; j < COLUMNS; j++) {
                gameboard[i].push(EMPTY_FIELD);
            }
        }
    };

    resetBoard();

    const getGameboard = () => gameboard;

    const addMarker = (row, column, marker) => {
        gameboard[row][column] = marker;
    };

    return {
        getGameboard,
        addMarker,
        resetBoard,
    }
})();

function Player(name, marker) {
    const playerName = name;
    const playerMarker = marker;
    // Potential enhancement: Store an ongoing score per player

    const getName = () => playerName;

    const getMarker = () => playerMarker;

    return {
        getName,
        getMarker,
    }
};

const game = (() => {
    const players = [Player("player1", "x"), Player("player2", "o")];
    let activePlayer = players[0];
    // Stores the winning player or "tie" for ties
    // Null means the game is not over yet
    let gameResult = null;

    const getActivePlayer = () => activePlayer;

    const getGameResult = () => gameResult;

    const toggleActivePlayer = () => {
        if (activePlayer === players[0]) {
            activePlayer = players[1];
        } else if (activePlayer === players[1]) {
            activePlayer = players[0];
        } else {
            throw new Error(`Unexpected active player: ${activePlayer}`);
        }
    };

    const makeMove = (row, column) => {
        const board = gameboard.getGameboard();

        // Potential enhancements:
        // game.makeMove(1.5, 0);
        // game.makeMove("foo", 0);
        // game.makeMove(undefined, 0);

        if (gameResult !== null) {
            throw new Error("The game is over. Use game.restartGame() to start a new one.");
        }
        if (row < 0) {
            throw new Error(`Row value '${row}' is not allowed.`);
        }
        if (column < 0) {
            throw new Error(`Column value '${column}' is not allowed.`);
        }
        if (board.length <= row) {
            throw new Error(`Row ${row} is out of range.`);
        }
        if (board[row].length <= column) {
            throw new Error(`Column ${column} is out of range.`);
        }
        if (board[row][column] !== EMPTY_FIELD) {
            throw new Error(`Field ${row},${column} is already occupied.`);
        }

        gameboard.addMarker(row, column, activePlayer.getMarker());
        toggleActivePlayer();
        // The loser will begin the next game
        // If the last game was a tie the player who had less moves will begin

        gameResult = checkGameResult();
    };

    const restartGame = () => {
        gameboard.resetBoard();
        gameResult = null;
    };

    const checkGameResult = () => {
        const board = gameboard.getGameboard();

        // TODO (later): Probably can be done more elegantly
        if (board[0][0] != EMPTY_FIELD && board[0][0] === board[0][1] && board[0][1] === board[0][2]) {
            return identifyWinner(board[0][0]);
        } else if (board[1][0] != EMPTY_FIELD && board[1][0] === board[1][1] && board[1][1] === board[1][2]) {
            return identifyWinner(board[1][0]);
        } else if (board[2][0] != EMPTY_FIELD && board[2][0] === board[2][1] && board[2][1] === board[2][2]) {
            return identifyWinner(board[2][0]);
        } else if (board[1][0] != EMPTY_FIELD && board[0][0] === board[1][0] && board[1][0] === board[2][0]) {
            return identifyWinner(board[0][0]);
        } else if (board[0][1] != EMPTY_FIELD && board[0][1] === board[1][1] && board[1][1] === board[2][1]) {
            return identifyWinner(board[0][1]);
        } else if (board[0][2] != EMPTY_FIELD && board[0][2] === board[1][2] && board[1][2] === board[2][2]) {
            return identifyWinner(board[0][2]);
        } else if (board[0][0] != EMPTY_FIELD && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return identifyWinner(board[0][0]);
        } else if (board[0][2] != EMPTY_FIELD && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            return identifyWinner(board[0][2]);
        } else if (!board[0].includes(EMPTY_FIELD) && !board[1].includes(EMPTY_FIELD) && !board[2].includes(EMPTY_FIELD)) {
            return "tie";
        } else {
            return null;
        }
    };

    const identifyWinner = (marker) => {
        let result;

        players.forEach(player => {
            if (player.getMarker() === marker) {
                result = player;
            }
        });

        if (result) {
            return result;
        } else {
            throw new Error(`No player with marker '${marker}'`);
        }
    };

    return {
        getActivePlayer,
        makeMove,
        restartGame,
        getGameResult,
    }
})();

// Testing - TODO (later): Remove
// console.log("game.getActivePlayer().getName():", game.getActivePlayer().getName());
// X win?!
// game.makeMove(0, 0); // x
// game.makeMove(1, 0); // o
// game.makeMove(0, 2); // x
// game.makeMove(1, 1); // o
// game.makeMove(0, 1); // x
// game.makeMove(2, 0); // o
// game.makeMove(2, 1); // x
// game.makeMove(1, 2); // o
// game.makeMove(2, 2); // x
// Tie
// game.makeMove(0, 0); // x
// game.makeMove(0, 1); // o
// game.makeMove(0, 2); // x
// game.makeMove(1, 2); // o
// game.makeMove(1, 0); // x
// game.makeMove(2, 0); // o
// game.makeMove(1, 1); // x
// game.makeMove(2, 2); // o
// game.makeMove(2, 1); // x
// console.log("game.getActivePlayer().getName():", game.getActivePlayer().getName());

const displayController = (() => {
    const boardContainer = document.querySelector(".board-container");
    const resultDisplay = document.querySelector(".game-result");
    const resetButton = document.querySelector(".reset-game");

    const renderBoard = () => {
        const board = gameboard.getGameboard();
        boardContainer.innerHTML = "";

        for (let i = 0; i < board.length; i++) {
            const row = board[i];
            for (let j = 0; j < row.length; j++) {
                const fieldButton = document.createElement("button");
                fieldButton.textContent = row[j];
                fieldButton.dataset.row = i;
                fieldButton.dataset.column = j;
                fieldButton.classList.add("board__field")
                fieldButton.addEventListener("click", handleFieldClick)
                boardContainer.appendChild(fieldButton);
            }
        }
    };

    const handleFieldClick = event => {
        const target = event.target;
        const row = target.dataset.row;
        const column = target.dataset.column;
        try {
            game.makeMove(row, column);
        } catch (error) {
            boardContainer.classList.add("error");
            setTimeout(() => {
                boardContainer.classList.remove("error");
            }, 1000);
        }
        renderBoard();
        if (game.getGameResult() !== null) {
            resetButton.disabled = false;
            if (game.getGameResult() === "tie") {
                resultDisplay.textContent = "Game over. It's a tie!"
            } else {
                resultDisplay.textContent = `Game over. ${game.getGameResult().getName()} won!`;
            }
        }
    };

    const handleResetButtonClick = () => {
        game.restartGame();
        renderBoard();
        resultDisplay.textContent = "";
        resetButton.disabled = true;
    };

    resetButton.addEventListener("click", handleResetButtonClick);

    return {
        renderBoard,
    }
})();

displayController.renderBoard();