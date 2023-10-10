'use strict';

const branchSound = new Audio('./sound/branch_pull.mp3');
const ITEM_SIZE = 80;
export const ItemType = Object.freeze({
  branch: 'branch',
  water: 'water',
});

export class Field {
  constructor(branchCount, waterCount) {
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();

    this.field.addEventListener('click', this.onClick);

    this.intervals = [];
  }

  setSetting(branchCount, waterCount, round) {
    this.branchCount = branchCount;
    this.waterCount = waterCount;
    if (round > 2) {
    }
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  init() {
    this.field.innerText = '';
    this.#addItem('branch', this.branchCount, './images/branch.png');
    this.#addItem('water', this.waterCount, './images/water.png');
  }

  #addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - ITEM_SIZE;
    const y2 = this.fieldRect.height - ITEM_SIZE;

    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);

      const intervalId = setInterval(() => {
        const newX = randomNumber(x1, x2);
        const newY = randomNumber(y1, y2);

        item.style.left = `${newX}px`;
        item.style.top = `${newY}px`;
      }, 1000);
      this.intervals.push(intervalId);
    }
  }

  stopInterval() {
    this.intervals.forEach(intervalId => {
      clearInterval(intervalId);
    });
  }

  onClick = event => {
    const target = event.target;
    if (target.matches('.branch')) {
      target.remove();
      playSound(branchSound);

      this.onItemClick && this.onItemClick(ItemType.branch);
    } else if (target.matches('.water')) {
      this.onItemClick && this.onItemClick(ItemType.water);
    }
  };
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
