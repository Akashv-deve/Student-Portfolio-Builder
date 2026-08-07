import React from 'react';
import './Projects.css'; // Reusing your existing CSS flawlessly

const Templates = () => {
  const templatesData = [
    {
      title: "Software Engineer Portfolio",
      description: "A clean, code-focused template designed for backend and systems engineers to highlight complex problem-solving and algorithms.",
      tags: ["Java", "C++", "System Design"],
      placeholderTitle: "Software Eng UI"
    },
    {
      title: "Frontend Developer Portfolio",
      description: "A highly interactive, visually striking template built to showcase UI components, smooth animations, and responsive layouts.",
      tags: ["React", "CSS", "Animations"],
      placeholderTitle: "Frontend UI"
    },
    {
      title: "UI/UX Designer Portfolio",
      description: "A minimalist, visually-driven layout tailored for displaying high-resolution case studies, wireframes, and design thinking processes.",
      tags: ["Figma", "Design Systems", "UX"],
      placeholderTitle: "UI/UX Layout"
    },
    {
      title: "Embedded Systems Engineer Portfolio",
      description: "A technical template structured to present hardware integrations, microcontroller programming, and architectural diagrams.",
      tags: ["C", "IoT", "Microcontrollers"],
      placeholderTitle: "Embedded UI"
    },
    {
      title: "Data Analyst Portfolio",
      description: "A data-driven template perfect for embedding interactive charts, dashboards, and detailed statistical analysis case studies.",
      tags: ["Python", "SQL", "Tableau"],
      placeholderTitle: "Data Dashboard"
    },
    {
      title: "Full Stack Developer Portfolio",
      description: "A comprehensive, balanced template designed to exhibit both rich client-side interfaces and robust backend architecture.",
      tags: ["Node.js", "React", "Databases"],
      placeholderTitle: "Full Stack UI"
    }
  ];

  return (
    <section className="projects-section" id="templates">
      <div className="projects-container">
        {/* Section Header */}
        <div className="projects-header">
          <h2 className="projects-title">Portfolio Templates</h2>
          <div className="projects-divider"></div>
        </div>

        {/* Templates Grid - CSS Grid will automatically handle the 6 items */}
        <div className="projects-grid">
          {templatesData.map((template, index) => (
            <div className="project-card" key={index}>
              
              {/* CSS-Only Image Placeholder */}
              <div className="project-image-placeholder">
                <div className="wireframe-browser">
                  <div className="wireframe-header">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="wireframe-body">
                    <span className="wireframe-text">{template.placeholderTitle}</span>
                  </div>
                </div>
              </div>

              {/* Template Content */}
              <div className="project-content">
                <h3 className="project-card-title">{template.title}</h3>
                <p className="project-card-description">{template.description}</p>
                
                {/* Tech Tags */}
                <div className="project-tags">
                  {template.tags.map((tag, tagIndex) => (
                    <span className="tag" key={tagIndex}>{tag}</span>
                  ))}
                </div>
                
                {/* Preview Button */}
                <button className="btn-project">Preview</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Templates;