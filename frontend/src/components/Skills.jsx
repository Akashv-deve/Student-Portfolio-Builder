import React from 'react';
import './Skills.css';

const Skills = () => {
  const features = [
    {
      icon: '📄',
      title: 'Portfolio Creation',
      description: 'Build your professional resume and portfolio instantly with an easy-to-use interface.'
    },
    {
      icon: '🎨',
      title: 'Multiple Themes',
      description: 'Choose from a variety of beautifully designed, industry-standard templates.'
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Your portfolio will look stunning on desktops, tablets, and smartphones.'
    },
    {
      icon: '⚡',
      title: 'Fast Performance',
      description: 'Optimized for speed to ensure lightning-fast loading times for recruiters.'
    },
    {
      icon: '💾',
      title: 'Auto Save',
      description: 'Never lose your work. Your progress is automatically saved as you type.'
    },
    {
      icon: '🔒',
      title: 'Secure Data',
      description: 'Your personal and academic information is encrypted and kept completely safe.'
    }
  ];

  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">
        {/* Section Header */}
        <div className="skills-header">
          <h2 className="skills-title">Features</h2>
          <div className="skills-divider"></div>
        </div>

        {/* Features Grid */}
        <div className="skills-grid">
          {features.map((feature, index) => (
            <div className="skill-card" key={index}>
              <div className="skill-icon">{feature.icon}</div>
              <h3 className="skill-card-title">{feature.title}</h3>
              <p className="skill-card-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;