import R from "./ramda.js";
/**
 * Puzzle.js is a module to model and play "Puzzle" and related games.
 * https://en.wikipedia.org/wiki/Puzzle
 * @namespace Puzzle
 * @author QY.Alexis Yang
 * @version 2021/22
 */
const Puzzle = Object.create(null);

/**
 * A PlayBoard is an square grid that pieces can be placed into different positions.
 * pieces fill up empty positions and can be swaped between each other.
 * It is implemented as an array of columns (rather than rows) of piecess
 * (or empty positions)
 * @memberof Puzzle
 * @typedef {Puzzle.Piece-or-Empty[][]} PlayBoard
 */

/**
 * A piece is a coloured section of a picture that players place in the grid.
 * @memberof Puzzle
 * @typedef {(1 | 2)} Token/
 */


