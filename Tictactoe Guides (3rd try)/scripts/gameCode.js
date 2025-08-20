function threatVerification(board, markCheck, mark) {
  let winCombs =[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  let newBoard = board.slice()
  for (let i = 0;i<8;i++) {
    let comb = `${[board[winCombs[i][0]],board[winCombs[i][1]],board[winCombs[i][2]]]}`;
    if (comb === `[0,${markCheck},${markCheck}]`) {
      newBoard[winCombs[i][0]] = mark;
      return newBoard;
    }
    if (comb === `[${markCheck},0,${markCheck}]`) {
      newBoard[winCombs[i][1]] = mark;
      return newBoard;
    }
    if (comb === `[${markCheck},${markCheck},0]`) {
      newBoard[winCombs[i][2]] = mark;
      return newBoard;
    }
  }
  return false
}

function segundaIABasica(tablero = []) {

  let cerosCount = 0
  for (let index = 0; index < 9; index++) {
    tablero[index] === 0 && (cerosCount++)
  }
  if (!cerosCount) {return tablero}

  let tA = 2 - cerosCount%2;
  let tS = 3 - tA;

  //firstcheck
  if (`${tablero}` == "1,0,0,0,0,0,0,0,0" || `${tablero}` == "0,0,1,0,0,0,0,0,0" ||
  `${tablero}` == "0,0,0,0,0,0,1,0,0" || `${tablero}` == "0,0,0,0,0,0,0,0,1") {
    let newTablero = tablero.slice();
    newTablero[4] = 2;
    return [[newTablero]];
  }
  let randInd = Math.floor(((Math.random())*4));
  if (`${tablero}` == "0,0,0,0,1,0,0,0,0") {
    let newTablero = tablero.slice();
    newTablero[[0,2,6,8][randInd]] = 2;
    return [[newTablero]];
  }
  if (`${tablero}` == "0,1,0,0,0,0,0,0,0") {
    let newTablero = tablero.slice();
    newTablero[[0,2,4,7][randInd]] = 2;
    return [[newTablero]];
  }
  if (`${tablero}` == "0,0,0,1,0,0,0,0,0") {
    let newTablero = tablero.slice();
    newTablero[[0,6,4,5][randInd]] = 2;
    return [[newTablero]];
  }
  if (`${tablero}` == "0,0,0,0,0,1,0,0,0") {
    let newTablero = tablero.slice();
    newTablero[[3,4,2,8][randInd]] = 2;
    return [[newTablero]];
  }
  if (`${tablero}` == "0,0,0,0,0,0,0,1,0") {
    let newTablero = tablero.slice();
    newTablero[[1,4,6,8][randInd]] = 2;
    return [[newTablero]];
  }
  
  //Win possible check
  let winCheck = threatVerification(tablero, tA, tA);
  if (winCheck) {return [[winCheck]]}

  //Threat block check
  let threatCheck = threatVerification(tablero, tS, tA);
  if (threatCheck) {return [[threatCheck]]}



  let lista = [[], "nada"]
  for (let i3 = 0; i3 < 9; i3++) {
    if (tablero[i3] === 0) {
      lista[0].push(tablero.slice(undefined,i3).concat([tA]).concat(tablero.slice(i3+1,undefined)));
    }
  }
  let randInd2 = Math.floor((Math.random()*lista[0].length));
  if (`${tablero}` == "0,0,0,0,1,0,0,0,0") {
    return [[lista[0][randInd2]]]}
  return lista;
}


function verificacionEstado(tablero=[]) {
  let winCombs = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

  for (let i = 0; i<8; i++) {
    let comb = winCombs[i]
    if (tablero[comb[0]] !== 0 &&
      tablero[comb[0]] === tablero[comb[1]] &&
      tablero[comb[1]] === tablero[comb[2]]) {

          return [11, comb, {1:"X",2:"O"}[tablero[comb[0]]]]
        }
  }
  if (tablero.includes(0)) {return [null]}
  return [0];
}

let contador = 0
function negamax(tablero, depth = 0, memo = {}, 
  alpha = Number.NEGATIVE_INFINITY, beta = Number.POSITIVE_INFINITY) {
  if (depth === 0){
    memo = {};
    contador = 0}
  contador++

  if (Object.keys(memo).includes(tablero.toString())) {
    return memo[tablero.toString()]
  }

  if (tablero.toString() === "0,0,0,0,0,0,0,0,0") {
    let posicionA = Math.floor(Math.random()*9);
    return [tablero.slice(undefined,posicionA).concat([1]).concat(tablero.slice(posicionA+1,undefined)), "inicio"]
  }

  if (depth === 0 && !tablero.includes(0)) {
    return [tablero, "nada"]}

  let estado = verificacionEstado(tablero)[0];
  if (estado !== null) {return 0-(estado - ((estado % 10)*depth))}
    

  let mejoresJugadas = [];
  let mejor = Number.NEGATIVE_INFINITY;
  let posiblesJugadas = segundaIABasica(tablero)[0];
  if (depth === 0 && posiblesJugadas.length === 1) {return posiblesJugadas}

  for (let i = 0; i < posiblesJugadas.length; i++) {
    let resultado = 0-negamax(posiblesJugadas[i], depth+1, memo, -beta, -alpha);

    if (depth === 0) {
      //console.log(resultado, posiblesJugadas[i])
      if (resultado === mejor) {
        mejoresJugadas.push(posiblesJugadas[i])
      }
    }


    if (resultado > mejor) {
      mejor = resultado;
      if (depth === 0) {mejoresJugadas = [posiblesJugadas[i]]}
    }
  }
    if (depth === 0) {
      //console.log(contador)
      let randInd = Math.floor(((Math.random())*(mejoresJugadas.length)));
      //console.log(mejoresJugadas, randInd)
      return [mejoresJugadas[randInd], mejor]}
    memo[tablero.toString()] = mejor;

    return mejor;
}


function getPosition(tablero, tablero2) {
  for (let i =0;i<9;i++) {
    if (tablero[i]!==tablero2[i]) {return i}
  }
}

function version(board) {
  let newBoard = board
  let versions = [];
  for (let i = 0; i<4;i++) {
    let versionR = [
    newBoard[6],newBoard[3],newBoard[0],
    newBoard[7],newBoard[4],newBoard[1],
    newBoard[8],newBoard[5],newBoard[2]];
    let versionM = [
    versionR[2],versionR[1],versionR[0],
    versionR[5],versionR[4],versionR[3],
    versionR[8],versionR[7],versionR[6]];
    newBoard = versionR
    let filt1 = true
    let filt2 = true
    for (let i=0;i<versions.length;i++) {
      if (`${versions[i]}` == `${versionR}`) {filt1=false};
      if (`${versions[i]}` == `${versionM}`) {filt2=false};
    }
    if (filt1 && `${versionR}` !== `${board}`) {versions.push(versionR)};
    if (filt2 && `${versionR}` !== `${versionM}` && `${versionM}` !== `${board}`) {versions.push(versionM)};
  };
  return versions;
}