require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Portfolio = require('./models/Portfolio'); // Import our new model

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// --- UTILITY FUNCTION: Generate Unique Slug ---
const generateUniqueSlug = async (fullName) => {
  // 1. Lowercase, replace spaces with hyphens, remove special characters
  const baseSlug = fullName
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-'); 

  let uniqueSlug = baseSlug;
  let counter = 1;

  // 2. Keep checking the database until we find a slug that isn't taken
  while (await Portfolio.findOne({ userSlug: uniqueSlug })) {
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
};

// --- API ROUTES ---

// POST Route: Save the portfolio
app.post('/api/portfolio', async (req, res) => {
  try {
    const { personalInfo, projects, education } = req.body;

    // Check if the user provided a name
    if (!personalInfo || !personalInfo.fullName) {
      return res.status(400).json({ message: 'Full name is required to generate a URL.' });
    }

    // Generate the custom slug
    const newSlug = await generateUniqueSlug(personalInfo.fullName);

    // Create and save the new portfolio document
    const newPortfolio = new Portfolio({
      userSlug: newSlug,
      personalInfo,
      projects,
      education
    });

    const savedPortfolio = await newPortfolio.save();

    res.status(201).json({ 
      message: 'Portfolio published successfully!', 
      slug: savedPortfolio.userSlug,
      url: `http://localhost:5173/${savedPortfolio.userSlug}` // We will use this in React!
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error saving portfolio', error: error.message });
  }
});

// GET Route: Fetch a portfolio by its slug
app.get('/api/portfolio/:slug', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userSlug: req.params.slug });
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching portfolio', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});