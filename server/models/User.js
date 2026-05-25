// ============================================================
// models/User.js — Mongoose Schema for Users
// ============================================================
// Defines what a "user" looks like in the database.
// Includes automatic password hashing for security.

const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

// Define the shape of a user document in MongoDB
const userSchema = new mongoose.Schema({
  // The user's display name
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,          // Remove whitespace from both ends
    minlength: [2, 'Username must be at least 2 characters']
  },

  // The user's email address (used for login)
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,     // Always store as lowercase
    trim: true
  },

  // The user's password (will be hashed before saving)
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },

  // When the account was created
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ---- Pre-save Hook: Hash password before saving ----
// This runs automatically every time a user document is saved.
// It converts the plain-text password into a secure hash.
userSchema.pre('save', async function (next) {
  // Only hash the password if it's been changed (or is new)
  // This prevents re-hashing when updating other fields like username
  if (!this.isModified('password')) return next();

  try {
    // Generate a "salt" (random data added to the password before hashing)
    // The number 10 controls how strong the hash is (higher = slower but safer)
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the salt
    this.password = await bcrypt.hash(this.password, salt);

    next(); // Continue saving
  } catch (error) {
    next(error); // Pass error to Express error handler
  }
});

// ---- Instance Method: Compare passwords ----
// Used during login to check if the entered password matches the stored hash
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create and export the User model
// MongoDB will create a "users" collection automatically
module.exports = mongoose.model('User', userSchema);
