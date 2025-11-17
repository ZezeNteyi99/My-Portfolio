// ============================================
// NIGHT SKY CANVAS
// ============================================
(() => {
  const canvas = document.getElementById('sky-canvas');
  const ctx = canvas.getContext('2d', { alpha: true });

  let w = 0, h = 0;
  let stars = [];
  const STAR_COUNT = Math.round(Math.max(120, (window.innerWidth * window.innerHeight) / 12000));
  const SHOOTING_INTERVAL = 2200;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    initStars();
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        baseAlpha: 0.25 + Math.random() * 0.7,
        twinkleSpeed: 0.002 + Math.random() * 0.01,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  let shootingStars = [];

  function spawnShootingStar() {
    const startX = Math.random() * w * 0.6;
    const startY = Math.random() * h * 0.4;
    const len = 150 + Math.random() * 220;
    const speed = 6 + Math.random() * 6;
    shootingStars.push({
      x: startX, y: startY, len, speed, life: 0,
      angle: Math.PI * 0.35 + (Math.random() - 0.5) * 0.2
    });
    if (shootingStars.length > 6) shootingStars.shift();
  }

  setInterval(() => {
    if (Math.random() < 0.7) spawnShootingStar();
  }, SHOOTING_INTERVAL);

  let lastTime = performance.now();
  function draw(now) {
    const dt = now - lastTime;
    lastTime = now;

    ctx.clearRect(0, 0, w, h);

    const g = ctx.createRadialGradient(w * 0.45, h * 0.5, 20, w * 0.45, h * 0.5, Math.max(w, h));
    g.addColorStop(0, 'rgba(118,185,224,0.06)');
    g.addColorStop(0.3, 'rgba(55,66,221,0.04)');
    g.addColorStop(1, 'rgba(0,0,0,0.0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    for (let s of stars) {
      s.phase += s.twinkleSpeed * dt;
      const alpha = s.baseAlpha * (0.6 + 0.4 * Math.sin(s.phase));
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const st = shootingStars[i];
      st.life += dt;
      st.x += Math.cos(st.angle) * st.speed;
      st.y += Math.sin(st.angle) * st.speed;

      ctx.beginPath();
      const grad = ctx.createLinearGradient(st.x, st.y, st.x - Math.cos(st.angle) * st.len, st.y - Math.sin(st.angle) * st.len);
      grad.addColorStop(0, 'rgba(180, 255, 255, 0.95)');
      grad.addColorStop(0.7, 'rgba(90, 200, 220, 0.6)');
      grad.addColorStop(1, 'rgba(40, 80, 100, 0.0)');
      ctx.fillStyle = grad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(st.x, st.y);
      ctx.lineTo(st.x - Math.cos(st.angle) * st.len, st.y - Math.sin(st.angle) * st.len);
      ctx.strokeStyle = grad;
      ctx.stroke();

      if (st.x > w + 100 || st.y > h + 100) {
        shootingStars.splice(i, 1);
      }
    }

    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(draw);
  window.addEventListener('click', () => spawnShootingStar());
})();

// ============================================
// TYPING ANIMATION
// ============================================
const text = "Khanyisa Zezethu Nteyi";
const typedTextElement = document.getElementById('typedText');
let charIndex = 0;

function typeText() {
  if (charIndex < text.length) {
    typedTextElement.textContent += text.charAt(charIndex);
    charIndex++;
    setTimeout(typeText, 100);
  }
}

setTimeout(typeText, 500);

// ============================================
// THEME TOGGLE
// ============================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
  body.classList.add('light-mode');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  
  if (body.classList.contains('light-mode')) {
    themeToggle.textContent = '☀️';
    localStorage.setItem('theme', 'light');
} else {
themeToggle.textContent = '🌙';
localStorage.setItem('theme', 'dark');
}
});
// ============================================
// SCROLL ANIMATIONS
// ============================================
const sections = document.querySelectorAll('.section');
const observerOptions = {
threshold: 0.2,
rootMargin: '0px 0px -100px 0px'
};
const sectionObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('visible');
}
});
}, observerOptions);
sections.forEach(section => {
sectionObserver.observe(section);
});
// ============================================
// SKILL BARS ANIMATION
// ============================================
const skillsSection = document.getElementById('skills');
let skillsAnimated = false;
const skillObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting && !skillsAnimated) {
const skillBars = document.querySelectorAll('.skill-progress');
skillBars.forEach(bar => {
const progress = bar.getAttribute('data-progress');
setTimeout(() => {
bar.style.width = progress + '%';
}, 200);
});
skillsAnimated = true;
}
});
}, { threshold: 0.5 });
skillObserver.observe(skillsSection);
// ============================================
// HAMBURGER MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
navLinks.classList.toggle('active');
});
// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
link.addEventListener('click', () => {
navLinks.classList.remove('active');
});
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
e.preventDefault();
const target = document.querySelector(this.getAttribute('href'));
if (target) {
target.scrollIntoView({
behavior: 'smooth',
block: 'start'
});
}
});
});


