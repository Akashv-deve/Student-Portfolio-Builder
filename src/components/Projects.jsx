import React from 'react';
import './Projects.css';

const Projects = () => {
  const projectsData = [
    {
      title: "Student Management System",
      description: "A comprehensive full-stack application to track student records, grades, and attendance with a dynamic, responsive dashboard.",
      tags: ["React", "Node.js", "SQL", "CSS"],
      placeholderTitle: "SMS Dashboard"
    },
    {
      title: "Income Prediction Model",
      description: "A machine learning pipeline that predicts income brackets based on demographic census data using advanced regression algorithms.",
      tags: ["Python", "Machine Learning", "Data Science"],
      placeholderTitle: "ML Pipeline"
    },
    {
      title: "Trenvya Threads Storefront",
      description: "A modern e-commerce web application and brand identity designed for a custom clothing business with a seamless checkout flow.",
      tags: ["React", "HTML", "CSS", "JavaScript"],
      placeholderTitle: "E-Commerce UI"
    }
  ];

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        {/* Section Header */}
        <div className="projects-header">
          <h2 className="projects-title">Featured Projects</h2>
          <div className="projects-divider"></div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {projectsData.map((project, index) => (
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
                    <span className="wireframe-text">{project.placeholderTitle}</span>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="project-content">
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-description">{project.description}</p>
                
                {/* Tech Tags */}
                <div className="project-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span className="tag" key={tagIndex}>{tag}</span>
                  ))}
                </div>
                
                {/* View Button */}
                <button className="btn-project">View Project</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;