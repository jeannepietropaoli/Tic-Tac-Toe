const PLAYER = (sign) => {
    const GET_SIGN = () => sign;
    let score = 0;
    return {
        GET_SIGN,
        score
    }
}

let playerOne = PLAYER('X');
let playerTwo = PLAYER('O');

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
        GAMEBOX_VALUES[event.target.getAttribute('data-index')] = currentPlayer.GET_SIGN();
        gameBox.textContent = GAMEBOX_VALUES[event.target.getAttribute('data-index')];
    }
    const CHECK_IF_WINNER = () => {
        for (let i=0; i<=6; i = i+3){
            if (GAMEBOX_VALUES[i]!=='' && GAMEBOX_VALUES[i] == GAMEBOX_VALUES[i+1] && GAMEBOX_VALUES[i] == GAMEBOX_VALUES[i+2]) console.log(`1 ${GAMEBOX_VALUES[i]}`);
        }
        for (let i=0; i<=2; i++){
            if (GAMEBOX_VALUES[i]!=='' && GAMEBOX_VALUES[i] == GAMEBOX_VALUES[i+3] && GAMEBOX_VALUES[i] == GAMEBOX_VALUES[i+6]) console.log(`2 ${GAMEBOX_VALUES[i]}`);
        }
        if (GAMEBOX_VALUES[0]!=='' && GAMEBOX_VALUES[0] == (GAMEBOX_VALUES[4] && GAMEBOX_VALUES[8]) ||
            GAMEBOX_VALUES[2]!=='' && GAMEBOX_VALUES[2] == (GAMEBOX_VALUES[4] && GAMEBOX_VALUES[6])) console.log(`diago`);
        }

    const PLAY = () => {
        const GAMEBOXES = GAMEBOARD_CONTAINER.querySelectorAll('div');
        GAMEBOXES.forEach(gameBox => {
            gameBox.addEventListener('click', (e)=> {
                CHANGE_BOX_VALUE(e, gameBox);
                CHECK_IF_WINNER();
                currentPlayer === PLAYERS[0] ? currentPlayer = PLAYERS[1] : currentPlayer = PLAYERS[0];
            }, {once : true});
        })
    }
    const INIT_BOARD = () => {
        CREATE();
        DISPLAY_BOARD();
    }
    const reset = () => {};
    return {
        INIT_BOARD,
        PLAY
    }
})()

const GAME_FLOW = (() => {
    
    const PLAY_ROUND = () => {
        
        
    }
    return {
        PLAY_ROUND
    }
})()

const displayController = (() => {
    const updateScore = {};
    const displayScore = {};
    return {}
})()

GAMEBOARD.INIT_BOARD();
GAMEBOARD.PLAY();