# Digital Valentine's Scavenger Hunt 💕

A romantic, interactive web experience featuring a countdown timer, terminal-based scavenger hunt, and RStudio data analysis challenge.

## Project Structure

```
fratz/
├── index.html          # Main HTML structure (214 lines)
├── styles.css          # All CSS styles (873 lines)
└── js/                 # JavaScript modules
    ├── config.js       # Configuration and editable content
    ├── gameState.js    # Global state management
    ├── animations.js   # Heart animations and confetti effects
    ├── ui.js           # UI utilities and error handling
    ├── terminal.js     # Terminal simulator and maus package manager
    ├── rstudio.js      # RStudio challenge and R commands
    └── gameFlow.js     # Main game flow and initialization
```

## Features

### 🎯 Three Interactive States
1. **Countdown Timer** - Displays time until reveal date
2. **Scavenger Hunt** - Multi-level challenge with password protection
3. **Grand Finale** - Romantic letter reveal with confetti celebration

### 💻 Terminal Simulator
- Unix-like command interface
- Custom `maus` package manager
- Interactive file system simulation
- Commands: help, whoami, pwd, ls, uname, date, clear, maus

### 📊 RStudio Environment
- Complete R IDE simulation
- Interactive console with R commands
- Data analysis challenge with heart_data.csv
- Statistical correlation calculations
- Multi-panel layout (script, console, environment, files)

### 💕 Interactive Animations
- Floating hearts with physics-based movement
- Mouse/touch repulsion effects
- Confetti celebration animations
- Smooth state transitions

## Customization

Edit `js/config.js` to customize:
- **Reveal date and time** - Set your countdown target
- **Challenge questions** - Customize scavenger hunt levels
- **Love letter** - Write your personal message

## Usage

Simply open `index.html` in a web browser or serve with any HTTP server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx http-server
```

Then navigate to `http://localhost:8000`

## Technical Details

- **Pure HTML/CSS/JavaScript** - No frameworks or dependencies
- **Responsive design** - Works on desktop and mobile
- **Modular architecture** - Clean separation of concerns
- **No build process required** - Ready to deploy

## Browser Compatibility

Tested and working in modern browsers:
- Chrome/Edge (Chromium)
- Firefox
- Safari

## License

Personal project - All rights reserved
