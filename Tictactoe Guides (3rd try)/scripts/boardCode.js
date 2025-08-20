let board = [0,0,0,0,0,0,0,0,0];
let canPlay = true;
let gameEnd = false;

function countCeros() {
  let counter = 0;
  for (let i = 0; i<9;i++) {
    board[i] === 0 && counter++;
  }
  return counter;
}

function makePlay(id) {
  if (board[id] !== 0 || !canPlay || gameEnd) {return};
  canPlay = false;
  let ceros = countCeros();
  if (!ceros) {
    canPlay = true;
    gameEnd = true;
    return;
  }
  document.querySelector("#gameBanner p").innerText = "";
  let mark = document.createElement("p");
  mark.innerHTML = {1:"<img src='assets(2)/switch-button-x(color).svg' alt='Red cross' />",2:"<img src='assets(2)/switch-button-o(color).svg' alt='Blue circle' />"}[2-(ceros%2)];
  mark.classList.add({1:"cross",2:"circle"}[2-(ceros%2)]);
  document.querySelector(`#c${id}`).appendChild(mark);
  board[id] = 2-(ceros%2);
  winVerification();
  if(gameEnd){
    canPlay = true;
    return}
  if ((ceros-1)===0) {
    canPlay = true;
    gameEnd = true;
    document.querySelector("#gameBanner p").innerText = "It's a tie!";
    return;
  }

  setTimeout(function(ceros){
    let cellObjetive = document.querySelector(`#c${callAI(board)}`);
    let mark2 = document.createElement("p");
    mark2.innerHTML = {1:"<img src='assets(2)/switch-button-x(color).svg' alt='Red cross' />",2:"<img src='assets(2)/switch-button-o(color).svg' alt='Blue circle' />"}[(ceros%2)+1];
    mark2.classList.add({1:"cross",2:"circle"}[(ceros%2)+1]);
    cellObjetive.appendChild(mark2);
    winVerification();
    canPlay = true;
    if ((ceros-2)===0 && !gameEnd) {
      document.querySelector("#gameBanner p").innerText = "It's a tie!";
    }
  }, 700, ceros)
  
}

function callAI(board2) {
  
  let result = negamax(board2)[0];
  board = result;

  return getPosition(board2,result);
}

function winVerification() {
  if (gameEnd){return};
  let result = verificacionEstado(board);
  if (result[0]) {
    //console.log("it")
    for (let i = 0;i<3;i++) {
      let winCell = document.querySelector(`#c${result[1][i]}`);
      //console.log("it2", result, winCell)
      winCell.style.backgroundColor = result[2] == "X" ? "rgb(87, 44, 52)" : "rgb(48, 48, 93)";
      document.querySelector("#gameBanner p").innerText = result[2] + " wins!";
    }
    gameEnd = true;
  }
}

function resetButton() {
  if (!canPlay) {return};
  canPlay = false;
  for (let i = 0; i < 9; i++) {
    if (board[i] == 0) {continue}
    document.querySelector(`#c${i}`).style.backgroundColor = "rgba(0,0,0,0)";
    document.querySelector(`#c${i} p`).remove();
    board[i] = 0;
  }

  document.querySelector("#gameBanner p").innerText = "";

  if (document.querySelector(".switchButton").id === "switch1") {
    canPlay = true;
    gameEnd = false;
    return;
  }

  setTimeout(function(){
    let cellObjetive = document.querySelector(`#c${callAI(board)}`);
    let mark2 = document.createElement("p");
    mark2.innerHTML = "<img src='assets(2)/switch-button-x(color).svg' alt='Red cross' />";
    mark2.classList.add("cross");
    cellObjetive.appendChild(mark2);
    canPlay = true;
    gameEnd = false;
  }, 280)

  
}

function switchButton () {
  if (!canPlay) {return};
  canPlay = false
  let sButton = document.querySelector(".switchButton");
  sButton.setAttribute("id",{"switch1":"switch2","switch2":"switch1"}[sButton.id])
  sButton.innerHTML = {"switch1":"<img src='assets(2)/switch-button-x.svg' alt='Cross' />","switch2":"<img src='assets(2)/switch-button-o.svg' alt='Circle' />"}[sButton.id]

  for (let i = 0; i < 9; i++) {
    if (board[i] == 0) {continue}
    document.getElementById("c"+i).style.backgroundColor = "rgba(0,0,0,0)";
    document.querySelector(`#c${i} p`).remove();
    board[i] = 0;
  }
  document.querySelector("#gameBanner p").innerText = "";
  
  if (sButton.id === "switch1") {
    canPlay = true;
    gameEnd = false;
    return;
  }

  setTimeout(function(){
    let cellObjetive = document.querySelector(`#c${callAI(board)}`);
    let mark2 = document.createElement("p");
    mark2.innerHTML = "<img src='assets(2)/switch-button-x(color).svg' alt='Cross' />";
    mark2.classList.add("cross");
    cellObjetive.appendChild(mark2);
    canPlay = true;
    gameEnd = false;
  }, 250)

  
}