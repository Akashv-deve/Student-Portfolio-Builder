import { useState } from 'react';

// Import all your marketing components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects'; // (Templates)
import Education from './components/Education'; // (Target Audience)
import Footer from './components/Footer';

function App() {
  // State to control which page the user is viewing
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);

  // The Builder Data State
  const [portfolioData, setPortfolioData] = useState({
    personal: { name: "", role: "", bio: "" }
  });

  // --- VIEW 1: THE BUILDER WORKSPACE ---
  if (isBuilderOpen) {
    return (
      <div style={{ display: 'flex', height: '100vh', width: '100vw', fontFamily: 'sans-serif' }}>
        
        {/* LEFT PANE: Builder Controls */}
        <div style={{ flex: 1, padding: '2rem', backgroundColor: '#f4f4f5', overflowY: 'auto' }}>
          {/* Back Button to return to the landing page */}
          <button 
            onClick={() => setIsBuilderOpen(false)}
            style={{ marginBottom: '2rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
          >
            ← Back to Home
          </button>
          
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Builder Controls</h2>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Full Name</label>
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
        </div>

        {/* RIGHT PANE: Live Preview */}
        <div style={{ flex: 1, padding: '2rem', backgroundColor: '#ffffff', overflowY: 'auto', borderLeft: '2px solid #e4e4e7' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Live Preview</h2>
          <div style={{ padding: '2rem', border: '1px dashed #ccc', borderRadius: '8px' }}>
            <h1 style={{ fontSize: '2.5rem', margin: 0 }}>{portfolioData.personal.name || "Your Name Here"}</h1>
          </div>
        </div>

      </div>
    );
  }

  // --- VIEW 2: THE LANDING PAGE ---
  return (
    <div className="landing-page">
      <Navbar />
      {/* Pass the function to open the builder to the Hero component */}
      <Hero onGetStarted={() => setIsBuilderOpen(true)} />
      <Skills />
      <Projects />
      <Education />
      <Footer />
    </div>
  );
}

export default App;