class TournamentError extends Error {
    constructor(message) {
        super();
        this.name = "Tournament Error";
        this.message = message;
    }
}