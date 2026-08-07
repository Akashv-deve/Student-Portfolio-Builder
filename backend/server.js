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

const normalizePortfolioPayload = (body = {}) => {
  const { personalInfo, projects, education, skills, socials, template } = body;
  const safePersonalInfo = {
    fullName: personalInfo?.fullName || '',
    role: personalInfo?.role || '',
    bio: personalInfo?.bio || ''
  };

  return {
    personalInfo: safePersonalInfo,
    projects: Array.isArray(projects) ? projects : [],
    education: Array.isArray(education) ? education : [],
    skills: Array.isArray(skills) ? skills.filter(Boolean) : [],
    socials: socials && typeof socials === 'object' ? {
      github: socials.github || '',
      linkedin: socials.linkedin || '',
      email: socials.email || ''
    } : { github: '', linkedin: '', email: '' },
    template: template || "Software Engineer Portfolio"
  };
};

// POST Route: Save the portfolio
app.post('/api/portfolio', async (req, res) => {
  try {
    const normalizedPortfolio = normalizePortfolioPayload(req.body);

    if (!normalizedPortfolio.personalInfo.fullName) {
      return res.status(400).json({ message: 'Full name is required to generate a URL.' });
    }

    const requestedSlug = req.body?.slug && String(req.body.slug).trim();

    if (requestedSlug) {
      const existingPortfolio = await Portfolio.findOne({ userSlug: requestedSlug });

      if (existingPortfolio) {
        const updatedPortfolio = await Portfolio.findOneAndUpdate(
          { userSlug: requestedSlug },
          { $set: { userSlug: requestedSlug, ...normalizedPortfolio } },
          { new: true, runValidators: true }
        );

        return res.status(200).json({
          message: 'Portfolio updated successfully!',
          slug: updatedPortfolio.userSlug,
          url: `http://localhost:5173/${updatedPortfolio.userSlug}`
        });
      }
    }

    const newSlug = requestedSlug || await generateUniqueSlug(normalizedPortfolio.personalInfo.fullName);

    const newPortfolio = new Portfolio({
      userSlug: newSlug,
      ...normalizedPortfolio
    });

    const savedPortfolio = await newPortfolio.save();

    res.status(201).json({ 
      message: 'Portfolio published successfully!', 
      slug: savedPortfolio.userSlug,
      url: `http://localhost:5173/${savedPortfolio.userSlug}`
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error saving portfolio', error: error.message });
  }
});

// PUT Route: Update an existing portfolio
app.put('/api/portfolio/:slug', async (req, res) => {
  try {
    const normalizedPortfolio = normalizePortfolioPayload(req.body);

    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { userSlug: req.params.slug },
      { $set: { userSlug: req.params.slug, ...normalizedPortfolio } },
      { new: true, runValidators: true }
    );

    if (!updatedPortfolio) {
      return res.status(404).json({ message: 'Portfolio not found to update.' });
    }

    res.status(200).json({ 
      message: 'Portfolio updated successfully!', 
      slug: updatedPortfolio.userSlug,
      url: `http://localhost:5173/${updatedPortfolio.userSlug}`
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating portfolio', error: error.message });
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