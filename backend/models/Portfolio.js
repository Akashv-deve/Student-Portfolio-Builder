const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  // 👇 ADD THIS LINE: Links the portfolio to the User model
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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
  // Add this line inside your mongoose.Schema({ ... })
  template: { 
    type: String, 
    default: "Software Engineer Portfolio" 
  },
  // NEW FIELDS ADDED HERE:
  skills: { type: [String], default: [] },
  socials: {
    type: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      email: { type: String, default: '' }
    },
    default: {}
  }
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', PortfolioSchema);