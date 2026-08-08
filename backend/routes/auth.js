const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const SALT_ROUNDS = 10;
const TOKEN_EXPIRY = '7d';

/**
 * Sign a JWT for a given user id/email using process.env.JWT_SECRET.
 */
function signToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );
}

/**
 * Basic shape/type validation for the request body.
 * Keeps bcrypt/Mongo from ever seeing malformed input.
 */
function validateCredentials(email, password) {
  if (!email || typeof email !== 'string') {
    return 'A valid email is required.';
  }
  if (!password || typeof password !== 'string') {
    return 'A valid password is required.';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters long.';
  }
  return null;
}

/**
 * POST /register
 * Creates a new user with a bcrypt-hashed password and returns a JWT.
 */
router.post('/register', async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not set in the environment.');
      return res.status(500).json({
        success: false,
        message: 'Server authentication configuration error.',
      });
    }

    const { email, password } = req.body || {};

    const validationError = validateCredentials(email, password);
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'A user with this email already exists.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await User.create({
      email: normalizedEmail,
      password: hashedPassword,
    });

    const token = signToken(newUser);

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (error) {
    // Handle a duplicate-key race (two concurrent registrations, same email)
    if (error?.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'A user with this email already exists.',
      });
    }

    console.error('Error registering user:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while registering the user.',
    });
  }
});

/**
 * POST /login
 * Verifies credentials and returns a JWT on success.
 */
router.post('/login', async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not set in the environment.');
      return res.status(500).json({
        success: false,
        message: 'Server authentication configuration error.',
      });
    }

    const { email, password } = req.body || {};

    const validationError = validateCredentials(email, password);
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // password has `select: false` on the schema, so it must be
    // explicitly requested here for comparison.
    const user = await User.findOne({ email: normalizedEmail }).select('+password');

    // Use one generic message for "no such user" and "wrong password"
    // so we don't leak which emails are registered.
    const invalidCredentialsResponse = () =>
      res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });

    if (!user) {
      return invalidCredentialsResponse();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return invalidCredentialsResponse();
    }

    const token = signToken(user);

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while logging in.',
    });
  }
});

module.exports = router;