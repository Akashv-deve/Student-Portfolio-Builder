import React from 'react';
import './Hero.css';
import { useNavigate } from 'react-router-dom';

// 1. Remove the onGetStarted prop completely. We don't need it anymore!
const Hero = () => {
  const navigate = useNavigate(); // 2. Keep this hook right here

  return (
    <section className="hero-section" id="home">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Build Your Professional Portfolio in Minutes</h1>
          <p className="hero-subtitle">
            The easiest way for students to build a powerful online presence...
          </p>
          <div className="hero-buttons">
            {/* 3. Update the onClick to use the navigate function directly! */}
            <button 
              className="btn btn-primary" 
              onClick={() => navigate('/dashboard')}
            >
              Get Started
            </button>
            <button className="btn btn-secondary">View Demo</button>
          </div>
        </div>
        {/* ... rest of the file stays exactly the same ... */}
      </div>
    </section>
  );
};

export default Hero;