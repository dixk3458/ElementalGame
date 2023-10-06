'use strict';

const ITEM_SIZE = 80;

const WATER_COUNT = 5;
const BRANCH_COUNT = 5;

const GAME_DURATION_SEC = 5;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');

const branchSound = new Audio('./sound/branch_pull.mp3');
const waterSound = new Audio('./sound/water_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const backgroundSound = new Audio('./sound/bg.mp3');
const winSound = new Audio('./sound/game_win.mp3');

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

field.addEventListener('click', onFieldClick);

popUpRefresh.addEventListener('click', () => {
  startGame();
  hidePopUp();
});

function startGame() {
  started = true;
  showStopButton();
  initGame();
  showTimerAndScore();
  startGameTimer();
  playSound(backgroundSound);
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
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  showPopUpWithText('REPLAY❓');
  playSound(alertSound);
  stopSound(backgroundSound);
}

function finishGame(win) {
  started = false;
  hideGameButton();
  if (win) {
    playSound(winSound);
  } else {
    playSound(waterSound);
  }
  stopGameTimer();
  stopSound(backgroundSound);
  showPopUpWithText(win ? 'YOU WIN 🎉' : 'YOU LOST 😜');
}

function stopGameTimer() {
  clearInterval(timer);
}

function showPopUpWithText(text) {
  popUpText.innerText = text;
  popUp.classList.remove('pop-up--hide');
}

function hidePopUp() {
  popUp.classList.add('pop-up--hide');
}

function initGame() {
  score = 0;
  field.innerText = '';
  gameScore.innerText = BRANCH_COUNT;
  addItem('water', WATER_COUNT, './images/water.png');
  addItem('branch', BRANCH_COUNT, './images/branch.png');
}

function onFieldClick(event) {
  if (!started) {
    return;
  }
  const target = event.target;
  if (target.matches('.branch')) {
    target.remove();
    score++;
    playSound(branchSound);
    updateScoreBoard(score);
    if (score === BRANCH_COUNT) {
      finishGame(true);
    }
  } else if (target.matches('.water')) {
    finishGame(false);
  }
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

function updateScoreBoard(score) {
  gameScore.innerText = BRANCH_COUNT - score;
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - ITEM_SIZE;
  const y2 = fieldRect.height - ITEM_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
