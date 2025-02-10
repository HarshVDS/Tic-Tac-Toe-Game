let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#newbtn");
let msgContainer = document.querySelector(".msgcont");
let msg = document.querySelector("#msg");
let xScore = document.querySelector("#x-score");
let oScore = document.querySelector("#o-score");

let turnO = true;
let scores = { X: 0, O: 0 };

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color = "#00ff99";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "#ff004f";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations! ${winner} Wins 🎉`;
    scores[winner]++;
    updateScore();
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [pos1, pos2, pos3] = pattern;
        let val1 = boxes[pos1].innerText;
        let val2 = boxes[pos2].innerText;
        let val3 = boxes[pos3].innerText;

        if (val1 !== "" && val1 === val2 && val2 === val3) {
            showWinner(val1);
            return;
        }
    }
    
    if ([...boxes].every(box => box.innerText !== "")) {
        msg.innerText = "It's a Draw! 😬";
        msgContainer.classList.remove("hide");
    }
};

const updateScore = () => {
    xScore.innerText = scores.X;
    oScore.innerText = scores.O;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
