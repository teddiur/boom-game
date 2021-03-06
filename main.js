const buttonsGameLevelContainer = document.querySelector(".levels");
const buttonsGameLevel = buttonsGameLevelContainer.querySelectorAll("input");
const balloonsContainer = document.querySelector(".container-balloons");
const balloonLimit = 10;
const timeLevel = {
  easy: 2000,
  medium: 1000,
  hard: 500
};
let validPoint = true;

let level = document.querySelector(".levels input:checked").value
function setLevel() {
  level = this.value
}

const scoreNumber = document.querySelector(".score-number");
function updateScore() {
  const score = parseInt(scoreNumber.innerText, 10);
  scoreNumber.innerText = score + 1;
}

const recordNumber = document.querySelector(".record-number");
function updateRecord() {
  const score = parseInt(scoreNumber.innerText, 10);
  const record = parseInt(recordNumber.innerText, 10)
  if (score > record) {
    recordNumber.innerText = scoreNumber.innerText;
  }
}

function reinitGame() {
  document.querySelector(".game-over-container").remove();
  document.querySelectorAll(".balloon").forEach(function (element) { element.remove() });
  scoreNumber.innerText = 0;
  validPoint = true;
}

function initGame() {
  if (document.querySelector(".game-over-container")) {
    reinitGame()
  }

  const idInterval = setInterval(manageGame, timeLevel[level]);
  function manageGame() {
    const allBallons = document.querySelectorAll(".balloon");
    if (allBallons.length >= balloonLimit) {
      clearInterval(idInterval);
      showGameOver();
      return
    }
    createBalloon();
  }

}

function createBalloon() {
  const elementImg = document.createElement("img");
  const positionLeft = (Math.random() * 80).toFixed(1) + 5;
  const positionTop = (Math.random() * 55).toFixed(1) + 20;
  const colorFilter = Math.random() * 360;

  elementImg.setAttribute("src", "./assets/baloon.png");
  elementImg.setAttribute("class", "balloon");
  elementImg.style.left = positionLeft + "vw";
  elementImg.style.top = positionTop + "vh";
  elementImg.style.filter = `hue-rotate(${colorFilter}deg)`;

  elementImg.addEventListener("click", function () {
    removeBalloon(this);
  });

  balloonsContainer.appendChild(elementImg);
}

function removeBalloon(element) {
  const boomSound = new Audio("./assets/boom.mpeg");
  boomSound.play();
  boomSound.volume = 0.1;
  if (validPoint) {
    updateScore()
  }
  element.remove();
}

function showGameOver() {
  validPoint = false;
  updateRecord();

  const sectionGameOver = document.createElement("section");
  sectionGameOver.setAttribute("class", "game-over-container");

  const textGameOver = document.createElement("h2");
  textGameOver.innerText = "Você perdeu, loser!";
  textGameOver.style.color = "#000000";

  const tauntText = document.createElement("p");
  tauntText.style.fontStyle = "italic"
  tauntText.innerText = "vai chorar ou"

  const finalScore = document.createElement("p");
  finalScore.style.fontWeight = "700";
  finalScore.innerText = `Pontuação final: ${scoreNumber.innerText}`;

  buttonInitGame.style.display = "initial";
  buttonInitGame.style.bottom = "5px"
  buttonInitGame.innerText = "Jogar novamente?";

  sectionGameOver.appendChild(textGameOver);
  sectionGameOver.appendChild(finalScore);
  sectionGameOver.appendChild(tauntText);
  sectionGameOver.appendChild(buttonInitGame);
  balloonsContainer.appendChild(sectionGameOver);
}

buttonsGameLevel.forEach((button) => { button.addEventListener("click", setLevel) });

const buttonInitGame = document.querySelector(".btn-init-game");
buttonInitGame.addEventListener("click", function () {
  buttonInitGame.style.display = "none";
  const levels = document.querySelector(".game-levels");
  if (levels) { levels.remove(); }
  initGame();
});