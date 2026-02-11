// ========== GAME FLOW & LOGIC ==========

// Initialize the page
function init() {
    // Ensure modals are hidden on init
    document.getElementById('xp-error-modal').classList.add('hidden');
    document.getElementById('terminal-modal').classList.add('hidden');
    
    generateHearts();
    updateState();
    setInterval(updateState, 1000);
    populateLoveLetter();
}

// Update state based on current time
function updateState() {
    const now = new Date().getTime();
    const timeLeft = CONFIG.revealTime - now;

    if (timeLeft > 0) {
        // State 1: Countdown
        showCountdown(timeLeft);
    } else {
        // State 2 & 3: Hunt or Finale
        hideCountdown();
        if (currentLevel < CONFIG.levels.length) {
            showHunt();
        } else {
            showFinale();
        }
    }
}

// Countdown logic
function showCountdown(timeLeft) {
    document.getElementById('countdown-state').classList.add('active');
    document.getElementById('hunt-state').classList.remove('active');
    document.getElementById('finale-state').classList.remove('active');

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

function hideCountdown() {
    document.getElementById('countdown-state').classList.remove('active');
}

// Hunt logic
function showHunt() {
    document.getElementById('hunt-state').classList.add('active');
    document.getElementById('finale-state').classList.remove('active');
    if (!huntInitialized) {
        renderLevel();
        huntInitialized = true;
    }
}

function renderLevel() {
    const level = CONFIG.levels[currentLevel];
    const container = document.getElementById('levels-container');
    
    // Special rendering for level 1 (name input only)
    if (currentLevel === 0) {
        container.innerHTML = `
            <div class="level-container">
                <div class="question">${level.question}</div>
                <div class="input-group">
                    <input 
                        type="text" 
                        id="password-input" 
                        onkeypress="handleKeyPress(event)"
                        autocomplete="off"
                    >
                    <div class="error-message" id="error-msg">error 404 mausbert.exe not found</div>
                    <button onclick="checkPassword()">submit answer</button>
                </div>
            </div>
        `;
    } else {
        // Regular level rendering
        container.innerHTML = `
            <div class="level-container">
                <div class="level-indicator">level ${level.number} / ${CONFIG.levels.length}</div>
                <h2>level ${level.number}</h2>
                <div class="question">${level.question}</div>
                <div class="input-group">
                    <input 
                        type="text" 
                        id="password-input" 
                        placeholder="enter your answer..." 
                        onkeypress="handleKeyPress(event)"
                        autocomplete="off"
                    >
                    <div class="error-message" id="error-msg">incorrect answer. try again!</div>
                    <button onclick="checkPassword()">submit answer</button>
                </div>
            </div>
        `;
    }
    document.getElementById('password-input').focus();
}

function checkPassword() {
    const input = document.getElementById('password-input').value.toLowerCase().trim();
    const currentLevelConfig = CONFIG.levels[currentLevel];
    
    let isCorrect = false;
    
    // Level 1: Check if input includes "maus"
    if (currentLevel === 0) {
        isCorrect = input.includes(currentLevelConfig.password.toLowerCase());
    } else {
        // Other levels: exact match
        isCorrect = input === currentLevelConfig.password.toLowerCase();
    }

    if (isCorrect) {
        // For level 1, show terminal animation first
        if (currentLevel === 0) {
            showTerminalAuthentication(input);
        } else {
            currentLevel++;
            if (currentLevel < CONFIG.levels.length) {
                transitionToNextLevel();
            } else {
                transitionToFinale();
            }
        }
    } else {
        showError();
    }
}

// Start the app when page loads
window.addEventListener('load', init);
