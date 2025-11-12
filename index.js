/**
 * Digital Attendance System - Complete Single-Page App
 * All HTML, CSS, and JavaScript in one file.
 * 
 * Usage:
 *   1. Update index.html to load this file: <script src="index.js"></script>
 *   2. Open index.html in browser
 * 
 * Routes: home, features, auth, dashboard, admin, contact
 */

// ============================================================================
// STATE AND CONFIG
// ============================================================================
const app = {
  currentPage: 'home',
  user: null,
  adminLoggedIn: false,
};

// ============================================================================
// CSS STYLES (all-in-one)
// ============================================================================
const styles = `
:root {
  --bg: #f7f9fb;
  --surface: #ffffff;
  --text: #0f1724;
  --muted: #6b7280;
  --accent: #2563eb;
  --accent-2: #06b6d4;
  --radius: 8px;
  --max-width: 980px;
}

* { box-sizing: border-box; }
html, body { height: 100%; margin: 0; }
body {
  font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  background: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
}

.container { max-width: var(--max-width); margin: 0 auto; padding: 1rem; }
.header-inner { display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0; }
.brand { font-weight: 700; color: var(--accent); text-decoration: none; font-size: 1.1rem; cursor: pointer; }
.brand:hover { opacity: 0.8; }
.nav { list-style: none; margin: 0; padding: 0; display: flex; gap: 0.75rem; flex-wrap: wrap; }
.nav a { color: var(--text); text-decoration: none; padding: 0.5rem; border-radius: 6px; cursor: pointer; }
.nav a:hover { background: rgba(0,0,0,0.04); }
.nav a.active { background: var(--accent); color: white; }

.site-header { background: var(--surface); box-shadow: 0 2px 6px rgba(0,0,0,0.05); }
.site-footer { margin-top: 3rem; padding: 1rem 0; background: transparent; }
.footer-inner { display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
.small { font-size: 0.9rem; color: var(--muted); }

.hero { display: grid; grid-template-columns: 1fr 320px; gap: 1rem; align-items: center; padding: 3rem 1rem; }
.hero-content h1 { font-size: 2rem; margin: 0 0 0.25rem 0; }
.lead { color: var(--muted); margin-top: 0; }
.hero-visual { display: flex; align-items: center; justify-content: center; }

.quick-features { padding: 2rem 1rem; }
.feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; list-style: none; padding: 0; margin: 0; }
.feature-grid li { background: var(--surface); padding: 1rem; border-radius: var(--radius); box-shadow: 0 1px 3px rgba(12,12,12,0.04); }
.feature-grid h3 { margin-top: 0; }

.btn {
  display: inline-block;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--text);
  cursor: pointer;
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.2s;
}
.btn:hover { opacity: 0.9; }
.btn.primary { background: var(--accent); color: white; }
.btn.ghost { background: transparent; border: 1px solid rgba(0,0,0,0.06); }

.auth-grid { display: grid; grid-template-columns: 1fr 320px; gap: 1rem; align-items: start; padding: 2rem 1rem; }
.auth-panel { background: var(--surface); padding: 1rem; border-radius: 8px; box-shadow: 0 6px 18px rgba(15,23,36,0.06); }
.auth-tabs { display: flex; gap: 0.5rem; margin: 0.5rem 0 1rem 0; }
.tab {
  background: transparent;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid rgba(0,0,0,0.04);
  cursor: pointer;
  transition: all 0.2s;
}
.tab.active { background: var(--accent); color: white; }
.auth-form { display: flex; flex-direction: column; gap: 0.5rem; }
.auth-form label { font-size: 0.9rem; }
.auth-form input, .auth-form textarea { padding: 0.6rem; border-radius: 6px; border: 1px solid rgba(0,0,0,0.08); font-family: inherit; }

.card { background: var(--surface); padding: 1rem; border-radius: var(--radius); box-shadow: 0 6px 18px rgba(15,23,36,0.04); margin-bottom: 1rem; }
.card h2 { margin-top: 0; }

.dashboard .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem; margin: 1rem 0; }
.stat .big { font-size: 2rem; margin: 0; color: var(--accent); }
.quick-actions { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }

.features-list { padding: 1rem 0; }
.features-list article { margin-bottom: 1.5rem; }
.features-list h2 { color: var(--accent); }

.contact-form { max-width: 640px; }
.contact-info { max-width: 640px; }

.admin-login { max-width: 400px; }
.admin-dashboard { display: none; }
.admin-dashboard.show { display: block; }

#auth-message, #contact-result, #admin-message {
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  display: none;
}
#auth-message.show, #contact-result.show, #admin-message.show { display: block; }

@media (max-width: 900px) {
  .hero { grid-template-columns: 1fr; }
  .auth-grid { grid-template-columns: 1fr; }
  .nav { gap: 0.3rem; }
  .nav a { padding: 0.4rem 0.6rem; font-size: 0.9rem; }
}

/* Accessibility: focus states */
a:focus, button:focus, input:focus, textarea:focus {
  outline: 3px solid rgba(37, 99, 235, 0.18);
  outline-offset: 2px;
}

.muted { color: var(--muted); }
.visually-hidden { position: absolute !important; height: 1px; width: 1px; overflow: hidden; clip: rect(1px,1px,1px,1px); }
`;

