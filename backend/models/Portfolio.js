const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  userSlug: { type: String, required: true, unique: true }, 
  
  personalInfo: {
    fullName: String,
    role: String,
    bio: String,
  },
  projects: [{
    title: String,
    description: String,
    techStack: [String] // Added this just in case!
  }],
  education: [{
    institution: String,
    degree: String,
    score: String // Changed from 'cgpa' to 'score' to match frontend
  }],
  // NEW FIELDS ADDED HERE:
  skills: [String],
  socials: {
    github: String,
    linkedin: String,
    email: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', PortfolioSchema);