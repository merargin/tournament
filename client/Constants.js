const SELECTOR_IDS = {
  START_BUTTON: 'start',
  TEAMS_PER_MATCH: 'teamsPerMatch',
  NUMBER_OF_TEAMS: 'numberOfTeams',
  PROGRESS: 'progress',
  STATUS: 'status',
  WINNER: 'winner',
  ERROR: 'error'
};

const URLS = {
  TOURNAMENT: '/tournament',
  TEAM: '/team',
  MATCH: "/match",
  WINNER: "/winner"
};

const TOURNAMENT_ERRORS = {
    TOURNAMENT_ID: "Invalid Tournament Id",
    TEAMS_PER_MATCH: "Invalid number of teams for teams per match",
    TOTAL_TEAMS_INVALID: "Invalid number for total teams",
    TOTAL_TEAMS: "Total teams should be power of the teams per match",
    NETWORK_ERROR: "A network error has occurred: Status "
};

const STATUS_CODES = {
    OK: 200
};
