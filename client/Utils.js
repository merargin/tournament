function enableButton(button) {
  button.disabled = false;
  button.className = 'button button--enabled';
}

function disableButton(button) {
  button.disabled = true;
  button.className = 'button button--disabled';
}

function getTotalMatches(teamsPerMatch, numberOfTeams) {
  let rounds = numberOfTeams / teamsPerMatch;
  let matches = rounds;
  while (rounds > 1) {
    rounds /= teamsPerMatch;
    matches += rounds;
  }
  return matches;
}

function getNumberOfRounds(teamsPerMatch, numberOfTeams) {
  let teams, rounds = 1;
  for(teams = teamsPerMatch; teams < numberOfTeams; teams *= teamsPerMatch) {
    rounds++;
  }
  return teams === numberOfTeams ? rounds : 0;
}

function getAsQueryParams(data) {
    let query = "";
    let keys = [];
    if(typeof data !== 'undefined' && data !== null){
        keys = Object.keys(data);
    }
    for (let i = 0; i < keys.length; i++) {
        let last = (i === (keys.length - 1));
        let key = keys[i];
        let value = data[key];
        if (Array.isArray(value)) {
            for (let j = 0; j < value.length; j++) {
                query += key + "=" + value[j];
                if (j !== (value.length - 1)) {
                    query += "&";
                } else {
                    if (!last) {
                        query += "&";
                    }
                }
            }
        } else {
            query += key + "=" + value;
            if (!last) {
                query += "&";
            }
        }
    }
    return query;
}
