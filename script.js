let modalBtn = document.querySelector(".rulesBtn");
let modal = document.querySelector(".rulesOverlay");
let playerSelection = document.querySelectorAll(".inputItem .item");
let inputSection = document.querySelectorAll(".inputItem");
let plyrChoiceDisplay = document.querySelectorAll(
  ".rsltDisplay .player .choice .item"
);
let compChoiceDisplay = document.querySelectorAll(
  ".rsltDisplay .comp .choice .item"
);
let plyrChoice;
let compChoice;
let result;
let score = 0;
const optnsArray = ["rock", "paper", "scissors"];
function ruleToggle(trgt) {
  if (
    trgt == modal ||
    trgt == document.querySelector(".closeBtn") ||
    trgt == document.querySelector(".fa-xmark")
  ) {
    modal.classList.toggle(`showRule`);
  }
}
// Paper beats Rock
// - Rock beats Scissors
// - Scissors beats Paper
function gameLogic(plyrChoice, compChoice) {
  if (plyrChoice === compChoice) {
    return "Draw";
  } else {
    let rslt;
    switch (`${plyrChoice}+${compChoice}`) {
      case "paper+rock":
      case "rock+paper":
        rslt = "paper";
        break;

      case "rock+scissors":
      case "scissors+rock":
        rslt = "rock";
        break;

      case "scissors+paper":
      case "paper+scissors":
        rslt = "scissors";
        break;

      default:
        break;
    }
    return rslt === plyrChoice ? "you win" : "you lose";
  }
}
function ScoreDisplay() {
  score = +localStorage.getItem("score") || 0;
  document.querySelector(".rsltDisplay .finalRslt h2").innerText = result;
  switch (result) {
    case "you win":
      score += 1;

      break;
    case "you lose":
      break;
    case "Draw":
      break;

    default:
      break;
  }
  localStorage.setItem("score", score);
  document.querySelector(".mainBar span h2").innerText = score;
}
function resultDisplay() {
  document
    .querySelector(".rsltDisplay .finalRslt")
    .classList.contains("rsltAnimation") &&
    document
      .querySelector(".rsltDisplay .finalRslt")
      .classList.remove("rsltAnimation");
  document
    .querySelector(".rsltDisplay .finalRslt")
    .classList.add("rsltAnimation");
  setTimeout(() => {
    document.querySelector(".rsltDisplay .finalRslt").style.display = "grid";
  }, 100);
}
function compSelectionDisplay() {
  let a = Math.round(Math.random() * 2);
  compChoiceDisplay.forEach((compItem) => {
    compItem.style.display = "none";
    if (compItem.getAttribute("data-val") === optnsArray[a]) {
      console.log(compItem);
      compItem.style.display = "grid";
    }
  });
  return optnsArray[a];
}
//
function playerSelectionDisplay() {
  plyrChoiceDisplay.forEach((plyrItem) => {
    plyrItem.style.display = "none";
    if (plyrItem.getAttribute("data-val") === plyrChoice) {
      console.log(plyrItem);
      plyrItem.style.display = "grid";
    }
  });
}
function gameFlow(selectedVal) {
  document.querySelector(".masterContainer").style.display = "none";
  plyrChoice = selectedVal.getAttribute("data-val");
  playerSelectionDisplay();
  compChoice = compSelectionDisplay();
  result = gameLogic(plyrChoice, compChoice);
  console.log(result);
  document.querySelector(".rsltDisplay").style.display = "grid";
  setTimeout(() => {
    resultDisplay();
    switch (result) {
      case "you win":
        document
          .querySelectorAll(".rsltDisplay .player .item")
          .forEach((item) => {
            item.classList.add("winner");
            console.log("player");
          });
        break;
      case "you lose":
        document
          .querySelectorAll(".rsltDisplay .comp .item")
          .forEach((item) => {
            item.classList.add("winner");
            console.log("comp");
          });
        break;
      case "Draw":
        break;

      default:
        break;
    }
  }, 500);
  ScoreDisplay();
}
//
playerSelection.forEach((selectedVal) => {
  selectedVal.addEventListener("click", () => {
    gameFlow(selectedVal);
  });
});

document
  .querySelector(".rsltDisplay .finalRslt .playAgainBtn")
  .addEventListener("click", () => {
    document.querySelectorAll(".rsltDisplay .item").forEach((item) => {
      item.classList.remove("winner");
    });
    document.querySelector(".masterContainer").style.display = "grid";
    document.querySelector(".rsltDisplay").style.display = "none";
  });
//
//
modalBtn.addEventListener("click", () => {
  modal.classList.toggle(`showRule`);
});
window.addEventListener("click", (e) => ruleToggle(e.target));
window.onload = document.querySelector(".mainBar span h2").innerText =
  +localStorage.getItem("score") || 0;
