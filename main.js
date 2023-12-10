"use strict";

import { GAME_DURATION_SEC } from "./constatns.js";

// ----- 추가 기능 -----
// 난이도
// 음악
// 게임 끝 모달 UI

// TODO:
// 4. 게임 끝 ( alert )
// 5. 게임 리셋

const CARDS_TYPE = ["🍑", "🍎", "🥝", "🍋", "🍊", "🍌", "🍉", "🍇"];

// querySelector
const startbutton = document.querySelector(".indicator-button");
const gameMoveCount = document.querySelector("#move-counter");
const gameTimerText = document.querySelector("#game-timer");

// global variable
let started = false;
let moveCount = 0;
let card_1 = null;
let card_2 = null;
let shuffledCards = [];

const cardShuffle = (cardList) => {
  const cardCopy = [...cardList, ...cardList].map((emoji, index) =>
    makeCard(emoji, index)
  );

  console.log(cardCopy); // TODO:지우지 말 것..!

  for (let index = cardCopy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index - 1));

    const temp = cardCopy[index];
    cardCopy[index] = cardCopy[randomIndex];
    cardCopy[randomIndex] = temp;
  }

  return cardCopy;
};

const makeCard = (emoji, index) => {
  return {
    emoji,
    isOpened: false,
    id: `card-${index + 1}`,
  };
};

const renderCard = (cardId, emoji) => {
  return `
    <li id=${cardId} class="card">
      <div class="front"></div>
      <div class="back">
        <p>${emoji}</p>
      </div>
    </li>
  `;
};

const injectCardEvent = (shuffledCards) => {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      if (!started) {
        return;
      }

      if (checkCardCanReverse(card)) {
        reverseCard(card.id);

        if (card_1 === null) {
          card_1 = card;
          return;
        }

        if (card_1) {
          card_2 = card;
          checkCardIsSame(card_1, card_2);
          updateMoveCount();
          updateMoveCountText(moveCount);
        }
      }
    });
  });
};

const resetSelectedCards = () => {
  card_1 = null;
  card_2 = null;
};

const initCard = () => {
  shuffledCards = cardShuffle(CARDS_TYPE);
  let makedCards = "";

  shuffledCards.forEach(({ id, emoji }) => {
    makedCards += renderCard(id, emoji);
  });

  const board = document.querySelector("#board");
  board.insertAdjacentHTML("afterbegin", makedCards);

  injectCardEvent(shuffledCards);
};

const updateMoveCountText = (currentMoveCount) => {
  gameMoveCount.textContent = `${currentMoveCount} moves`;
};

const updateTimerText = (currentTime) => {
  gameTimerText.textContent = `time: ${currentTime} secs`;
};

initCard();

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
    updateTimerText(timeLeft);
  }, 1000);
};

const initGame = () => {
  updateTimerText(GAME_DURATION_SEC);
};

startbutton.addEventListener("click", () => {
  if (started) {
    //stopedGame();
  } else {
    started = true;
    startbutton.disabled = true;
    initGame();
    starGameTimer();
  }
});

const updateMoveCount = () => {
  moveCount += 1;
};

const updateShuffledCardInfo = (card1, card2) => {
  shuffledCards = shuffledCards.map((card) => {
    if (card1.id === card.id || card2.id === card.id) {
      return {
        ...card,
        isOpened: true,
      };
    }
    return card;
  });

  console.log(shuffledCards);
};

const checkCardIsSame = (card1, card2) => {
  if (card1.innerText === card2.innerText) {
    updateShuffledCardInfo(card1, card2);
    resetSelectedCards();
    return;
  }

  if (card1.innerText !== card2.innerText) {
    setTimeout(() => {
      reverseCard(card_1.id);
      reverseCard(card_2.id);
      resetSelectedCards();
    }, 1000);
  }
};

const reverseCard = (cardId) => {
  const targetCard = document.querySelector(`#${cardId}`);

  targetCard.classList.toggle("card-over");
};

const checkCardCanReverse = (selectCard) => {
  const selectCardData = shuffledCards.find(
    (card) => card.id === selectCard.id
  );

  if (selectCardData.isOpened) {
    return false;
  }
  if (card_1 && card_2) {
    return false;
  }

  if (card_1 === null) {
    return true;
  }

  if (card_1.id === selectCard.id) {
    return false;
  }

  return true;
};
