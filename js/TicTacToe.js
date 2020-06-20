const playernameInput = document.querySelector("#playButton")
const modelClose = document.querySelectorAll("#ModalClose")
const sumbitButton = document.querySelector("#Submit")

function Player(name,symbol){
    this.name = name;
    this.symbol = symbol
    this.score = 0
    this.win = function(){
        score++;
    }
}


let players = [];

const gameBoard = (() => {
//This module is just for handling game logic
    var gameState = new Array(9).fill("Null")

    function updateGameState(whichSquare, Symbol){
        gameState[whichSquare - 1] = Symbol
        checkIfWon(Symbol)

    }


    function checkIfWon(Symbol){
        checkIfTie()

        if(gameState[0] == Symbol && gameState[1] == Symbol && gameState[2] == Symbol){playerWon(Symbol)}
        if(gameState[3] == Symbol && gameState[4] == Symbol && gameState[5] == Symbol){playerWon(Symbol)}
        if(gameState[6] == Symbol && gameState[7] == Symbol && gameState[8] == Symbol){playerWon(Symbol)}
        if(gameState[0] == Symbol && gameState[3] == Symbol && gameState[6] == Symbol){playerWon(Symbol)}
        if(gameState[1] == Symbol && gameState[4] == Symbol && gameState[7] == Symbol){playerWon(Symbol)}
        if(gameState[2] == Symbol && gameState[5] == Symbol && gameState[8] == Symbol){playerWon(Symbol)}
        if(gameState[0] == Symbol && gameState[4] == Symbol && gameState[8] == Symbol){playerWon(Symbol)}
        if(gameState[2] == Symbol && gameState[4] == Symbol && gameState[6] == Symbol){playerWon(Symbol)}

    }

    function checkIfTie(){
        for(i=0;i<gameState.length;i++){
            if(gameState[i] != "Null"){
                if(i == 8){
                    const declarewin = document.querySelector("#declareWinner")
                    declarewin.innerHTML = "Tie Game"
                    resetGame()
                }
            }else{
              return 
            }
        }
    }



    function playerWon(Symbol){
        console.log(Symbol + " WON")
        const declarewin = document.querySelector("#declareWinner")

        if(Symbol == players[0].symbol){
            declarewin.innerHTML = players[0].name + " Won!"
            resetGame()
        }else{
            declarewin.innerHTML = players[1].name + " Won!"
            resetGame()

        }
    }




    const createPlayers = () => {
        const player1name = document.querySelector("#player1Input")
        const player2name = document.querySelector("#player2Input")
    
        let player1 = new Player(player1name.value, "X")
        let player2 = new Player(player2name.value, "O")
        players.push(player1)
        players.push(player2)
        console.log(players)
        displayController.updatePlayerNames(player1,player2)
        displayController.startGame()
    }





    const resetGame = () => {
        for(i=0;i<gameState.length;i++){
            gameState[i] = "Null"
        }


        const square = document.querySelector("#squareHolder")
        console.log(square)

        for(i=0;i<18;i++){
            console.log(i)
            console.log(square.childNodes[i])
            square.childNodes[i].innerHTML = ""
            
        }
    }


    return{updateGameState, createPlayers}
})();




const displayController = (() => {
 //This module is just for updating and mangaing the display
    const square = document.querySelector("#squareHolder")

    playerTurn = true;


    const updatePlayerNames = (player1,player2) => {
        console.log(player1,player2)
        const player1nameHolder = document.querySelector("#playerName1")
        const player2nameHolder = document.querySelector("#playerName2")

        player1nameHolder.innerHTML = player1.name + " : " + player1.symbol 
        player2nameHolder.innerHTML = player2.name + " : " + player2.symbol 

    }
    const startGame = () =>{
        square.addEventListener('click', (e) => {
            if (playerTurn == true) {
                if (e.target.innerHTML == "") {
                    e.target.innerHTML = players[0].symbol
                    whichSquare = e.target.id
                    gameBoard.updateGameState(whichSquare, players[0].symbol)
    
    
                }
            } else {
                if (e.target.innerHTML == "") {
                    e.target.innerHTML = players[1].symbol
                    whichSquare = e.target.id
                    gameBoard.updateGameState(whichSquare, players[1].symbol)
                }
            }
    
            playerTurn = !playerTurn
        });
    }
   


    return {
        updatePlayerNames,
        startGame
    }
})();








playernameInput.addEventListener("click", (e) => {
    const modal = document.querySelector("#myModal")
    modal.style.display = "block";
})

modelClose.forEach(button => {
    button.addEventListener('click', (e) => {
        const modal = document.querySelector("#myModal")
        modal.style.display = "none";
    });
});

sumbitButton.addEventListener("click",(e) => {
    const modal = document.querySelector("#myModal")
    const playButton = document.querySelector("#playButton")
    
    modal.style.display = "none";
    playButton.disabled = true;
    
    gameBoard.createPlayers()
    
})