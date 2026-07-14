import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section" id="home">
      <div className="hero-container">
        {/* Left Side: Text Content */}
        <div className="hero-content">
          <h1 className="hero-title">Build Your Professional Portfolio</h1>
          <p className="hero-subtitle">
            Stand out from the crowd. Create a stunning, responsive portfolio in minutes to showcase your skills, projects, and education to future employers.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-secondary">View Demo</button>
          </div>
        </div>

        {/* Right Side: CSS Illustration Placeholder */}
        <div className="hero-image-placeholder">
          <div className="mockup-window">
            <div className="mockup-header">
              <span className="dot close"></span>
              <span className="dot minimize"></span>
              <span className="dot expand"></span>
            </div>
            <div className="mockup-body">
              {/* Skeleton UI simulating a portfolio layout */}
              <div className="skeleton-title"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text short"></div>
              <div className="skeleton-cards">
                <div className="skeleton-card"></div>
                <div className="skeleton-card"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;