window.addEventListener('DOMContentLoaded', function() {
  // Only show Return Home button if not on index.html or /
  const isHome =
    window.location.pathname.endsWith('index.html') ||
    window.location.pathname === '/' ||
    window.location.pathname === '/iceanniefam.github.io/';

  if (!isHome) {
    const btn = document.createElement('a');
    btn.href = 'index.html';
    btn.className = 'return-home';
    btn.textContent = '← Return Home';
    document.body.insertAdjacentElement('afterbegin', btn);
  }

  // Theme toggle button
  const themeBtn = document.createElement('button');
  themeBtn.className = 'theme-toggle';
  themeBtn.textContent = '🌙';

  // Insert theme toggle into header
  const header = document.querySelector('header');
  if (header) {
    header.appendChild(themeBtn);
  } else {
    // fallback: insert at top if no header
    document.body.insertAdjacentElement('afterbegin', themeBtn);
  }

  // Theme toggle logic
  function setTheme(theme) {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', theme);
  }

  // Load saved theme or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  themeBtn.addEventListener('click', function() {
    const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
    setTheme(newTheme);
  });
});