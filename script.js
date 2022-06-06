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
    };

    const PLAY = (player) => {
        console.log(player.GET_SIGN());
        const GAMEBOXES = GAMEBOARD_CONTAINER.querySelectorAll('div');
        GAMEBOXES.forEach(gameBox => {
            gameBox.addEventListener('click', (e)=> {
                GAMEBOX_VALUES[e.target.getAttribute('data-index')] = player.GET_SIGN();
                gameBox.textContent = GAMEBOX_VALUES[e.target.getAttribute('data-index')];
            });
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

const PLAYER = (sign) => {
    const GET_SIGN = () => sign;
    let score = 0;
    return {
        GET_SIGN,
        score
    }
}

const displayController = (() => {
    const updateScore = {};
    const displayScore = {};
    return {}
})()

let playerOne = PLAYER('H');
let playerTwo = PLAYER('R');

GAMEBOARD.INIT_BOARD();
GAMEBOARD.PLAY(playerTwo);