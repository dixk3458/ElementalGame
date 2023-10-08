'use strict';

import Game from './game.js';
import PopUp from './popup.js';

const game = new Game(8, 10, 10);
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
