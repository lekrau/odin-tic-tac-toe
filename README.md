# Odin Tic Tac Toe

## Project

Built as part of The Odin Project's JavaScript course:
[Project: Tic Tac Toe](https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe).

A simple Tic Tac Toe game with custom player names, an interactive board, visual feedback for invalid moves, win and tie detection, and game restart functionality.

## Preview

[Live preview](https://lekrau.github.io/odin-tic-tac-toe/)

## What I practiced

* Separating responsibilities between game logic and DOM rendering
* Using factory functions, IIFEs, and closures
* Encapsulating and managing application state
* Validating function arguments with readable guard conditions
* Throwing, catching, and handling errors
* Creating basic CSS animations with keyframes

## Scope and limitations

Styling was intentionally kept minimal, as the project's focus was JavaScript functionality and object organization.

There is no persistent storage between page reloads, as this was not in scope of the assignment.

## Potential enhancements

* Store an ongoing score for each player
* Enhance validation for `makeMove()`, e.g. for decimal values, non-numbers, or special values such as undefined
* Refactor `checkGameResult()`, which is currently implemented in a rather brute-force way

These enhancements were intentionally deprioritized because continuing with TOP currently offers greater learning value.