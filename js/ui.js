// ========== UI UTILITIES ==========

// Handle key press on password input
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        checkPassword();
    }
}

// Show error message
function showError() {
    // Show XP error modal for level 1
    if (currentLevel === 0) {
        document.getElementById('xp-error-modal').classList.remove('hidden');
    } else {
        // Regular error for other levels
        const errorMsg = document.getElementById('error-msg');
        errorMsg.textContent = 'incorrect answer. try again!';
        errorMsg.classList.add('show');
        const input = document.getElementById('password-input');
        input.classList.add('success-pulse');
        setTimeout(() => {
            errorMsg.classList.remove('show');
            input.classList.remove('success-pulse');
        }, 1500);
    }
}

function closeXPError() {
    document.getElementById('xp-error-modal').classList.add('hidden');
    document.getElementById('password-input').focus();
}

function transitionToNextLevel() {
    const container = document.getElementById('levels-container');
    container.classList.add('fade-out');
    setTimeout(() => {
        currentLevel < CONFIG.levels.length && renderLevel();
        container.classList.remove('fade-out');
    }, 600);
}

function transitionToFinale() {
    document.getElementById('hunt-state').classList.remove('active');
    showFinale();
}

// Finale logic
function showFinale() {
    // Hide other states
    document.getElementById('hunt-state').classList.remove('active');
    document.getElementById('countdown-state').classList.remove('active');
    
    // Show finale
    document.getElementById('finale-state').classList.add('active');
    triggerConfetti();
}

function populateLoveLetter() {
    document.getElementById('love-letter').textContent = CONFIG.loveLetter;
}

function sendVirtualHug() {
    alert('virtual hug sent!\n\nyou mean everything to me. happy valentine\'s day!');
    triggerConfetti();
}
