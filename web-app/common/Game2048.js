import R from "./ramda.js";
/**
 * 2048.js is a module to model and play "2048".
 * https://en.wikipedia.org/wiki/2048_(video_game)
 * @namespace Game2048
 * @author QY.Alexis Yang
 * @version 2021/22
 */
const Game2048 = Object.create(null);

/**
 * A PlayBoard is an square grid that tiles of different value is placed.
 * tilles fill up empty positions and can be slide and combined between each other.
 * It is implemented as an array of rows of tiles.
 * @memberof Game2048
 * @typedef {Game2048.Piece-or-Empty[][]} PlayBoard
 */

/**
 * A tile is a coloured section of a with value that players aim to combine to get 2048.
 * @memberof Game2048
 * @typedef {(0 | 2n )} tiles
 */

/**
 * Create a new empty board.
 * Optionally with a specified width,
 * otherwise returns a standard 4 x 4 board.
 * @memberof Game2048
 * @function
 * @param {number} [width = 4] The width of the new board.
 * @returns {Game2048.Board} An empty board for starting a game.
 */
Game2048.empty_board = function (width = 4) {
    return R.repeat(R.repeat(0, width), width);
};



/**
 * create new array of all nums of the original array that != 0
 * @memberof Game2048
 * @function
 * @param {row[]} row a row from the board.
 * @returns {Game2048.RowNoZero}
 */
Game2048.filterZero = function (row){
    const newrow = [...row];
    return newrow.filter(num => num != 0);
};


/**
 * Create a new array with 0 add to all empty space in an array
 * @memberof Game2048
 * @function
 * @param {row[]} row a row from the board.
 * @returns {Game2048.RowPushZero}
 */
 Game2048.addZero = function (row){
     const newrow = [...row];
     while (newrow.length < columns) {
         newrow.push(0);
     }
     return newrow;
};



/**
 * combine same numbers in a row
 * @memberof Game2048
 * @function
 * @param {row[]} row a row from the board.
 * @returns {Game2048.RowCombined}
 */
 Game2048.combineNum = function (row){
    const newrow = [...row];
    newrow.forEach(i => {
        if (newrow[i] == newrow[i+1]){
            newrow[i] *= 2;
            newrow[i+1] = 0;
            score += newrow[i];
        }
    });
    return newrow;
 }


/**
* to slide a row
* @memberof Game2048
* @function
* @param {row[]} row the game board.
* @returns {Game2048.Board[][]}
*/
function slide(row) {
   //[0, 2, 2, 2] 
   const newrow = [...row];
   newrow = filterZero(newrow); //[2, 2, 2]
   newrow = combineNum(newrow);//[4, 0, 2]
   newrow = filterZero(newrow); //[4, 2]
   //add zeroes
   while (newrow.length < columns) {
       newrow.push(0);
   } //[4, 2, 0, 0]
   return newrow;
}


 /**
 * add a new "2" tile in the board
 * @memberof Game2048
 * @function
 * @param {Game2048.Board[][], number} board the game board.
 * @returns {Game2048.Board[][]}
 */
  Game2048.addTwo = function (board, r, c,){
    newboard=[].concat(board);
    return newboard[r][c]=2;
}



 /**
 * check if there is empty (0) tile
 * @memberof Game2048
 * @function
 * @param {Game2048.Board[][]} board the game board.
 * @returns {boolean}
 */
Game2048.hasEmpty = function (board){
    let count = 0;
    board.forEach(r => {
        r.forEach(c =>{
            if (board[r][c] == 0){  //at least one zero in the board
                return true;
            } 
        })
    })
    return false;
}

 /**
 * slide to the left
 * @memberof Game2048
 * @function
 * @param {Game2048.Board[][]} board the game board.
 * @returns {Game2048.Board[][]}
 */
  Game2048.slideLeft = function (board){
    newboard=[].concat(board);
    newboard.forEach(function(r){
        let row = r;
        row=slide(row);
        r=row
    })
    return newboard
};


 /**
 * slide to the right
 * @memberof Game2048
 * @function
 * @param {Game2048.Board[][]} board the game board.
 * @returns {Game2048.Board[][]}
 */
Game2048.slideRight = function(board) {
    newboard=[].concat(board);
    newboard.forEach(function(r){
        let row = r;   //[0, 2, 2, 2]
        row.reverse();  //[2, 2, 2, 0]
        row=slide(row);  //[4, 2, 0, 0]
        r=row.reverse();  //[0, 0, 2, 4];
    })
    return newboard
}


 /**
 * slide tile in upwards direction
 * @memberof Game2048
 * @function
 * @param {Game2048.Board[][]} board the game board.
 * @returns {Game2048.Board[][]}
 */
Game2048.slideUp = function(board) {
    newboard=[].concat(board);
    newboard.forEach(function(c) {
        c1=[]
        c2=[]
        c3=[]
        c4=[]
        c1.append(c[0])
        let row = [newboard[0][c], newboard[1][c], newboard[2][c], newboard[3][c]];
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
    })
    return newboard
}


//  /**
//  * slide tile in upwards direction
//  * @memberof Game2048
//  * @function
//  * @param {Game2048.Board[][]} board the game board.
//  * @returns {Game2048.Board[][]}
//  */
//   Game2048.slideUp = function(board) {
//     newboard=[].concat(board);
//     newboard.forEach(c => {
//         let row = [newboard[0][c], newboard[1][c], newboard[2][c], newboard[3][c]];
//         row = slide(row);
//         // board[0][c] = row[0];
//         // board[1][c] = row[1];
//         // board[2][c] = row[2];
//         // board[3][c] = row[3];
//     })
//     return newboard
// }


 /**
 * slide tile in downwards direction
 * @memberof Game2048
 * @function
 * @param {Game2048.Board[][]} board the game board.
 * @returns {Game2048.Board[][]}
 */
Game2048.slideDown = function(board) {
    newboard=[].concat(board);
    newboard.forEach(c => {
        let row = [newboard[0][c], newboard[1][c], newboard[2][c], newboard[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
    })
    return newboard
}

export default Object.freeze(Game2048);



