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

// Start match button
document.getElementById('startMatchButton').addEventListener('click', () => {
    alert('Match Started!');
    // Implement match logic here
});
