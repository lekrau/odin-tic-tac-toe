"use strict";

const EMPTY_FIELD = "";

const gameboard = (() => {
    const rows = 3;
    const columns = 3;
    const gameboard = [];

    for (let i = 0; i < rows; i++) {
        gameboard[i] = [];
        for (let j = 0; j < columns; j++) {
            gameboard[i].push(EMPTY_FIELD);
        }
    }

    const getGameboard = () => gameboard;

    const addMarker = (row, column, marker) => {
        gameboard[row][column] = marker;
    };

    return {
        getGameboard,
        addMarker,
    }
})();

function Player(name, marker) {
    const playerName = name;
    const playerMarker = marker;

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

    const getActivePlayer = () => activePlayer;

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
        // TODO
        // Later: Check if move is invalid (field is already occupied or out of range) -> error
        gameboard.addMarker(row, column, activePlayer.getMarker());
        toggleActivePlayer();
        gameOver();

        // For testing - TODO: Remove later
        console.log(gameboard.getGameboard()[0]);
        console.log(gameboard.getGameboard()[1]);
        console.log(gameboard.getGameboard()[2]);
    };

    const gameOver = () => {
        const board = gameboard.getGameboard();

        // TODO (later): Probably can be done more elegant
        if (board[0][0] != EMPTY_FIELD && board[0][0] === board[0][1] && board[0][1] === board[0][2]) {
            console.log(board[0][0] + " won");
            return true;
        } else if (board[1][0] != EMPTY_FIELD && board[1][0] === board[1][1] && board[1][1] === board[1][2]) {
            console.log(board[1][0] + " won");
            return true;
        } else if (board[2][0] != EMPTY_FIELD && board[2][0] === board[2][1] && board[2][1] === board[2][2]) {
            console.log(board[2][0] + " won");
            return true;
        } else if (board[1][0] != EMPTY_FIELD && board[0][0] === board[1][0] && board[1][0] === board[2][0]) {
            console.log(board[0][0] + " won");
            return true;
        } else if (board[0][1] != EMPTY_FIELD && board[0][1] === board[1][1] && board[1][1] === board[2][1]) {
            console.log(board[0][1] + " won");
            return true;
        } else if (board[0][2] != EMPTY_FIELD && board[0][2] === board[1][2] && board[1][2] === board[2][2]) {
            console.log(board[0][2] + " won");
            return true;
        } else if (board[0][0] != EMPTY_FIELD && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            console.log(board[0][0] + " won");
            return true;
        } else if (board[0][2] != EMPTY_FIELD && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            console.log(board[0][2] + " won");
            return true;
        } else if (!board[0].includes("") && !board[1].includes("") && !board[2].includes("")) {
            console.log("tie");
            return true;
        } else {
            return false;
        }
    };

    const identifyWinner = (marker) => {
        // TODO
        // Return winner based on marker, as passed by gameOver()
        // WEITER!!!
    };

    // TODO: Reset game?


    return {
        getActivePlayer,
        toggleActivePlayer,
        makeMove,
    }
})();

// Testing - TODO (later): Remove
console.log("game.getActivePlayer().getName():", game.getActivePlayer().getName());
game.makeMove(0, 0); // x
game.makeMove(0, 1); // o
game.makeMove(0, 2); // x
game.makeMove(1, 1); // o
game.makeMove(1, 0); // x
game.makeMove(2, 0); // o
game.makeMove(2, 1); // x
game.makeMove(1, 2); // o
game.makeMove(2, 2); // x
console.log("game.getActivePlayer().getName():", game.getActivePlayer().getName());

const displayController = (() => {

})();