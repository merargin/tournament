class Tournament {

  constructor(teamsPerMatch, numberOfTeams) {

    teamsPerMatch = Math.floor(teamsPerMatch || undefined);
    numberOfTeams = Math.floor(numberOfTeams || undefined);

    if (isNaN(teamsPerMatch) || teamsPerMatch < 2) {
      throw new TournamentError(TOURNAMENT_ERRORS.TEAMS_PER_MATCH);
    }

    if (isNaN(numberOfTeams)) {
      throw new TournamentError(TOURNAMENT_ERRORS.TOTAL_TEAMS_INVALID);
    }

    if (!this.isValidTotalTeamsCount(teamsPerMatch, numberOfTeams)) {
      throw new TournamentError(TOURNAMENT_ERRORS.TOTAL_TEAMS);
    }

    this.teamsPerMatch = teamsPerMatch;
    this.numberOfTeams = numberOfTeams;
    this.tId = null;

  }

  create() {
    return new Promise(async(resolve, reject) => {
      try {

        let tournamentData = await RequestProcessor.post(URLS.TOURNAMENT, {
          teamsPerMatch: this.teamsPerMatch,
          numberOfTeams: this.numberOfTeams,
        });

        let tournament = await tournamentData.json();
        this.tId = tournament.tournamentId;

        if (tournamentData.status !== STATUS_CODES.OK) {
          let message = Tournament.getErrorMessage(tournamentData, tournament);
          return reject(new TournamentError(message));
        }

        return resolve(tournament.matchUps);

      } catch (exception) {
        return reject(exception);
      }
    });
  }

  isValidTotalTeamsCount(teamsPerMatch, numberOfTeams) {
    return getNumberOfRounds(teamsPerMatch, numberOfTeams) > 0;
  }

  static getErrorMessage(response, error) {
    let message = TOURNAMENT_ERRORS.NETWORK_ERROR + response.status;
    if (error.hasOwnProperty("error")) {
      if (error.hasOwnProperty("message")) {
        message = error.message
      }
    }
    return message;
  }

  getId(){
    return this.tId;
  }

}
