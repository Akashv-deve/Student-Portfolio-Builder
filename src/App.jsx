import { useState } from 'react';

// Import your marketing components for the landing page
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Footer from './components/Footer';

function App() {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);

  // Master Portfolio State
  const [portfolioData, setPortfolioData] = useState({
    personal: { name: "", role: "", bio: "" },
    selectedTemplate: "Software Engineer Portfolio"
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

          <div style={{ padding: '2rem', border: '1px dashed #ccc', borderRadius: '8px', minHeight: '300px' }}>
            <h1 style={{ fontSize: '2.5rem', margin: 0 }}>{portfolioData.personal.name || "Your Name Here"}</h1>
            <p style={{ color: '#666', marginTop: '0.5rem' }}>Template Layout Active: {portfolioData.selectedTemplate}</p>
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