const boxes = document.querySelectorAll('.box');
const columns = 12;
const rows = 10;
console.log(boxes);

boxes.forEach((box, index) => {
    console.log(`אינדקס: ${index}, אלמנט: `, box);
});

let matrix = [];
let x = 9;
let y = 2;
let time = 3000;
function startGame() {
    for (i = 0; i < 10; ++i) {
        let arr = []
        for (j = 0; j < 12; ++j) {
            const div = document.getElementById("game-board");
            // if (i == 0 || i == 9 || j == 0 || j == 11) {

            // }
            // else {
            let html = `<div class="box" id="box${i}-${j}"></div>`;
            // }
            div.insertAdjacentHTML("beforeend", html);
            arr.push(false);
        }
        matrix.push(arr);
    }
    const div = document.getElementById(`box2-9`);
    let html = `<span class="imogi">😊</sppan>`;
    div.insertAdjacentHTML("beforeend", html);
    addBall()
}
startGame();
var intervalId = setInterval(addBall, time);
function addBall() {
    let row;
    let col;
    do {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 12);
    } while (matrix[row][col] != false);
    matrix[row][col] = true;
    console.log(`box${row} - ${col}`);
    const div = document.getElementById(`box${row}-${col}`);
    let html = `<span class="ball">🏀</sppan>`;
    div.insertAdjacentHTML("beforeend", html);
}
document.addEventListener('keydown', function (event) {
    if (event.key === "ArrowRight") {
        moveRight();
    }
    else if (event.key === "ArrowLeft") {
        moveLeft();
    }
    else if (event.key === "ArrowUp") {
        moveUp();
    }
    else if (event.key === "ArrowDown") {
        moveDown();
    }
});
function moveLeft() {
    if (x == 0 && y != 5) {
        alert("canot move left");
        return;
    }
    moveElement("left");
}
function moveRight() {
    if (x >= 11 && y != 5) {
        alert("canot move right");
        return;
    }
    moveElement("right");

}
function moveDown() {
    if (y >= 9 && x != 4) {
        alert("canot move dowd");
        return;
    }
    moveElement("down");
}
function moveUp() {
    if (y == 0 && x != 4) {
        alert("canot move up");
        return;
    }
    moveElement("up");
}
function moveElement(direction) {
    let div = document.getElementById(`box${y}-${x}`);
    let paragraphs = div.getElementsByClassName("imogi");
    if (paragraphs.length > 0) {
        div.removeChild(paragraphs[paragraphs.length - 1]);
        if (direction == "left") {
            x = (x + 11) % 12;
        }
        if (direction == "right") {
            x = (x + 1) % 12;
        }
        if (direction == "down") {
            y = (y + 1) % 10;
        }
        if (direction == "up") {
            y = (y + 9) % 10;
        }
        div = document.getElementById(`box${y}-${x}`);
        paragraphs = div.getElementsByClassName("ball");
        if (paragraphs.length > 0) {
            div.removeChild(paragraphs[paragraphs.length - 1]);
            matrix[y][x] = false;
        }
        let html = `<span class="imogi">😊</sppan>`;
        div.insertAdjacentHTML("beforeend", html); // שינינו ל-beforeend
        for (i = 0; i < 10; ++i) {
            for (j = 0; j < 12; ++j) {
                if (matrix[i][j] === true) {
                    return;
                }
            }
        }
        endGame();
    }
}
function endGame() {
    console.log("you won all due respect!");
    let result = confirm("you won all due respect!\n\nDo you want to go to the next level?");
    clearInterval(intervalId);
    if (result == true) {
        console.log("new game");
        time -= 500;
        intervalId = setInterval(addBall, time);
        addBall();
    }
    else {
        alert("the game is finished!")
    }
}