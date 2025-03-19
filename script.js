// Define some variables
let matchType = '';  // "singles" or "doubles"
let selectedCharacters = {
    green: [],
    blue: []
};

// Define unlocked and locked characters
const unlockedCharacters = [
    { name: "Benzo", img: "images/player1.png" },
    { name: "Audi", img: "images/player2.png" },
    { name: "Mykel Solo", img: "images/player3.png" },
    { name: "Miler", img: "images/player4.png" },
    { name: "Schmuubie", img: "images/player5.png" },
    { name: "Player 6", img: "images/player6.png" },
    { name: "Player 7", img: "images/player7.png" },
    { name: "Player 8", img: "images/player8.png" }
];

const lockedCharacters = Array(12).fill({ name: "Locked", img: "images/locked.png" }); // Question mark icon for locked characters

// Match Type Selection
document.getElementById('singlesButton').addEventListener('click', () => {
    matchType = 'singles';
    showCharacterSelection();
});

document.getElementById('doublesButton').addEventListener('click', () => {
    matchType = 'doubles';
    showCharacterSelection();
});

// Function to show character selection screen
function showCharacterSelection() {
    document.getElementById('matchSelectionScreen').style.display = 'none';
    document.getElementById('characterSelectionScreen').style.display = 'block';

    renderCharacterSelection();
}

// Function to render characters on the screen
function renderCharacterSelection() {
    const container = document.getElementById('charactersContainer');
    container.innerHTML = '';

    // Combine unlocked and locked characters
    const characters = [...unlockedCharacters, ...lockedCharacters];

    characters.forEach((character, index) => {
        const characterDiv = document.createElement('div');
        characterDiv.classList.add('character-slot');
        if (index < unlockedCharacters.length) {
            characterDiv.innerHTML = `<img src="${character.img}" alt="${character.name}"><p>${character.name}</p>`;
            characterDiv.addEventListener('click', () => selectCharacter(character, index, characterDiv));
        } else {
            characterDiv.classList.add('locked');
            characterDiv.innerHTML = `<img src="${character.img}" alt="Locked"><p>Locked</p>`;
        }
        container.appendChild(characterDiv);
    });
}

// Handle character selection
function selectCharacter(character, index, characterDiv) {
    if (matchType === 'singles' && selectedCharacters.green.length < 1) {
        selectedCharacters.green.push(character);
        characterDiv.classList.add('selected', 'green');  // Add green class for singles
    } 
    else if (matchType === 'singles' && selectedCharacters.blue.length < 1) {
        selectedCharacters.blue.push(character);
        characterDiv.classList.add('selected', 'blue');  // Add blue class for singles
    } 
    else if (matchType === 'doubles') {
        if (selectedCharacters.green.length < 2) {
            selectedCharacters.green.push(character);
            characterDiv.classList.add('selected', 'green');
        } else if (selectedCharacters.blue.length < 2) {
            selectedCharacters.blue.push(character);
            characterDiv.classList.add('selected', 'blue');
        }
    }

    // Check if the match type has all necessary selections
    if ((matchType === 'singles' && selectedCharacters.green.length === 1 && selectedCharacters.blue.length === 1) ||
        (matchType === 'doubles' && selectedCharacters.green.length === 2 && selectedCharacters.blue.length === 2)) {
        document.getElementById('startMatchButton').style.display = 'block';
    }
}

// Scores
let teamScores = {
    green: 0,
    blue: 0
};

// Match log
let matchLog = [];

// Function to show the match screen
function startMatch() {
    document.getElementById('characterSelectionScreen').style.display = 'none';
    document.getElementById('matchScreen').style.display = 'block';

    renderPlayerSelection();
}

// Render players in the match screen for selection
function renderPlayerSelection() {
    const container = document.getElementById('playerSelection');
    container.innerHTML = '';

    [...selectedCharacters.green, ...selectedCharacters.blue].forEach((player, index) => {
        const btn = document.createElement('button');
        btn.textContent = player.name;
        btn.classList.add('player-btn');
        btn.addEventListener('click', () => selectPlayer(player));
        container.appendChild(btn);
    });
}

// Selected player for scoring/faults
let selectedPlayer = null;

// Function to select a player
function selectPlayer(player) {
    selectedPlayer = player;
    console.log(`Selected player: ${player.name}`);
}

// Handle scoring
document.getElementById('scoreButton').addEventListener('click', () => {
    if (!selectedPlayer) return alert("Select a player first!");
    
    let team = selectedCharacters.green.includes(selectedPlayer) ? 'green' : 'blue';
    teamScores[team]++;

    updateScoreboard();
    addMatchLog(`${selectedPlayer.name} scored for Team ${team === 'green' ? 'Green' : 'Blue'}!`);
});

// Handle fault
document.getElementById('faultButton').addEventListener('click', () => {
    if (!selectedPlayer) return alert("Select a player first!");

    let faultingTeam = selectedCharacters.green.includes(selectedPlayer) ? 'green' : 'blue';
    let awardingTeam = faultingTeam === 'green' ? 'blue' : 'green';
    
    teamScores[awardingTeam]++;

    updateScoreboard();
    addMatchLog(`${selectedPlayer.name} faulted! Point to Team ${awardingTeam === 'green' ? 'Green' : 'Blue'}.`);
});

// Update scoreboard UI
function updateScoreboard() {
    document.getElementById('teamGreenScore').textContent = teamScores.green;
    document.getElementById('teamBlueScore').textContent = teamScores.blue;
}

// Add entry to match log
function addMatchLog(entry) {
    matchLog.push(entry);
    let logEntry = document.createElement('li');
    logEntry.textContent = entry;
    document.getElementById('eventLog').appendChild(logEntry);
}

// Hook up the start match button
document.getElementById('startMatchButton').addEventListener('click', startMatch);


// Start match button
document.getElementById('startMatchButton').addEventListener('click', () => {
    alert('Match Started!');
    // Implement match logic here
});
