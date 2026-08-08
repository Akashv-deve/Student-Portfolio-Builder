import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import SoftwareEngineer from '../templates/SoftwareEngineer';
import { useNavigate } from 'react-router-dom';
import FrontendDeveloper from '../templates/FrontendDeveloper';
import UIUXDesigner from '../templates/UIUXDesigner';
import BuilderForm from '../components/BuilderForm';

const Dashboard = ({ portfolioData, setPortfolioData}) => {
  const navigate = useNavigate();
  const [hoveredTemplate, setHoveredTemplate] = useState(null);
  const [publishModal, setPublishModal] = useState({ isOpen: false, url: '' });

  // THE DYNAMIC ZIP EXPORT ENGINE
  const handleExport = async () => {
    // 1. Grab the live HTML directly from the preview pane
    const previewElement = document.getElementById('portfolio-preview');
    if (!previewElement) {
      alert("Could not find the preview element to export!");
      return;
    }

    const templateHTML = previewElement.innerHTML;
    const zip = new JSZip();

    // 2. Wrap it in a clean HTML5 boilerplate
    // We include a tiny CSS reset to ensure the inline styles render perfectly
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${portfolioData.personal?.name || 'Developer'} | Portfolio</title>
  <style>
    /* Basic reset to ensure consistent rendering across browsers */
    body, html {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      width: 100%;
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }
  </style>
</head>
<body>
  ${templateHTML}
</body>
</html>`;

    // 3. Zip it and Ship it (No external CSS file needed anymore!)
    zip.file("index.html", htmlContent);
    const blob = await zip.generateAsync({ type: "blob" });
    const fileName = portfolioData.personal?.name 
      ? `${portfolioData.personal.name.replace(/\s+/g, '_')}_Portfolio.zip` 
      : 'Portfolio.zip';
      
    saveAs(blob, fileName);
  };

  const handlePublish = async () => {
    console.log("Current Slug in State:", portfolioData.slug);

    if (!portfolioData.personal.name) {
      alert("Please enter your Full Name before publishing!");
      return;
    }

    try {
      const normalizedSkills = Array.isArray(portfolioData.skills)
        ? portfolioData.skills.filter(Boolean)
        : [];
      const normalizedSocials = {
        github: portfolioData.socials?.github || '',
        linkedin: portfolioData.socials?.linkedin || '',
        email: portfolioData.socials?.email || ''
      };

      const payload = {
        slug: portfolioData.slug || '',
        template: portfolioData.selectedTemplate || "Software Engineer Portfolio",
        personalInfo: {
          fullName: portfolioData.personal.name,
          role: portfolioData.personal.role,
          bio: portfolioData.personal.bio,
        },
        projects: Array.isArray(portfolioData.projects) ? portfolioData.projects : [],
        education: Array.isArray(portfolioData.education) ? portfolioData.education : [],
        skills: normalizedSkills,
        socials: normalizedSocials
      };

      const response = await fetch('http://localhost:5000/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      let data = null;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('Failed to parse publish response:', parseError);
        data = { message: 'Invalid server response.' };
      }

      if (response.ok) {
        const nextSlug = data?.slug || portfolioData.slug || '';
        setPortfolioData({ ...portfolioData, slug: nextSlug });
        setPublishModal({ isOpen: true, url: data?.url || 'N/A' });
        console.log('Saved Data:', data);
      } else {
        console.error('Publish failed with server response:', data);
        alert(`Error: ${data?.message || 'Unknown error while publishing.'}`);
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
    },
    // NEW TEMPLATES ADDED BELOW
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
    <div style={{ display: 'flex', height: '100vh', width: '100vw', fontFamily: 'sans-serif' }}>
      
      {/* LEFT PANE: Builder Controls */}
      <div style={{ flex: 1, padding: '2rem', backgroundColor: '#f4f4f5', overflowY: 'auto', position: 'relative' }}>
        <button 
           onClick={() => navigate('/')}
           style={{ marginBottom: '1.5rem', padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc' }}
        >
        ← Back to Home
        </button>
        
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#000' }}>Builder Controls</h2>
        
        {/* INJECTED MODULAR FORM COMPONENT */}
        <BuilderForm portfolioData={portfolioData} setPortfolioData={setPortfolioData} />

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
        <div id="portfolio-preview" style={{ width: '100%', height: '100%' }}>
          {portfolioData.selectedTemplate === "Software Engineer Portfolio" ? (
            <SoftwareEngineer data={portfolioData} />
          ) : portfolioData.selectedTemplate === "Frontend Developer Portfolio" ? (
            <FrontendDeveloper data={portfolioData} />
          ) : portfolioData.selectedTemplate === "UI/UX Designer Portfolio" ? (
            <UIUXDesigner data={portfolioData} />
          ) : portfolioData.selectedTemplate === "Embedded Systems Engineer Portfolio" ? (
            <EmbeddedSystems data={portfolioData} />
          ) : portfolioData.selectedTemplate === "Data Analyst Portfolio" ? (
            <DataAnalyst data={portfolioData} />
          ) : portfolioData.selectedTemplate === "Full Stack Developer Portfolio" ? (
            <FullStack data={portfolioData} />
          ) : (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#666', border: '2px dashed #ccc', borderRadius: '8px' }}>
              <h3>Preview not available yet.</h3>
              <p>We are still building the {portfolioData.selectedTemplate} template!</p>
            </div>
          )}
        </div>
      </div>
      {/* 🚀 PREMIUM SUCCESS MODAL OVERLAY */}
      {publishModal.isOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)', 
          backdropFilter: 'blur(4px)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', 
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: '#ffffff', padding: '2.5rem', borderRadius: '12px',
            maxWidth: '450px', width: '90%', textAlign: 'center',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            transform: 'translateY(0)', animation: 'slideUp 0.3s ease-out'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
            <h2 style={{ margin: '0 0 0.5rem 0', color: '#10b981', fontSize: '1.8rem' }}>Published Successfully!</h2>
            <p style={{ margin: '0 0 1.5rem 0', color: '#64748b', fontSize: '1rem' }}>
              Your portfolio is live and ready to share with the world.
            </p>
            
            <div style={{ 
              backgroundColor: '#f1f5f9', padding: '1rem', borderRadius: '8px', 
              marginBottom: '1.5rem', border: '1px solid #e2e8f0', wordBreak: 'break-all'
            }}>
              <a href={publishModal.url} target="_blank" rel="noreferrer" style={{
                color: '#3b82f6', fontWeight: 'bold', fontSize: '1.1rem', textDecoration: 'none'
              }}>
                {publishModal.url}
              </a>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(publishModal.url);
                }}
                style={{
                  flex: 1, padding: '0.75rem', backgroundColor: '#f8fafc', color: '#0f172a',
                  border: '2px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer', 
                  fontWeight: 'bold', fontSize: '1rem', transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#e2e8f0'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#f8fafc'}
              >
                📋 Copy Link
              </button>
              
              <button
                onClick={() => setPublishModal({ isOpen: false, url: '' })}
                style={{
                  flex: 1, padding: '0.75rem', backgroundColor: '#0f172a', color: '#ffffff',
                  border: 'none', borderRadius: '8px', cursor: 'pointer', 
                  fontWeight: 'bold', fontSize: '1rem', transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#334155'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#0f172a'}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;