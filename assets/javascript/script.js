/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

console.log("Javascript Connected.");

var scores, roundScore, activePlayer, dice, gamePlaying;

newGame();

function newGame() {
  scores = [0, 0, 0];
  roundScore = 0;
  activePlayer = 1;
  gamePlaying = true;

  document.getElementById("score-1").textContent = "0";
  document.getElementById("score-2").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("current-2").textContent = "0";
  document.getElementById("player-1").textContent = "Player 1";
  document.getElementById("player-2").textContent = "Player 2";
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-2-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-2-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.add("active");

  console.log("New game initiated.");
}

document.querySelector(".btn-new").addEventListener("click", function () {
  newGame();
});

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    console.log("Dice Rolled.");
    // Random numbers for dice
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // Update UI
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";
    document.getElementById("dice-1").src =
      "./assets/images/dice-" + dice1 + ".png";
    document.getElementById("dice-2").src =
      "./assets/images/dice-" + dice2 + ".png";

    if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice1 + dice2;

      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});
function nextPlayer() {
  activePlayer === 1 ? (activePlayer = 2) : (activePlayer = 1);
  console.log("Player " + activePlayer + "'s turn");
  roundScore = 0;

  document.getElementById("current-1").textContent = "0";
  document.getElementById("current-2").textContent = "0";

  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".player-2-panel").classList.toggle("active");
}

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;

    console.log(scores);

    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    var winningScore = 100;

    if (scores[activePlayer] >= winningScore) {
      document.getElementById("player-" + activePlayer).textContent = "Winner!";

      document.querySelector(".dice").style.display = "none";

      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});
