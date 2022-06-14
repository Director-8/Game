import R from "./common/ramda.js";
import Json_rpc from "./Json_rpc.js";
import Game2048 from "./common/Game2048.js";


var board;
var score = 0;
var steps = 0;
var rows = 4;
var columns = 4;



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
    return tile
}

//begin the game 
const setGame = function() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
     
    board.forEach(function (r) {
        r.forEach(function (c) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = c;
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        });
    });
    generateTwo();
    generateTwo();
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
            Game2048.addTwo(board,r,c)
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}


//control of the game
document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft(board);
        board.forEach(function(r){
            r.forEach(function(c){
                let tile = document.getElementById(r.toString() + "-" + c.toString());
                let num = c;
                updateTile(tile,num);
            })
        })
        generateTwo();
        }

    else if (e.code == "ArrowRight") {
        slideRight(board);
        board.forEach(function(r){
            r.forEach(function(c){
                let tile = document.getElementById(r.toString() + "-" + c.toString());
                let num = c;
                updateTile(tile,num);
            })
        })
        generateTwo();
    }

    else if (e.code == "ArrowUp") {
        slideUp(board);
        for (let c = 0; c < columns; c++) {
            for (let r = 0; r < rows; r++){
                board[r][c] = row[r];
                let tile = document.getElementById(r.toString() + "-" + c.toString());
                let num = board[r][c];
                updateTile(tile, num);
            }
        }
        generateTwo();
    }

    else if (e.code == "ArrowDown") {
        slideDown(board);
        for (let c = 0; c < columns; c++) {
            for (let r = 0; r < rows; r++){
                board[r][c] = row[r];
                let tile = document.getElementById(r.toString() + "-" + c.toString());
                let num = board[r][c];
                updateTile(tile, num);
            }
        }
        generateTwo();
    }

    document.getElementById("score").innerText = score;
    document.getElementById("steps").innerText = steps+1
})


window.onload = function() {
    setGame();
};
