const gameSummary = {
  numbers: 0,
  wins: 0,
  losses: 0,
  draws: 0,
};

const game = { playerChoice: "", aiChoice: "" };

const choices = [...document.querySelectorAll(".select img")];

// choicePlayer

function choiceSelection() {
  game.playerChoice = this.dataset.option;
  choices.forEach((choice) => (choice.style.boxShadow = ""));
  this.style.boxShadow = "0 0 0 4px pink";
}

// choiceAI

function aiMove() {
  return choices[Math.floor(Math.random() * 3)].dataset.option;
}

// Funkcja zwracajająca informacje o wyniku gry

function checkResult(player, ai) {
  if (player === ai) {
    return "draw";
  } else if (
    (player === "papier" && ai === "kamień") ||
    (player === "kamień" && ai === "nożyce") ||
    (player === "nożyce" && ai === "papier")
  ) {
    return "win";
  } else {
    return "loss";
  }
}

// Publikacja wyniku

function publishResult(player, ai, result) {
  document.querySelector('[data-summary="your-choice"]').textContent = player;

  document.querySelector('[data-summary="ai-choice"]').textContent = ai;

  document.querySelector("p.numbers span").textContent = ++gameSummary.numbers;

  if (result === "win") {
    document.querySelector("p.wins span").textContent = ++gameSummary.wins;
    document.querySelector('[data-summary="who-win"]').textContent =
      "Wygrało prawdziwe Bubu!";
    document.querySelector('[data-summary="who-win"]').style.color = "pink";
  } else if (result === "loss") {
    document.querySelector("p.losses span").textContent = ++gameSummary.losses;
    document.querySelector('[data-summary="who-win"]').textContent =
      "Fałszywe Bubu wygrało";
    document.querySelector('[data-summary="who-win"]').style.color = "red";
  } else {
    document.querySelector("p.draws span").textContent = ++gameSummary.draws;
    document.querySelector('[data-summary="who-win"]').textContent = "Remis";
    document.querySelector('[data-summary="who-win"]').style.color = "gray";
  }
}

function endGame() {
  document.querySelector(
    `[data-option="${game.playerChoice}"]`
  ).style.boxShadow = "";
  game.playerChoice = "";
  game.aiChoice = "";
}

// sterowanie

function startGame() {
  if (game.playerChoice === "") {
    return alert("wybierz Bubu!");
  }
  game.aiChoice = aiMove();
  const gameResult = checkResult(game.playerChoice, game.aiChoice);
  publishResult(game.playerChoice, game.aiChoice, gameResult);
  endGame();
}
choices.forEach((choice) => choice.addEventListener("click", choiceSelection));

document.querySelector(".start").addEventListener("click", startGame);
