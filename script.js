const PLAYER = (sign, name) => {
    const GET_SIGN = () => sign;
    let score = 0;
    const DISPLAY_SCORE = () => {

    }
    return {
        GET_SIGN,
        score,
        name
    }
}

let playerOne = PLAYER('X', 'First player');
let playerTwo = PLAYER('O', 'Second player');

const GAMEBOARD = (() => {
    const GAMEBOARD_CONTAINER = document.querySelector('.gameBoard');
    const GAMEBOX_VALUES = [];
    const CREATE = () => {
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
    const PLAYERS = [playerOne, playerTwo];
    let currentPlayer = PLAYERS[0];
    const CHANGE_BOX_VALUE = (event, gameBox) => {
        console.log(GAMEBOX_VALUES);
        GAMEBOX_VALUES[event.target.getAttribute('data-index')] = currentPlayer.GET_SIGN();
        gameBox.textContent = GAMEBOX_VALUES[event.target.getAttribute('data-index')];
        console.log(GAMEBOX_VALUES);
    }
    const CHECK_IF_BOARD_FULL = () => {
        GAMEBOX_VALUES.every(value => value !== '');
    }
    const CHECK_IF_WINNER = () => {
        let isThereWinner = false;
        console.log('jhkjhkjh')
        for (let i=0; i<=6; i = i+3){
            if (GAMEBOX_VALUES[i]!=='' && GAMEBOX_VALUES[i] === GAMEBOX_VALUES[i+1] && GAMEBOX_VALUES[i] === GAMEBOX_VALUES[i+2]) return isThereWinner = true;
        }
        for (let j=0; j<=2; j++){
            if (GAMEBOX_VALUES[j]!=='' && GAMEBOX_VALUES[j] === GAMEBOX_VALUES[j+3] && GAMEBOX_VALUES[j] === GAMEBOX_VALUES[j+6]) return isThereWinner = true;
        }
        
        if (GAMEBOX_VALUES[0]!=='' && GAMEBOX_VALUES[0] === GAMEBOX_VALUES[4] && GAMEBOX_VALUES[0] === GAMEBOX_VALUES[8] ||
        GAMEBOX_VALUES[2]!=='' && GAMEBOX_VALUES[2] === GAMEBOX_VALUES[4] && GAMEBOX_VALUES[2] === GAMEBOX_VALUES[6]) return isThereWinner = true;
    }
    const GAME_FLOW_BOARD = () => {
        const PLAYER_TURN_DISPLAY = document.querySelector('.playerTurns');
        if (CHECK_IF_WINNER()){
            PLAYER_TURN_DISPLAY.textContent = `${currentPlayer.name} wins the game !`;
            currentPlayer.score ++;
            SCOREBOARD.SCOREBOARD_DISPLAY();
        } 
        else if (CHECK_IF_BOARD_FULL()) {
            PLAYER_TURN_DISPLAY.textContent = 'It\'s a tie !'
        }
        else {
            currentPlayer === PLAYERS[0] ? currentPlayer = PLAYERS[1] : currentPlayer = PLAYERS[0];
            PLAYER_TURN_DISPLAY.textContent = `It's ${currentPlayer.name}'s turn!`;
            }
    }
    const PLAY = () => {
        const GAMEBOXES = GAMEBOARD_CONTAINER.querySelectorAll('div');
        GAMEBOXES.forEach(gameBox => {
            gameBox.addEventListener('click', (e)=> {
                CHANGE_BOX_VALUE(e, gameBox);
                GAME_FLOW_BOARD();
            }, {once : true});
        })
    }
    const INIT_BOARD = () => {
        CREATE();
        DISPLAY_BOARD();
        GAME_FLOW_BOARD();
    }
    const RESET = () => {
        const RESET_BTN = document.querySelector('#resetBtn');
        RESET_BTN.addEventListener('click', () => {
            const GAMEBOXES = GAMEBOARD_CONTAINER.querySelectorAll('div');
            GAMEBOXES.forEach(gameBox => {
                gameBox.parentElement.removeChild(gameBox);
            })
            CREATE();
            DISPLAY_BOARD();
            PLAY();
            currentPlayer = PLAYERS[0];
            playerOne.score = 0;
            playerTwo.score =0;
            GAME_FLOW_BOARD();
        })
    };

    /* const RESET_BTN = document.querySelector('#resetBtn');
    const GAMEBOXES = GAMEBOARD_CONTAINER.querySelectorAll('div');
    RESET_BTN.addEventListener('click', () => {
        for (let i=0; i<GAMEBOX_VALUES.length; i++){
            GAMEBOX_VALUES[i] = '';
        }           
        GAMEBOXES.forEach(gameBox => gameBox.textContent = '' )
    }) */

    return {
        INIT_BOARD,
        GAMEBOX_VALUES,
        PLAY,
        PLAYERS,
        currentPlayer, 
        RESET,
        CHECK_IF_WINNER
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

const GAME_FLOW = (() => {
    SCOREBOARD.SCOREBOARD_DISPLAY();
    GAMEBOARD.INIT_BOARD();
    GAMEBOARD.PLAY();
    GAMEBOARD.RESET();
})()
