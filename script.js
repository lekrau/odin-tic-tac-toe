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

})();

const displayController = (() => {

})();