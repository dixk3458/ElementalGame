'use strict';

const branchSound = new Audio('./sound/branch_pull.mp3');
const ITEM_SIZE = 80;

export default class Field {
  constructor(branchCount, waterCount) {
    this.branchCount = branchCount;
    this.waterCount = waterCount;

    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener('click', this.onClick);
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
    }
  }

  onClick(event) {
    const target = event.target;
    if (target.matches('.branch')) {
      target.remove();
      playSound(branchSound);
      this.onItemClick && this.onItemClick('branch');
    } else if (target.matches('.water')) {
      this.onItemClick && this.onItemClick('water');
    }
  }
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
