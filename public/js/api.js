// ============================================================
// js/api.js — API Client with JWT Authentication
// ============================================================
// A simple fetch wrapper that automatically attaches the JWT
// token to every request. Used by both app.js and auth.js.
// Redirects to login page if the token is invalid/expired.

const api = {
  // ---- Helper: get stored JWT token ----
  getToken() {
    return localStorage.getItem('sv_token');
  },

  // ---- Helper: build headers with auth token ----
  headers(includeBody = false) {
    const h = {};
    const token = this.getToken();
    if (token) h['Authorization'] = 'Bearer ' + token;
    if (includeBody) h['Content-Type'] = 'application/json';
    return h;
  },

  // ---- Helper: handle the response ----
  async handleResponse(res) {
    const data = await res.json();

    // If the server says "not authorized", redirect to login
    if (res.status === 401) {
      localStorage.removeItem('sv_token');
      localStorage.removeItem('sv_user');
      window.location.href = '/login.html';
      throw new Error('Session expired');
    }

    // If the response is not OK (4xx or 5xx), throw the error message
    if (!res.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  },

  // ---- GET request ----
  async get(url) {
    const res = await fetch(url, { headers: this.headers() });
    return this.handleResponse(res);
  },

  // ---- POST request ----
  async post(url, body) {
    const res = await fetch(url, {
      method: 'POST',
      headers: this.headers(true),
      body: JSON.stringify(body)
    });
    return this.handleResponse(res);
  },

  // ---- PUT request ----
  async put(url, body) {
    const res = await fetch(url, {
      method: 'PUT',
      headers: this.headers(true),
      body: JSON.stringify(body)
    });
    return this.handleResponse(res);
  },

  // ---- DELETE request ----
  async del(url) {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: this.headers()
    });
    return this.handleResponse(res);
  }
};

// Make api available globally
window.api = api;
