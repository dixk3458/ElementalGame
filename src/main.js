'use strict';

import { GameBuilder, Reason } from './game.js';
import PopUp from './popup.js';
import * as sound from './sound.js';

const game = new GameBuilder()
  .withGameDuration(5)
  .withBranchCount(3)
  .withWaterCount(5)
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

  gameFinishBanner.showWithText(reason, message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
  game.startReason = 'init';
});
