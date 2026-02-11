// ========== RSTUDIO CHALLENGE ==========

function handleRInput(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('r-input').value.trim();
        const inputLower = input.toLowerCase();
        const content = document.getElementById('r-terminal-content');
        
        if (!input) {
            document.getElementById('r-input').value = '';
            return;
        }
        
        // Add user input
        const userLine = document.createElement('p');
        userLine.textContent = '> ' + input;
        userLine.style.color = '#d4d4d4';
        content.appendChild(userLine);
        
        // Process R commands
        let response = '';
        let responseClass = 'r-output';
        let shouldProgress = false;
        
        if (inputLower === 'help()' || inputLower === '?') {
            response = `Available functions:
  load_heart_data()    - Load the romantic dataset
  summary(data)        - View data summary
  names(data)          - View variable names
  plot_hearts()        - Visualize the relationship
  find_correlation()   - Calculate love correlation
  unlock_heart()       - Complete the challenge (requires correlation)
  
💡 Tip: Start by loading the data!`;
            responseClass = 'r-comment';
        } else if (inputLower === 'load_heart_data()' || inputLower === 'load_heart_data') {
            heartData = true;
            rChallengeStep = 1;
            updateREnvironment('heart_data', 'data.frame [5 × 3]');
            response = `✓ Loaded heart_data.csv
A romantic dataset with 5 observations of 3 variables:
  - date: Special moments together
  - happiness: Your happiness level (0-10)
  - love_score: Connection strength (0-100)

💕 Type summary(heart_data) to see the details!`;
            responseClass = 'r-output';
        } else if (inputLower === 'summary(heart_data)' && heartData) {
            rChallengeStep = Math.max(rChallengeStep, 2);
            response = `     date             happiness    love_score
 "2024-02-14"     Min:   7.0    Min:   78.0
 "2024-05-20"     1st Qu:8.0    1st Qu:82.0
 "2024-08-15"     Median:9.0    Median:91.0
 "2025-11-01"     Mean:  8.6    Mean:  88.6
 "2026-02-14"     3rd Qu:9.5    3rd Qu:95.0
                  Max:  10.0    Max:   99.0

💡 Notice anything? Try plot_hearts() to visualize!`;
            responseClass = 'r-output';
        } else if (inputLower === 'names(heart_data)' && heartData) {
            response = `[1] "date"        "happiness"   "love_score"

💡 Three variables capturing our journey together!`;
            responseClass = 'r-output';
        } else if ((inputLower === 'plot_hearts()' || inputLower === 'plot_hearts') && heartData) {
            rChallengeStep = Math.max(rChallengeStep, 3);
            response = `
    💕 Love Score vs Happiness 💕
  100|                      ❤️
     |                   ❤️
   90|              ❤️
     |           ❤️
   80|        ❤️
     |
   70|_________________________
      7    8    9    10
           Happiness

✨ Perfect positive relationship! 
💡 Try find_correlation() to quantify this!`;
            responseClass = 'r-output';
        } else if ((inputLower === 'find_correlation()' || inputLower === 'find_correlation' || 
                   inputLower === 'cor(heart_data$happiness, heart_data$love_score)') && heartData) {
            correlationCalculated = true;
            rChallengeStep = Math.max(rChallengeStep, 4);
            updateREnvironment('correlation', '0.997');
            response = `
💕 Correlation Analysis 💕

cor(happiness, love_score) = 0.997

This means: As your happiness grows, our love 
score increases almost perfectly! 

Statistical interpretation:
 - Correlation: 0.997 (nearly perfect!)
 - p-value: < 0.001 (highly significant!)
 - R²: 0.994 (99.4% of variation explained!)

✨ You've discovered the secret pattern! ✨
💌 Now use unlock_heart() to reveal the finale!`;
            responseClass = 'r-output';
        } else if ((inputLower === 'unlock_heart()' || inputLower === 'unlock_heart') && correlationCalculated) {
            response = `
🔓 Unlocking the heart...

The correlation reveals the truth:
  When you smile, my world lights up.
  When you're happy, my love grows stronger.
  We are perfectly correlated. 💕

[1] "You've completed the Love Analytics Challenge!"
[1] "Preparing the final surprise..."`;
            responseClass = 'r-output';
            shouldProgress = true;
        } else if ((inputLower === 'unlock_heart()' || inputLower === 'unlock_heart') && !correlationCalculated) {
            response = `Error: Heart still locked! 🔒
Hint: You need to find_correlation() first!`;
            responseClass = 'r-error';
        } else if (inputLower === 'quit()' || inputLower === 'q()') {
            document.getElementById('r-cli-modal').classList.add('hidden');
            document.getElementById('terminal-modal').classList.remove('hidden');
            document.getElementById('terminal-input').focus();
            return;
        } else if (!heartData) {
            response = `Error: No data loaded!
💡 Try load_heart_data() first to begin the challenge`;
            responseClass = 'r-error';
        } else {
            response = `Error in eval(expr): object '${input}' not found
Type help() to see available functions`;
            responseClass = 'r-error';
        }
        
        // Add response
        if (response) {
            const responseLine = document.createElement('p');
            responseLine.innerHTML = response.replace(/\n/g, '<br>');
            responseLine.className = responseClass;
            content.appendChild(responseLine);
        }
        
        // Clear input
        document.getElementById('r-input').value = '';
        
        // Auto-scroll to bottom
        setTimeout(() => {
            content.scrollTop = content.scrollHeight;
        }, 0);
        
        // Progress to finale if unlock command used
        if (shouldProgress) {
            setTimeout(() => {
                document.getElementById('r-cli-modal').classList.add('hidden');
                showFinale();
            }, 2000);
        }
    }
}

function updateREnvironment(varName, varValue) {
    const envContent = document.getElementById('r-environment');
    const newItem = document.createElement('div');
    newItem.className = 'rstudio-env-item';
    newItem.innerHTML = `<span class="rstudio-env-name">${varName}</span>: ${varValue}`;
    envContent.appendChild(newItem);
}
