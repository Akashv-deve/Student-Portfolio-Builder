import React from 'react';
import './Hero.css';

// 1. Add { onGetStarted } as a prop right here!
const Hero = ({ onGetStarted }) => {
  return (
    <section className="hero-section" id="home">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Build Your Professional Portfolio in Minutes</h1>
          <p className="hero-subtitle">
            The easiest way for students to build a powerful online presence...
          </p>
          <div className="hero-buttons">
            {/* 2. Add the onClick event to the button here! */}
            <button className="btn btn-primary" onClick={onGetStarted}>Get Started</button>
            <button className="btn btn-secondary">View Demo</button>
          </div>
        </div>
        {/* ... rest of the file stays exactly the same ... */}
      </div>
    </section>
  );
};

export default Hero;