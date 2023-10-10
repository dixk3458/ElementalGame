'use strict';

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.popUpText = document.querySelector('.pop-up__message');
    this.popUpRefresh = document.querySelector('.pop-up__refresh');
    this.popUpRefresh.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(reason, text) {
    const icon = this.popUp.querySelector('.fa-solid');
    if (reason === 'win') {
      icon.classList.remove('fa-arrow-rotate-right');
      icon.classList.add('fa-play');
    } else {
      icon.classList.remove('fa-play');
      icon.classList.add('fa-arrow-rotate-right');
    }
    this.popUpText.innerText = text;
    this.popUp.classList.remove('pop-up--hide');
  }

  hide() {
    this.popUp.classList.add('pop-up--hide');
  }
}
