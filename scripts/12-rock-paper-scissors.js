let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

let isAutoPlaying = true;
let intervalId
function autoPlay() {
    if (isAutoPlaying) {
         intervalId = setInterval(function () {
            const playerMove = pickComputerMove();
            playGame(playerMove)
        }, 200)
        isAutoPlaying = false;
    } else {
        clearInterval(intervalId);
        isAutoPlaying = true;
    }
    toggleAutoPlay();
}

// updateScoreElement();

document.body.addEventListener('keydown', (event)=>{
    if(event.key === 'r'){
        playGame('rock');
    }else if(event.key === 'p'){
        playGame('paper');
    }else if(event.key === 's'){
        playGame('scissors');
    }
})

function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';
    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'computer wins';
        } else if (computerMove === 'paper') {
            result = 'player wins';
        } else {
            result = 'tie';
        }
    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'player wins';
        } else if (computerMove === 'paper') {
            result = 'tie';
        } else {
            result = 'computer wins';
        }
    } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'tie';
        } else if (computerMove === 'paper') {
            result = 'computer wins';
        } else {
            result = 'player wins';
        }
    }

    if (result === 'player wins') {
        score.wins += 1;
    } else if (result === 'computer wins') {
        score.losses += 1;
    } else if (result === 'tie') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `    You
    <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">
    Computer`
}

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML =
        `Wins:${score.wins},Losses:${score.losses},Ties:${score.ties}`;
}

function pickComputerMove() {
    let randomNumber = Math.random();
    let computerMove = '';

    if (randomNumber < 0.34) {
        computerMove = 'rock';
    } else if (randomNumber < 0.67) {
        computerMove = 'paper';
    } else {
        computerMove = 'scissors';
    }

    return computerMove;
}
function toggleAutoPlay() {
    const button = document.querySelector('.auto-play-button');

    if (isAutoPlaying) {
        button.innerHTML = "Auto play";
    } else {
        button.innerHTML = "Stop";
    }
}

document.querySelector('.auto-play-button').addEventListener('click', autoPlay);
