const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  // The unique URL slug
  userSlug: { type: String, required: true, unique: true }, 
  
  // The data from your builder
  personalInfo: {
    fullName: String,
    role: String,
    bio: String,
  },
  projects: [{
    title: String,
    description: String,
  }],
  education: [{
    institution: String,
    degree: String,
    cgpa: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', PortfolioSchema);