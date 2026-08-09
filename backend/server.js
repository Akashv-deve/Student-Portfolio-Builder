require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Portfolio = require('./models/Portfolio');
const authRoutes = require('./routes/auth'); // Import our new model
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cors());
app.use(express.json());

// 👈 2. MOUNT THE AUTH ROUTES
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// --- UTILITY FUNCTION: Generate Unique Slug ---
const generateUniqueSlug = async (requestedSlug, fullName) => {
  // 1. Use the custom slug if provided, otherwise fall back to their full name
  const targetText = requestedSlug ? requestedSlug : (fullName || 'portfolio');

  // 2. Lowercase, replace spaces with hyphens, remove special characters
  const baseSlug = targetText
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-'); 

  let uniqueSlug = baseSlug;
  let counter = 1;

  // 3. Check the database to make sure no one else claimed this exact custom URL
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

// POST Route: Save the portfolio (SECURED)
app.post('/api/portfolio', authMiddleware, async (req, res) => {
  try {
    const normalizedPortfolio = normalizePortfolioPayload(req.body);

    if (!normalizedPortfolio.personalInfo.fullName) {
      return res.status(400).json({ message: 'Full name is required to generate a URL.' });
    }

    const requestedSlug = req.body?.slug && String(req.body.slug).trim();

    if (requestedSlug) {
      const existingPortfolio = await Portfolio.findOne({ userSlug: requestedSlug });

      if (existingPortfolio) {
        // SECURITY CHECK: Does this portfolio belong to the logged-in user?
        if (existingPortfolio.userId.toString() !== req.user.id) {
          return res.status(403).json({ message: 'Unauthorized: You do not own this portfolio.' });
        }

        const updatedPortfolio = await Portfolio.findOneAndUpdate(
          { userSlug: requestedSlug },
          { $set: { userSlug: requestedSlug, ...normalizedPortfolio } },
          { new: true, runValidators: true }
        );

        return res.status(200).json({
          message: 'Portfolio updated successfully!',
          slug: updatedPortfolio.userSlug,
          url: `${FRONTEND_URL}/${updatedPortfolio.userSlug}`
        });
      }
    }

    // Pass BOTH the custom slug and the name into the function
// so it safely checks if the custom URL is already taken by someone else!
const newSlug = await generateUniqueSlug(req.body.slug, normalizedPortfolio.personalInfo.fullName);

const newPortfolio = new Portfolio({
  userId: req.user.id, // 👈 Links the new portfolio to the logged-in user
  userSlug: newSlug,
  ...normalizedPortfolio
});

const savedPortfolio = await newPortfolio.save();

// Make sure your response returns the newly generated slug back to the frontend!
res.status(201).json({ 
  message: 'Portfolio saved successfully', 
  slug: newSlug,
  url: `https://student-portfolio-builder-eta.vercel.app/${newSlug}` 
});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error saving portfolio', error: error.message });
  }
});

// PUT Route: Update an existing portfolio (SECURED)
app.put('/api/portfolio/:slug', authMiddleware, async (req, res) => {
  try {
    const existingPortfolio = await Portfolio.findOne({ userSlug: req.params.slug });

    if (!existingPortfolio) {
      return res.status(404).json({ message: 'Portfolio not found to update.' });
    }

    // SECURITY CHECK: Does this portfolio belong to the logged-in user?
    if (existingPortfolio.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized: You do not own this portfolio.' });
    }

    const normalizedPortfolio = normalizePortfolioPayload(req.body);

    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { userSlug: req.params.slug },
      { $set: { userSlug: req.params.slug, ...normalizedPortfolio } },
      { new: true, runValidators: true }
    );

    res.status(200).json({ 
      message: 'Portfolio updated successfully!', 
      slug: updatedPortfolio.userSlug,
      url: `${FRONTEND_URL}/${updatedPortfolio.userSlug}`
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