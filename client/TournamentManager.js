function getTeam(tournamentId, teamId) {
  return new Promise(async(resolve, reject) => {
    try {
      if (tournamentId == null) {
        return reject(new TournamentError(TOURNAMENT_ERRORS.TOURNAMENT_ID));
      }
      let response = await RequestProcessor.get(URLS.TEAM, {
        tournamentId,
        teamId
      });
      let result = await response.json();
      if (response.status !== STATUS_CODES.OK) {
        let message = Tournament.getErrorMessage(response, result);
        return reject(new TournamentError(message));
      }
      return resolve(result);
    } catch (exception) {
      return reject(exception);
    }
  });
}

function getMatchScore(tournamentId, match, round) {
  return new Promise(async(resolve, reject) => {
    try {
      if (tournamentId == null) {
        return reject(new TournamentError(TOURNAMENT_ERRORS.TOURNAMENT_ID));
      }
      let response = await RequestProcessor.get(URLS.MATCH, {
        tournamentId,
        match,
        round
      });
      let result = await response.json();
      if (response.status !== STATUS_CODES.OK) {
        let message = Tournament.getErrorMessage(response, result);
        return reject(new TournamentError(message));
      }
      return resolve(result.score);
    } catch (exception) {
      return reject(exception);
    }
  });
}

function getWinningScore(tournamentId, matchScore, teamScores) {
  return new Promise(async(resolve, reject) => {
    try {
      if (tournamentId == null) {
        return reject(new TournamentError(TOURNAMENT_ERRORS.TOURNAMENT_ID));
      }
      let response = await RequestProcessor.get(URLS.WINNER, {
        tournamentId,
        matchScore,
        teamScores
      });
      let result = await response.json();
      if (response.status !== STATUS_CODES.OK) {
        let message = Tournament.getErrorMessage(response, result);
        return reject(new TournamentError(message));
      }
      return resolve(result.score);
    } catch (exception) {
      return reject(exception);
    }
  });
}

function getTeamsData(tournamentId, numberOfTeams) {
  let teams = [];
  for (let teamIndex = 0; teamIndex < numberOfTeams; teamIndex++) {
    teams.push(getTeam(tournamentId, teamIndex));
  }
  return Promise.all(teams);
}

function getMatchScores(tournamentId, matches, round) {
  let promises = [];
  for (let match of matches) {
    promises.push(getMatchScore(tournamentId, match.match, round));
  }
  return Promise.all(promises);
}

function getWinners(tournamentId, teamsPerMatch, matches, matchScores, teams) {
  let winners = [];
  for (let match of matches) {
    let matchScore = matchScores[match.match];
    let teamScores = [];
    for (let i = 0; i < teamsPerMatch; i++) {
      teamScores.push(teams[match.teamIds[i]].score);
    }
    winners.push(getWinningScore(tournamentId, matchScore, teamScores));
  }
  return Promise.all(winners);
}

function createNewRound(teamsPerMatch, winnerScores, teams, previousMatches) {
  let newMatches = [];
  let teamBank = [];
  for (let i = 0; i < previousMatches.length; i++) {
    for (let j = 0; j < previousMatches[i].teamIds.length; j++) {
      if (teams[previousMatches[i].teamIds[j]].score == winnerScores[i]) {
        teamBank.push(teams[previousMatches[i].teamIds[j]].teamId);
        if ((i + 1) % teamsPerMatch === 0) {
          newMatches.push({
            match: newMatches.length,
            teamIds: teamBank
          });
          teamBank = [];
        }
        break;
      }
    }
  }
  return newMatches;
}
