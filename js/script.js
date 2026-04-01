// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.cursor');
const cursorFollow = document.querySelector('.cursor-follow');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  setTimeout(() => {
    cursorFollow.style.left = e.clientX + 'px';
    cursorFollow.style.top = e.clientY + 'px';
  }, 80);
});

document.querySelectorAll('a, button, .skill-chip, .ach-metric-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorFollow.style.transform = 'translate(-50%, -50%) scale(2)';
    cursorFollow.style.borderColor = 'var(--accent)';
  });
  el.addEventListener('mouseleave', () => {
    cursorFollow.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorFollow.style.borderColor = 'rgba(0,229,255,0.4)';
  });
});

// ===== NAVBAR SCROLL =====
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.dataset.delay || 0);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => revealObserver.observe(el));

// ===== LANGUAGE BAR ANIMATION =====
const langFills = document.querySelectorAll('.lang-fill');
const langObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transform = 'scaleX(1)';
      langObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
langFills.forEach(el => langObserver.observe(el));

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, suffix = '', duration = 2000) {
  let start = 0;
  const isDecimal = target % 1 !== 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = isDecimal
      ? start.toFixed(1) + suffix
      : Math.floor(start).toLocaleString() + suffix;
  }, 16);
}

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      animateCounter(el, target, suffix);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(el => counterObserver.observe(el));

// ===== SMOOTH SCROLL NAV =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== STAGGERED REVEAL FOR GRIDS =====
document.querySelectorAll('.stagger-children > *').forEach((el, i) => {
  el.dataset.delay = i * 100;
  el.classList.add('reveal');
});

// ===== TILT EFFECT on hero photo =====
const photoWrap = document.querySelector('.hero-photo-wrap');
if (photoWrap) {
  photoWrap.addEventListener('mousemove', (e) => {
    const rect = photoWrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    photoWrap.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  });
  photoWrap.addEventListener('mouseleave', () => {
    photoWrap.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
    photoWrap.style.transition = 'transform 0.6s ease';
  });
}