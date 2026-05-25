// ============================================================
// routes/snippetRoutes.js — Snippet CRUD Routes
// ============================================================
// All routes here require authentication (JWT token).
// Maps URL paths to the snippet controller functions.

const express = require('express');
const router  = express.Router();

// Import auth middleware — protects ALL snippet routes
const auth = require('../middleware/auth');

// Import controller functions
const {
  getSnippets,
  createSnippet,
  updateSnippet,
  deleteSnippet
} = require('../controllers/snippetController');

// Apply auth middleware to ALL routes in this file
// This means every request must include a valid JWT token
router.use(auth);

// GET    /api/snippets      — Get all snippets for the logged-in user
router.get('/', getSnippets);

// POST   /api/snippets      — Create a new snippet
router.post('/', createSnippet);

// PUT    /api/snippets/:id  — Update a snippet by its ID
router.put('/:id', updateSnippet);

// DELETE /api/snippets/:id  — Delete a snippet by its ID
router.delete('/:id', deleteSnippet);

module.exports = router;
