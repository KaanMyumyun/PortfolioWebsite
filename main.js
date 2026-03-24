// ── DARK MODE ──
function toggleDark() {
  const dark = document.body.classList.toggle('dark');
  localStorage.setItem('theme', dark ? 'dark' : 'light');
  document.getElementById('iconSun').style.display = dark ? 'block' : 'none';
  document.getElementById('iconMoon').style.display = dark ? 'none' : 'block';
}

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('iconSun').style.display = 'block';
    document.getElementById('iconMoon').style.display = 'none';
  });
}

// ── SMOOTH SCROLL WITH NAV OFFSET ──
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href.startsWith('#')) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const navHeight = document.querySelector('nav').offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
    window.scrollTo({ top, behavior: 'smooth' });
    closeMenu();
  });
});
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('active');
}

function closeMenu() {
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('hamburger').classList.remove('active');
}

// ── CONTACT FORM ──
async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const res = await fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  });
  if (res.ok) {
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('successMsg').style.display = 'block';
  } else {
    alert('Something went wrong. Please try again.');
  }
}

// ── COPY EMAIL ──
function copyEmail() {
  navigator.clipboard.writeText('kaan.myumyunn@gmail.com');
  const tip = document.getElementById('copyTooltip');
  tip.classList.add('show');
  setTimeout(() => tip.classList.remove('show'), 2000);
}

// ── BACK TO TOP ──
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
  const btn = document.getElementById('backToTop');
  if (btn) btn.classList.toggle('visible', window.scrollY > 400);
});

// ── ON DOM READY ──
document.addEventListener('DOMContentLoaded', () => {

  // Scroll-in animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.classList.add('visible');
        observer.unobserve(el.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 80) current = sec.getAttribute('id');
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  });
});