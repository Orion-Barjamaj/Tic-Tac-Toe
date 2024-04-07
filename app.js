const player1 = document.querySelector("#playerOne");
const player2 = document.querySelector("#playerTwo");
const turns = document.querySelector("#turns");
const submitBtn = document.querySelector("#sub");

function Player(name, score){
    this.name = name;
    this.score = score;
}

const playerOne = new Player('Player 1', '0');
const playerTwo = new Player("Player 2", '0');

submitBtn.addEventListener("click", (e) =>{
    const input1 = document.getElementById("name1").value;
    const input2 = document.getElementById("name2").value;
    playerOne.name = input1;
    playerTwo.name = input2;
    player1.textContent = playerOne.name + ":";
    player2.textContent = playerTwo.name + ":";
    e.preventDefault();
});

let win = false;

function GameBoard(){
    const board = document.querySelector(".board");
    const arr = [];
    const textArr = [];
    let toggle = true;
    let tie = 0;
    for(let i = 1; i < 10; i++){
        const tile = document.createElement("button");
        board.appendChild(tile);
        arr.push(tile);
        tile.setAttribute("class", "tile")
        tile.setAttribute("id", i);
        tile.addEventListener("click", event => {
            if(tile.textContent == ""){
                win = false;
                if(toggle && tile.textContent == ""){
                    toggle = !toggle;
                    tile.textContent = "X";
                    tile.style.color = "#7AA2E3";
                    turns.textContent = "O Turn";
                }else if(!toggle && tile.textContent == ""){
                    toggle = !toggle;
                    tile.textContent = "O";
                    tile.style.color = "red";
                    turns.textContent = "X Turn";
                }
                textArr.push(tile.innerText);
                CheckForWin(arr, textArr, tie);
            }
            Restart(arr, tile, textArr);
        });
    }
}

GameBoard();
Restart();

function CheckForWin(array, textArr, tie){
    const score1 = document.querySelector("#score1");
    const score2 = document.querySelector("#score2");
    const tieText = document.querySelector("#tieNr");
    for(let i = 0; i < array.length; i++){
        if(array[0].innerText == "O" && array[1].innerText == "O" && array[2].innerText == "O"
        || array[0].innerText == "O" && array[4].innerText == "O" && array[8].innerText == "O"
        || array[0].innerText == "O" && array[3].innerText == "O" && array[6].innerText == "O"
        || array[1].innerText == "O" && array[4].innerText == "O" && array[7].innerText == "O"
        || array[0].innerText == "O" && array[3].innerText == "O" && array[6].innerText == "O"
        || array[2].innerText == "O" && array[4].innerText == "O" && array[6].innerText == "O"
        || array[2].innerText == "O" && array[5].innerText == "O" && array[8].innerText == "O"
        || array[3].innerText == "O" && array[4].innerText == "O" && array[5].innerText == "O"
        || array[6].innerText == "O" && array[7].innerText == "O" && array[8].innerText == "O"){
            if(!win){
                playerTwo.score++;
                win = true;
                score2.textContent = playerTwo.score;
                turns.textContent = playerTwo.name + " Won!";
                array.forEach(tile => {
                    tile.disabled = true;
                });
                textArr.splice(0, textArr.length);
            }
        } else if(array[0].innerText == "X" && array[1].innerText == "X" && array[2].innerText == "X"
        || array[0].innerText == "X" && array[4].innerText == "X" && array[8].innerText == "X"
        || array[0].innerText == "X" && array[3].innerText == "X" && array[6].innerText == "X"
        || array[1].innerText == "X" && array[4].innerText == "X" && array[7].innerText == "X"
        || array[0].innerText == "X" && array[3].innerText == "X" && array[6].innerText == "X"
        || array[2].innerText == "X" && array[4].innerText == "X" && array[6].innerText == "X"
        || array[2].innerText == "X" && array[5].innerText == "X" && array[8].innerText == "X"
        || array[3].innerText == "X" && array[4].innerText == "X" && array[5].innerText == "X"
        || array[6].innerText == "X" && array[7].innerText == "X" && array[8].innerText == "X"){
            if(!win){
                playerOne.score++;
                win = true;
                score1.textContent = playerOne.score;
                turns.textContent = playerOne.name + " Won!";
                array.forEach(tile => {
                    tile.disabled = true;
                });
                textArr.splice(0, textArr.length);
            }
        } else if(textArr.length == 9){
            if(!win){
                let newTie = tie + 1;
                win = true;
                tieText.textContent = newTie;
                turns.textContent = "It's a tie!";
                array.forEach(tile => {
                    tile.disabled = true;
                });
                textArr.splice(0, textArr.length);
                tie = newTie;
            }
        }
    }
}

function Restart(array, el, textArr){
    const reset = document.getElementById("reset");
    reset.addEventListener("click", e =>{
        array.forEach(el => {
            el.textContent = "";
            el.disabled = false;
            textArr.splice(0, textArr.length);
        });  
        reset.style.display = "none";
    });
    if(!win){
        reset.style.display = "none";
    } else{
        reset.style.display = "flex";
    }
}