async function Game(teamsPerMatch, numberOfTeams) {

  let tournament;

  try {
    tournament = new Tournament(teamsPerMatch, numberOfTeams);
  } catch(error){
    showError(error);
    return;
  }

  const totalMatches = getTotalMatches(teamsPerMatch, numberOfTeams);

  let matchCount = 0;

  renderProgress(matchCount, totalMatches);

  let matches = await tournament.create();

  const tournamentId = tournament.getId();

  const teams = await getTeamsData(tournamentId, numberOfTeams);

  let winners = [];
  let matchScores = [];
  let round = 0;
  let winner = "";

  do {

    matchScores = await getMatchScores(tournamentId, matches, round);
    winners = await getWinners(tournamentId, teamsPerMatch, matches, matchScores, teams);

    renderProgress(matchCount += matches.length, totalMatches);
    round++;

    if (winners.length > 1) {
      matches = createNewRound(teamsPerMatch, winners, teams, matches);
    }

  } while (winners.length > 1);

  renderProgress(matchCount + 1, totalMatches);

  for (let team of matches[0].teamIds) {
    if (teams[team].score == winners[0]) {
      winner = teams[team].name;
    }
  }

  renderWinner(winner);

  tournamentCompleted();

}
