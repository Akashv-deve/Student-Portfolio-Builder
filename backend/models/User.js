const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    // 👇 Password is NO LONGER required (for GitHub users)
    password: {
      type: String,
      select: false,
    },
    // 👇 Added field to track GitHub logins
    githubId: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple null values for non-GitHub users
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', UserSchema);