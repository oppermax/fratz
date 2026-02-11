// ========== TERMINAL SIMULATOR ==========

// Show terminal authentication with loading animation
function showTerminalAuthentication(user) {
    // Store username
    username = user;
    
    // Show terminal modal
    document.getElementById('terminal-modal').classList.remove('hidden');
    document.getElementById('terminal-username').textContent = user;
    
    // Update R user name if element exists
    const rUserElement = document.getElementById('r-user-name');
    if (rUserElement) {
        rUserElement.textContent = user;
    }
    
    // After loading bar completes (2 seconds), show prompt
    setTimeout(() => {
        // Hide loading bar
        document.getElementById('terminal-loading-section').style.display = 'none';
        
        // Show status
        document.getElementById('terminal-status-section').style.display = 'block';
        
        // Show input section after 1 second
        setTimeout(() => {
            document.getElementById('terminal-input-section').style.display = 'block';
            document.getElementById('terminal-input').focus();
        }, 1000);
    }, 2000);
}

function handleTerminalInput(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('terminal-input').value.toLowerCase().trim();
        const content = document.getElementById('terminal-content');
        
        if (!input) {
            document.getElementById('terminal-input').value = '';
            return;
        }
        
        // Add user input to terminal
        const userLine = document.createElement('p');
        userLine.textContent = '>> ' + input;
        userLine.style.color = '#00ff00';
        content.appendChild(userLine);
        
        // Process command
        let response = '';
        let shouldEnter = false;
        
        // Check if it's a maus command
        if (input.startsWith('maus')) {
            // Extract maus subcommand
            const mausArgs = input.replace('maus', '').trim().split(' ');
            const mausCmd = mausArgs[0] || '';
            const mausPkg = mausArgs.slice(1).join(' ');
            
            if (mausCmd === 'help' || mausCmd === '') {
                response = `maus - package manager (v1.0.0)

usage: maus <command>

commands:
  help              - show this message
  list-packages     - see available packages
  install <pkg>    - install a package
  clue             - get a hint`;
            } else if (mausCmd === 'list-packages') {
                response = `available packages:
  ► rstudio         - interactive data analysis environment
  ► tidyverse       - data wrangling toolkit
  ► ggplot2         - visualization library
  ► love            - unlock special features (requires rstudio)`;
            } else if (mausCmd === 'install') {
                const pkg = mausPkg || '';
                if (pkg === 'rstudio') {
                    response = `installing rstudio...
████████████████████████ 100%

✓ rstudio installed successfully!`;
                    rstudioInstalled = true;
                    shouldEnter = true;
                } else if (pkg === 'love') {
                    response = `error: cannot install 'love' without 'rstudio'
hint: try 'maus install rstudio' first`;
                } else if (pkg === '') {
                    response = `error: please specify a package to install
usage: maus install <package>
try 'maus list-packages' to see available options`;
                } else {
                    response = `error: package '${pkg}' not found
try 'maus list-packages' to see what's available`;
                }
            } else if (mausCmd === 'clue') {
                response = `💡 hint: if we could just install software to make sense of all this data...`;
            } else {
                response = `maus: unknown command '${mausCmd}'
try 'maus help' for available commands`;
            }
        } else if (input === 'help') {
            let helpText = `available commands:
  help          - show this help message
  whoami        - display current user
  date          - show current date and time
  pwd           - print working directory
  ls            - list files
  uname         - system information
  clear         - clear terminal
  clue          - get a hint
  maus          - package manager (try 'maus help')`;
            if (rstudioInstalled) {
                helpText += `\n  r             - launch rstudio environment`;
            }
            response = helpText;
        } else if (input === 'whoami') {
            const username = document.getElementById('terminal-username').textContent;
            response = username;
        } else if (input === 'pwd') {
            const username = document.getElementById('terminal-username').textContent;
            response = '/home/' + username + '/valentine';
        } else if (input === 'ls' || input === 'ls -la' || input === 'dir') {
            const username = document.getElementById('terminal-username').textContent;
            response = `total 3
drwxr-xr-x  2 ${username}  ${username}  4096 Feb 14 12:00 .
drwxr-xr-x  5 ${username}  ${username}  4096 Feb 14 11:30 ..
-rw-r--r--  1 ${username}  ${username}  1337 Feb 14 12:00 love_letter.txt
-rw-r--r--  1 ${username}  ${username}   420 Feb 14 11:45 heart_data.csv
💕 romantic files detected!`;
        } else if (input === 'uname' || input === 'uname -a') {
            const username = document.getElementById('terminal-username').textContent;
            response = `LoveOS 14.2 Valentine-Edition x86_64
Built with ❤️ for ${username}`;
        } else if (input === 'date') {
            response = new Date().toString();
        } else if (input === 'clear') {
            content.innerHTML = '';
            document.getElementById('terminal-input').value = '';
            content.parentElement.scrollTop = 0;
            return;
        } else if (input === 'r') {
            if (rstudioInstalled) {
                // Enter R environment
                document.getElementById('terminal-modal').classList.add('hidden');
                document.getElementById('r-cli-modal').classList.remove('hidden');
                document.getElementById('r-input').focus();
                return;
            } else {
                response = `command not found: 'r'
hint: you need to install rstudio first using 'maus install rstudio'`;
            }
        } else if (input === 'clue') {
            response = `💡 hint: if we could just install software to make sense of all this data...`;
        } else {
            response = `command not found: ${input}
type 'help' for available commands`;
        }
        
        // Add response
        if (response) {
            const responseLine = document.createElement('p');
            responseLine.textContent = response;
            responseLine.style.color = '#00ff00';
            responseLine.style.whiteSpace = 'pre-wrap';
            content.appendChild(responseLine);
        }
        
        // Clear input
        document.getElementById('terminal-input').value = '';
        
        // Auto-scroll terminal to bottom
        setTimeout(() => {
            content.scrollTop = content.scrollHeight;
        }, 0);
        
        // Handle R entry after rstudio install
        if (shouldEnter) {
            setTimeout(() => {
                document.getElementById('terminal-modal').classList.add('hidden');
                document.getElementById('r-cli-modal').classList.remove('hidden');
                document.getElementById('r-input').focus();
            }, 1500);
        }
    }
}
