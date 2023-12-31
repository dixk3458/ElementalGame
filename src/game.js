'use strict';

import { Field, ItemType } from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  cancel: 'cancel',
});

export class GameBuilder {
  withGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  withBranchCount(num) {
    this.branchCount = num;
    return this;
  }

  withWaterCount(num) {
    this.waterCount = num;
    return this;
  }

  build() {
    return new Game(
      this.gameDuration, //
      this.branchCount, //
      this.waterCount
    );
  }
}

class Game {
  constructor(gameDuration, branchCount, waterCount) {
    this.initialSetting = [gameDuration, branchCount, waterCount];

    this.GAME_DURATION_SEC = gameDuration;
    this.BRANCH_COUNT = branchCount;
    this.WATER_COUNT = waterCount;
    this.gameField = new Field();

    this.started = false;
    this.score = 0;
    this.timer = undefined;
    this.round = 1;

    this.startReason = 'init';

    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');
    this.gameBtn = document.querySelector('.game__button');
    this.guide = document.querySelector('.guide');

    this.gameBtn.addEventListener('click', () => {
      if (this.started) {
        this.stop(Reason.cancel);
      } else {
        this.start();
      }
    });
  }

  onItemClick = item => {
    if (!this.started) {
      return;
    }
    if (item === ItemType.branch) {
      this.score++;
      this.updateScoreBoard(this.score);
      if (this.score === this.BRANCH_COUNT) {
        this.stop(Reason.win);
        this.startReason = 'win';
      }
    } else if (item === ItemType.water) {
      this.stop(Reason.lose);
      this.startReason = 'lose';
      this.round = 1;
    }
  };

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.showStopButton();
    this.hideGuide();
    this.initGame(this.startReason);
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBackground();
  }

  stop(reason) {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    sound.stopBackground();
    this.gameField.stopInterval();
    this.onGameStop && this.onGameStop(reason);
  }

  initGame(reason) {
    this.score = 0;
    this.updateGameSetting(reason);
    this.gameScore.innerText = this.BRANCH_COUNT;
    this.gameField.setSetting(this.BRANCH_COUNT, this.WATER_COUNT, this.round);
    this.gameField.setClickListener(this.onItemClick);
    this.gameField.init();
  }

  updateGameSetting(startReason) {
    switch (startReason) {
      case 'win':
        this.GAME_DURATION_SEC = this.GAME_DURATION_SEC + 1;
        this.BRANCH_COUNT = this.BRANCH_COUNT + 5;
        this.WATER_COUNT = this.WATER_COUNT + 7;
        break;
      case 'lose':
      case 'init':
        [this.GAME_DURATION_SEC, this.BRANCH_COUNT, this.WATER_COUNT] =
          this.initialSetting;
        break;
      default:
        throw new Error('not valid reason');
    }
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
        clearInterval(this.timer);
        this.stop(this.score === this.BRANCH_COUNT ? Reason.win : Reason.lose);
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
