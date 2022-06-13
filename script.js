const PLAYER = (sign, name, varName) => {
    const GET_SIGN = () => sign;
    let score = 0;
    return {
        GET_SIGN,
        score,
        name, 
        varName
    }
}

let playerOne = PLAYER("url('puzzleP1.png')" , 'First player', 'playerOne');
let playerTwo = PLAYER("url('puzzleP2.png')" , 'Second player', 'playerTwo');
const PLAYERS = [playerOne, playerTwo];
let currentPlayer = PLAYERS[1];

const GAMEBOARD = (() => {
    const GAMEBOARD_CONTAINER = document.querySelector('.gameBoard');
    const GAMEBOX_VALUES = [];
    const CREATE_GAMEBOX_VALUES = () => {
        for (let i = 0; i<9; i++){
            GAMEBOX_VALUES[i] = '';
        }
    }
    const DISPLAY_BOARD = () => {
        for (let i = 0; i<9; i++){
            let GAMEBOX = document.createElement('div');
            GAMEBOX.classList.add('gameBox');
            GAMEBOX.textContent = GAMEBOX_VALUES[i];
            GAMEBOX.setAttribute('data-index', i);
            GAMEBOARD_CONTAINER.appendChild(GAMEBOX);
        }
    }
    const CHANGE_BOX_VALUE = (event, gameBox) => {
        GAMEBOX_VALUES[event.target.getAttribute('data-index')] = currentPlayer.GET_SIGN();
        gameBox.style.backgroundImage = GAMEBOX_VALUES[event.target.getAttribute('data-index')];
        gameBox.style.backgroundSize = '80%';
        gameBox.style.backgroundRepeat = 'no-repeat';
        gameBox.style.backgroundPosition = 'center';
    }
    const CHECK_IF_BOARD_FULL = () => {
        return GAMEBOX_VALUES.every(value => value !== '');
    }
    const CHECK_IF_WINNER = () => {
        let isThereWinner = false;
        for (let i=0; i<=6; i = i+3){
            if (GAMEBOX_VALUES[i]!=='' && GAMEBOX_VALUES[i] === GAMEBOX_VALUES[i+1] && GAMEBOX_VALUES[i] === GAMEBOX_VALUES[i+2]) return isThereWinner = true;
        }
        for (let j=0; j<=2; j++){
            if (GAMEBOX_VALUES[j]!=='' && GAMEBOX_VALUES[j] === GAMEBOX_VALUES[j+3] && GAMEBOX_VALUES[j] === GAMEBOX_VALUES[j+6]) return isThereWinner = true;
        }
        
        if (GAMEBOX_VALUES[0]!=='' && GAMEBOX_VALUES[0] === GAMEBOX_VALUES[4] && GAMEBOX_VALUES[0] === GAMEBOX_VALUES[8] ||
        GAMEBOX_VALUES[2]!=='' && GAMEBOX_VALUES[2] === GAMEBOX_VALUES[4] && GAMEBOX_VALUES[2] === GAMEBOX_VALUES[6]) return isThereWinner = true;
    }
    const PLAYER_TURN_DISPLAY = document.querySelector('.playerTurns');
    const GAME_FLOW_BOARD = () => {
        if (CHECK_IF_WINNER()){
            PLAYER_TURN_DISPLAY.textContent = `${currentPlayer.name} wins the game !`;
            PLAYER_TURN_DISPLAY.style.color = '#F29200';
            document.querySelector(`#${currentPlayer.varName}`).style.border = '2px solid';
            document.querySelector(`#${currentPlayer.varName}`).style.borderColor='#2757A3 #F29200 #F29200 #2757A3';
            currentPlayer.score ++;
            SCOREBOARD.SCOREBOARD_DISPLAY();
        } 
        else if (CHECK_IF_BOARD_FULL()) {
            PLAYER_TURN_DISPLAY.textContent = 'It\'s a tie !'
        }
        else {
            currentPlayer === PLAYERS[0] ? currentPlayer = PLAYERS[1] : currentPlayer = PLAYERS[0];
            PLAYER_TURN_DISPLAY.textContent = `It's ${currentPlayer.name}'s turn!`;
            document.querySelector(`#${currentPlayer.varName}`).style.color='orange';
            currentPlayer ===  PLAYERS[0] ? document.querySelector('#playerTwo').style.color = '#2757A3' : 
                document.querySelector('#playerOne').style.color = '#2757A3';
            }
    }
    const PLAY = () => {
        const GAMEBOXES = GAMEBOARD_CONTAINER.querySelectorAll('div');
        GAMEBOXES.forEach(gameBox => {
            gameBox.addEventListener('click', (e)=> {
                if (!CHECK_IF_WINNER()){
                    CHANGE_BOX_VALUE(e, gameBox);
                    GAME_FLOW_BOARD();
                }
            }, {once : true});
        })
    }
    const INIT_BOARD = () => {
        CREATE_GAMEBOX_VALUES();
        DISPLAY_BOARD();
        GAME_FLOW_BOARD();
    }
    const RESET_BOARD = () => {
        const GAMEBOXES = GAMEBOARD_CONTAINER.querySelectorAll('div');
            GAMEBOXES.forEach(box => box.parentElement.removeChild(box));
            for (let i=0; i<GAMEBOX_VALUES.length; i++) GAMEBOX_VALUES[i]= '';
            currentPlayer = PLAYERS[1];
    }
    const RESET = () => {
        const RESET_BTN = document.querySelector('#resetBtn');
        RESET_BTN.addEventListener('click', () => {
            PLAYER_TURN_DISPLAY.style.textShadow = 'none';
            document.querySelector(`#${currentPlayer.varName}`).style.border = 'none';
            RESET_BOARD();
            playerOne.score = 0;
            playerTwo.score = 0;
            GAME_FLOW();
        })
    }
    const ONE_MORE_ROUND = () => {
        const ONE_MORE_ROUND_BTN = document.querySelector('#oneMoreRound');
        ONE_MORE_ROUND_BTN.addEventListener('click', () => {
            RESET_BOARD();
            GAME_FLOW();
        })
    }

    return {
        INIT_BOARD,
        PLAY,
        RESET,
        ONE_MORE_ROUND
    }
})()

const SCOREBOARD = (() => {
    const SCORES = document.querySelector('.scoreBoard');
    const SCOREBOARD_DISPLAY = () => {
        SCORES.textContent = `${playerOne.score}   /   ${playerTwo.score}`
    }
    return {
        SCOREBOARD_DISPLAY
    }
})()

const GAME_FLOW = () => {
    return  Object.assign({},
    SCOREBOARD.SCOREBOARD_DISPLAY(),
    GAMEBOARD.INIT_BOARD(),
    GAMEBOARD.PLAY(),
    GAMEBOARD.RESET(),
    GAMEBOARD.ONE_MORE_ROUND()
    )
}

GAME_FLOW();
