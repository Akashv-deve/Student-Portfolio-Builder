import React from 'react';
import './Education.css';

const Education = () => {
  const educationData = [
    {
      title: "B.E. Computer Science and Engineering (Honours)",
      institution: "Government College of Engineering, Bodinayakanur",
      year: "2023 - 2027",
      description: "Maintaining a strong academic record with a focus on core computer science subjects, software engineering, and modern development frameworks."
    },
    {
      title: "Higher Secondary Education",
      institution: "State Board of School Examinations, Tamil Nadu",
      year: "2021 - 2023",
      description: "Completed higher secondary education with a strong foundational focus in Mathematics, Physics, and Computer Science."
    },
    {
      title: "GATE CS Certification & Professional Studies",
      institution: "Graduate Aptitude Test in Engineering",
      year: "2025 - 2026",
      description: "Achieved a GATE score of 331. Deepened technical knowledge in Boolean algebra, B-trees, network simulations, and advanced CS theory."
    }
  ];

  return (
    <section className="education-section" id="education">
      <div className="education-container">
        {/* Section Header */}
        <div className="education-header">
          <h2 className="education-title">Education</h2>
          <div className="education-divider"></div>
        </div>

        {/* Timeline Container */}
        <div className="timeline">
          {educationData.map((item, index) => (
            <div className="timeline-item" key={index}>
              {/* Timeline Line & Dot */}
              <div className="timeline-dot"></div>
              
              {/* Education Card */}
              <div className="timeline-card">
                <span className="timeline-year">{item.year}</span>
                <h3 className="timeline-card-title">{item.title}</h3>
                <h4 className="timeline-institution">{item.institution}</h4>
                <p className="timeline-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;