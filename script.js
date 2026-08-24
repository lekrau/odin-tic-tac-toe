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
    let playerName = name;
    const playerMarker = marker;

    const getName = () => playerName;

    const setName = newName => {
        playerName = newName;
    };

    const getMarker = () => playerMarker;

    return {
        getName,
        setName,
        getMarker,
    }
};

const game = (() => {
    const players = [Player("Player1", "x"), Player("Player2", "o")];
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

    const setPlayerName = (playerIndex, newName) => {
        players[playerIndex].setName(newName);
    };

    return {
        getActivePlayer,
        makeMove,
        restartGame,
        getGameResult,
        setPlayerName,
    }
})();

const displayController = (() => {
    const boardContainer = document.querySelector(".game-board");
    const resultDisplay = document.querySelector(".game-result");
    const startGameButton = document.querySelector(".start-game");
    const resetBoardButton = document.querySelector(".reset-board");
    const player1Div = document.querySelector(".player1");
    const player2Div = document.querySelector(".player2");
    const player1NameInput = player1Div.querySelector("#player1__name");
    const player2NameInput = player2Div.querySelector("#player2__name");

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
            resetBoardButton.disabled = false;
            if (game.getGameResult() === "tie") {
                resultDisplay.textContent = "Game over. It's a tie!"
            } else {
                resultDisplay.textContent = `Game over. ${game.getGameResult().getName()} won!`;
            }
        }
    };

    const handleStartGameButtonClick = event => {
        event.preventDefault();
        const player1Name = player1NameInput.value;
        const player2Name = player2NameInput.value;

        if (player1Name !== "") {
            game.setPlayerName(0, player1Name);
        }
        if (player2Name !== "") {
            game.setPlayerName(1, player2Name);
        }

        renderBoard();
        startGameButton.classList.add("invisible");
        player1Div.classList.add("invisible");
        player2Div.classList.add("invisible");
        resetBoardButton.classList.remove("invisible");
    };

    const handleResetBoardButtonClick = () => {
        game.restartGame();
        renderBoard();
        resultDisplay.textContent = "";
        resetBoardButton.disabled = true;
    };

    startGameButton.addEventListener("click", handleStartGameButtonClick);
    resetBoardButton.addEventListener("click", handleResetBoardButtonClick);
})();
