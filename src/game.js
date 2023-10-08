'use strict';

import Field from './field.js';
import * as sound from './sound.js';

export default class Game {
  constructor(gameDuration, branchCount, waterCount) {
    this.GAME_DURATION_SEC = gameDuration;
    this.BRANCH_COUNT = branchCount;
    this.WATER_COUNT = waterCount;

    this.started = false;
    this.score = 0;
    this.timer = undefined;

    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');
    this.gameBtn = document.querySelector('.game__button');
    this.guide = document.querySelector('.guide');

    this.gameBtn.addEventListener('click', () => {
      if (this.started) {
        this.stop();
      } else {
        this.start();
      }
    });

    this.gameField = new Field(this.BRANCH_COUNT, this.WATER_COUNT);
    this.gameField.setClickListener(this.onItemClick);
  }

  onItemClick = item => {
    if (!this.started) {
      return;
    }
    if (item === 'branch') {
      this.score++;
      this.updateScoreBoard(this.score);
      if (this.score === this.BRANCH_COUNT) {
        this.finish(true);
      }
    } else if (item === 'water') {
      this.finish(false);
    }
  };

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.showStopButton();
    this.hideGuide();
    this.initGame();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBackground();
  }

  stop() {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    this.onGameStop && this.onGameStop('cancel');
    sound.playAlert();
    sound.stopBackground();
  }

  finish(win) {
    this.started = false;
    this.hideGameButton();
    if (win) {
      sound.playWin();
    } else {
      sound.playWater();
    }
    this.stopGameTimer();
    sound.stopBackground();
    this.onGameStop && this.onGameStop(win ? 'win' : 'lose');
  }

  initGame() {
    this.score = 0;
    this.gameScore.innerText = this.BRANCH_COUNT;
    this.gameField.init();
  }

  showStopButton() {
    const icon = this.gameBtn.querySelector('.fa-solid');
    icon.classList.remove('fa-play');
    icon.classList.add('fa-stop');
    this.gameBtn.style.visibility = 'visible';
  }

  showTimerAndScore() {
    this.gameScore.style.visibility = 'visible';
    this.gameTimer.style.visibility = 'visible';
  }

  startGameTimer() {
    let remainingTimeSec = this.GAME_DURATION_SEC;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(timer);
        this.finish(score === this.BRANCH_COUNT);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }

  hideGameButton() {
    this.gameBtn.style.visibility = ' hidden';
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  updateScoreBoard(score) {
    this.gameScore.innerText = this.BRANCH_COUNT - score;
  }

  hideGuide() {
    this.guide.classList.add('guide--hide');
  }
}
