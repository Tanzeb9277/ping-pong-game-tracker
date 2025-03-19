// Ensure JavaScript runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Define variables
    let matchType = '';
    let selectedCharacters = { green: [], blue: [] };
    let teamScores = { green: 0, blue: 0 };
    let selectedPlayer = null;

    // Define unlocked and locked characters
    const unlockedCharacters = [
        { name: "Benzo", img: "images/player1.png" },
        { name: "Audi", img: "images/player2.png" },
        { name: "Mykel Solo", img: "images/player3.png" },
        { name: "Miler", img: "images/player4.png" },
        { name: "Schmuubie", img: "images/player5.png" },
        { name: "Daviid", img: "images/daviid.png" },
        { name: "Player 7", img: "images/player7.png" },
        { name: "Player 8", img: "images/player8.png" }
    ];

    const lockedCharacters = Array(12).fill({ name: "Locked", img: "images/lock.png" });

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

    // Render character selection
    function renderCharacterSelection() {
        const container = document.getElementById('charactersContainer');
        container.innerHTML = '';

        [...unlockedCharacters, ...lockedCharacters].forEach((character, index) => {
            const characterDiv = document.createElement('div');
            characterDiv.classList.add('character-slot');

            if (index < unlockedCharacters.length) {
                characterDiv.innerHTML = `<img src="${character.img}" alt="${character.name}"><p>${character.name}</p>`;
                characterDiv.addEventListener('click', () => selectCharacter(character, characterDiv));
            } else {
                characterDiv.classList.add('locked');
                characterDiv.innerHTML = `<img src="${character.img}" alt="Locked"><p>Locked</p>`;
            }
            container.appendChild(characterDiv);
        });
    }

    // Select character
    function selectCharacter(character, characterDiv) {
        if (selectedCharacters.green.length + selectedCharacters.blue.length >= (matchType === "singles" ? 2 : 4)) return;

        if (selectedCharacters.green.length < (matchType === "singles" ? 1 : 2)) {
            selectedCharacters.green.push(character);
            characterDiv.classList.add('green');
        } else {
            selectedCharacters.blue.push(character);
            characterDiv.classList.add('blue');
        }

        if ((matchType === "singles" && selectedCharacters.green.length === 1 && selectedCharacters.blue.length === 1) ||
            (matchType === "doubles" && selectedCharacters.green.length === 2 && selectedCharacters.blue.length === 2)) {
            document.getElementById('startMatchButton').style.display = 'block';
        }
    }

    document.getElementById("startMatchButton").addEventListener("click", startMatch);

    // Start match
    function startMatch() {
        document.getElementById('characterSelectionScreen').style.display = 'none';
        document.getElementById('matchScreen').style.display = 'block';
        renderPlayerSelection();
    }
});
