// ========== ANIMATIONS & EFFECTS ==========

// Trigger confetti celebration
function triggerConfetti() {
    const colors = ['#c9929d', '#d4a5b4', '#e8c8d0', '#fde7e7', '#fdf8f5'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti confetti-active';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.width = Math.random() * 15 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.animation = `confetti-fall ${Math.random() * 2 + 2}s ease-out forwards`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
}

// Generate floating hearts, flaming hearts, and sparkles
function generateHearts() {
    const container = document.getElementById('hearts-container');
    const hearts = ['💕', '❤️‍🔥', '🍑', '🐭', '✨'];
    
    // Spawn gradually instead of all at once
    let spawnCount = 0;
    const spawnInterval = setInterval(() => {
        if (spawnCount < 80) {
            createHeart(container, hearts);
            spawnCount++;
        } else {
            clearInterval(spawnInterval);
        }
    }, 100);
    
    // Continuously spawn new hearts every 300ms
    setInterval(() => {
        createHeart(container, hearts);
    }, 300);
}

function createHeart(container, hearts) {
    const heart = document.createElement('div');
    heart.className = 'heart-float';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    
    // Spawn from bottom of screen
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight + 20; // Slightly below viewport
    heart.style.left = startX + 'px';
    heart.style.top = startY + 'px';
    
    // Random animation duration between 6-12 seconds
    const duration = Math.random() * 6 + 6;
    heart.style.animationDuration = duration + 's';
    
    // Random size variation
    const sizeVariation = Math.random() * 0.6 + 0.7;
    heart.style.fontSize = (1.2 * sizeVariation) + 'rem';
    
    // Store position and velocity data
    heart.dataset.startX = startX;
    heart.dataset.startY = startY;
    heart.dataset.duration = duration;
    heart.dataset.velocityX = (Math.random() - 0.5) * 0.3; // Horizontal drift velocity
    heart.dataset.velocityY = -1.2; // Upward velocity (faster to reach top)
    heart.dataset.startTime = Date.now();
    
    container.appendChild(heart);
    
    // Remove after animation completes
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Mouse/Touch interaction - hearts react and move away
let interactionX = window.innerWidth / 2;
let interactionY = window.innerHeight / 2;

// Mouse tracking
document.addEventListener('mousemove', (e) => {
    interactionX = e.clientX;
    interactionY = e.clientY;
});

// Touch tracking for mobile
document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        interactionX = e.touches[0].clientX;
        interactionY = e.touches[0].clientY;
    }
}, { passive: true });

// Update heart positions based on mouse
function updateHeartRepulsion() {
    const hearts = document.querySelectorAll('.heart-float');
    
    hearts.forEach(heart => {
        const startX = parseFloat(heart.dataset.startX);
        const startY = parseFloat(heart.dataset.startY);
        const duration = parseFloat(heart.dataset.duration);
        const startTime = parseFloat(heart.dataset.startTime);
        
        const elapsed = (Date.now() - startTime) / 1000;
        const progress = elapsed / duration;
        
        if (progress > 1) {
            return;
        }
        
        let velocityX = parseFloat(heart.dataset.velocityX);
        let velocityY = parseFloat(heart.dataset.velocityY);
        
        // Calculate current position
        let currentX = startX + velocityX * elapsed * 80;
        let currentY = startY + velocityY * elapsed * 80;
        
        // Distance to mouse/touch
        const dx = currentX - interactionX;
        const dy = currentY - interactionY;
        const dist = Math.hypot(dx, dy);
        const repelDistance = 220;
        
        if (dist < repelDistance && dist > 0) {
            // Calculate repulsion direction
            const angle = Math.atan2(dy, dx);
            const force = (repelDistance - dist) / repelDistance;
            
            // Modify velocity based on repulsion (change direction, not just position)
            const repelStrength = force * 1.5;
            velocityX += Math.cos(angle) * repelStrength * 0.015;
            velocityY += Math.sin(angle) * repelStrength * 0.015;
            
            // Store updated velocity
            heart.dataset.velocityX = velocityX;
            heart.dataset.velocityY = velocityY;
            
            // Recalculate position with new velocity
            currentX = startX + velocityX * elapsed * 80;
            currentY = startY + velocityY * elapsed * 80;
        }
        
        const offsetX = currentX - startX;
        const offsetY = currentY - startY;
        
        heart.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
    
    requestAnimationFrame(updateHeartRepulsion);
}
