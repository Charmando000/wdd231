const menuBtn = document.querySelector('#menu-toggle');
const navLinks = document.querySelector('#nav-links');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    // Update aria-expanded for accessibility
    const isExpanded = navLinks.classList.contains('show');
    menuBtn.setAttribute('aria-expanded', isExpanded);
  });
  
  // Close menu when a link is clicked (better UX on mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// ============================================
// DARK/LIGHT THEME TOGGLE
// ============================================

/**
 * Manage theme preference using localStorage
 * Load saved theme on page load and apply it
 */
const themeToggle = document.querySelector('#theme-toggle');
const body = document.body;

// Load user's saved theme preference from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark');
}

/**
 * Toggle between dark and light themes
 * Persist the user's preference to localStorage
 */
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    // Toggle the 'dark' class on the body element
    body.classList.toggle('dark');
    
    // Save the user's theme preference
    const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    
    // Update button label for accessibility
    const newLabel = currentTheme === 'dark' ? '☀️' : '🌙';
    themeToggle.textContent = newLabel;
  });
}

// Insert last-modified timestamp in footer with machine-readable datetime attribute
function insertLastModified() {
  try {
    const footer = document.querySelector('footer');
    if (!footer) return;

    // Parse document.lastModified into a Date object
    const lastModRaw = document.lastModified;
    const lastModDate = new Date(lastModRaw);
    const iso = isNaN(lastModDate.getTime()) ? new Date().toISOString() : lastModDate.toISOString();

    const formatted = new Date(iso).toLocaleString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      hour: 'numeric', minute: '2-digit', hour12: true
    });

    let el = document.getElementById('last-modified');
    if (!el) {
      el = document.createElement('p');
      el.id = 'last-modified';
      el.className = 'muted';
    }

    el.textContent = `Last modified: ${formatted}`;
    el.setAttribute('datetime', iso);

    // Append to footer if not already present
    if (!footer.contains(el)) footer.appendChild(el);
  } catch (e) {
    // fail silently
    console.error('insertLastModified error', e);
  }
}

// Run on DOMContentLoaded to ensure footer exists
document.addEventListener('DOMContentLoaded', insertLastModified);

