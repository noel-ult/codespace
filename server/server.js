// ============================================================
// server.js — Entry point for the SnippetVault Express server
// ============================================================
// This file sets up the Express app, connects to MongoDB,
// mounts API routes, and serves the frontend static files.

// Load environment variables from .env file FIRST
// This must be at the very top so all other files can use process.env
require('dotenv').config();

const express = require('express');
const cors    = require('cors');
const path    = require('path');

// Import our database connection function
const connectDB = require('./config/db');

// Import route files
const authRoutes    = require('./routes/authRoutes');
const snippetRoutes = require('./routes/snippetRoutes');

// Create the Express app
const app = express();

// ---- Middleware ----
// Enable CORS (Cross-Origin Resource Sharing) so the frontend can talk to the API
app.use(cors());

// Parse incoming JSON request bodies (e.g., { "email": "...", "password": "..." })
app.use(express.json());

// ---- API Routes ----
// All auth endpoints live under /api/auth  (signup, login, me)
app.use('/api/auth', authRoutes);

// All snippet endpoints live under /api/snippets  (CRUD)
app.use('/api/snippets', snippetRoutes);

// ---- Serve Frontend ----
// Serve static files (HTML, CSS, JS) from the "public" folder
app.use(express.static(path.join(__dirname, '..', 'public')));

// Catch-all: send index.html for any non-API route
// This lets the frontend handle its own routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// ---- Start Server ----
const PORT = process.env.PORT || 3000;

// Connect to MongoDB first, then start listening for requests
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err.message);
    process.exit(1); // Stop the server if DB connection fails
  });
