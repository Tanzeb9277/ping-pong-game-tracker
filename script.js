// Define some variables
let selectedCharacters = {
    blue: [],
    green: []
};

// Define unlocked and locked characters
const unlockedCharacters = [
    { name: "Player 1", img: "images/player1.png" },
    { name: "Player 2", img: "images/player2.png" },
    { name: "Player 3", img: "images/player3.png" },
    { name: "Player 4", img: "images/player4.png" },
    { name: "Player 5", img: "images/player5.png" },
    { name: "Player 6", img: "images/player6.png" },
    { name: "Player 7", img: "images/player7.png" },
    { name: "Player 8", img: "images/player8.png" }
];

const lockedCharacters = Array(12).fill({ name: "Locked", img: "images/locked.png" }); // Question mark icon for locked characters

// Match Type Selection
document.getElementById('singlesButton').addEventListener('click', () => {
    showCharacterSelection();
});

document.getElementById('doublesButton').addEventListener('click', () => {
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
            characterDiv.addEventListener('click', () => selectCharacter(character, index));
        } else {
            characterDiv.classList.add('locked');
            characterDiv.innerHTML = `<img src="${character.img}" alt="Locked"><p>Locked</p>`;
        }
        container.appendChild(characterDiv);
    });
}

// Handle character selection
function selectCharacter(character, index) {
    if (selectedCharacters.blue.length < 2) {
        selectedCharacters.blue.push(character);
        markSelected(index);
    } else if (selectedCharacters.green.length < 2) {
        selectedCharacters.green.push(character);
        markSelected(index);
    }

    // Check if both teams have been selected
    if (selectedCharacters.blue.length === 2 && selectedCharacters.green.length === 2) {
        document.getElementById('startMatchButton').style.display = 'block';
    }
}

// Mark character as selected
function markSelected(index) {
    const slots = document.querySelectorAll('.character-slot');
    slots[index].classList.add('selected');
}

// Start match button
document.getElementById('startMatchButton').addEventListener('click', () => {
    alert('Match Started!');
    // Implement match logic here
});
