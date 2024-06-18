
const score = document.querySelector(".score");
const difficulty = document.querySelector("select");
const startButton = document.querySelector(".menu .start");
const resetButton = document.querySelector(".menu .reset");
const positions = Array.from(document.querySelector(".board").children);

function player(tag, score) {
    this.tag = tag;
    this.score = score;
}

let listOfTags = []

function displayPositions() {
    for(let i=0;i<9;i++){
        child = positions[i];
        if(typeof listOfTags[i] == "number") {
            child.textContent = "";
            child.setAttribute("status", "unmarked");
        }
        else {
            child.textContent = listOfTags[i];
            child.setAttribute("status", "marked");
        }
    }
}

function displayScores() {
    score.textContent = `Score: X ${player1.score} / O ${player2.score}` ;
}

function displayWinnerBlock(blocks) {
    for(let i=0;i<3;i++)
        positions[blocks[i]].setAttribute("status", "winner");
}

function checkEmptyPositions() {
    return listOfTags.filter( (pos) => typeof pos == "number" );
}

const player1 = new player("X", 0);
const player2 = new player("O", 0);

// Jogadas do CPU
function getRandomPosition(max) {
    return Math.floor(Math.random() * max);
}

function cpuMoveEasy() {
    const avaliablePositions = checkEmptyPositions();
    const index = avaliablePositions[getRandomPosition(avaliablePositions.length)];
    makeMove(index,player2);
}

function cpuMoveNormal() {
    const avaliablePositions = checkEmptyPositions();
    // 1 Testa se dá pra ganhar ou perder na próxima
    for(let i=0;i<avaliablePositions.length;i++){
        let listOfTagsCopy = listOfTags.slice();
        listOfTagsCopy[avaliablePositions[i]]="O";
        if(testWinCondition(listOfTagsCopy)[0]){
            makeMove(avaliablePositions[i],player2);
            return;
        }
    }
    for(let i=0;i<avaliablePositions.length;i++){
        let listOfTagsCopy = listOfTags.slice();
        listOfTagsCopy[avaliablePositions[i]]="X";
        if(testWinCondition(listOfTagsCopy)[0]){
            makeMove(avaliablePositions[i],player2);
            return;
        }
    }
    
    // Jogar aleatoriamente
    cpuMoveEasy();
}

function cpuMoveHard() {
    // Checa posições disponíveis
    const avaliablePositions = checkEmptyPositions();
    // Testa se dá pra ganhar ou perder na próxima
    for(let i=0;i<avaliablePositions.length;i++){
        let listOfTagsCopy = listOfTags.slice();
        listOfTagsCopy[avaliablePositions[i]]="O";
        if(testWinCondition(listOfTagsCopy)[0]){
            makeMove(avaliablePositions[i],player2);
            return;
        }
    }
    for(let i=0;i<avaliablePositions.length;i++){
        let listOfTagsCopy = listOfTags.slice();
        listOfTagsCopy[avaliablePositions[i]]="X";
        if(testWinCondition(listOfTagsCopy)[0]){
            makeMove(avaliablePositions[i],player2);
            return;
        }
    }

    // Joga no meio
    if(avaliablePositions.includes(4)){
        makeMove(avaliablePositions[avaliablePositions.indexOf(4)],player2);
        return;
    }

    // Testa se pode evitar um "fork"
    if((listOfTags[0]=="X" && listOfTags[8]=="X") || (listOfTags[2]=="X" && listOfTags[6]=="X")){
        for(let i=1;i<=7;i+=2)
            if(avaliablePositions.includes(i)){
                makeMove(avaliablePositions[avaliablePositions.indexOf(i)],player2);
                return;
            }
    }

    // Joga nos cantos
    for(let i=0;i<=8;i+=2)
        if(avaliablePositions.includes(i)){
            makeMove(avaliablePositions[avaliablePositions.indexOf(i)],player2);
            return;
        }

    // Joga aleatoriamente
    cpuMoveEasy();
}

// Jogadas dos players
currentPlayer = player1;
function makeMove(index, player) {
    positions[index].textContent = player.tag;
    positions[index].setAttribute("status", "marked");
    listOfTags[index] = player.tag;
    displayPositions();
    if(testWinCondition(listOfTags)[0]) {
        player.score++;
        displayScores();
        displayWinnerBlock(testWinCondition(listOfTags)[1]);
    }
}

function changePlayer() {
    currentPlayer = (currentPlayer === player1 ? player2 : player1);
}

function testWinCondition(list) {
    // Lines
    for(let i=0;i<=6;i+=3) {
        if(list[i] == list[i+1] && list[i] == list[i+2]){
            return [true, [i,i+1,i+2]];
        }
    }
    for(let j=0;j<3;j++) {
        if(list[j] == list[j+3] && list[j] == list[j+6]){
            result = true;
            return [true, [j,j+3,j+6]];
        }
    }

    // Diagonal
    if(list[0] == list[4] && list[4] == list[8]){
        return [ true, [0,4,8] ];
    }

    if(list[2] == list[4] && list[2] == list[6]){
        return [ true, [2,4,6] ];
    }

    return false;
}

function startGame() {
    listOfTags = [0,1,2,3,4,5,6,7,8];
    displayPositions();
}

function resetGame() {
    player1.score = 0;
    player2.score = 0;
    displayScores();
    startGame();
}

startGame();

// Event listener
positions.forEach((child)=> {
    child.addEventListener("click",()=> {
        if(child.getAttribute("status") == "unmarked" && !testWinCondition(listOfTags)[0]) {
            makeMove(Number(child.getAttribute("index")), currentPlayer);
            if(!testWinCondition(listOfTags)[0])
                switch(difficulty.value) {
                    case "2p" : changePlayer(); break;
                    case "easy": cpuMoveEasy(); break;
                    case "normal": cpuMoveNormal(); break;
                    case "hard": cpuMoveHard(); break;
                }
        }
    })
});

startButton.addEventListener("click", ()=>
    startGame()
)

resetButton.addEventListener("click", ()=>
    resetGame()
)