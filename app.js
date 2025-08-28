let boxes = document.querySelectorAll('.box');
let resetbtn = document.querySelector('#reset');
let startbtn = document.querySelector('#start');
let gameBoard = document.querySelector('.game');
let player1Input = document.getElementById('player1');
let player2Input = document.getElementById('player2');
let currentTurnDiv = document.getElementById('current-turn');

let player1 = "Player 1";
let player2 = "Player 2";
let turnO = true;
let gameOver = false;
let player1Wins = 0;
let player2Wins = 0;

const winpatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function updateTurnDisplay() {
    if (gameOver) {
        currentTurnDiv.innerText = "";
        return;
    }
    currentTurnDiv.innerText = turnO ? `${player1}'s (O) turn` : `${player2}'s (X) turn`;
}

startbtn.addEventListener('click', () => {
    player1 = player1Input.value || "Player 1";
    player2 = player2Input.value || "Player 2";
    document.getElementById('player1-name').innerText = player1;
    document.getElementById('player2-name').innerText = player2;
    turnO = true;
    gameOver = false;
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    gameBoard.classList.remove('blur');
    updateTurnDisplay();
});

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (gameOver) return;

        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkwinner();
        updateTurnDisplay();
    });
});

const displaywinner = (winner) => {
    let winnerName = winner === "O" ? player1 : player2;
    if (winner === "O") {
        player1Wins++;
        document.getElementById('player1-wins').innerText = player1Wins;
    } else {
        player2Wins++;
        document.getElementById('player2-wins').innerText = player2Wins;
    }
    alert(`${winnerName} (${winner}) is the winner!`);
}

const checkwinner = () => {
    for (let pattern of winpatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                gameOver = true;
                gameBoard.classList.add('blur');
                displaywinner(pos1val);
                updateTurnDisplay();
                return;
            }
        }
    }
};

resetbtn.addEventListener('click', () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    turnO = true;
    gameOver = false;
    gameBoard.classList.remove('blur');
    updateTurnDisplay(false);
});