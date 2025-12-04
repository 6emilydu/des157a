(function(){
"use strict";
console.log("reading js");

const startBtn = document.querySelector('.start-btn');
const gameScreen = document.querySelector('.game-screen');
const restartBtn = document.querySelector('.restart-btn');
const rollBtn = document.querySelector('.roll-btn');
const passBtn = document.querySelector('.pass-btn');

const buttonSound = new Audio('audio/button.mp3');
const restartSound = new Audio('audio/restart.mp3');

rollBtn.addEventListener('mousedown', function() {
  buttonSound.currentTime = 0;
  buttonSound.play();
});
passBtn.addEventListener('mousedown', function() {
  buttonSound.currentTime = 0;
  buttonSound.play();
});
startBtn.addEventListener('mousedown', function() {
  restartSound.currentTime = 0;
  restartSound.play();
});
restartBtn.addEventListener('mousedown', function() {
  restartSound.currentTime = 0;
  restartSound.play();
});

const turnBox = document.querySelector('.turn-box p');
const playerIcon = document.querySelector('.player-icon');
const diceImages = document.querySelectorAll('.dice');
const hpBars = [
  document.querySelector('.player1-bar'),
  document.querySelector('.player2-bar')
];
const scoreTexts = [
  document.querySelector('.player1-score'),
  document.querySelector('.player2-score')
];

const gameData = {
  players: ['Player 1', 'Player 2'],
  score: [0, 0],
  roll1: 0,
  roll2: 0,
  index: 0,
  gameEnd: 30
};

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', resetGame);
rollBtn.addEventListener('click', throwDice);
passBtn.addEventListener('click', passTurn);

function startGame() {
  if (Math.random() < 0.5) {
    gameData.index = 0;
  } else {
    gameData.index = 1;
  }

  document.querySelector('.start-screen').classList.add('hidden');
  gameScreen.classList.remove('hidden');

  setUpTurn();
}

function resetGame() {
  gameData.score[0] = 0;
  gameData.score[1] = 0;
  gameData.index = 0;

  gameScreen.classList.add('hidden');
  document.querySelector('.start-screen').classList.remove('hidden');

  showCurrentScore();
  resetDice();
}

function setUpTurn() {
  if (isGameOver()) {
    return;
  }

  updateTurn();
  showCurrentScore();
  enableButtons(true);
  resetDice();
}

function throwDice() {
  if (isGameOver()) {
    return;
  }

  gameData.roll1 = Math.floor(Math.random() * 6) + 1;
  gameData.roll2 = Math.floor(Math.random() * 6) + 1;

  diceImages[0].src = "images/dice" + gameData.roll1 + ".png";
  diceImages[1].src = "images/dice" + gameData.roll2 + ".png";

  gameData.rollSum = gameData.roll1 + gameData.roll2;
  if (gameData.rollSum === 2) {
    turnBox.textContent = "Oh snap! Snake eyes!";
    gameData.score[gameData.index] = 0;
    gameData.index ? (gameData.index = 0) : (gameData.index = 1);
    showCurrentScore();
    setTimeout(setUpTurn, 2000);
    return;
  }

  if (gameData.roll1 === 1 || gameData.roll2 === 1) {
    turnBox.textContent = "Hit a 1! Switching player...";
    gameData.index ? (gameData.index = 0) : (gameData.index = 1);
    switchPlayer();
    return;
  }

  gameData.score[gameData.index] += gameData.roll1 + gameData.roll2;
  showCurrentScore();

  if (!checkWinningCondition()) {
    updateTurn();
  }
}

function passTurn() {
  if (isGameOver()) {
    return;
  }
  gameData.index ? (gameData.index = 0) : (gameData.index = 1);
  setUpTurn();
}

function switchPlayer() {
  enableButtons(false);

  setTimeout(function () {
    if (isGameOver()) return;

    setUpTurn(); 
  }, 1500);
}



function checkWinningCondition() {
  if (gameData.score[gameData.index] >= gameData.gameEnd) {
    turnBox.textContent =
      gameData.players[gameData.index] +
      " wins with " +
      gameData.score[gameData.index] +
      " points!";

    enableButtons(false);
    return true;
  }
  return false;
}

function isGameOver() {
  if (gameData.score[0] >= gameData.gameEnd ||
      gameData.score[1] >= gameData.gameEnd) {
    return true;
  }
  return false;
}


function updateTurn() {
  if (gameData.index === 0) {
    playerIcon.src = "images/sans.png";
  } else {
    playerIcon.src = "images/papyrus.png";
  }

  turnBox.textContent = "Roll for " + gameData.players[gameData.index];
}

function showCurrentScore() {
  for (let i = 0; i < 2; i++) {
    scoreTexts[i].textContent =
      gameData.score[i] + " / " + gameData.gameEnd;

    hpBars[i].style.width =
      (gameData.score[i] / gameData.gameEnd) * 150 + "px";
  }
}

function resetDice() {
  diceImages[0].src = "images/dice1.png";
  diceImages[1].src = "images/dice1.png";
}

function enableButtons(enable) {
  rollBtn.disabled = !enable;
  passBtn.disabled = !enable;

  if (enable) {
    rollBtn.style.opacity = 1;
    passBtn.style.opacity = 1;
  } else {
    rollBtn.style.opacity = 0.5;
    passBtn.style.opacity = 0.5;
  }
}
})();
