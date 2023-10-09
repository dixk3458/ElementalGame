'use strict';

import { GameBuilder, Reason } from './game.js';
import PopUp from './popup.js';
import * as sound from './sound.js';

const game = new GameBuilder()
  .withGameDuration(10)
  .withBranchCount(10)
  .withWaterCount(20)
  .build();

const gameFinishBanner = new PopUp();

game.setGameStopListener(reason => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = 'REPLAY ❓';
      sound.playAlert();
      break;
    case Reason.win:
      message = 'YOU WIN 🎉';
      sound.playWin();
      break;
    case Reason.lose:
      message = 'YOU LOST 😜';
      sound.playWater();
      break;
    default:
      throw new Error('not valid reason');
  }

  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
