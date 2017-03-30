let startButton;
let winnerElement;
let progressElement;
let errorMessage;
let statusElement;

document.addEventListener('DOMContentLoaded', () => {
    startButton = document.getElementById(SELECTOR_IDS.START_BUTTON);
    progressElement = document.getElementById(SELECTOR_IDS.PROGRESS);
    winnerElement = document.getElementById(SELECTOR_IDS.WINNER);
    statusElement = document.getElementById(SELECTOR_IDS.STATUS);

    const teamsPerMatch = document.getElementById(SELECTOR_IDS.TEAMS_PER_MATCH);
    const numberOfTeams = document.getElementById(SELECTOR_IDS.NUMBER_OF_TEAMS);


    startButton.addEventListener('click', async function() {
        try {
            initDefaults();
            tournamentStarted();
            Game(teamsPerMatch.value, numberOfTeams.value);
        } catch(error){
            showError(error);
        }
    });
});

function initDefaults(){
    statusElement.textContent = '';
    winnerElement.textContent = '';
    progressElement.textContent = '';
}

function tournamentCompleted(){
    statusElement.textContent = 'Tournament completed!';
    enableButton(startButton);
}

function tournamentStarted(){
    disableButton(startButton);
    statusElement.textContent = 'Tournament started...';
}

function showError(error){
    statusElement.textContent = `Error: ${error.message}`;
    enableButton(startButton);
    return;
}
