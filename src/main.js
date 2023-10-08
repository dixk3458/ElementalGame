'use strict';

import PopUp from './popup.js';
import Field from './field.js';
import * as sound from './sound.js';

const WATER_COUNT = 5;
const BRANCH_COUNT = 5;

const GAME_DURATION_SEC = 5;

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const guide = document.querySelector('.guide');

let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
const gameField = new Field(BRANCH_COUNT, WATER_COUNT);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
  if (!started) {
    return;
  }
  if (item === 'branch') {
    score++;
    updateScoreBoard(score);
    if (score === BRANCH_COUNT) {
      finishGame(true);
    }
  } else if (item === 'water') {
    finishGame(false);
  }
}

gameFinishBanner.setClickListener(() => {
  startGame();
});

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

function startGame() {
  started = true;
  showStopButton();
  hideGuide();
  initGame();
  showTimerAndScore();
  startGameTimer();
  sound.playBackground();
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(score === BRANCH_COUNT);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function hideGameButton() {
  gameBtn.style.visibility = ' hidden';
}

function showTimerAndScore() {
  gameScore.style.visibility = 'visible';
  gameTimer.style.visibility = 'visible';
}

function showStopButton() {
  const icon = gameBtn.querySelector('.fa-solid');
  icon.classList.remove('fa-play');
  icon.classList.add('fa-stop');
  gameBtn.style.visibility = 'visible';
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  gameFinishBanner.showWithText('REPLAY ❓');
  sound.playAlert();
  sound.stopBackground();
}

function finishGame(win) {
  started = false;
  hideGameButton();
  if (win) {
    sound.playWin();
  } else {
    sound.playWater();
  }
  stopGameTimer();
  sound.stopBackground();
  gameFinishBanner.showWithText(win ? 'YOU WIN 🎉' : 'YOU LOST 😜');
}

function stopGameTimer() {
  clearInterval(timer);
}

function initGame() {
  score = 0;
  gameScore.innerText = BRANCH_COUNT;
  gameField.init();
}

function updateScoreBoard(score) {
  gameScore.innerText = BRANCH_COUNT - score;
}

function hideGuide() {
  guide.classList.add('guide--hide');
}
