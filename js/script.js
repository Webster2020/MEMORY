'use strict'

/*===============================================================*/
/*===============================================================*/
/*=========================  G A M E  ===========================*/
/*===============================================================*/
/*===============================================================*/


/*---------------------------------------------------*/
/*------------------ CREATING BOARD -----------------*/
/*---------------------------------------------------*/

/* declaration values of process */
let creatProcess = false;
let boardSize = "";

function boardCreation (cardsAmount){ 
  /* results const */
  const score = document.querySelector(".score");
  const highscore16 = document.querySelector(".highscore-16 .highscore");
  const highscore36 = document.querySelector(".highscore-36 .highscore");
  const winMessage = document.querySelector(".win-message");
  const msgScore = document.querySelector(".msg-score");
  
  const gameBoard = document.querySelector(".game-board");
  gameBoard.classList.remove("game-board-invisible");
  console.log(gameBoard.outerHTML);
  if (creatProcess == true) {
    for (let i = 0; i < boardSize; i++) {
      const tester = gameBoard.children[0];
      tester.outerHTML = "";
    }
    winMessage.classList.remove("win-message-visible");
    winMessage.classList.add("win-message-invisible"); 
  }  
  /* values of process */
  creatProcess = true;
  boardSize = cardsAmount;
  
  /* generating size of board */
  if (cardsAmount == 16) {
    gameBoard.classList.add("game-board-size-16");
    gameBoard.classList.remove("game-board-size-36");
  } else if (cardsAmount == 36) {
    gameBoard.classList.add("game-board-size-36");
    gameBoard.classList.remove("game-board-size-16");
  }
  /* generating cards on board */
  const cardHtml = `<div class = "card card-invisible card-not-shotted"></div>\n`;
  let cardsHtml = [];
  let colorArr = [];
  for (let i = 0; i < cardsAmount; i++) {
    cardsHtml.push(cardHtml);
    /* function to generate array witch random colors (lenght of array in variable) */
    if (i == 0 || i % 2 === 0) {
      const color = Math.floor(Math.random()*16777215).toString(16);
      colorArr.push("#" + color);
    }
  }
  gameBoard.insertAdjacentHTML("afterbegin", cardsHtml.join(""));
  /* creating finally array of colors */
  const doubleColorArr = colorArr.concat(colorArr);
  
  const cards = document.querySelectorAll(".card");
  /* creating array of zeros */
  const finallColorArr = [];
  for (let j = 0; j < doubleColorArr.length; j++) {
    finallColorArr.push(0);
  }
  
  /* lottery of pairs of colors */
  const sizeOfArray = doubleColorArr.length;
  
  while (doubleColorArr.length > 0){
    let cardColorPosition = Math.floor(Math.random() * sizeOfArray);
    if (finallColorArr[cardColorPosition] != 0) {
      cardColorPosition = Math.floor(Math.random() * sizeOfArray);
    } else {
      finallColorArr[cardColorPosition] = doubleColorArr.pop();
    }
  }
  /* adding colors to cards */
  let k = 0;
  for (let card of cards) {
    card.style.backgroundColor = finallColorArr[k];
    k++;;
  }

/*--------------------------------------------------*/
/*--------------- EVENTS FOR CARDS -----------------*/
/*--------------------------------------------------*/

  function cardClickHandler(event) {
    event.stopPropagation();
    //event.target.classList.toggle("card-visible");
    event.target.classList.toggle("card-invisible");
    clickCounter++;
    /* getting color value of curent clicked card (in first click and second click)*/
    if (clickCounter == 1) {
      cardOne = event.target;
      /* remove cardClickHandler on clcked card*/
      cardOne.removeEventListener("click", cardClickHandler);
      /*----*/
    } else if (clickCounter == 2) {
      cardTwo = event.target;
      /* remove cardClickHandler on clcked card*/
      cardOne.removeEventListener("click", cardClickHandler);
      movesCounter++;
      score.innerHTML = movesCounter;
      /* check is two clicked card has the same color */
      if (cardOne.getAttribute("style") == cardTwo.getAttribute("style")) {
        cardOne.classList.toggle("card-shotted");
        cardOne.classList.remove("card-not-shotted");
        cardTwo.classList.toggle("card-shotted");
        cardTwo.classList.remove("card-not-shotted");
        /* winning "click" counter */
        shottedCounter++;
        if (shottedCounter == cardsAmount * 0.5) {
          /* add highscore16 to HTML */
          if ((cardsAmount == 16) && (highscore16.innerHTML > movesCounter)) {
            highscore16.innerHTML = movesCounter;
            /*WINNING MESSAGE*/
            winMessage.classList.toggle("win-message-visible");
            winMessage.classList.toggle("win-message-invisible");
            msgScore.innerHTML = movesCounter;
            /* clearing curent score in HTML */
            score.innerHTML = "0";
          }
          /* add highscore16 to HTML */
          if ((cardsAmount == 36) && (highscore36.innerHTML > movesCounter)) {
            highscore36.innerHTML = movesCounter;
            /*WINNING MESSAGE*/
            winMessage.classList.toggle("win-message-visible");
            winMessage.classList.toggle("win-message-invisible");
            msgScore.innerHTML = movesCounter;
            /* clearing curent score in HTML */
            score.innerHTML = "0";      
          }
        }
      } 
    }

    /* hidding visibility of cards after second "click" */ 
    if (clickCounter > 2) {      
      clickCounter = 0;
      for (let card of cards) {
      card.classList.add("card-invisible");
      cardOne.addEventListener("click", cardClickHandler); // NEW !!!!
      }   
    }
  }
  
  let clickCounter = 0;
  let shottedCounter = 0;
  let movesCounter = 0;
  let cardOne = "";
  let cardTwo = "";
  
  for (let card of cards) {
  
    card.addEventListener("click", cardClickHandler);

    card.addEventListener("mouseover", (event) => {
      event.stopPropagation();
      event.target.classList.add("cursor-on-card");
    });

    card.addEventListener("mouseout", (event) => {
      event.stopPropagation();
      event.target.classList.remove("cursor-on-card");
    });
  }  
} // board creation END

/*-------------------------------------------------------*/
/*--------------- BUTTONS TO START GAME -----------------*/
/*-------------------------------------------------------*/

const buttonGameSmall = document.querySelector(".btn-16");
buttonGameSmall.addEventListener("click", function(){boardCreation(16)});

const buttonGameBig = document.querySelector(".btn-36");
buttonGameBig.addEventListener("click", function(){boardCreation(36)});

const buttons = document.querySelectorAll(".btn");
for (button of buttons) {
  button.addEventListener("mouseover", (event) => {
    event.stopPropagation();
    event.target.classList.add("cursor-on-btn");
  });
  button.addEventListener("mouseout", (event) => {
    event.stopPropagation();
    event.target.classList.remove("cursor-on-btn");
  });
}