// ============================================================================
// HTML TEMPLATES
// ============================================================================
const templates = {
  layout: (content) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Digital Attendance System</title>
      <style>${styles}</style>
    </head>
    <body>
      ${templates.header()}
      <main class="container">${content}</main>
      ${templates.footer()}
    </body>
    </html>
  `,

  header: () => `
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" onclick="app.navigate('home')">Digital Attendance</a>
        <nav>
          <ul class="nav">
            <li><a onclick="app.navigate('home')">Home</a></li>
            <li><a onclick="app.navigate('features')">Features</a></li>
            <li><a onclick="app.navigate('auth')">Register / Login</a></li>
            <li><a onclick="app.navigate('dashboard')">Dashboard</a></li>
            <li><a onclick="app.navigate('admin')">Admin</a></li>
            <li><a onclick="app.navigate('contact')">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `,

  footer: () => `
    <footer class="site-footer">
      <div class="container footer-inner">
        <p>&copy; <span id="year">${new Date().getFullYear()}</span> Digital Attendance System — Built with accessibility & privacy in mind.</p>
      </div>
    </footer>
  `,

  home: () => `
    <div class="hero">
      <div class="hero-content">
        <h1>Digital Attendance System</h1>
        <p class="lead">Streamline attendance tracking for schools, universities, and workplaces. Save time, reduce errors, and get actionable insights.</p>
        <p>
          <a class="btn primary" onclick="app.navigate('auth')">Get Started</a>
          <a class="btn ghost" onclick="app.navigate('features')">See Features</a>
        </p>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <svg width="320" height="220" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="30" width="300" height="160" rx="12" fill="var(--accent)" opacity="0.12"/>
          <circle cx="80" cy="110" r="30" fill="var(--accent)" opacity="0.18"/>
          <rect x="140" y="70" width="140" height="20" rx="6" fill="var(--accent)" opacity="0.18"/>
        </svg>
      </div>
    </div>

    <section class="quick-features" aria-labelledby="quick-features-title">
      <h2 id="quick-features-title">Why choose our system?</h2>
      <ul class="feature-grid">
        <li>
          <h3>Real-time tracking</h3>
          <p>Instant attendance updates and live-class monitoring.</p>
        </li>
        <li>
          <h3>User-friendly</h3>
          <p>Simple interfaces for teachers, students, and employees.</p>
        </li>
        <li>
          <h3>Analytics & Reports</h3>
          <p>Downloadable reports and visual insights.</p>
        </li>
        <li>
          <h3>Mobile-ready</h3>
          <p>Works on phones, tablets, and desktops.</p>
        </li>
      </ul>
    </section>
  `,

  features: () => `
    <h1>Key Features</h1>
    <p class="lead">Our Digital Attendance System includes the following capabilities designed for modern organisations.</p>

    <section class="features-list">
      <article>
        <h2>Real-time attendance tracking</h2>
        <p>Mark attendance live with QR codes, geolocation, or manual check-in. Monitor presence per session or day.</p>
      </article>

      <article>
        <h2>User-friendly interface</h2>
        <p>Intuitive UI for students, staff, and administrators — minimal training required.</p>
      </article>

      <article>
        <h2>Data analytics and reporting</h2>
        <p>Visual dashboards, exportable CSV/PDF reports, and trend analysis to identify absenteeism patterns.</p>
      </article>

      <article>
        <h2>Mobile accessibility</h2>
        <p>Responsive design and optional mobile app for convenient check-ins and notifications.</p>
      </article>

      <article>
        <h2>Integration</h2>
        <p>Connect with existing systems (LMS, HR software) using APIs, SSO (SAML/OAuth2), or scheduled exports.</p>
      </article>
    </section>
  `,

  auth: () => `
    <div class="auth-grid">
      <div class="auth-panel">
        <h1 id="auth-title">Welcome</h1>
        <p class="lead">Create an account or sign in to access attendance tools.</p>

        <div class="auth-tabs" role="tablist" aria-label="Authentication Tabs">
          <button class="tab active" data-target="register" role="tab" onclick="app.switchTab('register', this)">Register</button>
          <button class="tab" data-target="login" role="tab" onclick="app.switchTab('login', this)">Login</button>
        </div>

        <form id="register" class="auth-form" aria-hidden="false" onsubmit="app.handleRegister(event)">
          <label for="reg-name">Full name</label>
          <input id="reg-name" name="name" type="text" required>

          <label for="reg-email">Email</label>
          <input id="reg-email" name="email" type="email" required>

          <label for="reg-pass">Password</label>
          <input id="reg-pass" name="password" type="password" minlength="8" required>

          <button class="btn primary" type="submit">Create account</button>
        </form>

        <form id="login" class="auth-form" aria-hidden="true" style="display: none;" onsubmit="app.handleLogin(event)">
          <label for="login-email">Email</label>
          <input id="login-email" name="email" type="email" required>

          <label for="login-pass">Password</label>
          <input id="login-pass" name="password" type="password" required>

          <p class="small"><a href="#" onclick="app.handleForgotPassword(event)">Forgot password?</a></p>
          <button class="btn primary" type="submit">Sign in</button>
        </form>

        <div id="auth-message" role="status" aria-live="polite"></div>
      </div>

      <aside class="auth-aside" aria-hidden="true">
        <h2>Why sign up?</h2>
        <ul>
          <li>Personal dashboard</li>
          <li>Manage attendance & reports</li>
          <li>Receive notifications</li>
        </ul>
      </aside>
    </div>
  `,

  dashboard: () => `
    <h1>Dashboard</h1>
    <p class="lead">Overview of attendance statistics</p>

    <section class="stats-grid" aria-label="Attendance statistics">
      <div class="card stat">
        <h3 id="total-att">Total Present</h3>
        <p class="big" id="stat-total">0</p>
      </div>
      <div class="card stat">
        <h3>Absent Today</h3>
        <p class="big" id="stat-absent">0</p>
      </div>
      <div class="card stat">
        <h3>Late</h3>
        <p class="big" id="stat-late">0</p>
      </div>
    </section>

    <section class="quick-actions">
      <button class="btn primary" onclick="app.markAttendance()">Mark Attendance</button>
      <button class="btn" onclick="app.viewReports()">View Reports</button>
      <button class="btn" onclick="app.manageProfile()">Profile</button>
    </section>

    <section class="profile card" aria-labelledby="profile-title">
      <h2 id="profile-title">Your Profile</h2>
      <p><strong>Name:</strong> <span id="user-name">Guest User</span></p>
      <p><strong>Email:</strong> <span id="user-email">—</span></p>
      <button class="btn ghost" onclick="app.editProfile()">Edit profile</button>
    </section>
  `,

  admin: () => `
    <h1>Admin Panel</h1>

    <section class="admin-login card">
      <h2>Admin Login</h2>
      <p class="small">This is a demo-only client-side login. Implement server-side auth for production.</p>
      <form id="admin-login" onsubmit="app.handleAdminLogin(event)">
        <label for="admin-user">Username</label>
        <input id="admin-user" type="text" required>

        <label for="admin-pass">Password</label>
        <input id="admin-pass" type="password" required>

        <button class="btn primary" type="submit">Sign in</button>
      </form>
      <div id="admin-message" role="status" aria-live="polite"></div>
    </section>

    <section id="admin-dashboard" class="admin-dashboard card">
      <h2>Manage Users</h2>
      <p>Quick controls to manage users and view attendance records (demo).</p>
      <button class="btn" onclick="app.listUsers()">List users</button>
      <button class="btn" onclick="app.exportReports()">Export reports</button>
    </section>
  `,

  contact: () => `
    <h1>Contact Us</h1>
    <p class="lead">Have questions or feedback? Send us a message and we'll respond shortly.</p>

    <form id="contact-form" class="card contact-form" onsubmit="app.handleContact(event)">
      <label for="c-name">Name</label>
      <input id="c-name" name="name" type="text" required>

      <label for="c-email">Email</label>
      <input id="c-email" name="email" type="email" required>

      <label for="c-message">Message</label>
      <textarea id="c-message" name="message" rows="6" required></textarea>

      <button class="btn primary" type="submit">Send message</button>
      <div id="contact-result" role="status" aria-live="polite"></div>
    </form>

    <section class="contact-info card">
      <h2>Contact information</h2>
      <p>Email: <a href="mailto:info@digital-attendance.example">info@digital-attendance.example</a></p>
      <p>Phone: +91 933 xxxx xxx</p>
    </section>
  `,
};

// ============================================================================
// APP NAVIGATION AND RENDERING
// ============================================================================
app.navigate = function(page) {
  app.currentPage = page;
  app.render();
  window.scrollTo(0, 0);
};

app.render = function() {
  const pageTemplate = templates[app.currentPage] || templates.home;
  const content = pageTemplate();
  document.body.innerHTML = templates.layout(content);
  app.attachEventListeners();
};

// ============================================================================
// EVENT HANDLERS
// ============================================================================
app.switchTab = function(target, button) {
  // Update active tab button
  document.querySelectorAll('.auth-tabs .tab').forEach(t => t.classList.remove('active'));
  button.classList.add('active');

  // Show/hide forms
  const registerForm = document.getElementById('register');
  const loginForm = document.getElementById('login');
  if (target === 'register') {
    registerForm.style.display = 'flex';
    registerForm.setAttribute('aria-hidden', 'false');
    loginForm.style.display = 'none';
    loginForm.setAttribute('aria-hidden', 'true');
  } else {
    registerForm.style.display = 'none';
    registerForm.setAttribute('aria-hidden', 'true');
    loginForm.style.display = 'flex';
    loginForm.setAttribute('aria-hidden', 'false');
  }
};

app.handleRegister = function(event) {
  event.preventDefault();
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pass = document.getElementById('reg-pass').value;
  const msg = document.getElementById('auth-message');

  if (name && email && pass.length >= 8) {
    app.user = { name, email };
    msg.textContent = '✓ Account created (demo). Implement server-side registration to persist users.';
    msg.className = 'show muted';
    setTimeout(() => app.navigate('dashboard'), 1200);
  } else {
    msg.textContent = '✗ Please provide valid name, email, and a password of at least 8 characters.';
    msg.className = 'show';
  }
};

app.handleLogin = function(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-pass').value;
  const msg = document.getElementById('auth-message');

  if (email && pass) {
    app.user = { email, name: email.split('@')[0] };
    msg.textContent = '✓ Signed in (demo). In production, authenticate with a secure backend.';
    msg.className = 'show muted';
    setTimeout(() => app.navigate('dashboard'), 800);
  } else {
    msg.textContent = '✗ Please enter email and password.';
    msg.className = 'show';
  }
};

app.handleForgotPassword = function(event) {
  event.preventDefault();
  alert('Password recovery placeholder. Implement email-based reset in production.');
};

app.handleContact = function(event) {
  event.preventDefault();
  const result = document.getElementById('contact-result');
  result.textContent = '✓ Thanks — your message was sent (demo). Connect to a backend or email service to send messages for real.';
  result.className = 'show muted';
  document.getElementById('contact-form').reset();
};

app.handleAdminLogin = function(event) {
  event.preventDefault();
  const user = document.getElementById('admin-user').value.trim();
  const pass = document.getElementById('admin-pass').value;
  const msg = document.getElementById('admin-message');
  const dashboard = document.getElementById('admin-dashboard');

  // Demo: hard-coded credentials
  if (user === 'admin' && pass === 'adminpass') {
    app.adminLoggedIn = true;
    msg.textContent = '✓ Admin signed in (demo).';
    msg.className = 'show muted';
    document.getElementById('admin-login').style.display = 'none';
    dashboard.classList.add('show');
  } else {
    msg.textContent = '✗ Invalid credentials (demo: admin / adminpass). For production, implement secure server-side authentication.';
    msg.className = 'show';
  }
};

app.markAttendance = function() {
  alert('Mark attendance: Implement QR scan or geolocation check-in here.');
};

app.viewReports = function() {
  alert('View Reports: Show attendance trends, export CSV/PDF.');
};

app.manageProfile = function() {
  alert('Manage Profile: Edit user information and settings.');
};

app.editProfile = function() {
  alert('Edit Profile: Implement profile edit modal or page.');
};

app.listUsers = function() {
  alert('List Users: Show all registered users (requires backend API).');
};

app.exportReports = function() {
  alert('Export Reports: Generate and download attendance reports.');
};

// ============================================================================
// EVENT LISTENER ATTACHMENT
// ============================================================================
app.attachEventListeners = function() {
  // Update dashboard stats if on dashboard
  if (app.currentPage === 'dashboard') {
    document.getElementById('stat-total').textContent = 128;
    document.getElementById('stat-absent').textContent = 7;
    document.getElementById('stat-late').textContent = 3;
    if (app.user) {
      document.getElementById('user-name').textContent = app.user.name || 'Guest';
      document.getElementById('user-email').textContent = app.user.email || '—';
    }
  }
};

// ============================================================================
// INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', function() {
  app.render();
});

// Also render on page load (backup)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.render());
} else {
  app.render();
}
