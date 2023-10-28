// constants
const CARDS_TYPE = ["🍑", "🍎", "🥝", "🍋", "🍊", "🍌", "🍉", "🍇"];

// 카드 셔플
/*
  RandomShuffle([b, a, k] * 2)  => [ a, b, a, k, k, b ] 
*/

/**
 const object = { a: 1, b: 2, c: 3 };


 https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/for...in

for (const property in object) {
  console.log(`${property}: ${object[property]}`);
}

// Expected output:
// "a: 1"
// "b: 2"
// "c: 3"
 */

// [
//   1: 'a',
//   2: 'b',
// ]

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

// 타이머

// 스코어 카운트

// 게임 시작
const startGame = () => {
  const startbutton = document.querySelector(".indicator-button");

  startbutton.addEventListener("click", () => {
    const shuffledCard = cardShuffle(CARDS_TYPE);

    console.log(shuffledCard);
  });
};

// ----- 추가 기능 -----

// 게임 리셋

// 난이도

// 음악
