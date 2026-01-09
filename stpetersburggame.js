document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("game-container");

  // Inject the game UI into the container
  container.innerHTML = `
    <div style="text-align:center;">
      <div id="pot">Current pot: $2</div>
      <button id="flipBtn" style="margin-top:10px;">Flip the coin!</button>
      <div id="result" style="margin-top:10px;"></div>
      <div id="stats" style="margin-top:5px; font-size:0.85em; color:#555;"></div>
    </div>
  `;

  // Game state
  let stakeStart = 2;
  let currentStake = stakeStart;
  let flipCount = 0;
  let gameOver = false;

  let gamesPlayed = 0;
  let totalWinnings = 0;

  const potEl    = document.getElementById("pot");
  const resultEl = document.getElementById("result");
  const statsEl  = document.getElementById("stats");
  const flipBtn  = document.getElementById("flipBtn");

  function updateGameDisplay(msg) {
    potEl.textContent = "Current pot: $" + currentStake;
    resultEl.textContent = msg;
    statsEl.textContent =
      "Games played: " + gamesPlayed +
      " | Total won: $" + totalWinnings +
      " | Avg per game: $" +
      (gamesPlayed ? (totalWinnings / gamesPlayed).toFixed(2) : "0.00");
  }

  function resetGame() {
    currentStake = stakeStart;
    flipCount = 0;
    gameOver = false;
    updateGameDisplay("Click the button to start.");
  }

  function flipCoin() {
    if (gameOver) {
      resetGame();
      return;
    }

    flipCount++;
    const heads = Math.random() < 0.5;

    if (heads) {
      gamesPlayed++;
      totalWinnings += currentStake;
      gameOver = true;
      updateGameDisplay(
        "HEADS on flip " + flipCount +
        ". You win $" + currentStake +
        ". (Click again to restart.)"
      );
    } else {
      currentStake *= 2;
      updateGameDisplay("TAILS — pot doubles to $" + currentStake);
    }
  }

  flipBtn.addEventListener("click", flipCoin);

  // initial state
  resetGame();
});
