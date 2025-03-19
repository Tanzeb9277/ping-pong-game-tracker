// Ensure JavaScript runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded Successfully");

    const singlesButton = document.getElementById("singlesButton");
    const doublesButton = document.getElementById("doublesButton");

    if (!singlesButton || !doublesButton) {
        console.error("Match selection buttons not found!");
        return;
    }

    let matchType = '';
    let selectedCharacters = { green: [], blue: [] };
    let teamScores = { green: 0, blue: 0 };
    let selectedPlayer = null;

    const unlockedCharacters = [
        { name: "Benzo", img: "images/player1.png" },
        { name: "Audi", img: "images/player2.png" },
        { name: "Mykel Solo", img: "images/player3.png" },
        { name: "Miler", img: "images/player4.png" },
        { name: "Schmuubie", img: "images/player5.png" },
        { name: "Diviid", img: "images/daviid.png" },
        { name: "Player 7", img: "images/player7.png" },
        { name: "Player 8", img: "images/player8.png" }
    ];

    const lockedCharacters = Array(12).fill({ name: "Locked", img: "images/locked.png" });

    // Add event listeners for match selection
    singlesButton.addEventListener("click", function () {
        matchType = "singles";
        showCharacterSelection();
    });

    doublesButton.addEventListener("click", function () {
        matchType = "doubles";
        showCharacterSelection();
    });

    function showCharacterSelection() {
        console.log("Transitioning to Character Selection...");
        document.getElementById("matchSelectionScreen").style.display = "none";
        document.getElementById("characterSelectionScreen").style.display = "block";
        renderCharacterSelection();
    }

    function renderCharacterSelection() {
        console.log("Rendering Character Selection...");
        const container = document.getElementById("charactersContainer");
        container.innerHTML = "";

        [...unlockedCharacters, ...lockedCharacters].forEach((character, index) => {
            const characterDiv = document.createElement("div");
            characterDiv.classList.add("character-slot");

            if (index < unlockedCharacters.length) {
                characterDiv.innerHTML = `<img src="${character.img}" alt="${character.name}"><p>${character.name}</p>`;
                characterDiv.addEventListener("click", () => selectCharacter(character, characterDiv));
            } else {
                characterDiv.classList.add("locked");
                characterDiv.innerHTML = `<img src="${character.img}" alt="Locked"><p>Locked</p>`;
            }
            container.appendChild(characterDiv);
        });
    }

    function selectCharacter(character, characterDiv) {
        if (selectedCharacters.green.length + selectedCharacters.blue.length >= (matchType === "singles" ? 2 : 4)) return;

        if (selectedCharacters.green.length < (matchType === "singles" ? 1 : 2)) {
            selectedCharacters.green.push(character);
            characterDiv.classList.add("green");
        } else {
            selectedCharacters.blue.push(character);
            characterDiv.classList.add("blue");
        }

        if ((matchType === "singles" && selectedCharacters.green.length === 1 && selectedCharacters.blue.length === 1) ||
            (matchType === "doubles" && selectedCharacters.green.length === 2 && selectedCharacters.blue.length === 2)) {
            document.getElementById("startMatchButton").style.display = "block";
        }
    }

    document.getElementById("startMatchButton").addEventListener("click", startMatch);

    function startMatch() {
        console.log("Match Started!");
        document.getElementById("characterSelectionScreen").style.display = "none";
        document.getElementById("matchScreen").style.display = "block";
        renderPlayerSelection();
    }

    function renderPlayerSelection() {
        console.log("Rendering Player Selection in Match Screen...");
        const container = document.getElementById("playerSelection");
        container.innerHTML = '';

        [...selectedCharacters.green, ...selectedCharacters.blue].forEach(player => {
            const btn = document.createElement("button");
            btn.textContent = player.name;
            btn.classList.add("player-btn");
            btn.addEventListener("click", () => selectPlayer(player, btn));
            container.appendChild(btn);
        });
    }

    function selectPlayer(player, button) {
        selectedPlayer = player;

        // Remove previous selection highlight
        document.querySelectorAll('.player-btn').forEach(btn => btn.classList.remove('selected'));

        // Highlight the newly selected button
        button.classList.add('selected');

        // Show selected player details
        document.getElementById("selectedPlayerDisplay").style.display = "block";
        document.getElementById("selectedPlayerAvatar").src = player.img;
        document.getElementById("selectedPlayerName").textContent = player.name;
    }

    document.getElementById("scoreButton").addEventListener("click", () => {
        if (!selectedPlayer) return alert("Select a player first!");

        let team = selectedCharacters.green.includes(selectedPlayer) ? "green" : "blue";
        teamScores[team]++;
        updateScoreboard();
        addMatchLog(`${selectedPlayer.name} scored for Team ${team.toUpperCase()}!`, selectedPlayer, "score");
    });

    document.getElementById("faultButton").addEventListener("click", () => {
        if (!selectedPlayer) return alert("Select a player first!");

        let faultingTeam = selectedCharacters.green.includes(selectedPlayer) ? "green" : "blue";
        let awardingTeam = faultingTeam === "green" ? "blue" : "green";

        teamScores[awardingTeam]++;
        updateScoreboard();
        addMatchLog(`${selectedPlayer.name} faulted! Point to Team ${awardingTeam.toUpperCase()}.`, selectedPlayer, "fault");
    });

    function updateScoreboard() {
        document.getElementById("teamGreenScore").textContent = teamScores.green;
        document.getElementById("teamBlueScore").textContent = teamScores.blue;
    }

    // Function to add match log entry with delete button
    function addMatchLog(entry, player, action) {
        let logEntry = document.createElement("li");
        logEntry.innerHTML = `${entry} <button class="delete-log-btn">❌</button>`;

        // Append log entry
        document.getElementById("eventLog").appendChild(logEntry);

        // Add event listener to delete button
        logEntry.querySelector(".delete-log-btn").addEventListener("click", function () {
            deleteMatchLog(logEntry, player, action);
        });
    }

    // Function to delete a log entry and update points
    function deleteMatchLog(logEntry, player, action) {
        let team = selectedCharacters.green.includes(player) ? "green" : "blue";
        
        // If action was "score", deduct a point from that team
        if (action === "score") {
            teamScores[team] = Math.max(0, teamScores[team] - 1); // Prevent negative scores
        } 
        // If action was "fault", deduct a point from the opposing team
        else if (action === "fault") {
            let opposingTeam = team === "green" ? "blue" : "green";
            teamScores[opposingTeam] = Math.max(0, teamScores[opposingTeam] - 1);
        }

        // Update scoreboard
        updateScoreboard();

        // Remove the log entry
        logEntry.remove();
    }
});
