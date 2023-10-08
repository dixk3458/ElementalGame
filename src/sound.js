'use strict';

const branchSound = new Audio('./sound/branch_pull.mp3');
const waterSound = new Audio('./sound/water_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const backgroundSound = new Audio('./sound/bg.mp3');
const winSound = new Audio('./sound/game_win.mp3');

export function playBranch() {
  playSound(branchSound);
}

export function playWater() {
  playSound(waterSound);
}

export function playAlert() {
  playSound(alertSound);
}

export function playWin() {
  playSound(winSound);
}
export function playBackground() {
  playSound(backgroundSound);
}

export function stopBackground() {
  stopSound(backgroundSound);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
