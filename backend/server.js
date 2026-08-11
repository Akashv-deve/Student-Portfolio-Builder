require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Portfolio = require('./models/Portfolio');
const authRoutes = require('./routes/auth'); // Import our new model
const authMiddleware = require('./middleware/authMiddleware');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const Razorpay = require('razorpay');
const crypto = require('crypto');

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
    bio: personalInfo?.bio || '',
    avatar: personalInfo?.avatar || ''
  };

  return {
    personalInfo: safePersonalInfo,
    projects: Array.isArray(projects) ? projects : [], // Project images are passed inherently here
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

// GET Route: Fetch the logged-in user's portfolio (SECURED)
app.get('/api/portfolio/me', authMiddleware, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user.id });
    
    if (!portfolio) {
      // It is completely normal for a brand new user to not have a portfolio yet
      return res.status(404).json({ message: 'No portfolio found for this user.' });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    console.error('Error fetching user portfolio:', error);
    res.status(500).json({ message: 'Server error fetching portfolio', error: error.message });
  }
});

// PUT Route: Reset portfolio views to 0 (SECURED)
app.put('/api/portfolio/me/views/reset', authMiddleware, async (req, res) => {
  try {
    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { userId: req.user.id },
      { $set: { views: 0 } },
      { returnDocument: 'after' }
    );

    if (!updatedPortfolio) {
      return res.status(404).json({ message: 'Portfolio not found.' });
    }

    res.status(200).json({ message: 'Views reset to 0', views: updatedPortfolio.views });
  } catch (error) {
    console.error('Error resetting views:', error);
    res.status(500).json({ message: 'Server error resetting views' });
  }
});

// GET Route: Fetch a portfolio by its slug (AND INCREMENT VIEWS)
app.get('/api/portfolio/:slug', async (req, res) => {
  try {
    // 燥 FIXED: Using findOneAndUpdate with $inc to instantly add 1 to the view count
    const portfolio = await Portfolio.findOneAndUpdate(
      { userSlug: req.params.slug },
      { $inc: { views: 1 } },
      { returnDocument: 'after' } 
    );
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching portfolio', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

// POST Route: Create a Razorpay Order (SECURED)
app.post('/api/payment/create-order', authMiddleware, async (req, res) => {
  try {
    const razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: 49900, // ₹499 (Amount is processed in paise, so multiply by 100)
      currency: "INR",
      receipt: `receipt_order_${req.user.id}`
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Failed to create payment order" });
  }
});

// POST Route: Verify Payment & Upgrade User (SECURED)
const User = require('./models/User'); // Ensure User model is required

// GET Route: Check if user is Pro (SECURED)
app.get('/api/user/status', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Send back their exact Pro status from the database
    res.status(200).json({ isPro: user.isPro || false });
  } catch (error) {
    console.error("Error fetching user status:", error);
    res.status(500).json({ message: "Error fetching user status" });
  }
});

app.post('/api/payment/verify', authMiddleware, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    // Create the expected signature to verify it's not a fake request
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      // Securely upgrade the user in the database
      await User.findByIdAndUpdate(req.user.id, { isPro: true });
      res.status(200).json({ success: true, message: "Payment verified. Upgraded to Pro!" });
    } else {
      res.status(400).json({ success: false, message: "Invalid payment signature" });
    }
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ message: "Error verifying payment" });
  }
});

// PUT Route: Cancel Pro Subscription (SECURED)
app.put('/api/payment/cancel-pro', authMiddleware, async (req, res) => {
  try {
    // Find the user and set isPro back to false
    await User.findByIdAndUpdate(req.user.id, { isPro: false });
    res.status(200).json({ success: true, message: "Pro subscription cancelled successfully." });
  } catch (error) {
    console.error("Cancel Pro error:", error);
    res.status(500).json({ message: "Error cancelling subscription" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});