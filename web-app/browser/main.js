import R from "./common/ramda.js";
import Json_rpc from "./Json_rpc.js";
import Game2048 from "./common/Game2048.js";


var board;
var score = 0;
var steps = 0;
var rows = 4;
var columns = 4;

window.onload = function() {
    setGame();
};

//begin the game 
const setGame = function() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
     
    board.forEach(function (r, row_index) {
        r.forEach(function (c, col_index) {
            let tile = document.createElement("div");
            tile.id = row_index.toString() + col_index.toString();
            let num = c;
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        });
    });
    generateTwo();
    generateTwo();
}



//To really update the tile 
function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; //clear the classList
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 4096) {
            tile.classList.add("x"+num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
}

//To creat a new "2" tile
function generateTwo(){
    if (! Game2048.hasEmpty(board)) {
        return;
    }
    let found = false;
    while (!found) {
        //find random row and column to place a 2 in
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0){
            board=Game2048.addTwo(board,r,c)
            let tile = document.getElementById(r.toString() + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}


//To update the board
function updateBoard(board){
    board.forEach(function(r, row_index){
        r.forEach(function(c, col_index){
            let tile = document.getElementById(row_index.toString() + col_index.toString());
            let num = c;
            updateTile(tile,num);
        })
    })
    generateTwo();
    steps=steps+1;
    document.getElementById("steps").innerText = steps;
    score=Game2048.score(board);
    document.getElementById("score").innerText = score;
}


//control of the game
document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        board=Game2048.slideLeft(board);
        updateBoard(board);
        Game_is_end(board);
    }

    else if (e.code == "ArrowRight") {
        board=Game2048.slideRight(board);
        updateBoard(board);
        Game_is_end(board);
    }

    else if (e.code == "ArrowUp") {
        board = Game2048.slideUp(board);
        updateBoard(board);
        Game_is_end(board);
    }

    else if (e.code == "ArrowDown") {
        board=Game2048.slideDown(board);
        updateBoard(board);
        Game_is_end(board);
    }
})


const result_dialog = document.getElementById("result_dialog");

function Game_is_end(board){
    if (Game2048.hasEmpty(board)){
        return;
    }
    else{
        if (! Game2048.isEnd(board)){
            return;
        }
        else if(Game2048.isEnd(board)){
            var Num;
            Num = Game2048.endCount(board);
            if(Num === 0 ){
                document.getElementById("result_message").textContent = (
                    "Game is end. No 2048 reached. Try next time."
                );
            }
            else if (Num != 0){
                document.getElementById("result_message").textContent = (
                    `Game is end. You have got ${Num} 2048 and beyond!`
                );
            }
        }
    }
    result_dialog.showModal();
}

result_dialog.onclick = function () {
    window.location.reload();
    result_dialog.close();
};

result_dialog.onkeydown = result_dialog.onclick;
