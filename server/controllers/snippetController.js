// ============================================================
// controllers/snippetController.js — Snippet CRUD Logic
// ============================================================
// Handles creating, reading, updating, and deleting snippets.
// All operations are scoped to the logged-in user (ownership).

const Snippet = require('../models/Snippet');

// ---- GET ALL SNIPPETS ----
// GET /api/snippets
// Returns all snippets belonging to the logged-in user
async function getSnippets(req, res) {
  try {
    // Find all snippets where the "user" field matches the logged-in user's ID
    // Sort by newest first (most recently created at the top)
    const snippets = await Snippet.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json({ snippets });
  } catch (error) {
    console.error('Get snippets error:', error.message);
    res.status(500).json({ message: 'Failed to fetch snippets.' });
  }
}

// ---- CREATE SNIPPET ----
// POST /api/snippets
// Creates a new snippet linked to the logged-in user
async function createSnippet(req, res) {
  try {
    const { title, code, language, tags } = req.body;

    // Validate required fields
    if (!title || !code) {
      return res.status(400).json({ message: 'Title and code are required.' });
    }

    // Create the snippet in the database
    const snippet = await Snippet.create({
      user: req.user.id,    // Link this snippet to the logged-in user
      title,
      code,
      language: language || '',
      tags: Array.isArray(tags) ? tags : []
    });

    res.status(201).json({ snippet });
  } catch (error) {
    console.error('Create snippet error:', error.message);
    res.status(500).json({ message: 'Failed to create snippet.' });
  }
}

// ---- UPDATE SNIPPET ----
// PUT /api/snippets/:id
// Updates a snippet (only if the user owns it)
async function updateSnippet(req, res) {
  try {
    const { title, code, language, tags } = req.body;

    // Find the snippet by ID AND user (ownership check!)
    // If someone tries to update another user's snippet, this returns null
    const snippet = await Snippet.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found or not authorized.' });
    }

    // Update the fields (only if provided in the request)
    if (title !== undefined) snippet.title = title;
    if (code !== undefined) snippet.code = code;
    if (language !== undefined) snippet.language = language;
    if (tags !== undefined) snippet.tags = Array.isArray(tags) ? tags : [];

    // Save triggers the pre-save hook (updates "updatedAt")
    await snippet.save();

    res.json({ snippet });
  } catch (error) {
    console.error('Update snippet error:', error.message);
    res.status(500).json({ message: 'Failed to update snippet.' });
  }
}

// ---- DELETE SNIPPET ----
// DELETE /api/snippets/:id
// Deletes a snippet (only if the user owns it)
async function deleteSnippet(req, res) {
  try {
    // Find and delete in one step — only if the user owns it
    const snippet = await Snippet.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found or not authorized.' });
    }

    res.json({ message: 'Snippet deleted successfully.' });
  } catch (error) {
    console.error('Delete snippet error:', error.message);
    res.status(500).json({ message: 'Failed to delete snippet.' });
  }
}

module.exports = { getSnippets, createSnippet, updateSnippet, deleteSnippet };
