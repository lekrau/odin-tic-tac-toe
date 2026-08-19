"use strict";

const gameboard = (() => {
    const rows = 3;
    const columns = 3;
    const gameboard = [];

    for (let i = 0; i < rows; i++) {
        gameboard[i] = [];
        for (let j = 0; j < columns; j++) {
            gameboard[i].push("");
        }
    }

    const getGameboard = () => gameboard;

    return {
        getGameboard,
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
        // Later: Check if move is valid
    }

    return {
        getActivePlayer,
        toggleActivePlayer,
        makeMove,
    }
})();

const displayController = (() => {

})();