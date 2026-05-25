// ============================================================
// js/auth.js — Login & Signup Page Logic
// ============================================================
// Handles form submissions on login.html and signup.html.
// Sends credentials to the API and stores the JWT token.

document.addEventListener('DOMContentLoaded', () => {

  // If the user already has a token, redirect to the main app
  if (localStorage.getItem('sv_token')) {
    window.location.href = '/index.html';
    return;
  }

  // ---- LOGIN FORM ----
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const errorEl = document.getElementById('auth-error');
      errorEl.textContent = '';
      errorEl.classList.add('hidden');

      const email    = document.getElementById('auth-email').value.trim();
      const password = document.getElementById('auth-password').value;

      // Basic validation
      if (!email || !password) {
        errorEl.textContent = 'Please fill in all fields.';
        errorEl.classList.remove('hidden');
        return;
      }

      try {
        // Send login request to the API
        const data = await api.post('/api/auth/login', { email, password });

        // Store the token and user info in localStorage
        localStorage.setItem('sv_token', data.token);
        localStorage.setItem('sv_user', JSON.stringify(data.user));

        // Redirect to the main app
        window.location.href = '/index.html';
      } catch (err) {
        // Show error message from the server
        errorEl.textContent = err.message || 'Login failed. Please try again.';
        errorEl.classList.remove('hidden');
      }
    });
  }

  // ---- SIGNUP FORM ----
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const errorEl = document.getElementById('auth-error');
      errorEl.textContent = '';
      errorEl.classList.add('hidden');

      const username        = document.getElementById('auth-username').value.trim();
      const email           = document.getElementById('auth-email').value.trim();
      const password        = document.getElementById('auth-password').value;
      const confirmPassword = document.getElementById('auth-confirm').value;

      // Basic validation
      if (!username || !email || !password || !confirmPassword) {
        errorEl.textContent = 'Please fill in all fields.';
        errorEl.classList.remove('hidden');
        return;
      }

      // Check passwords match
      if (password !== confirmPassword) {
        errorEl.textContent = 'Passwords do not match.';
        errorEl.classList.remove('hidden');
        return;
      }

      // Check password length
      if (password.length < 6) {
        errorEl.textContent = 'Password must be at least 6 characters.';
        errorEl.classList.remove('hidden');
        return;
      }

      try {
        // Send signup request to the API
        const data = await api.post('/api/auth/signup', { username, email, password });

        // Store the token and user info
        localStorage.setItem('sv_token', data.token);
        localStorage.setItem('sv_user', JSON.stringify(data.user));

        // Redirect to the main app
        window.location.href = '/index.html';
      } catch (err) {
        errorEl.textContent = err.message || 'Signup failed. Please try again.';
        errorEl.classList.remove('hidden');
      }
    });
  }
});
