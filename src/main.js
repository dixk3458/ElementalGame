'use strict';

import GameBuilder from './game.js';
import PopUp from './popup.js';

const game = new GameBuilder()
  .withGameDuration(10)
  .withBranchCount(10)
  .withWaterCount(20)
  .build();

const gameFinishBanner = new PopUp();

game.setGameStopListener(reason => {
  let message;
  switch (reason) {
    case 'cancel':
      message = 'REPLAY ❓';
      break;
    case 'win':
      message = 'YOU WIN 🎉';
      break;
    case 'lose':
      message = 'YOU LOST 😜';
      break;
    default:
      throw new Error('not valid reason');
  }

  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
