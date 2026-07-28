import { useState } from 'react';

// Import your marketing components for the landing page
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Footer from './components/Footer';
import SoftwareEngineer from './templates/SoftwareEngineer';

function App() {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);

  // Master Portfolio State
  const [portfolioData, setPortfolioData] = useState({
    personal: { name: "", role: "", bio: "" },
    selectedTemplate: "Software Engineer Portfolio",
    projects: [
      {
        id: 1,
        title: "Student Management System",
        description: "A comprehensive system for tracking student data.",
        techStack: ["React", "Node.js"]
      }
    ],
    // ADD THIS NEW EDUCATION ARRAY
    education: [
      {
        id: 1,
        institution: "Government College of Engineering, Bodinayakanur",
        degree: "B.E. Computer Science and Engineering",
        score: "8.48 CGPA"
      }
    ],
    skills: ["React", "Node.js", "Machine Learning", "Python", "SQL"],
    socials: {
      github: "https://github.com/Akashv-deve",
      linkedin: "https://linkedin.com/in/yourprofile",
      email: "hello@example.com"
    }
  });

  // State to track which template is currently being hovered for the preview
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  // Template choices based on your existing template data structure[cite: 5]
  const availableTemplates = [
    {
      title: "Software Engineer Portfolio",
      description: "A clean, code-focused template designed for backend and systems engineers.",
      tags: ["Java", "C++", "System Design"],
      placeholderTitle: "Software Eng UI"
    },
    {
      title: "Frontend Developer Portfolio",
      description: "A highly interactive, visually striking template built to showcase UI components.",
      tags: ["React", "CSS", "Animations"],
      placeholderTitle: "Frontend UI"
    },
    {
      title: "UI/UX Designer Portfolio",
      description: "A minimalist, visually-driven layout tailored for high-resolution case studies.",
      tags: ["Figma", "Design Systems", "UX"],
      placeholderTitle: "UI/UX Layout"
    }
  ];

  // --- VIEW 1: THE BUILDER WORKSPACE ---
  if (isBuilderOpen) {
    return (
      <div style={{ display: 'flex', height: '100vh', width: '100vw', fontFamily: 'sans-serif' }}>
        
        {/* LEFT PANE: Builder Controls */}
        <div style={{ flex: 1, padding: '2rem', backgroundColor: '#f4f4f5', overflowY: 'auto', position: 'relative' }}>
          <button 
            onClick={() => setIsBuilderOpen(false)}
            style={{ marginBottom: '1.5rem', padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            ← Back to Home
          </button>
          
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Builder Controls</h2>
          
          {/* Personal Info Section */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Full Name</label>
            <input 
              type="text" 
              placeholder="Enter your name"
              value={portfolioData.personal.name}
              onChange={(e) => setPortfolioData({
                ...portfolioData, 
                personal: { ...portfolioData.personal, name: e.target.value }
              })}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          {/* Projects Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Projects</h3>
            
            {portfolioData.projects && portfolioData.projects.map((project, index) => (
              <div key={project.id} style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#fff', borderRadius: '6px', border: '1px solid #ddd' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Project Title</label>
                <input 
                  type="text" 
                  value={project.title}
                  onChange={(e) => {
                    const updatedProjects = [...portfolioData.projects];
                    updatedProjects[index].title = e.target.value;
                    setPortfolioData({ ...portfolioData, projects: updatedProjects });
                  }}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '0.5rem' }}
                />

                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Description</label>
                <textarea 
                  value={project.description}
                  onChange={(e) => {
                    const updatedProjects = [...portfolioData.projects];
                    updatedProjects[index].description = e.target.value;
                    setPortfolioData({ ...portfolioData, projects: updatedProjects });
                  }}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', minHeight: '60px', resize: 'vertical' }}
                />
              </div>
            ))}
            
            <button 
              onClick={() => {
                setPortfolioData({
                  ...portfolioData,
                  projects: [
                    ...(portfolioData.projects || []), 
                    { id: Date.now(), title: "New Project", description: "", techStack: [] }
                  ]
                })
              }}
              style={{ padding: '0.5rem 1rem', backgroundColor: '#1e293b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}
            >
              + Add Another Project
            </button>
          </div>

          {/* Education Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Education</h3>
            
            {portfolioData.education && portfolioData.education.map((edu, index) => (
              <div key={edu.id} style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#fff', borderRadius: '6px', border: '1px solid #ddd' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Institution</label>
                <input 
                  type="text" 
                  value={edu.institution}
                  onChange={(e) => {
                    const updatedEdu = [...portfolioData.education];
                    updatedEdu[index].institution = e.target.value;
                    setPortfolioData({ ...portfolioData, education: updatedEdu });
                  }}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '0.5rem' }}
                />

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 2 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Degree</label>
                    <input 
                      type="text" 
                      value={edu.degree}
                      onChange={(e) => {
                        const updatedEdu = [...portfolioData.education];
                        updatedEdu[index].degree = e.target.value;
                        setPortfolioData({ ...portfolioData, education: updatedEdu });
                      }}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Score/CGPA</label>
                    <input 
                      type="text" 
                      value={edu.score}
                      onChange={(e) => {
                        const updatedEdu = [...portfolioData.education];
                        updatedEdu[index].score = e.target.value;
                        setPortfolioData({ ...portfolioData, education: updatedEdu });
                      }}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <button 
              onClick={() => {
                setPortfolioData({
                  ...portfolioData,
                  education: [
                    ...(portfolioData.education || []), 
                    { id: Date.now(), institution: "New Institution", degree: "", score: "" }
                  ]
                })
              }}
              style={{ padding: '0.5rem 1rem', backgroundColor: '#1e293b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}
            >
              + Add Education
            </button>
          </div>

          {/* Skills Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Core Skills</h3>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Comma Separated List</label>
            <input 
              type="text" 
              value={(portfolioData.skills || []).join(', ')}
              onChange={(e) => {
                // Split the string by commas and remove extra spaces
                const skillsArray = e.target.value.split(',').map(skill => skill.trim());
                setPortfolioData({ ...portfolioData, skills: skillsArray });
              }}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
              placeholder="e.g. React, Node.js, Python"
            />
          </div>

          {/* Social Links Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Social Links</h3>
            
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>GitHub URL</label>
            <input 
              type="text" 
              value={portfolioData.socials?.github || ''}
              onChange={(e) => setPortfolioData({
                ...portfolioData, 
                socials: { ...portfolioData.socials, github: e.target.value }
              })}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '0.5rem' }}
            />

            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Email Address</label>
            <input 
              type="email" 
              value={portfolioData.socials?.email || ''}
              onChange={(e) => setPortfolioData({
                ...portfolioData, 
                socials: { ...portfolioData.socials, email: e.target.value }
              })}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          {/* Template Selection Section with Hover Preview Trigger */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Choose Template</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {availableTemplates.map((tmpl, idx) => (
                <div 
                  key={idx}
                  onMouseEnter={() => setHoveredTemplate(tmpl)}
                  onMouseLeave={() => setHoveredTemplate(null)}
                  onClick={() => setPortfolioData({ ...portfolioData, selectedTemplate: tmpl.title })}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: portfolioData.selectedTemplate === tmpl.title ? '2px solid #007bff' : '1px solid #ddd',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontWeight: 'bold' }}>{tmpl.title}</div>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>Hover to preview</div>

                  {/* HOVER PREVIEW POPUP BOX */}
                  {hoveredTemplate && hoveredTemplate.title === tmpl.title && (
                    <div style={{
                      position: 'absolute',
                      left: '102%',
                      top: '0',
                      width: '260px',
                      padding: '1rem',
                      backgroundColor: '#1e293b',
                      color: '#fff',
                      borderRadius: '8px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                      zIndex: 50,
                      pointerEvents: 'none'
                    }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.25rem', color: '#38bdf8' }}>
                        {hoveredTemplate.placeholderTitle}
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.5rem', lineHeight: '1.4' }}>
                        {hoveredTemplate.description}
                      </p>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {hoveredTemplate.tags.map((tag, tIdx) => (
                          <span key={tIdx} style={{ fontSize: '0.7rem', backgroundColor: '#334155', padding: '2px 6px', borderRadius: '4px' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT PANE: Live Preview */}
        <div style={{ flex: 1.5, padding: '2rem', backgroundColor: '#ffffff', overflowY: 'auto', borderLeft: '2px solid #e4e4e7' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Live Preview</h2>
            <span style={{ fontSize: '0.85rem', padding: '4px 8px', backgroundColor: '#e2e8f0', borderRadius: '4px', fontWeight: '500' }}>
              Active Template: {portfolioData.selectedTemplate}
            </span>
          </div>

          {/* DYNAMIC TEMPLATE RENDERING ENGINE */}
          <div style={{ width: '100%', height: '100%' }}>
            {portfolioData.selectedTemplate === "Software Engineer Portfolio" ? (
              <SoftwareEngineer data={portfolioData} />
            ) : (
              <div style={{ padding: '3rem', textAlign: 'center', color: '#666', border: '2px dashed #ccc', borderRadius: '8px' }}>
                <h3>Preview not available yet.</h3>
                <p>We are still building the {portfolioData.selectedTemplate} template!</p>
              </div>
            )}
          </div>
        </div>

      </div>
    );
  }

  // --- VIEW 2: THE LANDING PAGE ---
  return (
    <div className="landing-page">
      <Navbar />
      <Hero onGetStarted={() => setIsBuilderOpen(true)} />
      <Skills />
      <Projects />
      <Education />
      <Footer />
    </div>
  );
}

export default App;