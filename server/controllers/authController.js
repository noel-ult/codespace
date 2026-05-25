// ============================================================
// controllers/authController.js — Authentication Logic
// ============================================================
// Handles user signup, login, and profile retrieval.
// Uses JWT (JSON Web Tokens) for stateless authentication.

const jwt  = require('jsonwebtoken');
const User = require('../models/User');

// ---- Helper: Generate a JWT token ----
// Takes a user ID and returns a signed token string
function generateToken(userId) {
  return jwt.sign(
    { id: userId },                    // Payload — data stored in the token
    process.env.JWT_SECRET,            // Secret key — used to sign/verify
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }  // Expiration
  );
}

// ---- SIGNUP ----
// POST /api/auth/signup
// Creates a new user account and returns a JWT token
async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    // Validate: make sure all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide username, email, and password.' });
    }

    // Check: is this email already registered?
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return res.status(400).json({ message: 'An account with this email already exists.' });
    }

    // Check: is this username already taken?
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'This username is already taken.' });
    }

    // Create the new user (password is hashed automatically by the pre-save hook)
    const user = await User.create({ username, email, password });

    // Generate a JWT token for the new user
    const token = generateToken(user._id);

    // Send back the token and user info (without the password!)
    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Signup error:', error.message);
    res.status(500).json({ message: 'Server error during signup.' });
  }
}

// ---- LOGIN ----
// POST /api/auth/login
// Verifies credentials and returns a JWT token
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validate: make sure both fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password.' });
    }

    // Find the user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Compare the entered password with the stored hash
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate a JWT token
    const token = generateToken(user._id);

    // Send back the token and user info
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error during login.' });
  }
}

// ---- GET PROFILE ----
// GET /api/auth/me  (protected — requires JWT)
// Returns the currently logged-in user's profile
async function getProfile(req, res) {
  try {
    // req.user.id was set by the auth middleware
    const user = await User.findById(req.user.id).select('-password');
    // .select('-password') excludes the password field from the result

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error.message);
    res.status(500).json({ message: 'Server error.' });
  }
}

module.exports = { signup, login, getProfile };
