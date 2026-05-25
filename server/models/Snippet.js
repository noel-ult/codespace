// ============================================================
// models/Snippet.js — Mongoose Schema for Code Snippets
// ============================================================
// Defines what a "snippet" looks like in the database.
// Each snippet belongs to a specific user (via the "user" field).

const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
  // Which user owns this snippet (links to the Users collection)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',        // References the User model
    required: true
  },

  // The snippet's title (e.g., "Debounce Function")
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },

  // The actual code content
  code: {
    type: String,
    required: [true, 'Code is required']
  },

  // Programming language (e.g., "JavaScript", "Python")
  language: {
    type: String,
    default: ''
  },

  // Tags for organizing snippets (e.g., ["utilities", "dom"])
  tags: {
    type: [String],      // Array of strings
    default: []
  },

  // When the snippet was created
  createdAt: {
    type: Date,
    default: Date.now
  },

  // When the snippet was last updated
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// ---- Pre-save Hook: Update the "updatedAt" timestamp ----
snippetSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export the Snippet model
// MongoDB will create a "snippets" collection automatically
module.exports = mongoose.model('Snippet', snippetSchema);
