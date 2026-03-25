// ── DARK MODE ──
function toggleDark() {
  const dark = document.body.classList.toggle('dark');
  localStorage.setItem('theme', dark ? 'dark' : 'light');
  document.getElementById('iconSun').style.display = dark ? 'block' : 'none';
  document.getElementById('iconMoon').style.display = dark ? 'none' : 'block';
}
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  document.getElementById('iconSun').style.display = 'block';
  document.getElementById('iconMoon').style.display = 'none';
}

// ── HAMBURGER ──
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('active');
}
function closeMenu() {
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('hamburger').classList.remove('active');
}

// ── NAV CLICKS - close menu only, CSS handles smooth scroll ──
document.querySelectorAll('.nav-links a').forEach(function(link) {
  link.addEventListener('click', function() {
    closeMenu();
  });
});

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
  var tip = document.getElementById('copyTooltip');
  tip.classList.add('show');
  setTimeout(function() { tip.classList.remove('show'); }, 2000);
}

// ── BACK TO TOP ──
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.addEventListener('scroll', function() {
  var btn = document.getElementById('backToTop');
  if (btn) btn.classList.toggle('visible', window.pageYOffset > 400);
});

// ── AUTO YEAR ──
var yearEl = document.getElementById('currentYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── SCROLL FADE-IN ──
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(el) {
    if (el.isIntersecting) {
      el.target.classList.add('visible');
      observer.unobserve(el.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(function(el) { observer.observe(el); });

// ── ACTIVE NAV ON SCROLL ──
var sections = document.querySelectorAll('section[id]');
var navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', function() {
  var current = '';
  sections.forEach(function(sec) {
    if (window.pageYOffset >= sec.offsetTop - 80) current = sec.getAttribute('id');
  });
  navLinks.forEach(function(a) {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});