import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import SoftwareEngineer from '../templates/SoftwareEngineer';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ portfolioData, setPortfolioData, setIsBuilderOpen }) => {
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  // THE PREMIUM ZIP EXPORT ENGINE (Fixed string formatting)
  const handleExport = async () => {
    const { personal, projects, education, skills, socials } = portfolioData;
    const zip = new JSZip();

    const cssContent = `
      body { background-color: #1e1e1e; color: #a6accd; font-family: monospace; padding: 2rem; margin: 0; line-height: 1.6; }
      .container { max-width: 800px; margin: 0 auto; }
      h1 { color: #82aaff; font-size: 2.5rem; margin-bottom: 0.5rem; }
      h2 { color: #c792ea; font-size: 1.5rem; margin-top: 0; }
      h3 { margin-top: 2rem; border-bottom: 1px solid #333; padding-bottom: 0.5rem; }
      .project, .edu { border-left: 2px solid #82aaff; padding-left: 1rem; margin-bottom: 1.5rem; }
      .edu { border-left-color: #c792ea; }
      .tag { background-color: #292d3e; color: #89ddff; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.9rem; margin-right: 0.5rem; display: inline-block; margin-bottom: 0.5rem; }
      a { color: #82aaff; text-decoration: none; }
      a:hover { text-decoration: underline; }
      .contact-list { list-style-type: none; padding: 0; }
      .contact-list span { color: #89ddff; }
    `;

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${personal.name || 'Developer'} | Portfolio</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <header>
      <h1>${personal.name || 'developer_name'}</h1>
      <h2>> ${personal.role || 'sys.role'}</h2>
    </header>
    <section>
      <h3>~/about_me</h3>
      <p>${personal.bio || ''}</p>
    </section>
    <section>
      <h3 style="color: #c3e88d;">~/projects</h3>
      ${projects.map(p => `
        <div class="project">
          <h4 style="color: #ffcb6b; margin: 0 0 0.5rem 0;">${p.title}</h4>
          <p style="margin: 0;">${p.description}</p>
        </div>
      `).join('')}
    </section>
    <section>
      <h3 style="color: #f07178;">~/education</h3>
      ${education.map(e => `
        <div class="edu">
          <h4 style="color: #89ddff; margin: 0 0 0.25rem 0;">${e.institution}</h4>
          <p style="margin: 0;">${e.degree} <span style="color: #c3e88d;">[${e.score}]</span></p>
        </div>
      `).join('')}
    </section>
    <section>
      <h3 style="color: #ffcb6b;">~/skills</h3>
      <div>
        ${skills.filter(s => s).map(s => `<span class="tag">${s}</span>`).join('')}
      </div>
    </section>
    <section>
      <h3 style="color: #f78c6c;">~/contact</h3>
      <ul class="contact-list">
        ${socials.email ? `<li><span>email: </span>${socials.email}</li>` : ''}
        ${socials.github ? `<li><span>github: </span><a href="${socials.github}">${socials.github}</a></li>` : ''}
        ${socials.linkedin ? `<li><span>linkedin: </span><a href="${socials.linkedin}">${socials.linkedin}</a></li>` : ''}
      </ul>
    </section>
  </div>
</body>
</html>`;

    zip.file("index.html", htmlContent);
    zip.file("style.css", cssContent);
    const blob = await zip.generateAsync({ type: "blob" });
    const fileName = personal.name ? `${personal.name.replace(/\s+/g, '_')}_Portfolio.zip` : 'Portfolio.zip';
    saveAs(blob, fileName);
  };

  // Add this function right below your handleExport function
const handlePublish = async () => {
  // Simple validation
  if (!portfolioData.personal.name) {
    alert("Please enter your Full Name before publishing!");
    return;
  }

  try {
    // We map your frontend state to match our MongoDB schema exactly
    const payload = {
      personalInfo: {
        fullName: portfolioData.personal.name,
        role: portfolioData.personal.role,
        bio: portfolioData.personal.bio,
      },
      projects: portfolioData.projects,
      education: portfolioData.education
    };

    const response = await fetch('http://localhost:5000/api/portfolio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      // Success!
      alert(`🎉 Portfolio published successfully!\n\nYour Live URL: ${data.url}`);
      console.log("Saved Data:", data);
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error("Publishing error:", error);
    alert("Failed to publish. Check your console, bro.");
  }
};

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

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', fontFamily: 'sans-serif' }}>
      
      {/* LEFT PANE: Builder Controls */}
      <div style={{ flex: 1, padding: '2rem', backgroundColor: '#f4f4f5', overflowY: 'auto', position: 'relative' }}>
        <button 
           onClick={() => navigate('/')}
           style={{ marginBottom: '1.5rem', padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc' }}
        >
        ← Back to Home
        </button>
        
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#000' }}>Builder Controls</h2>
        
        {/* Personal Info Section */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#000' }}>Full Name</label>
          <input 
            type="text" 
            placeholder="Enter your name"
            value={portfolioData.personal.name}
            onChange={(e) => setPortfolioData({
              ...portfolioData, 
              personal: { ...portfolioData.personal, name: e.target.value }
            })}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        {/* Projects Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#000' }}>Projects</h3>
          
          {portfolioData.projects && portfolioData.projects.map((project, index) => (
            <div key={project.id} style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#fff', borderRadius: '6px', border: '1px solid #ddd' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: '#000' }}>Project Title</label>
              <input 
                type="text" 
                value={project.title}
                onChange={(e) => {
                  const updatedProjects = [...portfolioData.projects];
                  updatedProjects[index].title = e.target.value;
                  setPortfolioData({ ...portfolioData, projects: updatedProjects });
                }}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '0.5rem', boxSizing: 'border-box' }}
              />

              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: '#000' }}>Description</label>
              <textarea 
                value={project.description}
                onChange={(e) => {
                  const updatedProjects = [...portfolioData.projects];
                  updatedProjects[index].description = e.target.value;
                  setPortfolioData({ ...portfolioData, projects: updatedProjects });
                }}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', minHeight: '60px', resize: 'vertical', boxSizing: 'border-box' }}
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
          <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#000' }}>Education</h3>
          
          {portfolioData.education && portfolioData.education.map((edu, index) => (
            <div key={edu.id} style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#fff', borderRadius: '6px', border: '1px solid #ddd' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: '#000' }}>Institution</label>
              <input 
                type="text" 
                value={edu.institution}
                onChange={(e) => {
                  const updatedEdu = [...portfolioData.education];
                  updatedEdu[index].institution = e.target.value;
                  setPortfolioData({ ...portfolioData, education: updatedEdu });
                }}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '0.5rem', boxSizing: 'border-box' }}
              />

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 2 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: '#000' }}>Degree</label>
                  <input 
                    type="text" 
                    value={edu.degree}
                    onChange={(e) => {
                      const updatedEdu = [...portfolioData.education];
                      updatedEdu[index].degree = e.target.value;
                      setPortfolioData({ ...portfolioData, education: updatedEdu });
                    }}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: '#000' }}>Score/CGPA</label>
                  <input 
                    type="text" 
                    value={edu.score}
                    onChange={(e) => {
                      const updatedEdu = [...portfolioData.education];
                      updatedEdu[index].score = e.target.value;
                      setPortfolioData({ ...portfolioData, education: updatedEdu });
                    }}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
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
          <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#000' }}>Core Skills</h3>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: '#000' }}>Comma Separated List</label>
          <input 
            type="text" 
            value={(portfolioData.skills || []).join(', ')}
            onChange={(e) => {
              const skillsArray = e.target.value.split(',').map(skill => skill.trim());
              setPortfolioData({ ...portfolioData, skills: skillsArray });
            }}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            placeholder="e.g. React, Node.js, Python"
          />
        </div>

        {/* Social Links Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#000' }}>Social Links</h3>
          
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: '#000' }}>GitHub URL</label>
          <input 
            type="text" 
            value={portfolioData.socials?.github || ''}
            onChange={(e) => setPortfolioData({
              ...portfolioData, 
              socials: { ...portfolioData.socials, github: e.target.value }
            })}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '0.5rem', boxSizing: 'border-box' }}
          />

          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: '#000' }}>Email Address</label>
          <input 
            type="email" 
            value={portfolioData.socials?.email || ''}
            onChange={(e) => setPortfolioData({
              ...portfolioData, 
              socials: { ...portfolioData.socials, email: e.target.value }
            })}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        {/* EXPORT & PUBLISH BUTTONS */}
        <div style={{ marginTop: '3rem', borderTop: '2px solid #ccc', paddingTop: '2rem', marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
          <button 
            onClick={handleExport}
            style={{ 
              flex: 1, padding: '1rem', backgroundColor: '#1e293b', color: 'white', 
              border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', 
              cursor: 'pointer', transition: 'all 0.2s ease'
            }}
          >
            💾 Export HTML/CSS
          </button>

          <button 
            onClick={handlePublish}
            style={{ 
              flex: 1, padding: '1rem', backgroundColor: '#10b981', color: 'white', 
              border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', 
              cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.4)',
              transition: 'all 0.2s ease'
            }}
          >
            🚀 Publish to Web
          </button>
        </div>

        {/* Template Selection Section */}
        <div style={{ paddingBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#000' }}>Choose Template</label>
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
                <div style={{ fontWeight: 'bold', color: '#000' }}>{tmpl.title}</div>
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
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: '#000' }}>Live Preview</h2>
          <span style={{ fontSize: '0.85rem', padding: '4px 8px', backgroundColor: '#e2e8f0', color: '#000', borderRadius: '4px', fontWeight: '500' }}>
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
};

export default Dashboard;