// ============================================================
// config/db.js — MongoDB Connection
// ============================================================
// This file connects to MongoDB using Mongoose.
// The connection string comes from the .env file (MONGODB_URI).

const mongoose = require('mongoose');

async function connectDB() {
  try {
    // Connect to MongoDB Atlas (or local MongoDB)
    // The URI looks like: mongodb+srv://user:pass@cluster.mongodb.net/dbname
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    throw error; // Re-throw so server.js can handle it
  }
}

module.exports = connectDB;
