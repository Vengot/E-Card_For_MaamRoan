// Select elements
const openBtn = document.getElementById('openCardBtn');
const closeBtn = document.getElementById('closeCardBtn');
const modal = document.getElementById('ecardModal');

// Open Modal
openBtn.addEventListener('click', () => {
  modal.classList.add('show');
  fireConfetti(); // Trigger the confetti effect
});

// Close Modal
closeBtn.addEventListener('click', () => {
  modal.classList.remove('show');
});

// Close if clicking outside the letter
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.remove('show');
  }
});

// Close with Escape key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('show')) {
    modal.classList.remove('show');
  }
});


// --- CUSTOM CONFETTI LOGIC (No libraries needed) ---
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function fireConfetti() {
  particles = []; // Reset existing
  
  // Cute Cutiecakes Colors: Light Purple, Pink, White, Gold
  const colors = ['#d8b4fe', '#f9a8d4', '#ffffff', '#fde047'];
  
  // Create 100 particles
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2 + 100, // Start slightly below center
      vx: (Math.random() - 0.5) * 15, // Random X speed
      vy: (Math.random() - 1) * 15, // Random Y speed (upwards)
      size: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      life: 100 + Math.random() * 50 // How long it lasts
    });
  }
  
  animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let activeParticles = 0;

  particles.forEach((p) => {
    if (p.life > 0) {
      activeParticles++;
      
      // Physics
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.3; // Gravity (slightly slower for cuter float effect)
      p.vx *= 0.98; // Air resistance
      p.vy *= 0.98;
      p.rotation += p.rotationSpeed;
      p.life -= 1;

      // Draw Particle
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, p.life / 100); // Fade out
      
      // Draw cute little circles/squares
      if (Math.random() > 0.5) {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      }
      
      ctx.restore();
    }
  });

  if (activeParticles > 0) {
    requestAnimationFrame(animateConfetti);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Cleanup
  }
}