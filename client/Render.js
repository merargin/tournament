function renderProgress(completedMatches, totalMatches) {
  let progress = "";
  for (let matchNumber = 0; matchNumber < totalMatches; matchNumber++) {
    if (matchNumber < completedMatches) {
      progress += "■ ";
    } else {
      progress += "□ ";
    }
  }
  progressElement.textContent = progress;
}

function renderWinner(winner){
  winnerElement.textContent = winner;
}