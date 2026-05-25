// ============================================================
// routes/authRoutes.js — Authentication Routes
// ============================================================
// Maps URL paths to the auth controller functions.

const express = require('express');
const router  = express.Router();

// Import controller functions
const { signup, login, getProfile } = require('../controllers/authController');

// Import auth middleware (to protect the /me route)
const auth = require('../middleware/auth');

// POST /api/auth/signup — Create a new account
router.post('/signup', signup);

// POST /api/auth/login — Log in and get a token
router.post('/login', login);

// GET /api/auth/me — Get current user's profile (protected)
router.get('/me', auth, getProfile);

module.exports = router;
