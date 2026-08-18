"use strict";

// - Your main goal here is to have as little global code as possible. Try tucking as much as you can inside factories.
//   If you only need a single instance of something (e.g. the gameboard, the displayController etc.)
//   then wrap the factory inside an IIFE (module pattern) so it cannot be reused to create additional instances.
// - In this project, think carefully about where each bit of logic should reside.
//   Each little piece of functionality should be able to fit in the game, player or gameboard objects.
//   Take care to put them in “logical” places. Spending a little time brainstorming here can make your life much easier later!
// - If you’re having trouble, Building a house from the inside out is a great article that lays out a highly applicable example
//   both of how you might approach tackling this project as well as how you might organize and structure your code.

const gameboard = (() => {
    const gameboard = [];
    // TODO: Create array structure

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