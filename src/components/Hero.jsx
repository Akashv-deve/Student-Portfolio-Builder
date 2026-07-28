import React from 'react';
import './Hero.css';

// Add the onGetStarted prop
const Hero = ({ onGetStarted }) => {
  return (
    <section className="hero-section" id="home">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Build Your Professional Portfolio in Minutes</h1>
          <p className="hero-subtitle">
            The easiest way for students to build a powerful online presence. Create your profile, live-preview stunning responsive templates, and export your custom portfolio with just a few clicks.
          </p>
          <div className="hero-buttons">
            {/* Trigger the function when clicked */}
            <button className="btn btn-primary" onClick={onGetStarted}>Get Started</button>
            <button className="btn btn-secondary">View Demo</button>
          </div>
        </div>

        {/* Right Side: CSS Illustration Placeholder */}
        <div className="hero-image-placeholder">
          {/* ... keeping your original mockup UI here ... */}
        </div>
      </div>
    </section>
  );
};

export default Hero;