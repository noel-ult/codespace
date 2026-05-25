// ============================================================
// middleware/auth.js — JWT Authentication Middleware
// ============================================================
// This middleware protects routes that require a logged-in user.
// It checks for a valid JWT token in the Authorization header.
// If valid, it attaches the user's ID to the request object.

const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  try {
    // 1. Get the Authorization header
    // It should look like: "Bearer eyJhbGciOiJIUzI1NiIs..."
    const authHeader = req.headers.authorization;

    // 2. Check if the header exists and starts with "Bearer"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided. Please log in.' });
    }

    // 3. Extract the token (everything after "Bearer ")
    const token = authHeader.split(' ')[1];

    // 4. Verify the token using our secret key
    // This will throw an error if the token is invalid or expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Attach the user's ID to the request object
    // Now any route handler can access req.user.id
    req.user = { id: decoded.id };

    // 6. Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Token is invalid, expired, or malformed
    return res.status(401).json({ message: 'Invalid or expired token. Please log in again.' });
  }
}

module.exports = auth;
