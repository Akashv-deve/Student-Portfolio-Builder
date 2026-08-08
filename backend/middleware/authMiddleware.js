const jwt = require('jsonwebtoken');

/**
 * Express middleware that protects routes with JWT auth.
 *
 * Expects an `Authorization: Bearer <token>` header. On success, the
 * decoded token payload is attached to `req.user` and control passes
 * to the next handler. On failure (missing header, malformed header,
 * expired/invalid token, or a missing JWT_SECRET), it responds 401
 * and does not call next().
 */
function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || typeof authHeader !== 'string') {
      return res.status(401).json({
        success: false,
        message: 'Authorization header missing.',
      });
    }

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({
        success: false,
        message: 'Authorization header must be in the format: Bearer <token>.',
      });
    }

    if (!process.env.JWT_SECRET) {
      // Fail closed — never verify against an undefined secret.
      console.error('JWT_SECRET is not set in the environment.');
      return res.status(500).json({
        success: false,
        message: 'Server authentication configuration error.',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired. Please log in again.',
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.',
      });
    }

    console.error('Auth middleware error:', error);
    return res.status(401).json({
      success: false,
      message: 'Not authorized.',
    });
  }
}

module.exports = authMiddleware;