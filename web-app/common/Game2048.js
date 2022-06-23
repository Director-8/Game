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
 * to slide a row
 * @memberof Game2048
 * @function
 * @param {row[]} row the game board.
 * @returns {Game2048.Board[][]}
 */

const filterZero= function (row){
    var newrow;
    newrow=R.clone(row);
    return newrow.filter(num => num != 0);
};

const addZero = function (row){
    var newrow;
    newrow=R.clone(row);
    var columns = 4;
     while (newrow.length < columns) {
         newrow.push(0);
     }
     return newrow;
};

const combineNum = function (row){
    var newrow;
    newrow=R.clone(row);
    for (let i = 0; i < newrow.length-1; i++){
        if (newrow[i] == newrow[i+1]) {
            newrow[i] *= 2;
            newrow[i+1] = 0;
        }
    }
    return newrow;
 };

 Game2048.slide= function (row) {
    var newrow;
    newrow = R.clone(row);
    newrow = filterZero(newrow); 
    newrow = combineNum(newrow);
    newrow = filterZero(newrow); 
    newrow = addZero(newrow);
    return newrow;
 }
 
 
  /**
  * add a new "2" tile in the board
  * @memberof Game2048
  * @function
  * @param {Game2048.Board[][]} board the game board.
  * @param {number} c
  * @param {number} r
  * @returns {Game2048.Board[][]}
  */
 Game2048.addTwo = function(board,r,c){
    var newboard;
    newboard=R.clone(board);
    if(newboard[r][c] == 0){
        newboard[r][c] =2;
    }
    return newboard
 }
 
 
  /**
  * check if there is empty (0) tile
  * @memberof Game2048
  * @function
  * @param {Game2048.Board[][]} board the game board.
  * @returns {boolean}
  */
 Game2048.hasEmpty = function (board){
    var newboard;
    newboard = R.clone(board);
     return R.includes(0,R.flatten(newboard));
 }
 
  /**
  * slide to the left
  * @memberof Game2048
  * @function
  * @param {Game2048.Board[][]} board the game board.
  * @returns {Game2048.Board[][]}
  */
   Game2048.slideLeft = function (board){
       var newboard;
       newboard = R.clone(board);
       newboard.forEach(function(i, i_index){
           newboard[i_index]=Game2048.slide(i);
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
     var newboard;
     newboard = R.clone(board);
     newboard.forEach(function(r, r_index){
         r=r.reverse(); 
         r=Game2048.slide(r);  
         r=r.reverse();  
         newboard[r_index]=r;
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
     var newboard;
     newboard = R.clone(board);
     var columeboard;
     columeboard=R.transpose(newboard);
     columeboard=Game2048.slideLeft(columeboard);
     newboard=R.transpose(columeboard);
     return newboard
 }
 
  /**
  * slide tile in downwards direction
  * @memberof Game2048
  * @function
  * @param {Game2048.Board[][]} board the game board.
  * @returns {Game2048.Board[][]}
  */
 Game2048.slideDown = function(board) {
     var newboard;
     newboard = R.clone(board);
     var columeboard;
     columeboard=R.transpose(newboard);
     columeboard=Game2048.slideRight(columeboard);
     newboard=R.transpose(columeboard);
     return newboard
 }
 
 
  /**
  * caculate the current score of the game.
  * @memberof Game2048
  * @function
  * @param {Game2048.Board[][]} board the game board.
  * @returns {Game2048.Board[][]}
  */
 Game2048.score = function(board){
     var score=0;
     board.forEach(function(r){
         r.forEach(function(c){
             score=score+c;
         })
     })
     return score;
 }
 
  /**
  * check is the game is end.
  * @memberof Game2048
  * @function
  * @param {Game2048.Board[][]} board the game board.
  * @returns {boolean}
  */
 Game2048.isEnd = function(board){
     var flag = 1;
     R.range(0,3).forEach(function(r){
         R.range(0,3).forEach(function(c){
             if(board[r][c] === board[r][c+1]){
                 flag = 0;
             }
             else if (board[r][c] === board[r+1][c]){
                 flag = 0;
             }
             else if (board[3][0] === board[3][1]){
                 flag =0;
             }
             else if (board[3][1] === board[3][2]){
                 flag =0;
             }
             else if (board[3][2] === board[3][3]){
                 flag =0;
             }
             else if (board[0][3] === board[1][3]){
                 flag =0;
             }
             else if (board[1][3] === board[2][3]){
                 flag =0;
             }
             else if (board[2][3] === board[3][3]){
                 flag =0;
             }
         })
     })
     if (flag === 0){
         return false;
     }
     else if (flag ===1){
         return true;
     }
 }

/**
  * count for total number of 2048s when the game is end
  * @memberof Game2048
  * @function
  * @param {Game2048.Board[][]} board the game board.
  * @returns {number}
  */
 Game2048.endCount = function(board){
    var count=0;
    board.forEach(function(r){
        r.forEach(function(c){
            if (c >= 2048){
                count = count+1
            }
        })
    })
    return count;
 }

export default Object.freeze(Game2048);