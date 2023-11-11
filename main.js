"use strict";

import { GAME_DURATION_SEC } from "./constatns.js";

const CARDS_TYPE = ["🍑", "🍎", "🥝", "🍋", "🍊", "🍌", "🍉", "🍇"];

// querySelector
const startbutton = document.querySelector(".indicator-button");
const gameTimerText = document.querySelector("#game-timer");

// global variable
let started = false;

const cardShuffle = (cardList) => {
  const cardCopy = [...cardList, ...cardList];

  for (let index = cardCopy.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    const temp = cardCopy[index];
    cardCopy[index] = cardCopy[randomIndex];
    cardCopy[randomIndex] = temp;
  }

  return cardCopy;
};

const makeCard = (cardNumber, emoji) => {
  return `
    <li id=card-${cardNumber} class="card">
      <div class="front"></div>
      <div class="back">
        <p>${emoji}</p>
      </div>
    </li>
  `;
};

// 카드 이벤트 할당
const injectCardEvent = () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      e.currentTarget.classList.add("card-over");
    });
  });
};

const initCard = () => {
  const shuffledImage = cardShuffle(CARDS_TYPE);
  let makedCards = "";

  shuffledImage.forEach((image, index) => {
    makedCards += makeCard(index + 1, image);
  });

  const board = document.querySelector("#board");
  board.insertAdjacentHTML("afterbegin", makedCards);

  injectCardEvent();
};

initCard();

const changeTimerText = (currentTime) => {
  gameTimerText.textContent = `time: ${currentTime} secs`;
};

// 타이머
// TO-DO : 화면 표시 안됨
const starGameTimer = () => {
  let timeLeft = GAME_DURATION_SEC;

  const timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      started = false;
      startbutton.disabled = false;
      return;
    }
    timeLeft -= 1;
    changeTimerText(timeLeft);
  }, 1000);
};

const initGame = () => {
  changeTimerText(GAME_DURATION_SEC);
};

startbutton.addEventListener("click", () => {
  if (started) {
    //stopedGame();
  } else {
    started = true;
    // 버튼 disabled 처리
    startbutton.disabled = true;
    initGame();
    starGameTimer();
  }
});

// 메인 기능
// 카드 두 개를 뒤집고,
// 카드 뒷면 이미지가 같으면 그대로 두고,
// 카드 뒷면 이미지가 다르면 다시 원위치 한다.

// 1. 카드 비교하는 함수 < isCardSame isCardCorrect
// 2. 틀렸을 때 카드를 다시 원위치로.. <

/**
 * correct -> +
 * wrong ->
 */

// 카드 뒤집기

// 스코어 카운트

// 게임 시작
const startGame = () => {};

// ----- 추가 기능 -----

// 게임 리셋

// 난이도

// 음악
