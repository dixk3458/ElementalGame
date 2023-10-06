'use strict';

const ITEM_SIZE = 80;

const WATER_COUNT = 5;
const BRANCH_COUNT = 5;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

let started = false;
let score = BRANCH_COUNT;
let time = undefined;

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
});

function startGame() {
  showStopButton();
  initGame();
  showTimerAndScore();
  startGameTimer();
}

function showTimerAndScore() {
  gameScore.style.visibility = 'visible';
  gameTimer.style.visibility = 'visible';
}

function showStopButton() {
  const icon = gameBtn.querySelector('.fa-play');
  icon.classList.remove('fa-play');
  icon.classList.add('fa-stop');
}

function stopGame() {}

function initGame() {
  field.innerText = '';
  gameScore.innerText = BRANCH_COUNT;
  addItem('water', WATER_COUNT, './images/water.png');
  addItem('branch', BRANCH_COUNT, './images/branch.png');
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
