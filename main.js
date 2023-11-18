"use strict";

import { GAME_DURATION_SEC } from "./constatns.js";

// 11/18 -> 카드 뒤집기 로직 테스트 실패 , shuffleCard 객치 배열 구조 만들기부터

const CARDS_TYPE = ["🍑", "🍎", "🥝", "🍋", "🍊", "🍌", "🍉", "🍇"];

[
  {
    emoji: "🍑",
    status: false, //
    id: "", // 몇번 째 카드인건지 index +1
  },
  "🍎",
  "🥝",
  "🍋",
  "🍊",
  "🍌",
  "🍉",
  "🍇",
  "🍑",
  "🍎",
  "🥝",
  "🍋",
  "🍊",
  "🍌",
  "🍉",
  "🍇",
];

// querySelector
const startbutton = document.querySelector(".indicator-button");
const gameTimerText = document.querySelector("#game-timer");

// global variable
let started = false;
let score = 0;
let card_1 = null;
let card_2 = null;
let shuffledCards = []; //TODO: 이거 해야 함!

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
const injectCardEvent = (shuffledCards) => {
  // 여기서 클릭한 카드의 status를 find 메서드로 검색 ->
  const cards = document.querySelectorAll(".card");

  // 이미 클릭한 카드(같은 카드)를 다시 클릭하면 무효
  // 이미 맞춘 카드를 클릭하면 X

  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      console.log(e.currentTarget);
      reverseCard(card.id);
      // 함수 하나 추가 click한 카드의 Status가 true인지 확인하는 함수
      /**
       * if(isAlreadyCorrectCard()) {
       *   return;
       * }
       */
      // card_1 || card_2의 status가 ㅅㄱ
      // card_1 ===  card_2 건

      if (checkCardCanReverse(card)) {
        if (card_1 === null) {
          card_1 = card;
          return;
        }
        card_2 = card;
      }

      checkCardIsSame(card_1, card_2);
    });
  });
};

const initCard = () => {
  shuffledCards = cardShuffle(CARDS_TYPE); // here
  let makedCards = "";

  shuffledCards.forEach((image, index) => {
    makedCards += makeCard(index + 1, image);
  });

  const board = document.querySelector("#board");
  board.insertAdjacentHTML("afterbegin", makedCards);

  injectCardEvent(shuffledCards);
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
 * card_1 === card_2 --> correct 함수 호출
 * card_1 !== card_2 --> wrong 함수 호출
 *
 *
 * card_1 = {
 * emoji: '',
 * id: '10' //
 * }
 */

const checkCardIsSame = (card1, card2) => {
  if (card1.emoji === card2.emoji) {
    console.log(111);
    // 스코어 + 1 -> correct 함수 호출
    score += 1;
    // 상태도 바꿔야 함
    return;
  }

  if (card1.emoji !== card2.emoji) {
    console.log(222);
    // 다시 카드 뒤집기 -> wrong 함수 호출
    reverseCard(card_1.id);
    reverseCard(card_2.id);
    card_1 = null;
    card_2 = null;
  }
};

// targetCard: e.currentTarget.classList (X)
// id
const reverseCard = (cardId) => {
  console.log(cardId); // card-5
  const targetCard = document.querySelector(`#${cardId}`);

  targetCard.classList.toggle("card-over");
};

// 중복 (같은 카드 두 번 클릭), 맞춘 카드 클릭,
const checkCardCanReverse = (selectCard) => {
  // true, false

  if (card_1 === null) {
    return true;
  }

  if (selectCard.status === true) {
    return false;
  }

  if (card_1.id === selectCard.id) {
    return false;
  }

  return true;
};

/**
 * glonal
 * let card_1 = null;
 * let card_2 = null;
 */

// 카드 뒤집기

// 스코어 카운트

// 게임 시작
const startGame = () => {};

// ----- 추가 기능 -----

// 게임 리셋

// 난이도

// 음악
