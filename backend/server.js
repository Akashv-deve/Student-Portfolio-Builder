require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Portfolio = require('./models/Portfolio');
const authRoutes = require('./routes/auth'); // Import our new model
const authMiddleware = require('./middleware/authMiddleware');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cors());
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Multer to store files in memory temporarily
const storage = multer.memoryStorage();
const upload = multer({ storage });

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

// --- MEDIA UPLOAD ROUTE ---
// POST Route: Upload an image to Cloudinary (SECURED)
app.post('/api/upload', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image provided.' });
    }

    // Convert the memory buffer into a Base64 string for Cloudinary
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    // Upload to a specific folder to keep your Cloudinary dashboard clean
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'auto',
      folder: 'portfolio_builder', 
    });

    // Return the secure URL to the frontend
    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ message: 'Server error during image upload', error: error.message });
  }
});

// POST Route: Save the portfolio (SECURED)
app.post('/api/portfolio', authMiddleware, async (req, res) => {
  try {
    const normalizedPortfolio = normalizePortfolioPayload(req.body);

    if (!normalizedPortfolio.personalInfo.fullName) {
      return res.status(400).json({ message: 'Full name is required to generate a URL.' });
    }

    // 1. Check if this user ALREADY has a portfolio in the database
    let existingPortfolio = await Portfolio.findOne({ userId: req.user.id });
    let finalSlug;

    if (existingPortfolio) {
      // --- UPDATE EXISTING PORTFOLIO ---
      const requestedSlug = req.body?.slug && String(req.body.slug).trim();

      // If they typed a NEW custom URL, we check if it's available
      if (requestedSlug && requestedSlug !== existingPortfolio.userSlug) {
        finalSlug = await generateUniqueSlug(requestedSlug, normalizedPortfolio.personalInfo.fullName);
      } else {
        // Otherwise, lock in their exact same URL! No more random numbers!
        finalSlug = existingPortfolio.userSlug; 
      }

      // Overwrite the old data with the newly updated data
      // 👇 FIXED: Using { returnDocument: 'after' } to eliminate the Mongoose warning
      const updatedPortfolio = await Portfolio.findOneAndUpdate(
        { userId: req.user.id },
        { $set: { userSlug: finalSlug, ...normalizedPortfolio } },
        { returnDocument: 'after', runValidators: true }
      );

      return res.status(200).json({
        message: 'Portfolio updated successfully!',
        slug: updatedPortfolio.userSlug,
        // 👇 FIXED: Using string addition so Markdown brackets cannot survive!
        url: "https://student-portfolio-builder-eta.vercel.app/" + updatedPortfolio.userSlug
      });

    } else {
      // --- CREATE BRAND NEW PORTFOLIO (First time publishing) ---
      const requestedSlug = req.body?.slug && String(req.body.slug).trim();
      finalSlug = await generateUniqueSlug(requestedSlug, normalizedPortfolio.personalInfo.fullName);
      
      const newPortfolio = new Portfolio({
        userId: req.user.id,
        userSlug: finalSlug,
        ...normalizedPortfolio
      });
      
      await newPortfolio.save();

      return res.status(201).json({
        message: 'Portfolio saved successfully',
        slug: finalSlug,
        // 👇 FIXED: Using string addition for creation as well!
        url: "https://student-portfolio-builder-eta.vercel.app/" + finalSlug
      });
    }

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
      { returnDocument: 'after', runValidators: true }
    );

    res.status(200).json({ 
      message: 'Portfolio updated successfully!', 
      slug: updatedPortfolio.userSlug,
      url: "https://student-portfolio-builder-eta.vercel.app/" + updatedPortfolio.userSlug
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