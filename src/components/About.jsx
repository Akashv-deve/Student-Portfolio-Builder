import React from 'react';
import './About.css';

const About = () => {
  const features = [
    {
      title: 'Easy to Build',
      description: 'No coding required. Just fill in your details, add your projects, and watch your portfolio come to life instantly.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
          <path d="M12 20h9"></path>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>
      )
    },
    {
      title: 'Professional Templates',
      description: 'Choose from a variety of sleek, industry-standard templates designed to catch the eye of recruiters and hiring managers.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
      )
    },
    {
      title: 'Responsive Design',
      description: 'Your portfolio will look perfect on every device, whether an employer is viewing it on a desktop monitor or a smartphone.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
      )
    }
  ];

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        {/* Section Header */}
        <div className="about-header">
          <h2 className="about-title">About Student Portfolio Builder</h2>
          <p className="about-subtitle">
            We bridge the gap between your hard work and your future career. Our platform transforms your academic achievements, skills, and projects into a professional online presence in just a few clicks.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="icon-wrapper">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;