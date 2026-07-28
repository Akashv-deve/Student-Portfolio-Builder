import React from 'react';
import './Education.css'; // Reusing your existing CSS perfectly!

const TargetAudience = () => {
  const audienceData = [
    {
      role: "College Students",
      description: "Build your first professional portfolio."
    },
    {
      role: "Fresh Graduates",
      description: "Showcase projects and internships."
    },
    {
      role: "Job Seekers",
      description: "Create ATS-friendly portfolios."
    },
    {
      role: "Developers",
      description: "Present technical skills and GitHub projects."
    }
  ];

  return (
    <section className="education-section" id="audience">
      <div className="education-container">
        {/* Section Header */}
        <div className="education-header">
          <h2 className="education-title">Who Can Use This?</h2>
          <div className="education-divider"></div>
        </div>

        {/* Timeline Container */}
        <div className="timeline">
          {audienceData.map((item, index) => (
            <div className="timeline-item" key={index}>
              {/* Timeline Line & Dot */}
              <div className="timeline-dot"></div>
              
              {/* Card Content */}
              <div className="timeline-card">
                {/* Reusing the 'year' badge for the Target Role */}
                <span className="timeline-year">{item.role}</span>
                
                {/* Reusing the 'title' for the Description to make it pop */}
                <h3 className="timeline-card-title">{item.description}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;